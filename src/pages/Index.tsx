import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  const [staysPage, setStaysPage] = useState(0);
  const [bikesPage, setBikesPage] = useState(0);
  const [carsPage, setCarsPage] = useState(0);
  const [experiencesPage, setExperiencesPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 12;

  const fetchStays = async (page: number) => {
    const { data } = await supabase
      .from("stays")
      .select("*")
      .eq("availability_status", true)
      .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);
    return data || [];
  };

  const fetchBikes = async (page: number) => {
    const { data } = await supabase
      .from("bikes")
      .select("*")
      .eq("availability_status", true)
      .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);
    return data || [];
  };

  const fetchCars = async (page: number) => {
    const { data } = await supabase
      .from("cars")
      .select("*")
      .eq("availability_status", true)
      .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);
    return data || [];
  };

  const fetchExperiences = async (page: number) => {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .eq("availability_status", true)
      .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);
    return data || [];
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const [staysData, bikesData, carsData, experiencesData] = await Promise.all([
        fetchStays(0),
        fetchBikes(0),
        fetchCars(0),
        fetchExperiences(0),
      ]);
      setStays(staysData);
      setBikes(bikesData);
      setCars(carsData);
      setExperiences(experiencesData);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          const newStaysPage = staysPage + 1;
          const newBikesPage = bikesPage + 1;
          const newCarsPage = carsPage + 1;
          const newExperiencesPage = experiencesPage + 1;

          const [staysData, bikesData, carsData, experiencesData] = await Promise.all([
            fetchStays(newStaysPage),
            fetchBikes(newBikesPage),
            fetchCars(newCarsPage),
            fetchExperiences(newExperiencesPage),
          ]);

          if (staysData.length > 0) {
            setStays((prev) => [...prev, ...staysData]);
            setStaysPage(newStaysPage);
          }
          if (bikesData.length > 0) {
            setBikes((prev) => [...prev, ...bikesData]);
            setBikesPage(newBikesPage);
          }
          if (carsData.length > 0) {
            setCars((prev) => [...prev, ...carsData]);
            setCarsPage(newCarsPage);
          }
          if (experiencesData.length > 0) {
            setExperiences((prev) => [...prev, ...experiencesData]);
            setExperiencesPage(newExperiencesPage);
          }
          setLoading(false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, staysPage, bikesPage, carsPage, experiencesPage]);
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

      {/* Load More Trigger */}
      <div ref={observerRef} className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

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
