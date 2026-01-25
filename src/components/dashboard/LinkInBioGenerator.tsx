import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
import { useProfile, useHostStays, useHostCars, useHostBikes, useHostExperiences } from '@/hooks/useListings';
import { generateSlug, formatPrice } from '@/lib/supabase-helpers';
import { toast } from 'sonner';

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
  const { data: stays = [] } = useHostStays(user?.id);
  const { data: cars = [] } = useHostCars(user?.id);
  const { data: bikes = [] } = useHostBikes(user?.id);
  const { data: experiences = [] } = useHostExperiences(user?.id);

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

  const allListings = useMemo(() => [
    ...stays.map((s) => ({ ...s, type: 'stay' as const, price: s.price_per_night, unit: '/night' })),
    ...cars.map((c) => ({ ...c, type: 'car' as const, price: c.price_per_day, unit: '/day' })),
    ...bikes.map((b) => ({ ...b, type: 'bike' as const, price: b.price_per_day, unit: '/day' })),
    ...experiences.map((e) => ({ ...e, type: 'experience' as const, price: e.price_per_person, unit: '/person' })),
  ], [stays, cars, bikes, experiences]);

  const slug = generateSlug(settings.businessName || 'my-page');
  const linkUrl = `https://xplorwing.com/p/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedTheme = themes[settings.theme];

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
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview
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
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={settings.businessName}
                      onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                      placeholder="Your business or personal name"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your link: xplorwing.com/p/{slug}
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
                          <Check className="absolute top-2 right-2 h-5 w-5 text-primary" />
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
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(listing.price)}{listing.unit}
                            </p>
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

          <Button className="w-full" size="lg">
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
                            <p className="text-sm font-bold mt-1">
                              {formatPrice(listing.price)}{listing.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-4 text-center border-t border-white/10">
                    <p className="text-xs opacity-50">Powered by Xplorwing</p>
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
