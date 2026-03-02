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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUnreadNotificationCount } from '@/hooks/useListings';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const mainMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/host' },
  { icon: Calendar, label: 'Bookings', path: '/host/bookings' },
  { icon: Home, label: 'Stays', path: '/host/stays' },
  { icon: Car, label: 'Cars', path: '/host/cars' },
  { icon: Bike, label: 'Bikes', path: '/host/bikes' },
  { icon: Compass, label: 'Experiences', path: '/host/experiences' },
];

const operationsMenuItems = [
  { icon: DollarSign, label: 'Earnings', path: '/host/earnings' },
  { icon: Link2, label: 'Link-in-Bio', path: '/host/link' },
  { icon: Settings, label: 'Settings', path: '/host/settings' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getPageTitle(pathname: string) {
  const map: Record<string, { title: string; subtitle: string }> = {
    '/host': { title: 'Dashboard Overview', subtitle: 'Monitor your listings and performance' },
    '/host/bookings': { title: 'Bookings', subtitle: 'Review and manage all customer bookings' },
    '/host/stays': { title: 'Stays', subtitle: 'Manage your homestays and properties' },
    '/host/cars': { title: 'Cars', subtitle: 'Manage your rental cars' },
    '/host/bikes': { title: 'Bikes', subtitle: 'Manage your rental bikes' },
    '/host/experiences': { title: 'Experiences', subtitle: 'Manage your tours and activities' },
    '/host/earnings': { title: 'Earnings', subtitle: 'Track your revenue and payouts' },
    '/host/link': { title: 'Link-in-Bio', subtitle: 'Create your custom booking page' },
    '/host/settings': { title: 'Settings', subtitle: 'Manage your account preferences' },
  };
  return map[pathname] || { title: 'Dashboard', subtitle: '' };
}

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

  const greeting = getGreeting();
  const firstName = profile?.full_name?.split(' ')[0] || 'Host';
  const pageInfo = getPageTitle(location.pathname);

  const renderMenuItems = (items: typeof mainMenuItems) =>
    items.map((item) => {
      const isActive = isActivePath(item.path);
      return (
        <li key={item.path}>
          <Link
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-secondary/50",
              isActive
                ? "text-primary font-semibold bg-primary/10"
                : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-primary")} />
            <span>{item.label}</span>
          </Link>
        </li>
      );
    });

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-border">
        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          X
        </div>
        <div>
          <span className="text-base font-bold text-foreground">Xplorwing</span>
          <p className="text-[11px] text-muted-foreground leading-none">Host Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 overflow-y-auto px-3">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Main</p>
        <ul className="space-y-0.5 mb-6">
          {renderMenuItems(mainMenuItems)}
        </ul>

        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Operations</p>
        <ul className="space-y-0.5">
          {renderMenuItems(operationsMenuItems)}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[250px] bg-card border-r border-border fixed left-0 top-0 h-screen z-40">
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
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-[250px] bg-card border-r border-border z-50 flex flex-col"
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
      <main className="flex-1 min-h-screen pt-14 lg:pt-0 lg:ml-[250px]">
        {/* Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-card border-b border-border sticky top-0 z-30">
          <div>
            <p className="text-sm text-muted-foreground">{greeting}, {firstName}</p>
            <h1 className="text-lg font-semibold text-foreground leading-tight">{pageInfo.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 h-9 bg-muted/50 border-border"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount && unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>

            <div className="flex items-center gap-3 pl-3 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground leading-tight">{profile?.full_name || 'Host'}</p>
                <p className="text-[11px] text-muted-foreground">Host</p>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarImage src={profile?.profile_image || ''} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
