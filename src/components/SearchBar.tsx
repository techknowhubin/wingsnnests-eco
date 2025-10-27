import { Search, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-effect rounded-2xl md:rounded-full p-2 shadow-lg max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
        {/* Location */}
        <div className="flex-1 flex items-center gap-3 px-4 md:px-6 py-3 md:border-r border-border rounded-xl md:rounded-none">
          <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">Where</p>
            <input
              type="text"
              placeholder="Search destinations"
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="flex-1 flex items-center gap-3 px-4 md:px-6 py-3 md:border-r border-border rounded-xl md:rounded-none">
          <CalendarIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex-1 cursor-pointer">
                <p className="text-xs font-semibold text-foreground">Check in</p>
                <p className={cn(
                  "text-sm",
                  checkIn ? "text-foreground" : "text-muted-foreground"
                )}>
                  {checkIn ? format(checkIn, "PPP") : "Add dates"}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="flex-1 flex items-center gap-3 px-4 md:px-6 py-3 md:border-r border-border rounded-xl md:rounded-none">
          <CalendarIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex-1 cursor-pointer">
                <p className="text-xs font-semibold text-foreground">Check out</p>
                <p className={cn(
                  "text-sm",
                  checkOut ? "text-foreground" : "text-muted-foreground"
                )}>
                  {checkOut ? format(checkOut, "PPP") : "Add dates"}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex-1 flex items-center gap-3 px-4 md:px-6 py-3 rounded-xl md:rounded-none">
          <Users className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <div className="flex-1">
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
          className="rounded-full bg-primary hover:bg-accent h-14 w-14 md:w-14 shrink-0 self-center"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
