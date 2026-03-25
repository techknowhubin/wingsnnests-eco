import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { useState, useMemo } from "react";
import { format, differenceInDays, addDays } from "date-fns";
import { cn } from "@/lib/utils";

interface VehicleBookingPanelProps {
  pricePerDay: number;
  currencySymbol?: string;
  title: string;
  requirements?: string;
}

const VehicleBookingPanel = ({ pricePerDay, currencySymbol = "₹", title, requirements }: VehicleBookingPanelProps) => {
  const tomorrow = useMemo(() => addDays(new Date(), 1), []);
  const [pickupDate, setPickupDate] = useState<Date>(tomorrow);
  const [dropoffDate, setDropoffDate] = useState<Date>(addDays(tomorrow, 3));

  const days = Math.max(differenceInDays(dropoffDate, pickupDate), 1);
  const subtotal = pricePerDay * days;
  const discount = Math.round(subtotal * 0.1);
  const serviceFee = 0;
  const total = subtotal - discount + serviceFee;

  return (
    <Card className="border-border shadow-strong sticky top-24 p-4 rounded-2xl bg-white dark:bg-card">
      {/* Price */}
      <div className="mb-2">
        <span className="text-2xl font-bold text-foreground">{currencySymbol}{pricePerDay.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground font-medium">/Day</span>
      </div>

      {/* Rental summary */}
      <div className="bg-secondary/50 rounded-lg p-2.5 mb-3">
        <p className="text-sm text-foreground">
          <span className="font-bold">{days} Day{days > 1 ? "s" : ""}</span>
          <span className="text-muted-foreground"> with {title}</span>
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {format(pickupDate, "MMM dd, yyyy")} - {format(dropoffDate, "MMM dd, yyyy")}
        </p>
      </div>

      {/* Pickup / Drop-off — two columns */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        <div>
          <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-0.5">Pickup</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-9 rounded-full border-border px-3 text-xs"
                )}
              >
                <CalendarDays className="h-3.5 w-3.5 mr-1 text-accent flex-shrink-0" />
                {format(pickupDate, "MMM dd")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={(d) => {
                  if (d) {
                    setPickupDate(d);
                    if (d >= dropoffDate) setDropoffDate(addDays(d, 1));
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-0.5">Drop-off</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-9 rounded-full border-border px-3 text-xs"
                )}
              >
                <CalendarDays className="h-3.5 w-3.5 mr-1 text-accent flex-shrink-0" />
                {format(dropoffDate, "MMM dd")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dropoffDate}
                onSelect={(d) => d && setDropoffDate(d)}
                disabled={(date) => date <= pickupDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Book Now */}
      <Button
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 rounded-full text-sm font-semibold"
        size="lg"
      >
        Book Now
      </Button>

      <p className="text-[11px] text-center text-muted-foreground mt-2 mb-3">
        You won't be charged yet
      </p>

      {/* Price Breakdown */}
      <div className="space-y-1.5 pt-3 border-t border-border">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{currencySymbol}{pricePerDay.toLocaleString()} × {days} day{days > 1 ? "s" : ""}</span>
          <span className="text-foreground font-medium">{currencySymbol}{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">10% discount</span>
          <span className="text-accent font-medium">-{currencySymbol}{discount}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Service fee</span>
          <span className="text-foreground font-medium">{currencySymbol}{serviceFee}</span>
        </div>
        <div className="flex justify-between text-xs font-bold pt-2 border-t border-border">
          <span className="text-foreground">Total before taxes</span>
          <span className="text-foreground">{currencySymbol}{total.toLocaleString()}</span>
        </div>
      </div>

      {requirements && (
        <p className="text-[10px] text-muted-foreground mt-3">
          <strong>Requirements:</strong> {requirements}
        </p>
      )}
    </Card>
  );
};

export default VehicleBookingPanel;
