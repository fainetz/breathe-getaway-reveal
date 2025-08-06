
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
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

// Debug component to log route changes and catch navigation issues
const RouteLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    console.log('Search params:', location.search);
    console.log('Full location:', location);
    
    // Check for any authentication-related errors in the URL or state
    if (location.search.includes('error') || location.search.includes('auth')) {
      console.warn('Possible auth-related URL detected:', location.search);
    }
    
    // Track if there's an unexpected redirect happening
    if (location.pathname !== '/' && !location.state && location.search.includes('error')) {
      console.error('Unexpected redirect detected - possible auth error causing redirect');
      console.error('Current path:', location.pathname);
      console.error('Search params:', location.search);
    }
  }, [location]);
  
  return null;
};

const App = () => {
  console.log('App component rendering');
  
  useEffect(() => {
    // Check for any global redirects or authentication issues
    console.log('App mounted - checking for global navigation issues');
    
    // Override window navigation to catch automatic redirects
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      console.log('History pushState called with:', args);
      return originalPushState.apply(this, args);
    };
    
    window.history.replaceState = function(...args) {
      console.log('History replaceState called with:', args);
      return originalReplaceState.apply(this, args);
    };
    
    // Listen for popstate events
    const handlePopState = (event: PopStateEvent) => {
      console.log('PopState event:', event);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <RouteLogger />
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
