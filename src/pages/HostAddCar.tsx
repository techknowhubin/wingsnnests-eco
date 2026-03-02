import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AddCarForm } from '@/components/dashboard/AddCarForm';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function HostAddCar() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <DashboardLayout>
      <AddCarForm />
    </DashboardLayout>
  );
}
