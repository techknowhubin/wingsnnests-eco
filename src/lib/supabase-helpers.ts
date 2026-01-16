import { supabase } from '@/integrations/supabase/client';
import type { 
  Bike, Car, Stay, Experience, Booking, Review, Profile, 
  ListingType, AppRole, BookingStatus
} from '@/types/database';

// ============ Profile Helpers ============

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============ Listing Helpers ============

export async function getStays(options?: { 
  featured?: boolean; 
  verified?: boolean;
  limit?: number;
  location?: string;
}) {
  let query = supabase.from('stays').select('*');
  
  if (options?.featured) query = query.eq('featured', true);
  if (options?.verified) query = query.eq('is_verified', true);
  if (options?.location) query = query.ilike('location', `%${options.location}%`);
  if (options?.limit) query = query.limit(options.limit);
  
  query = query.eq('availability_status', true).order('created_at', { ascending: false });
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getStayById(id: string) {
  const { data, error } = await supabase
    .from('stays')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getStayBySlug(slug: string) {
  const { data, error } = await supabase
    .from('stays')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getCars(options?: { 
  featured?: boolean; 
  verified?: boolean;
  limit?: number;
  location?: string;
}) {
  let query = supabase.from('cars').select('*');
  
  if (options?.featured) query = query.eq('featured', true);
  if (options?.verified) query = query.eq('is_verified', true);
  if (options?.location) query = query.ilike('location', `%${options.location}%`);
  if (options?.limit) query = query.limit(options.limit);
  
  query = query.eq('availability_status', true).order('created_at', { ascending: false });
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getCarById(id: string) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getCarBySlug(slug: string) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getBikes(options?: { 
  featured?: boolean; 
  verified?: boolean;
  limit?: number;
  location?: string;
}) {
  let query = supabase.from('bikes').select('*');
  
  if (options?.featured) query = query.eq('featured', true);
  if (options?.verified) query = query.eq('is_verified', true);
  if (options?.location) query = query.ilike('location', `%${options.location}%`);
  if (options?.limit) query = query.limit(options.limit);
  
  query = query.eq('availability_status', true).order('created_at', { ascending: false });
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBikeById(id: string) {
  const { data, error } = await supabase
    .from('bikes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getBikeBySlug(slug: string) {
  const { data, error } = await supabase
    .from('bikes')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getExperiences(options?: { 
  featured?: boolean; 
  verified?: boolean;
  limit?: number;
  location?: string;
  category?: string;
}) {
  let query = supabase.from('experiences').select('*');
  
  if (options?.featured) query = query.eq('featured', true);
  if (options?.verified) query = query.eq('is_verified', true);
  if (options?.location) query = query.ilike('location', `%${options.location}%`);
  if (options?.category) query = query.eq('category', options.category);
  if (options?.limit) query = query.limit(options.limit);
  
  query = query.eq('availability_status', true).order('created_at', { ascending: false });
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getExperienceById(id: string) {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getExperienceBySlug(slug: string) {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

// ============ Booking Helpers ============

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserBookings(userId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getHostBookings(hostId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('host_id', hostId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ booking_status: status })
    .eq('id', bookingId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getBookingById(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

// ============ Review Helpers ============

export async function getListingReviews(listingId: string, listingType: ListingType) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('listing_id', listingId)
    .eq('listing_type', listingType)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============ Wishlist Helpers ============

export async function getUserWishlist(userId: string) {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
}

export async function addToWishlist(userId: string, listingId: string, listingType: ListingType) {
  const { data, error } = await supabase
    .from('wishlists')
    .insert({ user_id: userId, listing_id: listingId, listing_type: listingType })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function removeFromWishlist(userId: string, listingId: string) {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('listing_id', listingId);
  
  if (error) throw error;
}

export async function isInWishlist(userId: string, listingId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('wishlists')
    .select('id')
    .eq('user_id', userId)
    .eq('listing_id', listingId)
    .maybeSingle();
  
  if (error) throw error;
  return !!data;
}

// ============ Role Helpers ============

export async function checkUserRole(userId: string, role: AppRole): Promise<boolean> {
  const { data, error } = await supabase
    .rpc('has_role', { _user_id: userId, _role: role });
  
  if (error) return false;
  return data as boolean;
}

export async function isAdmin(userId: string): Promise<boolean> {
  return checkUserRole(userId, 'admin');
}

export async function isHost(userId: string): Promise<boolean> {
  return checkUserRole(userId, 'host');
}

export async function isModerator(userId: string): Promise<boolean> {
  return checkUserRole(userId, 'moderator');
}

// ============ Notification Helpers ============

export async function getUserNotifications(userId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);
  
  if (error) throw error;
}

export async function getUnreadNotificationCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);
  
  if (error) throw error;
  return count || 0;
}

// ============ Host Listings Helpers ============

export async function getHostStays(hostId: string) {
  const { data, error } = await supabase
    .from('stays')
    .select('*')
    .eq('host_id', hostId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getHostCars(hostId: string) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('host_id', hostId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getHostBikes(hostId: string) {
  const { data, error } = await supabase
    .from('bikes')
    .select('*')
    .eq('host_id', hostId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getHostExperiences(hostId: string) {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('host_id', hostId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// ============ Utility Functions ============

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatPrice(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateCommission(amount: number, isMarketplace: boolean): {
  commission: number;
  rate: number;
  hostEarnings: number;
} {
  const rate = isMarketplace ? 20 : 10; // 20% for marketplace, 10% for link-in-bio
  const commission = amount * (rate / 100);
  return {
    commission,
    rate,
    hostEarnings: amount - commission,
  };
}
