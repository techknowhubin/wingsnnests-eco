import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, Users, ChevronDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { format, differenceInDays, addDays } from "date-fns";
import { cn } from "@/lib/utils";

interface StayBookingPanelProps {
  pricePerNight: number;
  currencySymbol: string;
  maxGuests: number;
  title: string;
}

const StayBookingPanel = ({ pricePerNight, currencySymbol, maxGuests, title }: StayBookingPanelProps) => {
  const [guests, setGuests] = useState(1);
  const [pricingOption, setPricingOption] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [guestOpen, setGuestOpen] = useState(false);

  const tomorrow = useMemo(() => addDays(new Date(), 1), []);

  const getDurationDays = (option: "daily" | "weekly" | "monthly") => {
    if (option === "daily") return 1;
    if (option === "weekly") return 7;
    return 30;
  };

  const [checkIn, setCheckIn] = useState<Date>(tomorrow);
  const [checkOut, setCheckOut] = useState<Date>(addDays(tomorrow, getDurationDays("weekly")));

  // Update checkout when pricing option changes
  useEffect(() => {
    setCheckOut(addDays(checkIn, getDurationDays(pricingOption)));
  }, [pricingOption, checkIn]);

  const weeklyPrice = pricePerNight * 7 * 0.85;
  const monthlyPrice = pricePerNight * 30 * 0.7;

  const nights = Math.max(differenceInDays(checkOut, checkIn), 1);
  const subtotal = pricePerNight * nights;
  const discount = Math.round(subtotal * 0.1);
  const serviceFee = 0;
  const total = subtotal - discount + serviceFee;

  return (
    <Card className="border-border shadow-strong sticky top-24 p-6 rounded-2xl">
      {/* Price */}
      <div className="mb-4">
        <span className="text-3xl font-bold text-foreground">{currencySymbol}{pricePerNight}</span>
        <span className="text-sm text-muted-foreground font-medium">/Night</span>
      </div>

      {/* Stay summary */}
      <div className="bg-secondary/50 rounded-xl p-3 mb-5">
        <p className="text-sm text-foreground">
          <span className="font-bold">{nights} Nights</span>
          <span className="text-muted-foreground"> in {title}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"} - {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
        </p>
      </div>

      {/* Check-in / Check-out with Popover Calendar */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1.5">Check in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11 rounded-xl border-border",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarDays className="h-4 w-4 mr-2 text-accent" />
                {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1.5">Check out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11 rounded-xl border-border",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarDays className="h-4 w-4 mr-2 text-accent" />
                {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Guests Dropdown */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1.5">Guest</label>
        <Popover open={guestOpen} onOpenChange={setGuestOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal h-11 rounded-xl border-border"
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span>{guests} {guests === 1 ? "Guest" : "Guests"}</span>
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-2 pointer-events-auto" align="start">
            <div className="space-y-1">
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => { setGuests(num); setGuestOpen(false); }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    guests === num
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-secondary text-foreground"
                  )}
                >
                  {num} {num === 1 ? "Guest" : "Guests"}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Pricing Options */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <button
          onClick={() => setPricingOption("daily")}
          className={`p-3 border rounded-xl text-center transition-all ${
            pricingOption === "daily"
              ? "border-accent bg-accent/10"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <p className="text-xs font-semibold text-muted-foreground mb-1">Daily</p>
          <p className="text-sm font-bold text-foreground">{currencySymbol}{pricePerNight}</p>
        </button>
        <button
          onClick={() => setPricingOption("weekly")}
          className={`p-3 border rounded-xl text-center transition-all relative ${
            pricingOption === "weekly"
              ? "border-accent bg-accent/10 scale-[1.03]"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          {pricingOption === "weekly" && (
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              POPULAR
            </span>
          )}
          <p className="text-xs font-semibold text-muted-foreground mb-1">Weekly</p>
          <p className="text-sm font-bold text-foreground">{currencySymbol}{Math.round(weeklyPrice)}</p>
        </button>
        <button
          onClick={() => setPricingOption("monthly")}
          className={`p-3 border rounded-xl text-center transition-all ${
            pricingOption === "monthly"
              ? "border-accent bg-accent/10"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <p className="text-xs font-semibold text-muted-foreground mb-1">Monthly</p>
          <p className="text-sm font-bold text-foreground">{currencySymbol}{Math.round(monthlyPrice)}</p>
        </button>
      </div>

      {/* Book Now */}
      <Button
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 rounded-xl text-base font-semibold"
        size="lg"
      >
        Book Now
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-3 mb-5">
        You won't be charged yet
      </p>

      {/* Price Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{currencySymbol}{pricePerNight} × {nights} nights</span>
          <span className="text-foreground font-medium">{currencySymbol}{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">10% campaign discount</span>
          <span className="text-accent font-medium">-{currencySymbol}{discount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <span className="text-foreground font-medium">{currencySymbol}{serviceFee}</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-3 border-t border-border">
          <span className="text-foreground">Total before taxes</span>
          <span className="text-foreground">{currencySymbol}{total.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default StayBookingPanel;
