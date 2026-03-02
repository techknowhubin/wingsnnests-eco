import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Home,
  Car,
  Bike,
  Compass,
  Calendar,
  DollarSign,
  Link2,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUnreadNotificationCount } from '@/hooks/useListings';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/host' },
  { icon: Bell, label: 'Notification', path: '/host/bookings', badge: true },
  { icon: Calendar, label: 'Reservation', path: '/host/bookings' },
  { icon: Home, label: 'Stays', path: '/host/stays' },
  { icon: Car, label: 'Cars', path: '/host/cars' },
  { icon: Bike, label: 'Bikes', path: '/host/bikes' },
  { icon: Compass, label: 'Experiences', path: '/host/experiences' },
  { icon: DollarSign, label: 'Financials', path: '/host/earnings' },
  { icon: Link2, label: 'Link-in-Bio', path: '/host/link' },
  { icon: Settings, label: 'Settings', path: '/host/settings' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const { data: unreadCount } = useUnreadNotificationCount(user?.id);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActivePath = (path: string) => {
    if (path === '/host') return location.pathname === '/host';
    return location.pathname.startsWith(path);
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'Host';

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
            X
          </div>
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Xplorwing</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-5 py-4 flex items-center gap-3">
        <Avatar className="h-11 w-11 border-2 border-border">
          <AvatarImage src={profile?.profile_image || ''} />
          <AvatarFallback className="bg-muted text-foreground text-sm font-semibold">
            {profile?.full_name?.charAt(0) || 'H'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{profile?.full_name || 'Host'}</p>
          <p className="text-xs text-muted-foreground">Host</p>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search.."
            className="pl-9 h-9 text-sm bg-muted/40 border-border rounded-lg"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-1">
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = isActivePath(item.path);
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                    isActive
                      ? "text-primary font-semibold bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-primary")} />
                  <span>{item.label}</span>
                  {item.badge && unreadCount && unreadCount > 0 && (
                    <span className="ml-auto h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-semibold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="p-4 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-sm"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] bg-card border-r border-border fixed left-0 top-0 h-screen z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-lg font-bold text-primary">Xplorwing</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.profile_image || ''} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {profile?.full_name?.charAt(0) || 'H'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-[240px] bg-card border-r border-border z-50"
            >
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-h-screen pt-14 lg:pt-0 lg:ml-[240px]">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
