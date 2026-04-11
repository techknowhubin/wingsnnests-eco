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
import LinkInBioLanding from "./pages/LinkInBioLanding";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import UserOnboarding from "./pages/UserOnboarding";
import HostOnboarding from "./pages/HostOnboarding";
import UserProfile from "./pages/UserProfile";

// Host Dashboard
import HostLayout from "./pages/HostLayout";
import HostDashboard from "./pages/HostDashboard";
import HostStays from "./pages/HostStays";
import HostCars from "./pages/HostCars";
import HostBikes from "./pages/HostBikes";
import HostExperiences from "./pages/HostExperiences";
import HostBookings from "./pages/HostBookings";
import HostEarnings from "./pages/HostEarnings";
import HostLinkInBio from "./pages/HostLinkInBio";
import HostSettings from "./pages/HostSettings";
import HostAddStay from "./pages/HostAddStay";
import HostAddCar from "./pages/HostAddCar";
import HostAddBike from "./pages/HostAddBike";
import HostAddExperience from "./pages/HostAddExperience";

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
            <Route path="/link-in-bio" element={<LinkInBioLanding />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:name" element={<DestinationDetail />} />
            <Route path="/onboarding/user" element={<UserOnboarding />} />
            
            {/* Host Dashboard — shared layout, only content transitions */}
            <Route path="/host" element={<HostLayout />}>
              <Route index element={<HostDashboard />} />
              <Route path="stays" element={<HostStays />} />
              <Route path="stays/add" element={<HostAddStay />} />
              <Route path="cars" element={<HostCars />} />
              <Route path="cars/add" element={<HostAddCar />} />
              <Route path="bikes" element={<HostBikes />} />
              <Route path="bikes/add" element={<HostAddBike />} />
              <Route path="experiences" element={<HostExperiences />} />
              <Route path="experiences/add" element={<HostAddExperience />} />
              <Route path="bookings" element={<HostBookings />} />
              <Route path="earnings" element={<HostEarnings />} />
              <Route path="link" element={<HostLinkInBio />} />
              <Route path="settings" element={<HostSettings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
