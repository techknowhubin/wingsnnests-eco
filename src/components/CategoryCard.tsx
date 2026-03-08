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
        className={`${bgColor} rounded-2xl px-6 py-5 flex items-center justify-between gap-4 cursor-pointer w-[286px] h-[114px] shadow-md hover:shadow-lg transition-shadow relative overflow-x-hidden overflow-y-visible`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-foreground text-base leading-tight">{title}</span>
          <span className="text-xs text-foreground/70">{subtitle}</span>
        </div>
        <div className="w-[140px] h-[140px] flex-shrink-0 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2">
          <div className="w-[112px] h-[112px] flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="w-[112px] h-[112px] object-cover"
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
