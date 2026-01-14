import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Home, Car, Bike, Compass, MapPin, Star, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import homestaysImage from "@/assets/categories/homestays.jpg";
import bikesImage from "@/assets/categories/bikes.jpg";
import carsImage from "@/assets/categories/cars.jpg";
import experiencesImage from "@/assets/categories/experiences.jpg";

interface MenuCategory {
  title: string;
  icon: any;
  description: string;
  link: string;
  image: string;
  featured?: boolean;
}

const categories: MenuCategory[] = [
  {
    title: "Homestays",
    icon: Home,
    description: "Authentic local experiences",
    link: "/stays",
    image: homestaysImage,
    featured: true,
  },
  {
    title: "Experiences",
    icon: Compass,
    description: "Unique adventures & activities",
    link: "/experiences",
    image: experiencesImage,
    featured: true,
  },
  {
    title: "Bikes",
    icon: Bike,
    description: "Two-wheel freedom",
    link: "/bikes",
    image: bikesImage,
  },
  {
    title: "Cars",
    icon: Car,
    description: "Comfortable road trips",
    link: "/cars",
    image: carsImage,
  },
];

const quickLinks = [
  { label: "Popular Destinations", icon: MapPin, link: "/destinations" },
  { label: "Top Rated", icon: Star, link: "/top-rated" },
  { label: "Trending Now", icon: TrendingUp, link: "/trending" },
];

const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button
        variant="ghost"
        className="gap-2 text-foreground hover:text-primary"
      >
        Explore
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[80vw] bg-background/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border z-50"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Main Categories */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  Categories
                </h3>
                <div className="grid gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category.title}
                      to={category.link}
                      className="group"
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {category.featured && (
                            <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                              Hot
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <category.icon className="h-4 w-4 text-primary" />
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {category.title}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links & Featured */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.link}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors group"
                      >
                        <link.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border">
                  <h4 className="font-semibold text-foreground mb-2">
                    New to Xplorwing?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Discover unique stays, adventures, and rentals across India
                  </p>
                  <Link to="/signup">
                    <Button size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;
