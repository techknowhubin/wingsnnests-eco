import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { LinkInBioGenerator } from '@/components/dashboard/LinkInBioGenerator';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function HostLinkInBio() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout>
      <LinkInBioGenerator />
    </DashboardLayout>
  );
}
