import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import DestinationCard from "@/components/DestinationCard";
import ListingCard from "@/components/ListingCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-travel.jpg";
import homestaysIcon from "@/assets/categories/homestays-icon.png";
import bikesIcon from "@/assets/categories/bikes-icon.png";
import carsIcon from "@/assets/categories/cars-icon.png";
import cabsIcon from "@/assets/categories/cabs-icon.png";
import experiencesIcon from "@/assets/categories/experiences-icon.png";
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
import goaDestImage from "@/assets/destinations/goa.jpg";
import manaliDestImage from "@/assets/destinations/manali.jpg";
import jaipurDestImage from "@/assets/destinations/jaipur.jpg";
import udaipurDestImage from "@/assets/destinations/udaipur.jpg";
import munnarDestImage from "@/assets/destinations/munnar.jpg";
import rishikeshDestImage from "@/assets/destinations/rishikesh.jpg";

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

const categories = [
  {
    image: homestaysIcon,
    title: "Stays",
    subtitle: "Unique homestays",
    link: "/stays",
    bgColor: "bg-pink-100 dark:bg-pink-950/40",
    iconOffsetX: 15,
    iconOffsetY: 5,
  },
  {
    image: bikesIcon,
    title: "Bike Rentals",
    subtitle: "Explore on two wheels",
    link: "/bikes",
    bgColor: "bg-green-100 dark:bg-green-950/40",
    iconScale: 1.25,
    iconOffsetX: 10,
    iconOffsetY: -5,
  },
  {
    image: carsIcon,
    title: "Car Rentals",
    subtitle: "Drive your adventure",
    link: "/cars",
    bgColor: "bg-cyan-100 dark:bg-cyan-950/40",
    iconScale: 1.5,
    iconOffsetX: 10,
  },
  {
    image: cabsIcon,
    title: "Outstation Cabs",
    subtitle: "Intercity travel",
    link: "/cars",
    bgColor: "bg-purple-100 dark:bg-purple-950/40",
  },
  {
    image: experiencesIcon,
    title: "Experiences",
    subtitle: "Unforgettable moments",
    link: "/experiences",
    bgColor: "bg-amber-100 dark:bg-amber-950/40",
    iconOffsetX: 10,
  },
];

const destinations = [
  { image: goaDestImage, title: "Goa", subtitle: "Over 200 stays", rating: 4.8, priceRange: "Starting ₹1,500/night", link: "/stays" },
  { image: manaliDestImage, title: "Manali", subtitle: "Over 150 stays", rating: 4.7, priceRange: "Starting ₹1,200/night", link: "/stays" },
  { image: jaipurDestImage, title: "Jaipur", subtitle: "Over 180 stays", rating: 4.9, priceRange: "Starting ₹1,000/night", link: "/stays" },
  { image: udaipurDestImage, title: "Udaipur", subtitle: "Over 120 stays", rating: 4.8, priceRange: "Starting ₹1,800/night", link: "/stays" },
  { image: munnarDestImage, title: "Munnar", subtitle: "Over 100 stays", rating: 4.6, priceRange: "Starting ₹900/night", link: "/stays" },
  { image: rishikeshDestImage, title: "Rishikesh", subtitle: "Over 90 stays", rating: 4.7, priceRange: "Starting ₹800/night", link: "/stays" },
];

