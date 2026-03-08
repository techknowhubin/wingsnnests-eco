import { Compass } from 'lucide-react';
import { ListingsManager } from '@/components/dashboard/ListingsManager';
import { useAuth } from '@/hooks/useAuth';
import { useHostExperiences } from '@/hooks/useListings';

export default function HostExperiences() {
  const { user } = useAuth();
  const { data: experiences = [], isLoading } = useHostExperiences(user?.id);

  return (
    <ListingsManager
      title="Your Experiences"
      description="Manage your tours, activities, and adventures"
      listingType="experience"
      listings={experiences}
      isLoading={isLoading}
      priceKey="price_per_person"
      priceLabel="per person"
      emptyIcon={<Compass className="h-full w-full" />}
    />
  );
}
