import { Bike } from 'lucide-react';
import { ListingsManager } from '@/components/dashboard/ListingsManager';
import { useAuth } from '@/hooks/useAuth';
import { useHostBikes } from '@/hooks/useListings';

export default function HostBikes() {
  const { user } = useAuth();
  const { data: bikes = [], isLoading } = useHostBikes(user?.id);

  return (
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
  );
}
