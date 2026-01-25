import { Car } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ListingsManager } from '@/components/dashboard/ListingsManager';
import { useAuth } from '@/hooks/useAuth';
import { useHostCars } from '@/hooks/useListings';
import { Navigate } from 'react-router-dom';

export default function HostCars() {
  const { user, loading } = useAuth();
  const { data: cars = [], isLoading } = useHostCars(user?.id);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout>
      <ListingsManager
        title="Your Cars"
        description="Manage your rental cars and vehicles"
        listingType="car"
        listings={cars}
        isLoading={isLoading}
        priceKey="price_per_day"
        priceLabel="per day"
        emptyIcon={<Car className="h-full w-full" />}
      />
    </DashboardLayout>
  );
}
