import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  Palette,
  Image,
  Share2,
  QrCode,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Globe,
  Edit,
  Eye,
  Sparkles,
  Upload,
  Camera,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useHostStays, useHostHotels, useHostResorts, useHostCars, useHostBikes, useHostExperiences, useLinkInBioPage, useUpsertLinkInBioPage, useUpdateProfile } from '@/hooks/useListings';
import { generateSlug, formatPrice } from '@/lib/supabase-helpers';
import { parseListingDiscountConfig } from '@/lib/discounts';
import { toast } from 'sonner';
import { useRef } from 'react';
import logo from '@/assets/logo.png';
import logoLight from '@/assets/logo-light.png';

interface LinkInBioSettings {
  businessName: string;
  tagline: string;
  bio: string;
  theme: 'forest' | 'minimal' | 'sunset' | 'ocean';
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
    name: 'Forest',
    bg: 'bg-gradient-to-br from-[#013220] to-[#0a4a32]',
    text: 'text-white',
    accent: 'bg-[#FFFEF5]',
    card: 'bg-white/10 backdrop-blur-sm border-white/20',
  },
  minimal: {
    name: 'Minimal',
    bg: 'bg-white',
    text: 'text-gray-900',
    accent: 'bg-gray-900',
    card: 'bg-gray-50 border-gray-200',
  },
  sunset: {
    name: 'Sunset',
    bg: 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
    text: 'text-white',
    accent: 'bg-white',
    card: 'bg-white/10 backdrop-blur-sm border-white/20',
  },
  ocean: {
    name: 'Ocean',
    bg: 'bg-gradient-to-br from-blue-400 via-teal-500 to-emerald-600',
    text: 'text-white',
    accent: 'bg-white',
    card: 'bg-white/10 backdrop-blur-sm border-white/20',
  },
};

