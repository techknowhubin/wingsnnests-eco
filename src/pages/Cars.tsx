import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import hondaCityImage from "@/assets/vehicles/honda-city.jpg";

const carImageMap: Record<string, string> = {
  "honda-city.jpg": hondaCityImage,
};

interface Car {
  id: string;
  title: string;
  location: string;
  price_per_day: number;
  currency: string;
  rating: number;
  images: string[];
}

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { toast } = useToast();
  const observerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 12;

  const fetchCars = async (pageNum: number) => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("id, title, location, price_per_day, currency, rating, images")
        .eq("availability_status", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .range(pageNum * ITEMS_PER_PAGE, (pageNum + 1) * ITEMS_PER_PAGE - 1);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast({
        title: "Error",
        description: "Failed to load cars. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const data = await fetchCars(0);
      setCars(data);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading && cars.length >= ITEMS_PER_PAGE) {
          setLoading(true);
          const newPage = page + 1;
          const newData = await fetchCars(newPage);
          if (newData.length > 0) {
            setCars((prev) => [...prev, ...newData]);
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
  }, [loading, page, cars.length]);

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
              Rent a Car for Your Adventure
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drive through India with comfort and freedom
            </p>
          </motion.div>
          <SearchBar />
        </div>
      </section>

      {/* Listings Section */}
      <section className="container mx-auto px-4 py-16 flex-grow">
        {!loading && cars.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No cars available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {cars.map((car, index) => (
              <ListingCard
                key={car.id}
                id={car.id}
                image={carImageMap[car.images?.[0]] || hondaCityImage}
                title={car.title}
                location={car.location}
                price={`${car.currency === 'INR' ? '₹' : '$'}${car.price_per_day.toLocaleString()}`}
                rating={Number(car.rating)}
                type="car"
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

export default Cars;
