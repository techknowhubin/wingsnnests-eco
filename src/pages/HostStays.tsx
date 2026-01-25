import { Home } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ListingsManager } from '@/components/dashboard/ListingsManager';
import { useAuth } from '@/hooks/useAuth';
import { useHostStays } from '@/hooks/useListings';
import { Navigate } from 'react-router-dom';

export default function HostStays() {
  const { user, loading } = useAuth();
  const { data: stays = [], isLoading } = useHostStays(user?.id);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout>
      <ListingsManager
        title="Your Stays"
        description="Manage your homestays, villas, and properties"
        listingType="stay"
        listings={stays}
        isLoading={isLoading}
        priceKey="price_per_night"
        priceLabel="per night"
        emptyIcon={<Home className="h-full w-full" />}
      />
    </DashboardLayout>
  );
}
