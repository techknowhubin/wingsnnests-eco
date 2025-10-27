import { Link } from "react-router-dom";
import { Home, Bike, Car, Compass, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Xplowing</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted travel companion for exploring incredible India. Discover stays, experiences, and adventures.
            </p>
            <div className="flex gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mt-1" />
              <span className="text-sm">Serving across India</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/stays" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Homestays
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Experiences
                </Link>
              </li>
              <li>
                <Link to="/bikes" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Bike Rentals
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Car Rentals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5" />
                <span className="text-sm">support@xplowing.in</span>
              </li>
              <li className="flex gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Xplowing. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
