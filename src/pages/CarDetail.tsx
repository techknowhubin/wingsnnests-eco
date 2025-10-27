import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, Share2, Users, Fuel, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import bikeImage from "@/assets/bike-featured.jpg";

const CarDetail = () => {
  const { id } = useParams();
  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropoffDate, setDropoffDate] = useState<Date>();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const specs = [
    { icon: Users, label: "Capacity", value: "5 Seats" },
    { icon: Fuel, label: "Fuel Type", value: "Diesel" },
    { icon: Shield, label: "Insurance", value: "Comprehensive" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Marquee />
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Mahindra Thar
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  4.9 (156 reviews)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Ladakh Region
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 h-[400px]"
        >
          <img
            src={bikeImage}
            alt="Main view"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src={bikeImage}
              alt="View 2"
              className="w-full h-full object-cover rounded-2xl"
            />
            <img
              src={bikeImage}
              alt="View 3"
              className="w-full h-full object-cover rounded-2xl"
            />
            <img
              src={bikeImage}
              alt="View 4"
              className="w-full h-full object-cover rounded-2xl"
            />
            <img
              src={bikeImage}
              alt="View 5"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">About this vehicle</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Mahindra Thar is an iconic off-road SUV perfect for conquering Ladakh's
                challenging terrain. With 4WD capability, high ground clearance, and comfortable
                seating for 5, it's ideal for mountain adventures. This well-maintained vehicle
                comes with full insurance coverage and 24/7 roadside assistance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {specs.map((spec, index) => (
                  <div key={index} className="glass-effect rounded-2xl p-4">
                    <spec.icon className="h-6 w-6 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">{spec.label}</p>
                    <p className="font-semibold text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ 4WD with manual transmission</li>
                <li>✓ Air conditioning</li>
                <li>✓ GPS navigation system</li>
                <li>✓ Bluetooth audio</li>
                <li>✓ Spare tire and tools</li>
                <li>✓ Comprehensive insurance</li>
                <li>✓ 24/7 Roadside assistance</li>
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect rounded-2xl p-6 sticky top-24"
            >
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-foreground">₹4,500</span>
                  <span className="text-muted-foreground">/ day</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Pickup Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-xl border"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Drop-off Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={dropoffDate}
                    onSelect={setDropoffDate}
                    disabled={(date) => date < (pickupDate || new Date())}
                    className="rounded-xl border"
                  />
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-accent" size="lg">
                Book Now
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                <strong>Requirements:</strong> Valid driving license, ID proof, refundable deposit
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetail;
