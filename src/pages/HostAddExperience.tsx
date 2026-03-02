import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AddExperienceForm } from '@/components/dashboard/AddExperienceForm';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function HostAddExperience() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <DashboardLayout>
      <AddExperienceForm />
    </DashboardLayout>
  );
}