export function LinkInBioGenerator() {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const { data: linkInBioPage } = useLinkInBioPage(user?.id);
  const upsertLinkInBioPage = useUpsertLinkInBioPage();
  const updateProfile = useUpdateProfile();
  const { data: stays = [] } = useHostStays(user?.id);
  const { data: hotels = [] } = useHostHotels(user?.id);
  const { data: resorts = [] } = useHostResorts(user?.id);
  const { data: cars = [] } = useHostCars(user?.id);
  const { data: bikes = [] } = useHostBikes(user?.id);
  const { data: experiences = [] } = useHostExperiences(user?.id);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState<LinkInBioSettings>({
    businessName: profile?.full_name || '',
    tagline: 'Your trusted travel partner',
    bio: 'Book amazing stays, vehicles, and experiences directly with me. Special rates available!',
    theme: 'forest',
    showEmail: true,
    showPhone: true,
    showLocation: true,
    instagram: '',
    facebook: '',
    twitter: '',
    website: '',
    featuredListings: [],
  });

  useEffect(() => {
    if (!profile) return;
    setSettings((prev) => ({
      ...prev,
      businessName: profile.full_name || prev.businessName,
    }));
  }, [profile]);

  useEffect(() => {
    if (!linkInBioPage?.settings || typeof linkInBioPage.settings !== 'object' || Array.isArray(linkInBioPage.settings)) {
      return;
    }
    const savedSettings = linkInBioPage.settings as Partial<LinkInBioSettings>;
    setSettings((prev) => ({
      ...prev,
      ...savedSettings,
    }));
  }, [linkInBioPage]);

  const withDiscount = (basePrice: number, rawDiscounts: unknown) => {
    const { hostDiscountPercent } = parseListingDiscountConfig(rawDiscounts as any);
    const discountedPrice = Math.max(0, basePrice - (basePrice * hostDiscountPercent) / 100);
    return { price: basePrice, discountedPrice, hostDiscountPercent };
  };

  const allListings = useMemo(() => [
    ...stays.map((s) => ({ ...s, type: 'stay' as const, unit: '/night', ...withDiscount(s.price_per_night, (s as any).discounts) })),
    ...hotels.map((h) => ({ ...h, type: 'hotel' as const, unit: '/night', ...withDiscount(h.price_per_night, (h as any).discounts) })),
    ...resorts.map((r) => ({ ...r, type: 'resort' as const, unit: '/night', ...withDiscount(r.price_per_night, (r as any).discounts) })),
    ...cars.map((c) => ({ ...c, type: 'car' as const, unit: '/day', ...withDiscount(c.price_per_day, (c as any).discounts) })),
    ...bikes.map((b) => ({ ...b, type: 'bike' as const, unit: '/day', ...withDiscount(b.price_per_day, (b as any).discounts) })),
    ...experiences.map((e) => ({ ...e, type: 'experience' as const, unit: '/person', ...withDiscount(e.price_per_person, (e as any).discounts) })),
  ], [stays, hotels, resorts, cars, bikes, experiences]);

  const slug = generateSlug(settings.businessName || 'my-page');
  const publishedSlug = linkInBioPage?.slug || slug;
  const appOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://xplorwing.com';
  const linkUrl = `${appOrigin}/p/${publishedSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedTheme = themes[settings.theme];

  const handleSaveSettings = async () => {
    if (!user) {
      toast.error('Please sign in to save your Link-in-Bio settings.');
      return;
    }
    try {
      await upsertLinkInBioPage.mutateAsync({
        user_id: user.id,
        slug,
        settings,
        is_active: true,
      });
      toast.success('Link-in-Bio settings saved.');
    } catch (error) {
      toast.error('Failed to save Link-in-Bio settings.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB.');
      return;
    }

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewImageUrl(localUrl);
    setUploadingImage(true);

    try {
      // Convert to base64 for storage in profile (simple approach without Supabase Storage bucket)
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          await updateProfile.mutateAsync({
            userId: user.id,
            updates: { profile_image: base64 },
          });
          toast.success('Profile image updated!');
        } catch {
          toast.error('Failed to save profile image.');
          setPreviewImageUrl(null);
        } finally {
          setUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error('Failed to upload image.');
      setPreviewImageUrl(null);
      setUploadingImage(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Link-in-Bio</h1>
          <p className="text-muted-foreground mt-1">
            Create your personalized booking page and save 10% on commission
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCopyLink}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          <Button asChild>
            <Link to={`/p/${publishedSlug}`} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
        </div>
      </div>

      {/* Commission Savings Banner */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-700">Save 10% on Every Booking!</h3>
              <p className="text-sm text-green-600">
                Bookings through your Link-in-Bio only incur a 10% commission vs 20% on marketplace
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Your Unique Link
          </CardTitle>
          <CardDescription>Share this link on social media, WhatsApp, or anywhere else</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center px-4 py-2 rounded-lg border border-border bg-secondary/30">
              <Globe className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm truncate">{linkUrl}</span>
            </div>
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon">
              <QrCode className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-6">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4 mt-4">
              <Card>
                <CardContent className="p-6 space-y-4">

                  {/* Profile Image Upload */}
                  <div>
                    <Label className="mb-2 block">Profile Photo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full border-4 border-border overflow-hidden bg-secondary shrink-0 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                        {(previewImageUrl || profile?.profile_image) ? (
                          <img
                            src={previewImageUrl || profile?.profile_image || ''}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{settings.businessName.charAt(0) || 'X'}</span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                        </Button>
                        <p className="text-xs text-muted-foreground">JPG, PNG, GIF or WebP · Max 2MB</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={settings.businessName}
                      onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                      placeholder="Your business or personal name"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your link: {appOrigin.replace(/^https?:\/\//, '')}/p/{publishedSlug}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      placeholder="A short catchy tagline"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={settings.bio}
                      onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                      placeholder="Tell visitors about your offerings..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showEmail" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Show Email
                      </Label>
                      <Switch
                        id="showEmail"
                        checked={settings.showEmail}
                        onCheckedChange={(checked) => setSettings({ ...settings, showEmail: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPhone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Show Phone
                      </Label>
                      <Switch
                        id="showPhone"
                        checked={settings.showPhone}
                        onCheckedChange={(checked) => setSettings({ ...settings, showPhone: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showLocation" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        Show Location
                      </Label>
                      <Switch
                        id="showLocation"
                        checked={settings.showLocation}
                        onCheckedChange={(checked) => setSettings({ ...settings, showLocation: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="theme" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <Label className="mb-4 block">Choose Theme</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {(Object.entries(themes) as [keyof typeof themes, typeof themes['forest']][]).map(([key, theme]) => (
                      <button
                        key={key}
                        onClick={() => setSettings({ ...settings, theme: key })}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          settings.theme === key
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`h-20 rounded-md ${theme.bg}`} />
                        <p className="text-sm font-medium mt-2">{theme.name}</p>
                        {settings.theme === key && (
                          <Check className="absolute top-2 right-2 h-5 w-5 text-primary-text" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-4 mt-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={settings.instagram}
                      onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook" className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      value={settings.facebook}
                      onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                      placeholder="facebook.com/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter / X
                    </Label>
                    <Input
                      id="twitter"
                      value={settings.twitter}
                      onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={settings.website}
                      onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Featured Listings</CardTitle>
                  <CardDescription>Select listings to showcase on your page</CardDescription>
                </CardHeader>
                <CardContent>
                  {allListings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No listings available</p>
                      <p className="text-sm mt-1">Create listings first to feature them here</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {allListings.map((listing) => (
                        <label
                          key={listing.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/30 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={settings.featuredListings.includes(listing.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSettings({
                                  ...settings,
                                  featuredListings: [...settings.featuredListings, listing.id],
                                });
                              } else {
                                setSettings({
                                  ...settings,
                                  featuredListings: settings.featuredListings.filter((id) => id !== listing.id),
                                });
                              }
                            }}
                            className="rounded"
                          />
                          <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden shrink-0">
                            {listing.images?.[0] && (
                              <img
                                src={listing.images[0]}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{listing.title}</p>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="font-semibold text-foreground">{formatPrice(listing.discountedPrice)}{listing.unit}</span>
                              {listing.hostDiscountPercent > 0 ? (
                                <>
                                  <span className="line-through">{formatPrice(listing.price)}</span>
                                  <span className="text-emerald-600 font-semibold">-{listing.hostDiscountPercent}%</span>
                                </>
                              ) : null}
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize shrink-0">
                            {listing.type}
                          </Badge>
                        </label>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button className="w-full" size="lg" onClick={handleSaveSettings} disabled={upsertLinkInBioPage.isPending}>
            Save Changes
          </Button>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live Preview
                </CardTitle>
                <Badge variant="outline">Mobile View</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mx-auto w-full max-w-[375px] h-[667px] rounded-3xl border-8 border-gray-900 overflow-hidden shadow-2xl">
                <div className={`w-full h-full overflow-y-auto ${selectedTheme.bg} ${selectedTheme.text}`}>
                  {/* Profile Section */}
                  <div className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white/20 border-4 border-white/30 overflow-hidden mb-4">
                      {profile?.profile_image ? (
                        <img
                          src={profile.profile_image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold">
                          {settings.businessName.charAt(0) || 'X'}
                        </div>
                      )}
                    </div>
                    <h1 className="text-xl font-bold">{settings.businessName || 'Your Business'}</h1>
                    <p className="text-sm opacity-80 mt-1">{settings.tagline}</p>
                    <p className="text-sm opacity-70 mt-3 px-4">{settings.bio}</p>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-4 mt-4">
                      {settings.instagram && (
                        <div className="p-2 rounded-full bg-white/10">
                          <Instagram className="h-5 w-5" />
                        </div>
                      )}
                      {settings.facebook && (
                        <div className="p-2 rounded-full bg-white/10">
                          <Facebook className="h-5 w-5" />
                        </div>
                      )}
                      {settings.twitter && (
                        <div className="p-2 rounded-full bg-white/10">
                          <Twitter className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Listings */}
                  <div className="px-4 pb-6 space-y-3">
                    {allListings.slice(0, 4).map((listing) => (
                      <div
                        key={listing.id}
                        className={`p-3 rounded-xl ${selectedTheme.card} border`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-lg bg-white/10 overflow-hidden shrink-0">
                            {listing.images?.[0] && (
                              <img
                                src={listing.images[0]}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{listing.title}</p>
                            <p className="text-xs opacity-70 truncate">{listing.location}</p>
                            <div className="text-sm mt-1 flex items-center gap-2">
                              <p className="font-bold">
                                {formatPrice(listing.discountedPrice)}{listing.unit}
                              </p>
                              {listing.hostDiscountPercent > 0 ? (
                                <>
                                  <p className="text-xs opacity-70 line-through">{formatPrice(listing.price)}</p>
                                  <p className="text-xs font-semibold text-emerald-300">-{listing.hostDiscountPercent}%</p>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-4 text-center border-t border-white/10 space-y-1">
                    <div className="flex items-center justify-center gap-1.5 opacity-60">
                      <span className="text-[10px]">Powered by</span>
                      <img src={logo} alt="Xplorwing" className="h-3.5 dark:hidden" />
                      <img src={logoLight} alt="Xplorwing" className="h-3.5 hidden dark:block" />
                    </div>
                    <p className="text-[9px] opacity-40">
                      © {new Date().getFullYear()} WINGSNNESTS ECO SOLUTIONS PVT LTD. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