const Index = () => {
  const [stays, setStays] = useState<any[]>([]);
  const [bikes, setBikes] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryPage, setCategoryPage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Determine cards per page based on screen width
  const getCardsPerPage = useCallback(() => {
    if (typeof window === "undefined") return categories.length;
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return categories.length; // desktop: show all
  }, []);

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage);
  const totalPages = Math.ceil(categories.length / cardsPerPage);
  const isMobileOrTablet = cardsPerPage < categories.length;

  useEffect(() => {
    const handleResize = () => {
      const newPerPage = getCardsPerPage();
      setCardsPerPage(newPerPage);
      setCategoryPage(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getCardsPerPage]);

  // Auto-slide for mobile/tablet
  useEffect(() => {
    if (!isMobileOrTablet) return;
    const interval = setInterval(() => {
      setCategoryPage(p => (p + 1) % totalPages);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobileOrTablet, totalPages]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && categoryPage < totalPages - 1) setCategoryPage(p => p + 1);
      if (diff < 0 && categoryPage > 0) setCategoryPage(p => p - 1);
    }
  };

  const visibleCategories = isMobileOrTablet
    ? categories.slice(categoryPage * cardsPerPage, categoryPage * cardsPerPage + cardsPerPage)
    : categories;

  const fetchStays = async () => {
    const { data } = await supabase.from("stays").select("*").eq("availability_status", true).order("featured", { ascending: false }).order("created_at", { ascending: false });
    return data || [];
  };
  const fetchBikes = async () => {
    const { data } = await supabase.from("bikes").select("*").eq("availability_status", true).order("featured", { ascending: false }).order("created_at", { ascending: false });
    return data || [];
  };
  const fetchCars = async () => {
    const { data } = await supabase.from("cars").select("*").eq("availability_status", true).order("featured", { ascending: false }).order("created_at", { ascending: false });
    return data || [];
  };
  const fetchExperiences = async () => {
    const { data } = await supabase.from("experiences").select("*").eq("availability_status", true).order("featured", { ascending: false }).order("created_at", { ascending: false });
    return data || [];
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const [staysData, bikesData, carsData, experiencesData] = await Promise.all([
        fetchStays(), fetchBikes(), fetchCars(), fetchExperiences(),
      ]);
      setStays(staysData);
      setBikes(bikesData);
      setCars(carsData);
      setExperiences(experiencesData);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  return (
    <div className="min-h-screen">
      <Marquee />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </div>
        <div className="relative z-10 w-full px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_4px_24px_rgba(255,255,255,0.3)] [text-shadow:_0_2px_20px_rgba(0,0,0,0.8)]">
              Your Next Adventure<br />Starts Here
            </h2>
            <p className="text-xl text-white/95 drop-shadow-md [text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]">
              Discover unique stays, experiences, and rentals across India
            </p>
          </motion.div>
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 pt-20 pb-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div
            className="flex justify-center gap-4 overflow-hidden py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={categoryPage}
                initial={isMobileOrTablet ? { opacity: 0, x: 60 } : { opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={isMobileOrTablet ? { opacity: 0, x: -60 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-wrap justify-center gap-4"
              >
                {visibleCategories.map((cat, index) => (
                  <CategoryCard
                    key={cat.title}
                    image={cat.image}
                    title={cat.title}
                    subtitle={cat.subtitle}
                    link={cat.link}
                    bgColor={cat.bgColor}
                    delay={index * 0.08}
                    iconScale={cat.iconScale}
                    iconOffsetX={cat.iconOffsetX}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Dot navigation - hidden on desktop, transparent bg */}
          {isMobileOrTablet && (
            <div className="flex justify-center gap-2 mt-4 bg-transparent">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCategoryPage(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full border-0 outline-none bg-transparent p-0 transition-all duration-300 ${
                    i === categoryPage ? "!bg-primary/80 w-6" : "!bg-primary/20 w-2"
                  }`}
                  style={{ background: 'transparent' }}
                >
                  <span className={`block h-2 rounded-full transition-all duration-300 ${
                    i === categoryPage ? "bg-primary/80 w-6" : "bg-primary/20 w-2"
                  }`} />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Explore India - Destination Cards */}
      <section className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Explore India</h2>
            <Link to="/destinations" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              See more <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {destinations.map((dest, index) => (
              <DestinationCard
                key={dest.title}
                image={dest.image}
                title={dest.title}
                subtitle={dest.subtitle}
                rating={dest.rating}
                priceRange={dest.priceRange}
                link={dest.link}
                delay={index * 0.08}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Homestays Section */}
      {stays.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Homestays</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {stays.map((stay, index) => (
                <ListingCard key={stay.id} id={stay.id} image={stayImageMap[stay.images?.[0]] || manaliImage} title={stay.title} location={stay.location} price={`₹${stay.price_per_night}`} rating={Number(stay.rating) || 0} type="stay" delay={index * 0.05} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Bikes Section */}
      {bikes.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Bike Rentals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {bikes.map((bike, index) => (
                <ListingCard key={bike.id} id={bike.id} image={bikeImageMap[bike.images?.[0]] || bikeImage} title={bike.title} location={bike.location} price={`₹${bike.price_per_day}`} rating={Number(bike.rating) || 0} type="bike" delay={index * 0.05} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Cars Section */}
      {cars.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Car Rentals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {cars.map((car, index) => (
                <ListingCard key={car.id} id={car.id} image={carImageMap[car.images?.[0]] || hondaCityImage} title={car.title} location={car.location} price={`₹${car.price_per_day}`} rating={Number(car.rating) || 0} type="car" delay={index * 0.05} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Experiences Section */}
      {experiences.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Experiences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {experiences.map((experience, index) => (
                <ListingCard key={experience.id} id={experience.id} image={experienceImage} title={experience.title} location={experience.location} price={`₹${experience.price_per_person}`} rating={Number(experience.rating) || 0} type="experience" delay={index * 0.05} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="card-gradient rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands of travelers discovering unique experiences around India</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent transition-colors">
            Get Started
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
