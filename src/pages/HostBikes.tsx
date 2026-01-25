import { Bike } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ListingsManager } from '@/components/dashboard/ListingsManager';
import { useAuth } from '@/hooks/useAuth';
import { useHostBikes } from '@/hooks/useListings';
import { Navigate } from 'react-router-dom';

export default function HostBikes() {
  const { user, loading } = useAuth();
  const { data: bikes = [], isLoading } = useHostBikes(user?.id);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout>
      <ListingsManager
        title="Your Bikes"
        description="Manage your rental bikes and motorcycles"
        listingType="bike"
        listings={bikes}
        isLoading={isLoading}
        priceKey="price_per_day"
        priceLabel="per day"
        emptyIcon={<Bike className="h-full w-full" />}
      />
    </DashboardLayout>
  );
}
