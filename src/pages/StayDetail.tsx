import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { Star, MapPin, Wifi, Car, Check, Shield, X, Users, BedDouble, Bath, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import manaliImage from "@/assets/stays/manali-mountain-homestay.jpg";
import goaImage from "@/assets/stays/goa-beach-villa.jpg";
import jaipurImage from "@/assets/stays/jaipur-heritage-haveli.jpg";
import munnarImage from "@/assets/stays/munnar-tea-cottage.jpg";
import udaipurImage from "@/assets/stays/udaipur-lakeside-palace.jpg";
import kasolImage from "@/assets/stays/kasol-valley-home.jpg";

const imageMap: Record<string, string> = {
  "manali-mountain-homestay.jpg": manaliImage,
  "goa-beach-villa.jpg": goaImage,
  "jaipur-heritage-haveli.jpg": jaipurImage,
  "munnar-tea-cottage.jpg": munnarImage,
  "udaipur-lakeside-palace.jpg": udaipurImage,
  "kasol-valley-home.jpg": kasolImage,
};

interface Stay {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  currency: string;
  rating: number;
  total_reviews: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  check_in_time: string;
  check_out_time: string;
  cancellation_policy: string;
  amenities: any;
  images: string[];
}

const StayDetail = () => {
  const { id } = useParams();
  const [stay, setStay] = useState<Stay | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [guests, setGuests] = useState(1);
  const [pricingOption, setPricingOption] = useState<"daily" | "weekly" | "monthly">("weekly");

  useEffect(() => {
    const fetchStay = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("stays")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setStay(data);
      } catch (error) {
        console.error("Error fetching stay:", error);
        toast({
          title: "Error",
          description: "Failed to load homestay details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStay();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Marquee />
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!stay) {
    return (
      <div className="min-h-screen flex flex-col">
        <Marquee />
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Homestay Not Found</h2>
            <p className="text-muted-foreground">The homestay you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const amenitiesList = Array.isArray(stay.amenities) ? stay.amenities : [];
  const mainImage = stay.images?.[0] ? imageMap[stay.images[0]] || manaliImage : manaliImage;
  const currencySymbol = stay.currency === 'INR' ? '₹' : '$';
  const weeklyPrice = stay.price_per_night * 7 * 0.85; // 15% discount
  const monthlyPrice = stay.price_per_night * 30 * 0.7; // 30% discount

  return (
    <div className="min-h-screen flex flex-col">
      <Marquee />
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {stay.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-foreground text-foreground" />
              <span className="font-semibold text-foreground">{stay.rating}</span>
            </div>
            <span>·</span>
            <button className="underline hover:text-foreground transition-colors">
              {stay.total_reviews} reviews
            </button>
            <span>·</span>
            <button className="flex items-center gap-1 underline hover:text-foreground transition-colors">
              <MapPin className="h-4 w-4" />
              {stay.location}
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-10 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
          <div className="lg:col-span-2 lg:row-span-2 h-full">
            <img
              src={mainImage}
              alt={stay.title}
              className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>
          <div className="hidden lg:block h-full">
            <img
              src={mainImage}
              alt="View 2"
              className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>
          <div className="hidden lg:block h-full">
            <img
              src={mainImage}
              alt="View 3"
              className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>
          <div className="hidden lg:block h-full">
            <img
              src={mainImage}
              alt="View 4"
              className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>
          <div className="hidden lg:block h-full">
            <img
              src={mainImage}
              alt="View 5"
              className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Specs & Host */}
            <div className="pb-8 border-b border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Entire rental unit hosted by Host Name
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{stay.max_guests} guests</span>
                    <span>·</span>
                    <span>{stay.bedrooms} bedrooms</span>
                    <span>·</span>
                    <span>{stay.bedrooms} beds</span>
                    <span>·</span>
                    <span>{stay.bathrooms} baths</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold">
                  H
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pb-8 border-b border-border">
              <p className="text-foreground leading-relaxed">
                {stay.description}
              </p>
            </div>

            {/* Sleeping Arrangements */}
            <div className="pb-8 border-b border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Where you'll sleep</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {Array.from({ length: stay.bedrooms }).map((_, i) => (
                  <Card key={i} className="min-w-[200px] p-6 border-border">
                    <BedDouble className="h-8 w-8 text-foreground mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">Bedroom {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">1 queen bed</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {amenitiesList.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 text-foreground">
                    <Wifi className="h-5 w-5" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Rentals */}
            <div className="pb-8 border-b border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Rent a vehicle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "Royal Enfield Classic", rating: 4.8, price: 1200, km: 100 },
                  { name: "Honda City", rating: 4.9, price: 2500, km: 150 },
                ].map((vehicle, i) => (
                  <Card key={i} className="border-border overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Car className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{vehicle.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 fill-foreground text-foreground" />
                        <span className="text-sm text-muted-foreground">{vehicle.rating}</span>
                      </div>
                      <p className="text-lg font-bold text-foreground mb-1">
                        {currencySymbol}{vehicle.price}<span className="text-sm font-normal text-muted-foreground">/day</span>
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        {vehicle.km} KM limit · {currencySymbol}15/KM excess
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Choose other vehicle
                        </Button>
                        <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
                          Add to Reserve
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Detailed Ratings */}
            <div className="pb-8 border-b border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 fill-foreground text-foreground" />
                {stay.rating} · {stay.total_reviews} reviews
              </h2>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                {[
                  { name: "Cleanliness", score: 4.9 },
                  { name: "Accuracy", score: 4.8 },
                  { name: "Check-in", score: 5.0 },
                  { name: "Communication", score: 4.9 },
                  { name: "Location", score: 4.7 },
                  { name: "Value", score: 4.8 },
                ].map((rating) => (
                  <div key={rating.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground">{rating.name}</span>
                      <span className="text-sm font-semibold text-foreground">{rating.score}</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground"
                        style={{ width: `${(rating.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="pb-8 border-b border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Where you'll be</h2>
              <p className="text-muted-foreground mb-4">{stay.location}</p>
              <div className="aspect-[16/9] bg-muted rounded-2xl border border-border flex items-center justify-center">
                <MapPin className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>

            {/* Host Profile */}
            <Card className="bg-secondary/30 border-border p-6">
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-xl">
                  H
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Hosted by Host Name</h3>
                  <p className="text-sm text-muted-foreground">Joined in March 2020</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-foreground text-foreground" />
                    <span className="text-sm font-semibold">Superhost</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                I love hosting travelers and sharing the beauty of our region. I'm always available to help make your stay memorable!
              </p>
              <Button variant="outline" className="w-full">
                Contact host
              </Button>
            </Card>

            {/* Things to Know */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Things to know</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">House rules</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      Check-in: {stay.check_in_time}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      Checkout: {stay.check_out_time}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      No smoking
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Health & safety</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      Smoke alarm installed
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      First aid kit available
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Cancellation policy</h3>
                  <p className="text-sm text-muted-foreground">{stay.cancellation_policy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Panel (Sticky) */}
          <div className="lg:col-span-1">
            <Card className="border-border shadow-strong sticky top-24 p-6">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground uppercase mb-4">
                  Select your stay
                </h3>
                
                {/* Date & Guests Input */}
                <div className="border border-border rounded-lg overflow-hidden mb-6">
                  <div className="grid grid-cols-2 border-b border-border">
                    <div className="p-3 border-r border-border">
                      <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        className="w-full bg-transparent text-sm text-foreground border-none outline-none"
                        aria-label="Check-in date"
                      />
                    </div>
                    <div className="p-3">
                      <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1">
                        Checkout
                      </label>
                      <input
                        type="date"
                        className="w-full bg-transparent text-sm text-foreground border-none outline-none"
                        aria-label="Checkout date"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-transparent text-sm text-foreground border-none outline-none"
                      aria-label="Number of guests"
                    >
                      {Array.from({ length: stay.max_guests }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing Options */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button
                    onClick={() => setPricingOption("daily")}
                    className={`p-3 border rounded-lg text-center transition-all ${
                      pricingOption === "daily"
                        ? "border-foreground bg-secondary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    aria-label="Daily pricing"
                  >
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Daily</p>
                    <p className="text-sm font-bold text-foreground">
                      {currencySymbol}{stay.price_per_night}
                    </p>
                  </button>
                  <button
                    onClick={() => setPricingOption("weekly")}
                    className={`p-3 border rounded-lg text-center transition-all relative ${
                      pricingOption === "weekly"
                        ? "border-foreground bg-secondary scale-105"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    aria-label="Weekly pricing (popular)"
                  >
                    {pricingOption === "weekly" && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    )}
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Weekly</p>
                    <p className="text-sm font-bold text-foreground">
                      {currencySymbol}{Math.round(weeklyPrice)}
                    </p>
                  </button>
                  <button
                    onClick={() => setPricingOption("monthly")}
                    className={`p-3 border rounded-lg text-center transition-all ${
                      pricingOption === "monthly"
                        ? "border-foreground bg-secondary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    aria-label="Monthly pricing"
                  >
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Monthly</p>
                    <p className="text-sm font-bold text-foreground">
                      {currencySymbol}{Math.round(monthlyPrice)}
                    </p>
                  </button>
                </div>
              </div>

              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
                aria-label="Reserve this property"
              >
                Reserve
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                You won't be charged yet
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default StayDetail;