import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AddStayForm } from '@/components/dashboard/AddStayForm';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function HostAddStay() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <DashboardLayout>
      <AddStayForm />
    </DashboardLayout>
  );
}
