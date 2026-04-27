import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useListings';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, loading: authLoading } = useAuth();
  
  const {
    data: isAdminUser,
    isLoading: roleLoading,
    fetchStatus,
    status
  } = useIsAdmin(user?.id);

  console.log('ProtectedAdminRoute state:', { 
    authLoading, 
    userId: user?.id, 
    roleLoading, 
    fetchStatus, 
    status, 
    isAdminUser 
  });

  // 1. Still resolving the auth session
  if (authLoading) {
    return <AdminLoadingScreen reason="auth" />;
  }

  // 2. Auth resolved — no session → go to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // 3. User exists but role query is loading
  if (roleLoading) {
    return <AdminLoadingScreen reason="role" />;
  }

  // 4. Role resolved — not an admin → go home
  if (!isAdminUser) {
    console.log('Redirecting to home because isAdminUser is', isAdminUser);
    return <Navigate to="/" replace />;
  }

  // 5. Confirmed admin — render
  return <>{children}</>;
}

function AdminLoadingScreen({ reason }: { reason?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#013220]">
      <div className="flex flex-col items-center gap-4 text-white/60">
        <Shield className="h-10 w-10 animate-pulse text-[#D4E034]" />
        <div className="space-y-2 w-48">
          <Skeleton className="h-3 w-full bg-white/10" />
          <Skeleton className="h-3 w-3/4 bg-white/10" />
        </div>
        <p className="text-xs font-medium tracking-widest uppercase">
          Verifying access… {reason && <span className="text-xs opacity-50">({reason})</span>}
        </p>
      </div>
    </div>
  );
}

