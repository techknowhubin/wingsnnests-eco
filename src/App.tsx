import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stays from "./pages/Stays";
import Experiences from "./pages/Experiences";
import Bikes from "./pages/Bikes";
import Cars from "./pages/Cars";
import StayDetail from "./pages/StayDetail";
import BikeDetail from "./pages/BikeDetail";
import CarDetail from "./pages/CarDetail";
import ExperienceDetail from "./pages/ExperienceDetail";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";

// Host Dashboard Pages
import HostDashboard from "./pages/HostDashboard";
import HostStays from "./pages/HostStays";
import HostCars from "./pages/HostCars";
import HostBikes from "./pages/HostBikes";
import HostExperiences from "./pages/HostExperiences";
import HostBookings from "./pages/HostBookings";
import HostEarnings from "./pages/HostEarnings";
import HostLinkInBio from "./pages/HostLinkInBio";
import HostSettings from "./pages/HostSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/stays" element={<Stays />} />
            <Route path="/stays/:id" element={<StayDetail />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/experiences/:id" element={<ExperienceDetail />} />
            <Route path="/bikes" element={<Bikes />} />
            <Route path="/bikes/:id" element={<BikeDetail />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/help" element={<HelpCenter />} />
            
            {/* Host Dashboard Routes */}
            <Route path="/host" element={<HostDashboard />} />
            <Route path="/host/stays" element={<HostStays />} />
            <Route path="/host/cars" element={<HostCars />} />
            <Route path="/host/bikes" element={<HostBikes />} />
            <Route path="/host/experiences" element={<HostExperiences />} />
            <Route path="/host/bookings" element={<HostBookings />} />
            <Route path="/host/earnings" element={<HostEarnings />} />
            <Route path="/host/link" element={<HostLinkInBio />} />
            <Route path="/host/settings" element={<HostSettings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
