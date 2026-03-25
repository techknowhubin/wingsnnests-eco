import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, Share2, Gauge, Fuel, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import bikeImage from "@/assets/bike-featured.jpg";
import VehicleBookingPanel from "@/components/vehicle-detail/VehicleBookingPanel";

const BikeDetail = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const specs = [
    { icon: Gauge, label: "Engine", value: "411cc" },
    { icon: Fuel, label: "Fuel Type", value: "Petrol" },
    { icon: Shield, label: "Insurance", value: "Included" },
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
                Royal Enfield Himalayan
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary-text text-primary-text" />
                  4.8 (89 reviews)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Leh, Ladakh
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
              <h2 className="text-2xl font-bold text-foreground mb-4">About this bike</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Royal Enfield Himalayan is purpose-built for adventure touring in high-altitude
                terrain. With its robust build, comfortable riding position, and reliable engine,
                it's the perfect companion for your Ladakh expedition. This well-maintained bike
                comes with all necessary safety gear and roadside assistance.
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
                    <spec.icon className="h-6 w-6 text-primary-text mb-2" />
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
              <h2 className="text-2xl font-bold text-foreground mb-4">What's Included</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Helmet (ISI certified)</li>
                <li>✓ Basic tool kit</li>
                <li>✓ First aid kit</li>
                <li>✓ 24/7 Roadside assistance</li>
                <li>✓ Comprehensive insurance</li>
                <li>✓ Free pickup/drop from hotel</li>
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <VehicleBookingPanel
                pricePerDay={1500}
                title="Royal Enfield Himalayan"
                requirements="Valid driving license, ID proof, security deposit"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BikeDetail;
