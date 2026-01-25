import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BookingsManager } from '@/components/dashboard/BookingsManager';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function HostBookings() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout>
      <BookingsManager />
    </DashboardLayout>
  );
}
