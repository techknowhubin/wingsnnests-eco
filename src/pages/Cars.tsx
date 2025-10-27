import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import bikeImage from "@/assets/bike-featured.jpg";

const Cars = () => {
  const listings = [
    {
      image: bikeImage,
      title: "Mahindra Thar",
      location: "Ladakh Region",
      price: "₹4,500",
      rating: 4.9,
    },
    {
      image: bikeImage,
      title: "Toyota Innova Crysta",
      location: "Mumbai, Maharashtra",
      price: "₹3,500",
      rating: 4.8,
    },
    {
      image: bikeImage,
      title: "Maruti Swift Dzire",
      location: "Delhi NCR",
      price: "₹2,000",
      rating: 4.7,
    },
    {
      image: bikeImage,
      title: "Hyundai Creta",
      location: "Bangalore, Karnataka",
      price: "₹3,200",
      rating: 4.8,
    },
    {
      image: bikeImage,
      title: "Honda City",
      location: "Pune, Maharashtra",
      price: "₹2,500",
      rating: 4.7,
    },
    {
      image: bikeImage,
      title: "Force Gurkha",
      location: "Manali, Himachal Pradesh",
      price: "₹5,000",
      rating: 5.0,
    },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing, index) => (
            <ListingCard key={index} {...listing} delay={index * 0.1} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cars;
