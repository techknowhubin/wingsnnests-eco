import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { motion } from "framer-motion";
import { Star, MapPin, Wifi, Coffee, Tv, Wind, Heart, Share2, Users, BedDouble, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
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
  description: string;
  location: string;
  price_per_night: number;
  currency: string;
  rating: number;
  total_reviews: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  check_in_time: string;
  check_out_time: string;
  cancellation_policy: string;
  amenities: any;
  images: string[];
}

const StayDetail = () => {
  const { id } = useParams();
  const [stay, setStay] = useState<Stay | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchStay = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("stays")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setStay(data);
      } catch (error) {
        console.error("Error fetching stay:", error);
        toast({
          title: "Error",
          description: "Failed to load homestay details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStay();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Marquee />
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!stay) {
    return (
      <div className="min-h-screen flex flex-col">
        <Marquee />
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Homestay Not Found</h2>
            <p className="text-muted-foreground">The homestay you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const amenitiesList = Array.isArray(stay.amenities) ? stay.amenities : [];
  const mainImage = stay.images?.[0] ? imageMap[stay.images[0]] || manaliImage : manaliImage;

  return (
    <div className="min-h-screen flex flex-col">
      <Marquee />
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Title & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {stay.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {stay.rating} ({stay.total_reviews} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {stay.location}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 h-[400px]"
        >
          <div className="md:col-span-2 md:row-span-2">
            <img
              src={mainImage}
              alt={stay.title}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={mainImage}
              alt="View 2"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={mainImage}
              alt="View 3"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={mainImage}
              alt="View 4"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={mainImage}
              alt="View 5"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">About this place</h2>
              <p className="text-muted-foreground leading-relaxed">
                {stay.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Up to {stay.max_guests} guests
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {stay.bedrooms} bedrooms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {stay.bathrooms} bathrooms
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenitiesList.map((amenity: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Wifi className="h-5 w-5 text-primary" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Reviews</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="glass-effect rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-foreground">Guest Name</span>
                          <span className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            5.0
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Amazing stay! The hosts were incredibly welcoming and the views were
                          spectacular. Highly recommend for a peaceful mountain getaway.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">March 2025</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect rounded-2xl p-6 sticky top-24"
            >
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    {stay.currency === 'INR' ? '₹' : '$'}{stay.price_per_night.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/ night</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Check-in: {stay.check_in_time}</p>
                  <p>Check-out: {stay.check_out_time}</p>
                  <p className="mt-2">{stay.cancellation_policy}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Check-in
                  </label>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    className="rounded-xl border"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Check-out
                  </label>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => date < (checkIn || new Date())}
                    className="rounded-xl border"
                  />
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-accent" size="lg">
                Reserve
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                You won't be charged yet
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StayDetail;
