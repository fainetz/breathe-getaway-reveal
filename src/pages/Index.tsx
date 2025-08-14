
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Hero from '../components/Hero';
import WaitlistSection from '../components/WaitlistSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';

import EmotionalHooks from '../components/EmotionalHooks';
import Vision from '../components/Vision';
import Footer from '../components/Footer';
import FeatureRequestBox from '../components/FeatureRequestBox';
import ExpandableSearch from '../components/ExpandableSearch';
import BackToChatButton from '../components/BackToChatButton';
import MobileMenu from '../components/MobileMenu';

const Index = () => {
  const navigate = useNavigate();
  const [hasChatHistory, setHasChatHistory] = useState(false);
  const [showFlightAI, setShowFlightAI] = useState(false);

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
      <div className="transition-hero-howitworks"></div>
      <HowItWorks />
      <div className="transition-howitworks-features"></div>
      <Features />
      <div className="transition-features-emotional"></div>
      <EmotionalHooks />
      <div className="transition-emotional-luxury"></div>
      <Vision />
      <div id="resultsSection" className="min-h-0"></div>
      <Footer />
      <FeatureRequestBox />
      
      {/* Mobile Waitlist Button - centered above search bar */}
      <div className="md:hidden fixed bottom-36 left-1/2 -translate-x-1/2 z-30">
        <Link to="/waitlist">
          <Button className="bg-black dark:bg-white text-white dark:text-black font-medium px-6 py-2 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors duration-200 shadow-lg">
            Join the Waitlist
          </Button>
        </Link>
      </div>
      
      <ExpandableSearch onSearchSubmit={handleSearchSubmit} />
      <BackToChatButton 
        onBackToChat={handleBackToChat} 
        hasChatHistory={hasChatHistory} 
      />
      <MobileMenu />
    </div>
  );
};

export default Index;
