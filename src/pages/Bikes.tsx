import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import bikeImage from "@/assets/bike-featured.jpg";

const Bikes = () => {
  const listings = [
    {
      image: bikeImage,
      title: "Royal Enfield Himalayan",
      location: "Leh, Ladakh",
      price: "₹1,500",
      rating: 4.8,
    },
    {
      image: bikeImage,
      title: "KTM Duke 390",
      location: "Mumbai, Maharashtra",
      price: "₹1,800",
      rating: 4.9,
    },
    {
      image: bikeImage,
      title: "Royal Enfield Classic 350",
      location: "Goa",
      price: "₹1,200",
      rating: 4.7,
    },
    {
      image: bikeImage,
      title: "Bajaj Dominar 400",
      location: "Bangalore, Karnataka",
      price: "₹1,600",
      rating: 4.8,
    },
    {
      image: bikeImage,
      title: "Honda Activa 125",
      location: "Jaipur, Rajasthan",
      price: "₹600",
      rating: 4.6,
    },
    {
      image: bikeImage,
      title: "Triumph Tiger 800",
      location: "Manali, Himachal Pradesh",
      price: "₹2,500",
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
              Rent a Bike for Your Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore India on two wheels with our diverse bike fleet
            </p>
          </motion.div>
          <SearchBar />
        </div>
      </section>

      {/* Listings Section */}
      <section className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing, index) => (
            <ListingCard key={index} {...listing} type="bike" id={`${index + 1}`} delay={index * 0.1} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bikes;
