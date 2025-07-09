
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden transition-colors duration-300">
      {/* Search bar at the very top */}
      <div className="relative z-50 pt-4 px-4">
        <ExpandableSearch onSearchSubmit={handleSearchSubmit} />
      </div>
      
      <Hero />
      <HowItWorks />
      <Features />
      <EmotionalHooks />
      <Vision />
      <div id="resultsSection" className="min-h-0"></div>
      <Footer />
      <FeatureRequestBox />
      <BackToChatButton 
        onBackToChat={handleBackToChat} 
        hasChatHistory={hasChatHistory} 
      />
    </div>
  );
};

export default Index;
