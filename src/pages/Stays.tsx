import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import homestayImage from "@/assets/homestay-featured.jpg";

const Stays = () => {
  const listings = [
    {
      image: homestayImage,
      title: "Cozy Mountain Homestay",
      location: "Manali, Himachal Pradesh",
      price: "₹3,500",
      rating: 4.9,
    },
    {
      image: homestayImage,
      title: "Beach View Villa",
      location: "Goa",
      price: "₹5,000",
      rating: 4.7,
    },
    {
      image: homestayImage,
      title: "Heritage Haveli",
      location: "Jaipur, Rajasthan",
      price: "₹4,200",
      rating: 4.8,
    },
    {
      image: homestayImage,
      title: "Tea Estate Cottage",
      location: "Munnar, Kerala",
      price: "₹3,800",
      rating: 4.9,
    },
    {
      image: homestayImage,
      title: "Lakeside Retreat",
      location: "Udaipur, Rajasthan",
      price: "₹6,500",
      rating: 5.0,
    },
    {
      image: homestayImage,
      title: "Valley View Home",
      location: "Kasol, Himachal Pradesh",
      price: "₹2,800",
      rating: 4.6,
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

export default Stays;
