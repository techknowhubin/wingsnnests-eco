import { Moon, Sun, Menu, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import logo from "@/assets/logo.png";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
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
              className="dark:bg-gradient-to-br dark:from-white dark:to-gray-100 dark:rounded-xl dark:px-3 dark:py-1.5 dark:shadow-[0_4px_20px_rgba(255,255,255,0.4),_0_0_40px_rgba(1,50,32,0.3)] dark:border dark:border-white/50 transition-all duration-300"
            >
              <img src={logo} alt="Xplorwing" className="h-10 w-auto" />
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
              <Button variant="outline" className="gap-2 rounded-full">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Login</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
