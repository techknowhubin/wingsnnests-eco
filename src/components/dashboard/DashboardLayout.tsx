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
  ChevronLeft,
  Bell,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUnreadNotificationCount } from '@/hooks/useListings';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/host' },
  { icon: Home, label: 'Stays', path: '/host/stays' },
  { icon: Car, label: 'Cars', path: '/host/cars' },
  { icon: Bike, label: 'Bikes', path: '/host/bikes' },
  { icon: Compass, label: 'Experiences', path: '/host/experiences' },
  { icon: Calendar, label: 'Bookings', path: '/host/bookings' },
  { icon: DollarSign, label: 'Earnings', path: '/host/earnings' },
  { icon: Link2, label: 'Link-in-Bio', path: '/host/link' },
  { icon: Settings, label: 'Settings', path: '/host/settings' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        className="hidden lg:flex flex-col border-r border-border bg-card fixed left-0 top-0 h-screen z-40"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-xl font-bold text-primary">Xplorwing</span>
                <Badge variant="secondary" className="text-xs">Host</Badge>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      "hover:bg-secondary/50",
                      isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <AnimatePresence mode="wait">
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="text-sm font-medium whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={profile?.profile_image || ''} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium truncate">{profile?.full_name || 'Host'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {sidebarOpen && (
            <Button
              variant="ghost"
              className="w-full mt-3 justify-start text-muted-foreground hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-lg font-bold text-primary">Xplorwing</span>
          <Badge variant="secondary" className="text-xs">Host</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
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
              className="lg:hidden fixed left-0 top-0 h-full w-[280px] bg-card border-r border-border z-50"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                <span className="text-xl font-bold text-primary">Xplorwing</span>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="py-4">
                <ul className="space-y-1 px-2">
                  {menuItems.map((item) => {
                    const isActive = isActivePath(item.path);
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                            "hover:bg-secondary/50",
                            isActive && "bg-primary text-primary-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 min-h-screen pt-16 lg:pt-0 transition-all duration-300",
          sidebarOpen ? "lg:ml-[260px]" : "lg:ml-[72px]"
        )}
      >
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
