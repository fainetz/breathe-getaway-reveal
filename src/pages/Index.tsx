
import { useState, useEffect } from 'react';
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
import { useLuxuryScroll } from '../hooks/useLuxuryScroll';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Index = () => {
  const navigate = useNavigate();
  const [hasChatHistory, setHasChatHistory] = useState(false);
  const [showFlightAI, setShowFlightAI] = useState(false);
  
  // Luxury scroll effects
  const { scrollY, getParallaxOffset, getScrollProgress } = useLuxuryScroll();
  const featuresReveal = useScrollReveal({ threshold: 0.2 });
  const emotionalReveal = useScrollReveal({ threshold: 0.15 });
  const visionReveal = useScrollReveal({ threshold: 0.1 });

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

  // Dynamic background effect based on scroll
  const scrollProgress = getScrollProgress();
  const backgroundOpacity = Math.min(scrollProgress * 0.1, 0.05);

  return (
    <div 
      className="min-h-screen min-h-dvh bg-background text-foreground overflow-x-hidden luxury-scroll transition-all duration-700"
      style={{
        background: `linear-gradient(180deg, 
          hsl(var(--background)) 0%, 
          hsl(var(--background) / ${1 - backgroundOpacity}) 50%, 
          hsl(var(--primary) / ${backgroundOpacity * 0.5}) 100%
        )`
      }}
    >
      <Hero />
      
      {/* Dynamic transition with scroll effects */}
      <div 
        className="transition-hero-features scroll-glow"
        style={{
          transform: `translateY(${getParallaxOffset(0.1)}px)`,
        }}
      ></div>
      
      <div 
        ref={featuresReveal.elementRef}
        className={`reveal-on-scroll ${featuresReveal.isVisible ? 'visible' : ''}`}
        style={{
          transform: `translateY(${getParallaxOffset(0.05)}px)`,
        }}
      >
        <Features />
      </div>
      
      <div 
        className="transition-features-emotional"
        style={{
          transform: `translateY(${getParallaxOffset(0.08)}px)`,
        }}
      ></div>
      
      <div 
        ref={emotionalReveal.elementRef}
        className={`reveal-on-scroll ${emotionalReveal.isVisible ? 'visible' : ''}`}
        style={{
          transform: `translateY(${getParallaxOffset(0.03)}px)`,
        }}
      >
        <EmotionalHooks />
      </div>
      
      <div 
        className="transition-emotional-luxury"
        style={{
          transform: `translateY(${getParallaxOffset(0.06)}px)`,
        }}
      ></div>
      
      <div 
        ref={visionReveal.elementRef}
        className={`reveal-on-scroll ${visionReveal.isVisible ? 'visible' : ''}`}
        style={{
          transform: `translateY(${getParallaxOffset(0.02)}px)`,
        }}
      >
        <Vision />
      </div>
      
      <div id="resultsSection" className="min-h-0"></div>
      <Footer />
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
