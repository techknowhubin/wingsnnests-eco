import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// ─── Helper: generate unique WingID ─────────────────────────────────────────
async function generateUniqueWingId(): Promise<string> {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const candidateId = `WING-${suffix}`;
    const { data } = await supabase.from('profiles').select('id').eq('wing_id', candidateId).maybeSingle();
    if (!data) return candidateId;
  }
  throw new Error('Could not generate unique WingID after 10 attempts');
}

// ─── Overview Metrics ────────────────────────────────────────────────────────
export function useAdminMetrics() {
  return useQuery({
    queryKey: ['admin', 'metrics'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];

      const [
        { data: gmvData },
        { count: todayBookings },
        { count: pendingKyc },
        { count: registeredTravelers },
        { count: wingIdsIssued },
        { data: revenueData },
        { data: staysPending },
        { data: carsPending },
        { data: bikesPending },
        { data: expPending },
      ] = await Promise.all([
        supabase.from('bookings').select('total_amount').eq('payment_status', 'paid'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).gte('created_at', today),
        supabase.from('kyc_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('user_roles').select('*', { count: 'exact', head: true }).eq('role', 'user'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).not('wing_id', 'is', null),
        supabase.from('bookings').select('commission_amount').eq('payment_status', 'paid'),
        supabase.from('stays').select('id').eq('approval_status', 'pending'),
        supabase.from('cars').select('id').eq('approval_status', 'pending'),
        supabase.from('bikes').select('id').eq('approval_status', 'pending'),
        supabase.from('experiences').select('id').eq('approval_status', 'pending'),
      ]);

      const totalGmv = (gmvData ?? []).reduce((s: number, r: any) => s + Number(r.total_amount || 0), 0);
      const platformRevenue = (revenueData ?? []).reduce((s: number, r: any) => s + Number(r.commission_amount || 0), 0);
      const pendingListings = (staysPending?.length ?? 0) + (carsPending?.length ?? 0) + (bikesPending?.length ?? 0) + (expPending?.length ?? 0);

      return {
        totalGmv,
        todayBookings: todayBookings ?? 0,
        pendingKyc: pendingKyc ?? 0,
        registeredTravelers: registeredTravelers ?? 0,
        wingIdsIssued: wingIdsIssued ?? 0,
        platformRevenue,
        pendingListings,
        activeProviders: 0, // computed separately
      };
    },
    staleTime: 60_000,
  });
}

