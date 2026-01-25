import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export default function HostDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-full max-w-md p-8">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
