import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
}

const Stays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { toast } = useToast();
  const observerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 12;

  const fetchStays = async (pageNum: number) => {
    try {
      const { data, error } = await supabase
        .from("stays")
        .select("id, title, location, price_per_night, currency, rating, images, slug")
        .eq("availability_status", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .range(pageNum * ITEMS_PER_PAGE, (pageNum + 1) * ITEMS_PER_PAGE - 1);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching stays:", error);
      toast({
        title: "Error",
        description: "Failed to load homestays. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const data = await fetchStays(0);
      setStays(data);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading && stays.length >= ITEMS_PER_PAGE) {
          setLoading(true);
          const newPage = page + 1;
          const newData = await fetchStays(newPage);
          if (newData.length > 0) {
            setStays((prev) => [...prev, ...newData]);
            setPage(newPage);
          }
          setLoading(false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, page, stays.length]);

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
              Find Your Perfect Homestay
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience authentic local hospitality across India
            </p>
          </motion.div>
          <SearchBar />
        </div>
      </section>

      {/* Listings Section */}
      <section className="container mx-auto px-4 py-16 flex-grow">
        {!loading && stays.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No homestays available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {stays.map((stay, index) => (
              <ListingCard
                key={stay.id}
                image={imageMap[stay.images[0]] || manaliImage}
                title={stay.title}
                location={stay.location}
                price={`${stay.currency === 'INR' ? '₹' : '$'}${stay.price_per_night.toLocaleString()}`}
                rating={Number(stay.rating)}
                type="stay"
                id={stay.id}
                delay={index * 0.05}
              />
            ))}
          </div>
        )}
      </section>

      {/* Load More Trigger */}
      <div ref={observerRef} className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Stays;
