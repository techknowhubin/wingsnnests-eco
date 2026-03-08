import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Home,
  Car,
  Bike,
  Compass,
  MapPin,
  ArrowRight,
  Sparkles,
  Globe,
} from "lucide-react";
import { Button } from "./ui/button";

import homestaysImage from "@/assets/categories/homestays.jpg";
import bikesImage from "@/assets/categories/bikes.jpg";
import carsImage from "@/assets/categories/cars.jpg";
import experiencesImage from "@/assets/categories/experiences.jpg";

import manaliImg from "@/assets/destinations/manali.jpg";
import goaImg from "@/assets/destinations/goa.jpg";
import jaipurImg from "@/assets/destinations/jaipur.jpg";
import munnarImg from "@/assets/destinations/munnar.jpg";
import udaipurImg from "@/assets/destinations/udaipur.jpg";
import rishikeshImg from "@/assets/destinations/rishikesh.jpg";

interface MenuCategory {
  title: string;
  icon: any;
  tagline: string;
  description: string;
  link: string;
  image: string;
  stats: string;
  color: string;
}

const categories: MenuCategory[] = [
  {
    title: "Homestays",
    icon: Home,
    tagline: "Live like a local",
    description: "Handpicked homes with authentic charm — from heritage havelis to cozy mountain cottages.",
    link: "/stays",
    image: homestaysImage,
    stats: "500+ properties",
    color: "hsl(158 80% 25%)",
  },
  {
    title: "Experiences",
    icon: Compass,
    tagline: "Stories, not just sights",
    description: "Sunrise treks, spice trails, stargazing nights — unforgettable moments curated by locals.",
    link: "/experiences",
    image: experiencesImage,
    stats: "200+ activities",
    color: "hsl(280 60% 45%)",
  },
  {
    title: "Bikes",
    icon: Bike,
    tagline: "Ride the open road",
    description: "Royal Enfields, KTMs, and scooters — freedom on two wheels across India's best routes.",
    link: "/bikes",
    image: bikesImage,
    stats: "150+ bikes",
    color: "hsl(25 90% 50%)",
  },
  {
    title: "Cars",
    icon: Car,
    tagline: "Journey in comfort",
    description: "Self-drive SUVs, sedans, and luxury cars for road trips that match your pace.",
    link: "/cars",
    image: carsImage,
    stats: "300+ vehicles",
    color: "hsl(210 70% 45%)",
  },
];

const trendingDestinations = [
  { name: "Manali", image: manaliImg, tag: "Mountains" },
  { name: "Goa", image: goaImg, tag: "Beaches" },
  { name: "Jaipur", image: jaipurImg, tag: "Heritage" },
  { name: "Munnar", image: munnarImg, tag: "Hills" },
  { name: "Udaipur", image: udaipurImg, tag: "Lakes" },
  { name: "Rishikesh", image: rishikeshImg, tag: "Adventure" },
];

const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const active = categories[activeCategory];

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        variant="ghost"
        className="gap-1.5 text-foreground hover:text-primary font-medium"
      >
        Explore
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible bridge to prevent hover gap */}
            <div className="absolute top-full left-0 right-0 h-3" />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-[72px] left-0 right-0 mx-auto w-[94vw] max-w-5xl z-50"
            >
              <div className="bg-card/98 backdrop-blur-xl rounded-2xl border border-border shadow-[var(--shadow-strong)] overflow-hidden">
                {/* Top section: Categories + Preview */}
                <div className="grid grid-cols-[280px_1fr] min-h-[340px]">
                  {/* Left: Category nav */}
                  <div className="border-r border-border p-3 flex flex-col">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground px-3 pt-2 pb-3">
                      Categories
                    </p>
                    <div className="flex-1 space-y-0.5">
                      {categories.map((cat, i) => (
                        <Link
                          key={cat.title}
                          to={cat.link}
                          onMouseEnter={() => setActiveCategory(i)}
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.div
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                              activeCategory === i
                                ? "bg-primary/10"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                activeCategory === i
                                  ? "bg-primary text-primary-foreground shadow-md"
                                  : "bg-muted text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary"
                              }`}
                            >
                              <cat.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-semibold transition-colors ${
                                  activeCategory === i
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {cat.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground truncate">
                                {cat.tagline}
                              </p>
                            </div>
                            <ArrowRight
                              className={`h-3.5 w-3.5 flex-shrink-0 transition-all duration-200 ${
                                activeCategory === i
                                  ? "opacity-100 translate-x-0 text-primary"
                                  : "opacity-0 -translate-x-2"
                              }`}
                            />
                          </motion.div>
                        </Link>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-3 px-1">
                      <Link to="/destinations" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/60 hover:bg-muted transition-colors group">
                          <Globe className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                            All Destinations
                          </span>
                          <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right: Active category preview */}
                  <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0"
                      >
                        {/* Background image */}
                        <div className="absolute inset-0">
                          <img
                            src={active.image}
                            alt={active.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-card/30" />
                        </div>

                        {/* Content overlay */}
                        <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                          >
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/20 mb-3">
                              <Sparkles className="h-3 w-3 text-primary" />
                              <span className="text-[11px] font-semibold text-primary">
                                {active.stats}
                              </span>
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-2">
                              {active.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-5">
                              {active.description}
                            </p>

                            <Link to={active.link} onClick={() => setIsOpen(false)}>
                              <Button
                                size="sm"
                                className="rounded-full gap-2 px-5 shadow-md"
                              >
                                Browse {active.title}
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom: Trending destinations strip */}
                <div className="border-t border-border px-6 py-4 bg-muted/30">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Trending
                      </span>
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                      {trendingDestinations.map((dest) => (
                        <Link
                          key={dest.name}
                          to={`/destinations/${dest.name.toLowerCase()}`}
                          onClick={() => setIsOpen(false)}
                          className="group flex-shrink-0"
                        >
                          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-200">
                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-border group-hover:ring-primary/40 transition-all">
                              <img
                                src={dest.image}
                                alt={dest.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                              {dest.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground hidden sm:inline">
                              {dest.tag}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;
