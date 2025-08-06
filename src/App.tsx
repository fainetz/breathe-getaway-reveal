
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import CuratedTrips from "./pages/CuratedTrips";
import Cart from "./pages/Cart";
import Chat from "./pages/Chat";
import FAQ from "./pages/FAQ";
import TripResults from "./pages/TripResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries to avoid masking errors
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/destinations" element={<ErrorBoundary><Destinations /></ErrorBoundary>} />
                  <Route path="/curated-trips" element={<ErrorBoundary><CuratedTrips /></ErrorBoundary>} />
                  <Route path="/cart" element={<ErrorBoundary><Cart /></ErrorBoundary>} />
                  <Route path="/chat" element={<ErrorBoundary><Chat /></ErrorBoundary>} />
                  <Route path="/faq" element={<ErrorBoundary><FAQ /></ErrorBoundary>} />
                  <Route path="/trip-results" element={<ErrorBoundary><TripResults /></ErrorBoundary>} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
