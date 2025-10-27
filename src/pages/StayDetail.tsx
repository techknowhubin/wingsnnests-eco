import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { motion } from "framer-motion";
import { Star, MapPin, Wifi, Coffee, Tv, Wind, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import homestayImage from "@/assets/homestay-featured.jpg";

const StayDetail = () => {
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Coffee, label: "Kitchen" },
    { icon: Tv, label: "TV" },
    { icon: Wind, label: "AC" },
  ];

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
                Cozy Mountain Homestay
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  4.9 (127 reviews)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Manali, Himachal Pradesh
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
              src={homestayImage}
              alt="Main view"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={homestayImage}
              alt="View 2"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={homestayImage}
              alt="View 3"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={homestayImage}
              alt="View 4"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={homestayImage}
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
                Experience authentic Himachali hospitality in this charming homestay nestled in
                the mountains of Manali. Wake up to breathtaking views of snow-capped peaks,
                enjoy home-cooked local meals, and immerse yourself in the serene mountain
                lifestyle. Perfect for couples and families seeking a peaceful retreat away from
                the city bustle.
              </p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <amenity.icon className="h-5 w-5" />
                    <span>{amenity.label}</span>
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
                  <span className="text-3xl font-bold text-foreground">₹3,500</span>
                  <span className="text-muted-foreground">/ night</span>
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
