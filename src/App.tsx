
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./hooks/useAuth";
import MiniCurvedNav from "./components/MiniCurvedNav";
import MobileMenu from "./components/MobileMenu";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import CuratedTrips from "./pages/CuratedTrips";
import Cart from "./pages/Cart";
import Chat from "./pages/Chat";
import FAQ from "./pages/FAQ";
import TripResults from "./pages/TripResults";
import Auth from "./pages/Auth";
import Waitlist from "./pages/Waitlist";
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";
import AdminFeedback from "./pages/AdminFeedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Mobile Menu - Always available */}
            <MobileMenu />
            
            {/* Mobile nav - positioned higher */}
            <div className="md:hidden fixed top-12 left-1/2 transform -translate-x-1/2 z-[60]" style={{ position: 'fixed' }}>
              <MiniCurvedNav />
            </div>
            {/* Desktop nav - positioned lower with scroll behavior */}
            <div className="hidden md:flex fixed top-24 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-300" style={{ position: 'fixed' }}>
              <MiniCurvedNav isIntegrated={true} />
            </div>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/curated-trips" element={<CuratedTrips />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/trip-results" element={<TripResults />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/:slug" element={<CommunityDetail />} />
              <Route path="/admin/feedback" element={<AdminFeedback />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/waitlist" element={<Waitlist />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
