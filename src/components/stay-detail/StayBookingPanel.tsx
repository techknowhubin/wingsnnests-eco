import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Users } from "lucide-react";
import { useState } from "react";

interface StayBookingPanelProps {
  pricePerNight: number;
  currencySymbol: string;
  maxGuests: number;
  title: string;
}

const StayBookingPanel = ({ pricePerNight, currencySymbol, maxGuests, title }: StayBookingPanelProps) => {
  const [guests, setGuests] = useState(1);
  const [pricingOption, setPricingOption] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const weeklyPrice = pricePerNight * 7 * 0.85;
  const monthlyPrice = pricePerNight * 30 * 0.7;

  const nights = 3; // placeholder
  const subtotal = pricePerNight * nights;
  const discount = Math.round(subtotal * 0.1);
  const serviceFee = 0;
  const total = subtotal - discount + serviceFee;

  return (
    <Card className="border-border shadow-strong sticky top-24 p-6">
      {/* Price */}
      <div className="mb-5">
        <span className="text-3xl font-bold text-foreground">{currencySymbol}{pricePerNight}</span>
        <span className="text-sm text-muted-foreground">/Night</span>
      </div>

      {/* Stay info */}
      <p className="text-sm text-muted-foreground mb-1">
        <span className="font-semibold text-foreground">{nights} Nights</span> in {title}
      </p>
      <p className="text-xs text-muted-foreground mb-5">
        {checkIn || "Select dates"} — {checkOut || "Select dates"}
      </p>

      {/* Check-in / Check-out */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1.5">Check in</label>
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground border-none outline-none"
              aria-label="Check-in date"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1.5">Check out</label>
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground border-none outline-none"
              aria-label="Checkout date"
            />
          </div>
        </div>
      </div>

      {/* Guests */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1.5">Guest</label>
        <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
          <Users className="h-4 w-4 text-muted-foreground" />
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-transparent text-sm text-foreground border-none outline-none"
            aria-label="Number of guests"
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pricing Options - Daily/Weekly/Monthly */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <button
          onClick={() => setPricingOption("daily")}
          className={`p-3 border rounded-lg text-center transition-all ${
            pricingOption === "daily"
              ? "border-foreground bg-secondary"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <p className="text-xs font-semibold text-muted-foreground mb-1">Daily</p>
          <p className="text-sm font-bold text-foreground">{currencySymbol}{pricePerNight}</p>
        </button>
        <button
          onClick={() => setPricingOption("weekly")}
          className={`p-3 border rounded-lg text-center transition-all relative ${
            pricingOption === "weekly"
              ? "border-foreground bg-secondary scale-105"
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
          className={`p-3 border rounded-lg text-center transition-all ${
            pricingOption === "monthly"
              ? "border-foreground bg-secondary"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <p className="text-xs font-semibold text-muted-foreground mb-1">Monthly</p>
          <p className="text-sm font-bold text-foreground">{currencySymbol}{Math.round(monthlyPrice)}</p>
        </button>
      </div>

      {/* Book Now Button */}
      <Button
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
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
          <span className="text-foreground">{currencySymbol}{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">10% campaign discount</span>
          <span className="text-accent">-{currencySymbol}{discount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <span className="text-foreground">{currencySymbol}{serviceFee}</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-2.5 border-t border-border">
          <span className="text-foreground">Total before taxes</span>
          <span className="text-foreground">{currencySymbol}{total.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default StayBookingPanel;
