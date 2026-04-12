import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import manaliImage from "@/assets/stays/manali-mountain-homestay.jpg";
import goaImage from "@/assets/stays/goa-beach-villa.jpg";
import jaipurImage from "@/assets/stays/jaipur-heritage-haveli.jpg";
import munnarImage from "@/assets/stays/munnar-tea-cottage.jpg";
import udaipurImage from "@/assets/stays/udaipur-lakeside-palace.jpg";
import kasolImage from "@/assets/stays/kasol-valley-home.jpg";

const imageMap: Record<string, string> = {
  "manali-mountain-homestay.jpg": manaliImage,
  "goa-beach-villa.jpg": goaImage,
  "jaipur-heritage-haveli.jpg": jaipurImage,
  "munnar-tea-cottage.jpg": munnarImage,
  "udaipur-lakeside-palace.jpg": udaipurImage,
  "kasol-valley-home.jpg": kasolImage,
};

interface Stay {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  currency: string;
  rating: number;
  images: string[];
  slug: string;
  property_type: string;
}

const Hotels = () => {
  const [hotels, setHotels] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase
          .from("hotels")
          .select("id, title, location, price_per_night, currency, rating, images, slug, property_type")
          .eq("availability_status", true)
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false });

        if (error) throw error;
        setHotels(data || []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        toast({
          title: "Error",
          description: "Failed to load hotels. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Marquee />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Premium Hotels & Suites
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Luxurious accommodations across India’s best destinations
            </p>
          </motion.div>
          <SearchBar defaultCategory="stays" />
        </div>
      </section>

      {/* Listings Section */}
      <section className="container mx-auto px-4 py-16 flex-grow">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-2xl aspect-square mb-3" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No hotels available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {hotels.map((hotel, index) => (
              <ListingCard
                key={hotel.id}
                image={hotel.images?.[0]?.startsWith('http') ? hotel.images[0] : (imageMap[hotel.images?.[0]] || manaliImage)}
                title={hotel.title}
                location={hotel.location}
                price={`${hotel.currency === 'INR' ? '₹' : '$'}${hotel.price_per_night.toLocaleString()}`}
                rating={Number(hotel.rating)}
                type="hotel" as any
                id={hotel.id}
                delay={index * 0.05}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Hotels;
