import { Compass } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ListingsManager } from '@/components/dashboard/ListingsManager';
import { useAuth } from '@/hooks/useAuth';
import { useHostExperiences } from '@/hooks/useListings';
import { Navigate } from 'react-router-dom';

export default function HostExperiences() {
  const { user, loading } = useAuth();
  const { data: experiences = [], isLoading } = useHostExperiences(user?.id);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
