import { motion } from 'framer-motion';
import {
  Home,
  Car,
  Bike,
  Compass,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  useHostStays,
  useHostCars,
  useHostBikes,
  useHostExperiences,
  useHostBookings,
} from '@/hooks/useListings';
import { formatPrice, calculateCommission } from '@/lib/supabase-helpers';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function DashboardOverview() {
  const { user } = useAuth();
  const { data: stays = [] } = useHostStays(user?.id);
  const { data: cars = [] } = useHostCars(user?.id);
  const { data: bikes = [] } = useHostBikes(user?.id);
  const { data: experiences = [] } = useHostExperiences(user?.id);
  const { data: bookings = [] } = useHostBookings(user?.id);

  const totalListings = stays.length + cars.length + bikes.length + experiences.length;
  const pendingBookings = bookings.filter((b) => b.booking_status === 'pending').length;
  const confirmedBookings = bookings.filter((b) => b.booking_status === 'confirmed').length;
  const completedBookings = bookings.filter((b) => b.booking_status === 'completed').length;

  // Calculate earnings
  const totalEarnings = bookings
    .filter((b) => b.payment_status === 'completed')
    .reduce((sum, b) => {
      const { hostEarnings } = calculateCommission(b.total_price, true);
      return sum + hostEarnings;
    }, 0);

  const thisMonthBookings = bookings.filter((b) => {
    const bookingDate = new Date(b.created_at);
    const now = new Date();
    return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
  });

  const thisMonthEarnings = thisMonthBookings
    .filter((b) => b.payment_status === 'completed')
    .reduce((sum, b) => {
      const { hostEarnings } = calculateCommission(b.total_price, true);
      return sum + hostEarnings;
    }, 0);

  const totalViews = [...stays, ...cars, ...bikes, ...experiences].reduce(
    (sum, listing) => sum + (listing.views_count || 0),
    0
  );

  const stats = [
    {
      label: 'Total Listings',
      value: totalListings,
      icon: Home,
      change: '+12%',
      positive: true,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Active Bookings',
      value: confirmedBookings,
      icon: Calendar,
      change: `${pendingBookings} pending`,
      positive: true,
      color: 'bg-accent/10 text-accent',
    },
    {
      label: 'This Month',
      value: formatPrice(thisMonthEarnings),
      icon: TrendingUp,
      change: `${thisMonthBookings.length} bookings`,
      positive: true,
      color: 'bg-green-500/10 text-green-600',
    },
    {
      label: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: Eye,
      change: '+8%',
      positive: true,
      color: 'bg-blue-500/10 text-blue-600',
    },
  ];

  const listingTypes = [
    { icon: Home, label: 'Stays', count: stays.length, path: '/host/stays', color: 'text-primary' },
    { icon: Car, label: 'Cars', count: cars.length, path: '/host/cars', color: 'text-accent' },
    { icon: Bike, label: 'Bikes', count: bikes.length, path: '/host/bikes', color: 'text-orange-500' },
    { icon: Compass, label: 'Experiences', count: experiences.length, path: '/host/experiences', color: 'text-purple-500' },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your listings.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge
                  variant="outline"
                  className={stat.positive ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl lg:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Listing Types */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Your Listings</CardTitle>
            <CardDescription>Manage all your listings across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {listingTypes.map((type) => (
                <Link key={type.path} to={type.path}>
                  <div className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/30 transition-all cursor-pointer group">
                    <type.icon className={`h-8 w-8 ${type.color} mb-3`} />
                    <p className="text-2xl font-bold">{type.count}</p>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {type.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Bookings & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest booking activity</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/host/bookings">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentBookings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No bookings yet</p>
                  <p className="text-sm mt-1">Share your listings to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary">
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium capitalize">{booking.listing_type}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(booking.start_date), 'MMM d')} -{' '}
                            {format(new Date(booking.end_date), 'MMM d')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatPrice(booking.total_price)}</p>
                        <Badge
                          variant={
                            booking.booking_status === 'confirmed'
                              ? 'default'
                              : booking.booking_status === 'pending'
                              ? 'secondary'
                              : 'outline'
                          }
                          className="text-xs"
                        >
                          {booking.booking_status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Earnings Summary */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Earnings Summary</CardTitle>
                <CardDescription>Your earnings breakdown</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/host/earnings">Details</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-3xl font-bold text-primary mt-1">{formatPrice(totalEarnings)}</p>
                  <p className="text-xs text-muted-foreground mt-1">After 20% marketplace commission</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="text-xl font-bold text-green-600">{completedBookings}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-xl font-bold text-yellow-600">{pendingBookings}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">💡 Tip: Use Link-in-Bio for 10% commission</p>
                  <Button className="w-full" asChild>
                    <Link to="/host/link">
                      Create Your Link-in-Bio
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
