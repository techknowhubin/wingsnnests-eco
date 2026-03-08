import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  image: string;
  title: string;
  subtitle: string;
  link: string;
  bgColor: string;
  delay?: number;
}

const CategoryCard = ({ image, title, subtitle, link, bgColor, delay = 0 }: CategoryCardProps) => {
  return (
    <Link to={link} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.97 }}
        className={`${bgColor} rounded-2xl px-5 py-4 flex items-center justify-between gap-3 cursor-pointer w-[220px] h-[88px] shadow-md hover:shadow-lg transition-shadow`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-foreground text-base leading-tight">{title}</span>
          <span className="text-xs text-foreground/70">{subtitle}</span>
        </div>
        <div className="w-16 h-16 flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
