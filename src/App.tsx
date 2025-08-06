
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./hooks/useAuth";
import MiniCurvedNav from "./components/MiniCurvedNav";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import CuratedTrips from "./pages/CuratedTrips";
import Cart from "./pages/Cart";
import Chat from "./pages/Chat";
import FAQ from "./pages/FAQ";
import TripResults from "./pages/TripResults";
import Auth from "./pages/Auth";
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
            <MiniCurvedNav />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/curated-trips" element={<CuratedTrips />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/trip-results" element={<TripResults />} />
              <Route path="/auth" element={<Auth />} />
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
