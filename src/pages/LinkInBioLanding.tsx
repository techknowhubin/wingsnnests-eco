import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  X,
  ChevronDown,
  Sparkles,
  Globe,
  Smartphone,
  Palette,
  Share2,
  BarChart3,
  Shield,
  Zap,
  Star,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── data ─── */

const pricingCards = [
  {
    rate: "10%",
    description: "on every booking made through your",
    highlight: "Link-in-Bio",
    color: "from-primary/10 to-primary/5",
  },
  {
    rate: "20%",
    description: "Charged per booking when guests find you on our",
    highlight: "marketplace",
    color: "from-accent/40 to-accent/20",
  },
];

const features = [
  { icon: Globe, label: "Collect Bookings Directly" },
  { icon: Smartphone, label: "Mobile-Optimized Pages" },
  { icon: Palette, label: "Custom Themes & Branding" },
  { icon: Share2, label: "Share Anywhere" },
  { icon: BarChart3, label: "Track Performance" },
];

const comparisonRows = [
  { feature: "Commission", ours: "10%", others: "15-25%" },
  { feature: "Custom Branding", ours: true, others: false },
  { feature: "Direct Guest Relationship", ours: true, others: false },
  { feature: "Social Media Integration", ours: true, others: false },
  { feature: "Custom URL / Link-in-Bio", ours: true, others: false },
  { feature: "Instant Payouts", ours: true, others: false },
  { feature: "Multiple Listing Types", ours: true, others: false },
];

const testimonials = [
  {
    quote:
      "Since I started sharing my Xplorwing link on Instagram, my direct bookings have doubled. The 10% commission means I keep so much more of my earnings.",
    name: "Priya Sharma",
    role: "Homestay Host, Manali",
  },
  {
    quote:
      "I used to struggle to manage bookings across different platforms. Now I just share one link and everything flows in. It's a game-changer for my bike rental shop.",
    name: "Rahul Verma",
    role: "Bike Rental, Goa",
  },
  {
    quote:
      "The customizable themes let me match my page to my resort brand. Guests love the seamless experience from my Instagram bio to booking.",
    name: "Ananya Reddy",
    role: "Experience Host, Munnar",
  },
  {
    quote:
      "Managing my car fleet bookings was chaotic before this. Now guests can browse my cars, check availability, and book — all from one clean page.",
    name: "Vikram Singh",
    role: "Car Rental Service, Jaipur",
  },
];

const faqs = [
  {
    q: "What is Link-in-Bio?",
    a: "Link-in-Bio is your personal booking page — a single, beautiful link you can share on Instagram, WhatsApp, or anywhere. It showcases all your listings (stays, cars, bikes, experiences) and lets guests book directly from you.",
  },
  {
    q: "How much does it cost?",
    a: "There are no upfront fees, monthly charges, or hidden costs. We only charge a 10% commission on bookings made through your Link-in-Bio page — half of what you'd pay on the marketplace.",
  },
  {
    q: "Can I customize my page?",
    a: "Absolutely! Choose from multiple themes (Forest, Minimal, Sunset, Ocean), add your business name, tagline, social links, and select which listings to feature.",
  },
  {
    q: "How do payments work?",
    a: "Guests pay securely through our platform. Your earnings (minus the 10% commission) are transferred directly to your bank account with instant payout support.",
  },
  {
    q: "Can I use it for multiple listing types?",
    a: "Yes! Whether you rent homestays, cars, bikes, or offer experiences — all of them can be showcased on your single Link-in-Bio page.",
  },
  {
    q: "Is it really free to start?",
    a: "Yes! Sign up, list your services, customize your page, and start sharing your link — all for free. You only pay the commission when you earn.",
  },
];

const steps = [
  { step: "01", title: "Sign Up", desc: "Create your free host account in under 2 minutes." },
  { step: "02", title: "Customize", desc: "Pick a theme, add your brand, and select listings." },
  { step: "03", title: "Share", desc: "Drop your link on Instagram, WhatsApp, or anywhere." },
  { step: "04", title: "Earn", desc: "Get direct bookings at just 10% commission." },
];

