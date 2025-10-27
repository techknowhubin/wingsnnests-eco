import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SearchBar = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-effect rounded-full p-2 shadow-lg max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0">
        {/* Location */}
        <div className="flex-1 flex items-center gap-3 px-6 py-3 border-r border-border">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs font-semibold text-foreground">Where</p>
            <input
              type="text"
              placeholder="Search destinations"
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="flex-1 flex items-center gap-3 px-6 py-3 border-r border-border">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs font-semibold text-foreground">Check in</p>
            <input
              type="text"
              placeholder="Add dates"
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex-1 flex items-center gap-3 px-6 py-3 border-r border-border">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs font-semibold text-foreground">Check out</p>
            <input
              type="text"
              placeholder="Add dates"
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 flex items-center gap-3 px-6 py-3">
          <Users className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs font-semibold text-foreground">Who</p>
            <input
              type="text"
              placeholder="Add guests"
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
        </div>

        {/* Search Button */}
        <Button
          size="lg"
          className="rounded-full bg-primary hover:bg-accent h-14 w-14 shrink-0"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
