import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Link2,
  Globe,
  TrendingUp,
  Smartphone,
  Palette,
  Share2,
  BarChart3,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Your Own Booking Page",
    description:
      "Get a personalized booking page with your brand, listings, and contact info — no website needed.",
  },
  {
    icon: TrendingUp,
    title: "Lower Commission Rates",
    description:
      "Pay only 10% commission on direct bookings through your Link-in-Bio, compared to 20% on the marketplace.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Optimized",
    description:
      "Your page looks stunning on every device. Guests can browse and book effortlessly from their phones.",
  },
  {
    icon: Palette,
    title: "Customizable Themes",
    description:
      "Choose from beautiful themes — Forest, Minimal, Sunset, or Ocean — to match your brand identity.",
  },
  {
    icon: Share2,
    title: "Share Anywhere",
    description:
      "Drop your link in Instagram bio, WhatsApp status, Google Business, or anywhere your audience lives.",
  },
  {
    icon: BarChart3,
    title: "Track Performance",
    description:
      "See how many people visit your page, which listings get the most attention, and optimize accordingly.",
  },
];

const steps = [
  {
    step: "01",
    title: "Sign Up as a Host",
    description: "Create your free host account and list your properties, vehicles, or experiences.",
  },
  {
    step: "02",
    title: "Customize Your Page",
    description: "Add your business name, tagline, social links, and pick a theme that fits your brand.",
  },
  {
    step: "03",
    title: "Select Featured Listings",
    description: "Choose which listings to showcase on your page for maximum visibility.",
  },
  {
    step: "04",
    title: "Share Your Link",
    description: "Copy your unique URL and share it across all your social channels and marketing materials.",
  },
];

const comparisons = [
  { feature: "Commission Rate", marketplace: "20%", linkInBio: "10%" },
  { feature: "Custom Branding", marketplace: "Limited", linkInBio: "Full Control" },
  { feature: "Direct Guest Relationship", marketplace: "Shared", linkInBio: "Direct" },
  { feature: "Social Media Integration", marketplace: "No", linkInBio: "Yes" },
  { feature: "Custom URL", marketplace: "No", linkInBio: "Yes" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function LinkInBioLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-primary/[0.03]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Link2 className="h-4 w-4" />
                Link-in-Bio for Service Providers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Your Listings. Your Brand.{" "}
              <span className="text-primary">One Powerful Link.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Turn your social media bio into a direct booking channel. Showcase
              your stays, vehicles, and experiences — all from a single,
              beautifully designed page.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/signup">
                <Button size="lg" className="gap-2 rounded-full px-8">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/host/link">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  See Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Service Providers Love Link-in-Bio
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to grow your bookings and build your brand — without the complexity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Save More with Every Booking
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Compare marketplace listings vs. your direct Link-in-Bio page.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="overflow-hidden border-border">
              <div className="grid grid-cols-3 bg-primary text-primary-foreground text-sm font-semibold">
                <div className="p-4">Feature</div>
                <div className="p-4 text-center">Marketplace</div>
                <div className="p-4 text-center">Link-in-Bio</div>
              </div>
              {comparisons.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 text-sm ${
                    i % 2 === 0 ? "bg-background" : "bg-muted/30"
                  }`}
                >
                  <div className="p-4 font-medium text-foreground">{row.feature}</div>
                  <div className="p-4 text-center text-muted-foreground">{row.marketplace}</div>
                  <div className="p-4 text-center font-semibold text-primary flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    {row.linkInBio}
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Started in 4 Simple Steps
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-black text-primary/15 mb-3">{step.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border-primary/20 bg-primary/[0.03]">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                  "Since I started sharing my Xplorwing link on Instagram, my
                  direct bookings have doubled. The 10% commission means I keep
                  so much more of my earnings."
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">
                    Homestay Host, Manali
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perfect for Every Service Provider
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "🏠", title: "Homestay Owners", desc: "Showcase your properties with photos, pricing, and instant booking." },
              { icon: "🚗", title: "Car Rental Services", desc: "Display your fleet and let guests book directly from your link." },
              { icon: "🏍️", title: "Bike Rental Shops", desc: "List all your bikes with specs, rates, and availability in one place." },
              { icon: "🎯", title: "Experience Hosts", desc: "Promote tours, treks, and activities to a ready-to-book audience." },
            ].map((useCase, i) => (
              <motion.div
                key={useCase.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{useCase.icon}</div>
                    <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-primary rounded-2xl p-10 md:p-16"
          >
            <Zap className="h-10 w-10 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Grow Your Bookings?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of service providers who are earning more with their
              own Link-in-Bio page. It's free to start.
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full px-8 gap-2 font-semibold"
              >
                Create Your Free Page
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-primary-foreground/60 text-sm mt-4 flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              No credit card required. Set up in under 5 minutes.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
