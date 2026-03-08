import { motion } from "framer-motion";
import { Star, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface DestinationCardProps {
  image: string;
  title: string;
  subtitle: string;
  rating: number;
  priceRange: string;
  link: string;
  delay?: number;
}

const DestinationCard = ({ image, title, subtitle, rating, priceRange, link, delay = 0 }: DestinationCardProps) => {
  const [saved, setSaved] = useState(false);

  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -6 }}
        className="rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSaved(!saved);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors"
            aria-label="Save destination"
          >
            <Bookmark
              className={`h-4 w-4 ${saved ? "fill-primary text-primary" : "text-foreground"} transition-colors`}
            />
          </motion.button>
        </div>
        <div className="p-4 bg-card">
          <h3 className="font-bold text-foreground text-base">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{priceRange}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default DestinationCard;
