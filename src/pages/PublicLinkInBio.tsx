import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getLinkInBioPageBySlug, formatPrice } from "@/lib/supabase-helpers";
import { parseListingDiscountConfig } from "@/lib/discounts";
import { Card } from "@/components/ui/card";
import { Globe, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

interface LinkInBioSettings {
  businessName: string;
  tagline: string;
  bio: string;
  theme: "forest" | "minimal" | "sunset" | "ocean";
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  instagram: string;
  facebook: string;
  twitter: string;
  website: string;
  featuredListings: string[];
}

const themes = {
  forest: {
    bg: "bg-gradient-to-br from-[#013220] to-[#0a4a32]",
    text: "text-white",
    socialChip: "bg-white/10 border-white/20",
    card: "bg-white/10 backdrop-blur-sm border-white/20",
    muted: "text-white/80",
    footer: "text-white/70 border-white/20",
  },
  minimal: {
    bg: "bg-white",
    text: "text-gray-900",
    socialChip: "bg-gray-100 border-gray-200",
    card: "bg-gray-50 border-gray-200",
    muted: "text-gray-600",
    footer: "text-gray-700 border-gray-200",
  },
  sunset: {
    bg: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600",
    text: "text-white",
    socialChip: "bg-white/10 border-white/20",
    card: "bg-white/10 backdrop-blur-sm border-white/20",
    muted: "text-white/80",
    footer: "text-white/70 border-white/20",
  },
  ocean: {
    bg: "bg-gradient-to-br from-blue-400 via-teal-500 to-emerald-600",
    text: "text-white",
    socialChip: "bg-white/10 border-white/20",
    card: "bg-white/10 backdrop-blur-sm border-white/20",
    muted: "text-white/80",
    footer: "text-white/70 border-white/20",
  },
};

export default function PublicLinkInBio() {
  const { slug } = useParams();
  const withDiscount = (basePrice: number, rawDiscounts: unknown) => {
    const { hostDiscountPercent } = parseListingDiscountConfig(rawDiscounts as any);
    const discountedPrice = Math.max(0, basePrice - (basePrice * hostDiscountPercent) / 100);
    return {
      price: basePrice,
      discountedPrice,
      hostDiscountPercent,
    };
  };

  const { data: page, isLoading } = useQuery({
    queryKey: ["link-in-bio-public", slug],
    queryFn: () => getLinkInBioPageBySlug(slug!),
    enabled: !!slug,
  });

  const settings = useMemo(() => {
    if (!page?.settings || typeof page.settings !== "object" || Array.isArray(page.settings)) {
      return null;
    }
    return page.settings as LinkInBioSettings;
  }, [page]);

  const featuredIds = settings?.featuredListings ?? [];
  const { data: listings = [] } = useQuery({
    queryKey: ["link-in-bio-public-listings", featuredIds],
    queryFn: async () => {
      if (!featuredIds.length) return [];

      const [stays, hotels, resorts, cars, bikes, experiences] = await Promise.all([
        supabase.from("stays").select("id,title,location,price_per_night,images,availability_status,discounts").in("id", featuredIds).eq("availability_status", true).eq("marketplace_visible", true),
        supabase.from("hotels" as any).select("id,title,location,price_per_night,images,availability_status,discounts").in("id", featuredIds).eq("availability_status", true).eq("marketplace_visible", true),
        supabase.from("resorts" as any).select("id,title,location,price_per_night,images,availability_status,discounts").in("id", featuredIds).eq("availability_status", true).eq("marketplace_visible", true),
        supabase.from("cars").select("id,title,location,price_per_day,images,availability_status,discounts").in("id", featuredIds).eq("availability_status", true).eq("marketplace_visible", true),
        supabase.from("bikes").select("id,title,location,price_per_day,images,availability_status,discounts").in("id", featuredIds).eq("availability_status", true).eq("marketplace_visible", true),
        supabase.from("experiences").select("id,title,location,price_per_person,images,availability_status,discounts").in("id", featuredIds).eq("availability_status", true).eq("marketplace_visible", true),
      ]);

      return [
        ...(stays.data ?? []).map((item: any) => ({
          ...item,
          type: "stay",
          unit: "/night",
          ...withDiscount(Number(item.price_per_night), item.discounts),
        })),
        ...((hotels.data ?? []) as any[]).map((item) => ({
          ...item,
          type: "hotel",
          unit: "/night",
          ...withDiscount(Number(item.price_per_night), item.discounts),
        })),
        ...((resorts.data ?? []) as any[]).map((item) => ({
          ...item,
          type: "resort",
          unit: "/night",
          ...withDiscount(Number(item.price_per_night), item.discounts),
        })),
        ...(cars.data ?? []).map((item: any) => ({
          ...item,
          type: "car",
          unit: "/day",
          ...withDiscount(Number(item.price_per_day), item.discounts),
        })),
        ...(bikes.data ?? []).map((item: any) => ({
          ...item,
          type: "bike",
          unit: "/day",
          ...withDiscount(Number(item.price_per_day), item.discounts),
        })),
        ...(experiences.data ?? []).map((item: any) => ({
          ...item,
          type: "experience",
          unit: "/person",
          ...withDiscount(Number(item.price_per_person), item.discounts),
        })),
      ];
    },
    enabled: featuredIds.length > 0,
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!page || !settings) {
    return <div className="min-h-screen flex items-center justify-center">Link not found.</div>;
  }

  const selectedTheme = themes[settings.theme] ?? themes.forest;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-[375px] h-[667px] rounded-3xl border-8 border-gray-900 overflow-hidden shadow-2xl">
        <div className={`w-full h-full overflow-y-auto ${selectedTheme.bg} ${selectedTheme.text}`}>
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-white/20 border-4 border-white/30 overflow-hidden mb-4 flex items-center justify-center text-3xl font-bold">
            {settings.businessName?.charAt(0)?.toUpperCase() || "X"}
          </div>
          <h1 className="text-3xl font-bold">{settings.businessName}</h1>
          <p className={`mt-1 ${selectedTheme.muted}`}>{settings.tagline}</p>
          <p className={`mt-3 text-sm ${selectedTheme.muted}`}>{settings.bio}</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            {settings.instagram ? (
              <div className={`p-2 rounded-full border ${selectedTheme.socialChip}`}>
                <Instagram className="h-5 w-5" />
              </div>
            ) : null}
            {settings.facebook ? (
              <div className={`p-2 rounded-full border ${selectedTheme.socialChip}`}>
                <Facebook className="h-5 w-5" />
              </div>
            ) : null}
            {settings.twitter ? (
              <div className={`p-2 rounded-full border ${selectedTheme.socialChip}`}>
                <Twitter className="h-5 w-5" />
              </div>
            ) : null}
            {settings.website ? (
              <div className={`p-2 rounded-full border ${selectedTheme.socialChip}`}>
                <Globe className="h-5 w-5" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          {listings.map((listing) => (
            <Link
              key={`${listing.type}-${listing.id}`}
              to={`/${listing.type === "experience" ? "experiences" : `${listing.type}s`}/${listing.id}`}
              className="block"
              aria-label={`Open ${listing.title}`}
            >
              <Card className={`p-3 border ${selectedTheme.card} relative cursor-pointer transition-opacity hover:opacity-95`}>
                <span className={`absolute top-2 right-2 inline-flex items-center justify-center rounded-full border p-1.5 ${selectedTheme.socialChip}`}>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                <div className="flex gap-3 pr-8">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-white/10">
                    {listing.images?.[0] ? (
                      <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{listing.title}</p>
                    <p className={`text-xs truncate ${selectedTheme.muted}`}>{listing.location}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-sm font-bold">{formatPrice(listing.discountedPrice)}{listing.unit}</p>
                      {listing.hostDiscountPercent > 0 ? (
                        <>
                          <p className={`text-xs line-through ${selectedTheme.muted}`}>{formatPrice(listing.price)}</p>
                          <p className="text-xs font-semibold text-emerald-300">-{listing.hostDiscountPercent}%</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className={`mt-8 text-xs space-y-1 ${selectedTheme.muted}`}>
          {settings.showEmail ? <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> Contact via host account</p> : null}
          {settings.showPhone ? <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> Phone available after booking</p> : null}
          {settings.showLocation ? <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Multiple service locations available</p> : null}
        </div>

        <div className={`mt-8 pt-4 text-center text-xs border-t ${selectedTheme.footer}`}>
          <p className="font-medium">Powered by Xplorwing</p>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
