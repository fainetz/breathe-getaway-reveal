
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import WaitlistSection from '../components/WaitlistSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import LuxuryShowcase from '../components/LuxuryShowcase';
import EmotionalHooks from '../components/EmotionalHooks';
import Vision from '../components/Vision';
import Footer from '../components/Footer';
import FeatureRequestBox from '../components/FeatureRequestBox';
import ExpandableSearch from '../components/ExpandableSearch';
import BackToChatButton from '../components/BackToChatButton';
import AIAssistantChat from '../components/AIAssistantChat';

const Index = () => {
  const navigate = useNavigate();
  const [hasChatHistory, setHasChatHistory] = useState(false);
  const [showFlightAI, setShowFlightAI] = useState(false);

  useEffect(() => {
    console.log('Index component mounted - checking for redirects');
    
    // Check if any component is trying to navigate
    const checkForRedirects = () => {
      console.log('Current URL:', window.location.href);
      console.log('Current pathname:', window.location.pathname);
      
      // Check for any authentication errors in URL
      const urlParams = new URLSearchParams(window.location.search);
      const hasError = urlParams.get('error');
      const hasAuth = urlParams.get('auth');
      
      if (hasError) {
        console.error('URL contains error parameter:', hasError);
      }
      if (hasAuth) {
        console.log('URL contains auth parameter:', hasAuth);
      }
      
      // Check localStorage for any redirect flags
      const storedRedirect = localStorage.getItem('redirect');
      const storedAuth = localStorage.getItem('auth');
      if (storedRedirect) {
        console.log('Found stored redirect:', storedRedirect);
      }
      if (storedAuth) {
        console.log('Found stored auth:', storedAuth);
      }
    };
    
    checkForRedirects();
    
    // Set up an interval to catch any delayed redirects
    const interval = setInterval(() => {
      if (window.location.pathname !== '/') {
        console.log('Detected automatic redirect to:', window.location.pathname);
        clearInterval(interval);
      }
    }, 100);
    
    // Clean up interval after 5 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSearchSubmit = (query: string) => {
    console.log('Search submitted:', query);
    setHasChatHistory(true);
    navigate(`/trip-results?q=${encodeURIComponent(query)}`);
  };

  const handleBackToChat = () => {
    console.log('Back to chat clicked');
    navigate('/chat');
  };

  console.log('Index state - hasChatHistory:', hasChatHistory);

  return (
    <div className="min-h-screen min-h-dvh bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Hero />
      <div className="transition-hero-waitlist"></div>
      <WaitlistSection />
      <div className="transition-waitlist-features"></div>
      <Features />
      <div className="transition-features-howitworks"></div>
      <HowItWorks />
      <div className="transition-howitworks-emotional"></div>
      <EmotionalHooks />
      <div className="transition-emotional-luxury"></div>
      <LuxuryShowcase />
      <div className="transition-luxury-vision"></div>
      <Vision />
      <div id="resultsSection" className="min-h-0"></div>
      <Footer />
      <FeatureRequestBox />
      <ExpandableSearch onSearchSubmit={handleSearchSubmit} />
      <AIAssistantChat onSearchSubmit={handleSearchSubmit} />
      <BackToChatButton 
        onBackToChat={handleBackToChat} 
        hasChatHistory={hasChatHistory} 
      />
    </div>
  );
};

export default Index;
