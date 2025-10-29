import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  delay?: number;
}

const CategoryCard = ({ image, title, description, link, delay = 0 }: CategoryCardProps) => {
  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.02 }}
        className="card-gradient rounded-2xl overflow-hidden hover-lift cursor-pointer group"
      >
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
