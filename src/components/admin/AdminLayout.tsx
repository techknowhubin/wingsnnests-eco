import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useAdminMetrics } from '@/hooks/useAdmin';
import logoLight from '@/assets/logo-light.png';
import {
  LayoutDashboard, ShieldCheck, CheckSquare, Store, Users,
  CalendarCheck, Building2, Wallet, BarChart3, Settings,
  LogOut, FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

type NavItem = {
  label: string;
  to: string;
  icon: React.ElementType;
  badge?: number;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

function SidebarNavItem({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === '/admin'}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative',
          isActive
            ? 'bg-white/10 text-white font-semibold border-l-2 border-[#D4E034] pl-[10px]'
            : 'text-white/60 hover:text-white hover:bg-white/10 border-l-2 border-transparent pl-[10px]'
        )
      }
    >
      <item.icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && item.badge > 0 && (
        <span className="ml-auto bg-[#D4E034] text-[#013220] text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none">
          {item.badge > 99 ? '99+' : item.badge}
        </span>
      )}
    </NavLink>
  );
}

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: metrics } = useAdminMetrics();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Signed out', description: 'You have been signed out of the admin panel.' });
    navigate('/auth');
  };

  const sections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Platform Overview', to: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Approvals',
      items: [
        { label: 'KYC Review', to: '/admin/kyc', icon: ShieldCheck, badge: metrics?.pendingKyc },
        { label: 'Listing Approvals', to: '/admin/listings', icon: CheckSquare, badge: metrics?.pendingListings },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Providers', to: '/admin/providers', icon: Store },
        { label: 'Travelers', to: '/admin/users', icon: Users },
        { label: 'All Bookings', to: '/admin/bookings', icon: CalendarCheck },
        { label: 'Hub Partners', to: '/admin/hubs', icon: Building2 },
      ],
    },
    {
      title: 'Finance',
      items: [
        { label: 'Payouts', to: '/admin/payouts', icon: Wallet },
        { label: 'Revenue Analytics', to: '/admin/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'Platform',
      items: [
        { label: 'Blog Posts', to: '/admin/blog-posts', icon: FileText },
        { label: 'Settings', to: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* ── Sidebar ── */}
      <aside className="w-[240px] shrink-0 bg-[#013220] flex flex-col h-screen sticky top-0 overflow-hidden">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <img src={logoLight} alt="Xplorwing" className="h-8 w-auto" />
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D4E034]/20 border border-[#D4E034]/30">
            <ShieldCheck className="h-3 w-3 text-[#D4E034]" />
            <span className="text-[10px] font-bold text-[#D4E034] uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-1 text-[10px] font-bold tracking-widest uppercase text-white/30">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <SidebarNavItem key={item.to} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User + Sign Out */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-[#D4E034] flex items-center justify-center text-[#013220] font-black text-xs shrink-0">
              {user?.email?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.email ?? 'Admin'}</p>
              <p className="text-[10px] text-white/40">Super Admin</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10 text-xs"
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 gap-3 sticky top-0 z-40 shrink-0">
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>System operational</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
