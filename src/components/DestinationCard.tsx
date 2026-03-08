import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -6 }}
        className="rounded-2xl overflow-hidden cursor-pointer group relative aspect-[3/4] shadow-lg hover:shadow-2xl transition-shadow"
      >
        {/* Full-bleed image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
          <h3 className="font-bold text-white text-base leading-tight">{title}</h3>
          <p className="text-[11px] text-white/70">{priceRange} • {subtitle}</p>

          {/* Explore Now pill button */}
          <div className="mt-2 inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit text-white text-xs font-medium group-hover:bg-white/30 transition-colors">
            <span>Explore Now</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default DestinationCard;