// ─── Recent Bookings (Admin) ─────────────────────────────────────────────────
export function useAdminRecentBookings() {
  return useQuery({
    queryKey: ['admin', 'recent-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`id, listing_type, total_amount, status, payment_status, created_at,
          profiles:user_id ( full_name )`)
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data ?? [];
    },
  });
}

// ─── KYC Submissions ────────────────────────────────────────────────────────
export function useKycSubmissions(statusFilter?: string) {
  return useQuery({
    queryKey: ['admin', 'kyc', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('kyc_submissions')
        .select(`*, profiles:user_id ( full_name, phone, email, avatar_url, created_at, kyc_status )`)
        .order('submitted_at', { ascending: true });
      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useLockKycSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (submissionId: string) => {
      const { error } = await supabase
        .from('kyc_submissions')
        .update({ status: 'under_review', updated_at: new Date().toISOString() })
        .eq('id', submissionId)
        .eq('status', 'pending');
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'kyc'] }),
  });
}

export function useApproveKyc() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ submissionId, userId, adminId }: { submissionId: string; userId: string; adminId: string }) => {
      const wingId = await generateUniqueWingId();
      const now = new Date().toISOString();

      const [kycRes, profileRes] = await Promise.all([
        supabase.from('kyc_submissions').update({
          status: 'approved',
          reviewed_at: now,
          reviewed_by: adminId,
          updated_at: now,
        }).eq('id', submissionId),
        supabase.from('profiles').update({
          kyc_status: 'approved',
          wing_id: wingId,
          updated_at: now,
        }).eq('id', userId),
      ]);

      if (kycRes.error) throw kycRes.error;
      if (profileRes.error) throw profileRes.error;

      return { wingId };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'kyc'] });
      qc.invalidateQueries({ queryKey: ['admin', 'metrics'] });
    },
  });
}

export function useRejectKyc() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      submissionId, userId, adminId, reason,
    }: { submissionId: string; userId: string; adminId: string; reason: string }) => {
      const now = new Date().toISOString();
      const [k, p] = await Promise.all([
        supabase.from('kyc_submissions').update({ status: 'rejected', rejection_reason: reason, reviewed_at: now, reviewed_by: adminId, updated_at: now }).eq('id', submissionId),
        supabase.from('profiles').update({ kyc_status: 'rejected', updated_at: now }).eq('id', userId),
      ]);
      if (k.error) throw k.error;
      if (p.error) throw p.error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'kyc'] }),
  });
}

export function useRequestReupload() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      submissionId, userId, adminId, notes,
    }: { submissionId: string; userId: string; adminId: string; notes: string }) => {
      const now = new Date().toISOString();
      const [k, p] = await Promise.all([
        supabase.from('kyc_submissions').update({ status: 're_upload_requested', review_notes: notes, reviewed_at: now, reviewed_by: adminId, updated_at: now }).eq('id', submissionId),
        supabase.from('profiles').update({ kyc_status: 're_upload_requested', updated_at: now }).eq('id', userId),
      ]);
      if (k.error) throw k.error;
      if (p.error) throw p.error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'kyc'] }),
  });
}

// ─── Listing Approvals ───────────────────────────────────────────────────────
const LISTING_TABLES = ['stays', 'hotels', 'resorts', 'cars', 'bikes', 'experiences'] as const;

export function useAdminPendingListings(typeFilter?: string) {
  return useQuery({
    queryKey: ['admin', 'listings', typeFilter],
    queryFn: async () => {
      const tables = typeFilter && typeFilter !== 'all' ? [typeFilter] : LISTING_TABLES;
      const results = await Promise.all(
        tables.map(async (table: string) => {
          const { data, error } = await supabase
            .from(table as any)
            .select(`*, profiles:host_id ( full_name, phone, avatar_url )`)
            .order('submitted_for_review_at', { ascending: true });
          if (error) return [];
          return (data ?? []).map((item: any) => ({ ...item, _table: table }));
        })
      );
      return results.flat();
    },
  });
}

export function useApproveListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, table }: { id: string; table: string }) => {
      const { error } = await supabase.from(table as any).update({
        approval_status: 'approved',
        is_active: true,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'listings'] }),
  });
}

export function useRejectListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, table, reason }: { id: string; table: string; reason: string }) => {
      const { error } = await supabase.from(table as any).update({
        approval_status: 'rejected',
        is_active: false,
        rejection_reason: reason,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'listings'] }),
  });
}

export function useRequestRevision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, table, reason }: { id: string; table: string; reason: string }) => {
      const { error } = await supabase.from(table as any).update({
        approval_status: 'needs_revision',
        is_active: false,
        rejection_reason: reason,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'listings'] }),
  });
}

// ─── Providers ───────────────────────────────────────────────────────────────
export function useAdminProviders(search?: string) {
  return useQuery({
    queryKey: ['admin', 'providers', search],
    queryFn: async () => {
      let query = supabase
        .from('user_roles')
        .select(`user_id, profiles:user_id ( id, full_name, email, phone, avatar_url, created_at )`)
        .eq('role', 'host');
      const { data, error } = await query;
      if (error) throw error;
      const providers = (data ?? []).map((r: any) => r.profiles).filter(Boolean);
      if (search) {
        const s = search.toLowerCase();
        return providers.filter((p: any) => p.full_name?.toLowerCase().includes(s) || p.email?.toLowerCase().includes(s) || p.phone?.includes(s));
      }
      return providers;
    },
  });
}

// ─── Users ───────────────────────────────────────────────────────────────────
export function useAdminUsers(kycFilter?: string, search?: string) {
  return useQuery({
    queryKey: ['admin', 'users', kycFilter, search],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('id, full_name, email, phone, avatar_url, kyc_status, wing_id, created_at')
        .order('created_at', { ascending: false });
      if (kycFilter && kycFilter !== 'all') {
        if (kycFilter === 'no_kyc') {
          query = query.eq('kyc_status', 'not_started');
        } else {
          query = query.eq('kyc_status', kycFilter);
        }
      }
      const { data, error } = await query;
      if (error) throw error;
      let users = data ?? [];
      if (search) {
        const s = search.toLowerCase();
        users = users.filter((u: any) => u.full_name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s) || u.phone?.includes(s) || u.wing_id?.includes(s.toUpperCase()));
      }
      return users;
    },
  });
}

// ─── All Bookings ────────────────────────────────────────────────────────────
export function useAdminBookings(filters?: { status?: string; paymentStatus?: string; listingType?: string }) {
  return useQuery({
    queryKey: ['admin', 'bookings', filters],
    queryFn: async () => {
      let query = supabase
        .from('bookings')
        .select(`*, traveler:user_id ( full_name, phone ), host:host_id ( full_name )`)
        .order('created_at', { ascending: false });
      if (filters?.status) query = query.eq('status', filters.status);
      if (filters?.paymentStatus) query = query.eq('payment_status', filters.paymentStatus);
      if (filters?.listingType) query = query.eq('listing_type', filters.listingType);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('bookings').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'bookings'] }),
  });
}

// ─── Payouts ─────────────────────────────────────────────────────────────────
export function useAdminPayouts() {
  return useQuery({
    queryKey: ['admin', 'payouts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payouts')
        .select(`*, provider:provider_id ( full_name, phone )`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useUnpaidBookings() {
  return useQuery({
    queryKey: ['admin', 'unpaid-bookings'],
    queryFn: async () => {
      // Bookings that are completed and paid but don't have a payout record
      const { data: payouts } = await supabase.from('payouts').select('booking_id').not('booking_id', 'is', null);
      const paidBookingIds = (payouts ?? []).map((p: any) => p.booking_id);

      let query = supabase
        .from('bookings')
        .select(`*, host:host_id ( full_name, phone )`)
        .eq('status', 'completed')
        .eq('payment_status', 'paid')
        .order('created_at', { ascending: false });

      if (paidBookingIds.length > 0) {
        query = query.not('id', 'in', `(${paidBookingIds.join(',')})`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useMarkAsPaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, providerId, amount, commission, reference, adminId }:
      { bookingId: string; providerId: string; amount: number; commission: number; reference?: string; adminId: string }) => {
      const { error } = await supabase.from('payouts').insert({
        booking_id: bookingId,
        provider_id: providerId,
        amount,
        platform_commission: commission,
        net_payout: amount - commission,
        status: 'paid',
        payment_reference: reference,
        initiated_by: adminId,
        paid_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'payouts'] });
      qc.invalidateQueries({ queryKey: ['admin', 'unpaid-bookings'] });
    },
  });
}

// ─── Analytics ───────────────────────────────────────────────────────────────
export function useAdminAnalytics(days: number = 30) {
  return useQuery({
    queryKey: ['admin', 'analytics', days],
    queryFn: async () => {
      const from = new Date(Date.now() - days * 86400000).toISOString();
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('total_amount, commission_amount, listing_type, created_at, payment_status')
        .gte('created_at', from)
        .order('created_at', { ascending: true });
      if (error) throw error;

      const paid = (bookings ?? []).filter((b: any) => b.payment_status === 'paid');
      const totalGmv = paid.reduce((s: number, b: any) => s + Number(b.total_amount || 0), 0);
      const platformRevenue = paid.reduce((s: number, b: any) => s + Number(b.commission_amount || 0), 0);
      const avgBookingValue = paid.length ? totalGmv / paid.length : 0;

      // Group by day for line charts
      const byDay: Record<string, { gmv: number; revenue: number; count: number }> = {};
      paid.forEach((b: any) => {
        const day = b.created_at.split('T')[0];
        if (!byDay[day]) byDay[day] = { gmv: 0, revenue: 0, count: 0 };
        byDay[day].gmv += Number(b.total_amount || 0);
        byDay[day].revenue += Number(b.commission_amount || 0);
        byDay[day].count += 1;
      });
      const gmvOverTime = Object.entries(byDay).map(([date, v]) => ({ date, ...v }));

      // Group by listing type for bar chart
      const byType: Record<string, number> = {};
      (bookings ?? []).forEach((b: any) => {
        byType[b.listing_type] = (byType[b.listing_type] ?? 0) + 1;
      });
      const bookingsByCategory = Object.entries(byType).map(([type, count]) => ({ type, count }));

      return { totalGmv, platformRevenue, avgBookingValue, gmvOverTime, bookingsByCategory };
    },
    staleTime: 300_000,
  });
}

// ─── Hub Partners ────────────────────────────────────────────────────────────
export function useHubPartners() {
  return useQuery({
    queryKey: ['admin', 'hubs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hub_partners')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateHubPartner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (hub: Record<string, any>) => {
      const { error } = await supabase.from('hub_partners').insert(hub);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'hubs'] }),
  });
}

export function useToggleHubStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase.from('hub_partners').update({ is_active: isActive, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'hubs'] }),
  });
}

// ─── Admin Settings — Team ────────────────────────────────────────────────────
export function useAdminTeam() {
  return useQuery({
    queryKey: ['admin', 'team'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`user_id, profiles:user_id ( full_name, email, phone, avatar_url, created_at )`)
        .eq('role', 'admin');
      if (error) throw error;
      return (data ?? []).map((r: any) => ({ ...r.profiles, user_id: r.user_id }));
    },
  });
}