/* ─── component ─── */

export default function LinkInBioLanding() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden py-24 lg:py-36 bg-primary/[0.04]">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
          >
            We earn only when
            <br />
            <span className="text-primary-text">you earn</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We charge a small commission on your bookings.
            <br className="hidden sm:block" />
            No CC required. No upfront fees. No recurring charges.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10"
          >
            <Link to="/signup">
              <Button size="lg" className="rounded-full px-10 gap-2 text-base">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ Pricing Cards ═══ */}
      <section className="py-20 bg-primary/[0.06]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingCards.map((card, i) => (
              <motion.div
                key={card.rate}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <Card className="h-full border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
                        {card.rate}
                      </span>
                      <Sparkles className="h-8 w-8 text-primary-text/40" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {card.description}{" "}
                      <span className="font-semibold text-foreground">{card.highlight}</span>.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Custom card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24, duration: 0.5 }}
            >
              <Card className="h-full border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                      Custom
                    </span>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Making <span className="font-semibold text-foreground">₹10L+</span> each
                      month? Let's create something just for you.
                    </p>
                  </div>
                  <Link to="/help" className="mt-6">
                    <Button className="w-full rounded-full" variant="default">
                      Contact Sales
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Scrolling Features Strip ═══ */}
      <section className="py-6 border-y border-border/40 bg-card overflow-hidden">
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: [0, -800] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...features, ...features, ...features].map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-muted-foreground shrink-0">
              <f.icon className="h-5 w-5 text-primary-text" />
              <span className="text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Start in 4 simple steps
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-black text-primary-text/10 mb-2">{s.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Comparison Table ═══ */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-primary-text uppercase mb-3">
              Comparison
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Here's why we edge past others
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Lower commissions, full branding control, and tools built specifically for service providers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12"
          >
            <Card className="overflow-hidden border-border">
              {/* Header */}
              <div className="grid grid-cols-3 text-sm font-semibold border-b border-border">
                <div className="p-5 text-muted-foreground">Feature</div>
                <div className="p-5 text-center">
                  <span className="inline-flex items-center gap-1.5 text-primary-text font-bold">
                    Xplorwing
                  </span>
                </div>
                <div className="p-5 text-center text-muted-foreground">Others</div>
              </div>

              {/* Rows */}
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 text-sm border-b border-border/50 last:border-0 ${
                    i % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  <div className="p-4 font-medium text-foreground">{row.feature}</div>
                  <div className="p-4 flex items-center justify-center">
                    {typeof row.ours === "string" ? (
                      <span className="font-bold text-primary-text">{row.ours}</span>
                    ) : row.ours ? (
                      <CheckCircle2 className="h-5 w-5 text-primary-text" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {typeof row.others === "string" ? (
                      <span className="text-muted-foreground">{row.others}</span>
                    ) : row.others ? (
                      <CheckCircle2 className="h-5 w-5 text-primary-text" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/40" />
                    )}
                  </div>
                </div>
              ))}
            </Card>

            <div className="text-center mt-8">
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-10 gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Hosts love us. Here's why.
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-primary text-primary-text" />
                      ))}
                    </div>
                    <blockquote className="text-foreground leading-relaxed mb-6 text-[15px]">
                      "{t.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-text">
                          {t.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground">
              Can't find the answer you're looking for?{" "}
              <Link to="/help" className="text-primary-text font-medium hover:underline">
                Reach out to us
              </Link>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border/50 rounded-xl px-6 overflow-hidden bg-background"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-primary rounded-3xl p-12 md:p-20"
          >
            <Zap className="h-10 w-10 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to grow your bookings?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of service providers earning more with their own Link-in-Bio page.
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full px-10 gap-2 font-semibold text-base"
              >
                Create Your Free Page <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-primary-foreground/60 text-sm mt-5 flex items-center justify-center gap-2">
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
