import { Search, MapPin, Calendar as CalendarIcon, Users, Home, Bike, Car, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const searchCategories = [
  { id: "stays", label: "Stays", icon: Home },
  { id: "bikes", label: "Bikes", icon: Bike },
  { id: "cars", label: "Cars", icon: Car },
  { id: "experiences", label: "Experiences", icon: Sparkles },
];

const SearchBar = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [activeCategory, setActiveCategory] = useState("stays");

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-background/95 backdrop-blur-md rounded-2xl shadow-xl max-w-4xl mx-auto border border-border/50 overflow-hidden"
    >
      {/* Category Tabs */}
      <div className="flex items-center gap-1 px-4 pt-4 pb-2">
        {searchCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Desktop Search Fields */}
      <div className="hidden md:flex items-center gap-2 px-4 pb-4 pt-2">
        {/* Location */}
        <div className="flex-1 flex items-center gap-2.5 border border-border rounded-full px-4 py-2.5">
          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Select destination"
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
          />
        </div>

        {/* Check-in */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex-1 flex items-center gap-2.5 border border-border rounded-full px-4 py-2.5 cursor-pointer hover:border-primary/40 transition-colors">
              <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className={cn("text-sm", checkIn ? "text-foreground" : "text-muted-foreground")}>
                {checkIn ? format(checkIn, "dd MMM yyyy") : "Check in"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(date) => date < new Date()} initialFocus />
          </PopoverContent>
        </Popover>

        {/* Check-out */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex-1 flex items-center gap-2.5 border border-border rounded-full px-4 py-2.5 cursor-pointer hover:border-primary/40 transition-colors">
              <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className={cn("text-sm", checkOut ? "text-foreground" : "text-muted-foreground")}>
                {checkOut ? format(checkOut, "dd MMM yyyy") : "Check out"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(date) => date < (checkIn || new Date())} initialFocus />
          </PopoverContent>
        </Popover>

        {/* Travelers */}
        <div className="flex-1 flex items-center gap-2.5 border border-border rounded-full px-4 py-2.5">
          <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Travelers"
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
          />
        </div>

        {/* Search Button */}
        <Button
          size="lg"
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-10 gap-2 font-semibold"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      {/* Mobile Search Fields */}
      <div className="flex md:hidden flex-col gap-3 px-4 pb-4 pt-2">
        {/* Location */}
        <div className="flex items-center gap-2.5 border border-border rounded-xl px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Select destination"
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
          />
        </div>

        {/* Dates Row */}
        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex-1 flex items-center gap-2.5 border border-border rounded-xl px-4 py-3 cursor-pointer">
                <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className={cn("text-sm", checkIn ? "text-foreground" : "text-muted-foreground")}>
                  {checkIn ? format(checkIn, "dd MMM yyyy") : "Check in"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(date) => date < new Date()} initialFocus />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex-1 flex items-center gap-2.5 border border-border rounded-xl px-4 py-3 cursor-pointer">
                <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className={cn("text-sm", checkOut ? "text-foreground" : "text-muted-foreground")}>
                  {checkOut ? format(checkOut, "dd MMM yyyy") : "Check out"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(date) => date < (checkIn || new Date())} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Travelers */}
        <div className="flex items-center gap-2.5 border border-border rounded-xl px-4 py-3">
          <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="1 room • 1 adults • 0 children"
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
          />
        </div>

        {/* Search Button */}
        <Button
          size="lg"
          className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-12 gap-2 font-semibold text-base"
        >
          Search
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
