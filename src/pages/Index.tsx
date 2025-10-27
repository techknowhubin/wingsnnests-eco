import { Home, Bike, Car, Compass } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-travel.jpg";
import homestayImage from "@/assets/homestay-featured.jpg";
import bikeImage from "@/assets/bike-featured.jpg";
import experienceImage from "@/assets/experience-featured.jpg";

const Index = () => {
  const categories = [
    {
      icon: Home,
      title: "Homestays",
      description: "Cozy accommodations with local charm",
    },
    {
      icon: Bike,
      title: "Bike Rentals",
      description: "Explore on two wheels",
    },
    {
      icon: Car,
      title: "Car Rentals",
      description: "Freedom to roam",
    },
    {
      icon: Compass,
      title: "Experiences",
      description: "Unique local adventures",
    },
  ];

  const featuredListings = [
    {
      image: homestayImage,
      title: "Mountain View Cabin",
      location: "Swiss Alps",
      price: "$120",
      rating: 4.9,
    },
    {
      image: bikeImage,
      title: "Adventure Touring Bike",
      location: "Available in Himalaya",
      price: "$45",
      rating: 4.8,
    },
    {
      image: experienceImage,
      title: "Traditional Cooking Class",
      location: "Bali, Indonesia",
      price: "$65",
      rating: 5.0,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </div>

        <div className="relative z-10 w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4 drop-shadow-lg">
              Your Next Adventure
              <br />
              Starts Here
            </h2>
            <p className="text-xl text-primary-foreground/90 drop-shadow-md">
              Discover unique stays, experiences, and rentals worldwide
            </p>
          </motion.div>

          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-8">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.title}
                icon={category.icon}
                title={category.title}
                description={category.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Listings */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-8">Featured for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing, index) => (
              <ListingCard
                key={listing.title}
                {...listing}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="card-gradient rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering unique experiences around the world
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
