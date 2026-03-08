import { Car } from 'lucide-react';
import { ListingsManager } from '@/components/dashboard/ListingsManager';
import { useAuth } from '@/hooks/useAuth';
import { useHostCars } from '@/hooks/useListings';

export default function HostCars() {
  const { user } = useAuth();
  const { data: cars = [], isLoading } = useHostCars(user?.id);

  return (
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
  );
}
