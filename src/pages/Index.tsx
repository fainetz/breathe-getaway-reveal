
import { useState } from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import EmotionalHooks from '../components/EmotionalHooks';
import Vision from '../components/Vision';
import Footer from '../components/Footer';
import FeatureRequestBox from '../components/FeatureRequestBox';
import ExpandableSearch from '../components/ExpandableSearch';
import TravelChatInterface from '../components/TravelChatInterface';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState('');

  const handleSearchSubmit = (query: string) => {
    setChatPrompt(query);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setChatPrompt('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden transition-colors duration-300">
      <Hero />
      <HowItWorks />
      <Features />
      <EmotionalHooks />
      <Vision />
      <div id="resultsSection" className="min-h-0"></div>
      <Footer />
      <FeatureRequestBox />
      <ExpandableSearch onSearchSubmit={handleSearchSubmit} />
      <TravelChatInterface 
        isOpen={isChatOpen} 
        onClose={handleChatClose}
        initialPrompt={chatPrompt}
      />
    </div>
  );
};

export default Index;
