
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Hero from '../components/Hero';
import WaitlistSection from '../components/WaitlistSection';

import Features from '../components/Features';

import EmotionalHooks from '../components/EmotionalHooks';
import Vision from '../components/Vision';
import Footer from '../components/Footer';
import FeatureRequestBox from '../components/FeatureRequestBox';
import ExpandableSearch from '../components/ExpandableSearch';
import BackToChatButton from '../components/BackToChatButton';
import MobileMenu from '../components/MobileMenu';
import { useScrollEffects } from '../hooks/useScrollEffects';

const Index = () => {
  const navigate = useNavigate();
  const [hasChatHistory, setHasChatHistory] = useState(false);
  const [showFlightAI, setShowFlightAI] = useState(false);

  // Initialize scroll effects
  useScrollEffects();

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
    <div className="min-h-screen min-h-dvh bg-background text-foreground overflow-x-hidden transition-colors duration-300 luxury-lighting dark:luxury-lighting-dark">
      <div className="scroll-scale scroll-bg-scale">
        <Hero />
      </div>
      <div className="transition-hero-features scroll-parallax scroll-morph"></div>
      <div className="scroll-reveal scroll-perspective">
        <Features />
      </div>
      <div className="transition-features-emotional scroll-parallax scroll-rotate"></div>
      <div className="scroll-reveal scroll-scale">
        <EmotionalHooks />
      </div>
      <div className="transition-emotional-luxury scroll-parallax scroll-morph"></div>
      <div className="scroll-reveal scroll-perspective">
        <Vision />
      </div>
      <div id="resultsSection" className="min-h-0"></div>
      <div className="scroll-reveal scroll-text-scale">
        <Footer />
      </div>
      <FeatureRequestBox />
      
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
