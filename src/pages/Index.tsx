import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-travel.jpg";
import homestaysImage from "@/assets/categories/homestays.jpg";
import bikesImage from "@/assets/categories/bikes.jpg";
import carsImage from "@/assets/categories/cars.jpg";
import experiencesImage from "@/assets/categories/experiences.jpg";
import manaliImage from "@/assets/stays/manali-mountain-homestay.jpg";
import goaImage from "@/assets/stays/goa-beach-villa.jpg";
import jaipurImage from "@/assets/stays/jaipur-heritage-haveli.jpg";
import munnarImage from "@/assets/stays/munnar-tea-cottage.jpg";
import udaipurImage from "@/assets/stays/udaipur-lakeside-palace.jpg";
import kasolImage from "@/assets/stays/kasol-valley-home.jpg";
import royalEnfieldImage from "@/assets/vehicles/royal-enfield-classic.jpg";
import hondaCityImage from "@/assets/vehicles/honda-city.jpg";
import bikeImage from "@/assets/bike-featured.jpg";
import experienceImage from "@/assets/experience-featured.jpg";

const stayImageMap: Record<string, string> = {
  "manali-mountain-homestay.jpg": manaliImage,
  "goa-beach-villa.jpg": goaImage,
  "jaipur-heritage-haveli.jpg": jaipurImage,
  "munnar-tea-cottage.jpg": munnarImage,
  "udaipur-lakeside-palace.jpg": udaipurImage,
  "kasol-valley-home.jpg": kasolImage,
};

const bikeImageMap: Record<string, string> = {
  "royal-enfield-classic.jpg": royalEnfieldImage,
};

const carImageMap: Record<string, string> = {
  "honda-city.jpg": hondaCityImage,
};

const Index = () => {
  const [stays, setStays] = useState<any[]>([]);
  const [bikes, setBikes] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStays = async () => {
    const { data } = await supabase
      .from("stays")
      .select("*")
      .eq("availability_status", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    return data || [];
  };

  const fetchBikes = async () => {
    const { data } = await supabase
      .from("bikes")
      .select("*")
      .eq("availability_status", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    return data || [];
  };

  const fetchCars = async () => {
    const { data } = await supabase
      .from("cars")
      .select("*")
      .eq("availability_status", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    return data || [];
  };

  const fetchExperiences = async () => {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .eq("availability_status", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    return data || [];
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const [staysData, bikesData, carsData, experiencesData] = await Promise.all([
        fetchStays(),
        fetchBikes(),
        fetchCars(),
        fetchExperiences(),
      ]);
      setStays(staysData);
      setBikes(bikesData);
      setCars(carsData);
      setExperiences(experiencesData);
      setLoading(false);
    };
    loadInitialData();
  }, []);
  const categories = [
    {
      image: homestaysImage,
      title: "Homestays",
      description: "Experience authentic local hospitality",
      link: "/stays",
    },
    {
      image: bikesImage,
      title: "Bike Rentals",
      description: "Explore on two wheels",
      link: "/bikes",
    },
    {
      image: carsImage,
      title: "Car Rentals",
      description: "Drive your adventure",
      link: "/cars",
    },
    {
      image: experiencesImage,
      title: "Experiences",
      description: "Unforgettable moments",
      link: "/experiences",
    },
  ];

  return (
    <div className="min-h-screen">
      <Marquee />
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
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_4px_24px_rgba(255,255,255,0.3)] [text-shadow:_0_2px_20px_rgba(0,0,0,0.8)]">
              Your Next Adventure
              <br />
              Starts Here
            </h2>
            <p className="text-xl text-white/95 drop-shadow-md [text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]">
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
                image={category.image}
                title={category.title}
                description={category.description}
                link={category.link}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Homestays Section */}
      {stays.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Homestays</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {stays.map((stay, index) => (
                <ListingCard
                  key={stay.id}
                  id={stay.id}
                  image={stayImageMap[stay.images?.[0]] || manaliImage}
                  title={stay.title}
                  location={stay.location}
                  price={`₹${stay.price_per_night}`}
                  rating={Number(stay.rating) || 0}
                  type="stay"
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Bikes Section */}
      {bikes.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Bike Rentals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {bikes.map((bike, index) => (
                <ListingCard
                  key={bike.id}
                  id={bike.id}
                  image={bikeImageMap[bike.images?.[0]] || bikeImage}
                  title={bike.title}
                  location={bike.location}
                  price={`₹${bike.price_per_day}`}
                  rating={Number(bike.rating) || 0}
                  type="bike"
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Cars Section */}
      {cars.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Car Rentals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {cars.map((car, index) => (
                <ListingCard
                  key={car.id}
                  id={car.id}
                  image={carImageMap[car.images?.[0]] || hondaCityImage}
                  title={car.title}
                  location={car.location}
                  price={`₹${car.price_per_day}`}
                  rating={Number(car.rating) || 0}
                  type="car"
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Experiences Section */}
      {experiences.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Experiences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {experiences.map((experience, index) => (
                <ListingCard
                  key={experience.id}
                  id={experience.id}
                  image={experienceImage}
                  title={experience.title}
                  location={experience.location}
                  price={`₹${experience.price_per_person}`}
                  rating={Number(experience.rating) || 0}
                  type="experience"
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}

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

      <Footer />
    </div>
  );
};

export default Index;
