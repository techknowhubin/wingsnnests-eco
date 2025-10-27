import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import experienceImage from "@/assets/experience-featured.jpg";

const Experiences = () => {
  const listings = [
    {
      image: experienceImage,
      title: "Kerala Cooking Class",
      location: "Kochi, Kerala",
      price: "₹2,000",
      rating: 5.0,
    },
    {
      image: experienceImage,
      title: "Rajasthani Folk Dance",
      location: "Jaipur, Rajasthan",
      price: "₹1,500",
      rating: 4.8,
    },
    {
      image: experienceImage,
      title: "Spice Plantation Tour",
      location: "Munnar, Kerala",
      price: "₹1,200",
      rating: 4.9,
    },
    {
      image: experienceImage,
      title: "Yoga & Meditation",
      location: "Rishikesh, Uttarakhand",
      price: "₹2,500",
      rating: 5.0,
    },
    {
      image: experienceImage,
      title: "Heritage Walk",
      location: "Old Delhi",
      price: "₹800",
      rating: 4.7,
    },
    {
      image: experienceImage,
      title: "Tea Tasting Experience",
      location: "Darjeeling, West Bengal",
      price: "₹1,800",
      rating: 4.9,
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
              Unique Indian Experiences
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in local culture and traditions
            </p>
          </motion.div>
          <SearchBar />
        </div>
      </section>

      {/* Listings Section */}
      <section className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing, index) => (
            <ListingCard key={index} {...listing} type="experience" id={`${index + 1}`} delay={index * 0.1} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiences;
