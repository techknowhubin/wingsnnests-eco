import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EarningsTracker } from '@/components/dashboard/EarningsTracker';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function HostEarnings() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout>
      <EarningsTracker />
    </DashboardLayout>
  );
}
