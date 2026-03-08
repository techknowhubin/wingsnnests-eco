import { useState } from "react";
import { Moon, Sun, Menu, User, Heart, X, Home, Car, Bike, Compass, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import logo from "@/assets/logo.png";

const mobileNavLinks = [
  { label: "Stays", icon: Home, to: "/stays" },
  { label: "Experiences", icon: Compass, to: "/experiences" },
  { label: "Bikes", icon: Bike, to: "/bikes" },
  { label: "Cars", icon: Car, to: "/cars" },
  { label: "Destinations", icon: MapPin, to: "/destinations" },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 glass-effect"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="transition-all duration-300"
              >
                <img src={logo} alt="Xplorwing" className="h-8 w-auto" />
              </motion.div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <MegaMenu />
              <Link
                to="/stays"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/50"
              >
                Stays
              </Link>
              <Link
                to="/experiences"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/50"
              >
                Experiences
              </Link>
              <Link
                to="/bikes"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/50"
              >
                Bikes
              </Link>
              <Link
                to="/cars"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent/50"
              >
                Cars
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hidden md:flex"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>

              <Link to="/login">
                <Button variant="ghost" className="gap-2 rounded-full p-1 pr-3 glass-effect hover:bg-white/20 dark:hover:bg-white/10">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-border/50 flex items-center justify-center overflow-hidden">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-foreground">Login</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-sm bg-card border-l border-border shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <img src={logo} alt="Xplorwing" className="h-7 w-auto" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-1">
                  {mobileNavLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-muted/60 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <link.icon className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom actions */}
              <div className="p-4 border-t border-border space-y-3">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="gradient" className="w-full rounded-full gap-2">
                    <User className="h-4 w-4" />
                    Login / Sign Up
                  </Button>
                </Link>
                <Link to="/host/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full mt-2">
                    Become a Host
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
