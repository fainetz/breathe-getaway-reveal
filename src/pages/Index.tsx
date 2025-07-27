
import { useState } from 'react';
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

const Index = () => {
  const navigate = useNavigate();
  const [hasChatHistory, setHasChatHistory] = useState(false);

  const handleSearchSubmit = (query: string) => {
    console.log('Search submitted:', query);
    setHasChatHistory(true);
    navigate(`/chat?q=${encodeURIComponent(query)}`);
  };

  const handleBackToChat = () => {
    console.log('Back to chat clicked');
    navigate('/chat');
  };

  console.log('Index state - hasChatHistory:', hasChatHistory);

  return (
    <div className="min-h-screen min-h-dvh bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Hero />
      <div className="section-transition transition-hero-waitlist"></div>
      <WaitlistSection />
      <div className="section-transition transition-waitlist-features"></div>
      <Features />
      <div className="section-transition transition-features-howitworks"></div>
      <HowItWorks />
      <div className="section-transition transition-howitworks-emotional"></div>
      <EmotionalHooks />
      <div className="section-transition transition-emotional-luxury"></div>
      <LuxuryShowcase />
      <div className="section-transition transition-luxury-vision"></div>
      <Vision />
      <div id="resultsSection" className="min-h-0"></div>
      <Footer />
      <FeatureRequestBox />
      <ExpandableSearch onSearchSubmit={handleSearchSubmit} />
      <BackToChatButton 
        onBackToChat={handleBackToChat} 
        hasChatHistory={hasChatHistory} 
      />
    </div>
  );
};

export default Index;
