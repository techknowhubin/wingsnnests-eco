import { Home } from 'lucide-react';
import { ListingsManager } from '@/components/dashboard/ListingsManager';
import { useAuth } from '@/hooks/useAuth';
import { useHostStays } from '@/hooks/useListings';

export default function HostStays() {
  const { user } = useAuth();
  const { data: stays = [], isLoading } = useHostStays(user?.id);

  return (
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
  );
}
