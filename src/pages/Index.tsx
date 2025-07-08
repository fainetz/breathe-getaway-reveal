
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
import BackToChatButton from '../components/BackToChatButton';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState('');
  const [hasChatHistory, setHasChatHistory] = useState(false);

  const handleSearchSubmit = (query: string) => {
    console.log('Search submitted:', query);
    setChatPrompt(query);
    setIsChatOpen(true);
    setHasChatHistory(true);
    
    // Reset zoom when opening chat interface on mobile
    if (window.innerWidth <= 768) {
      // Force zoom reset by manipulating viewport
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        const currentContent = viewport.getAttribute('content') || '';
        viewport.setAttribute('content', currentContent + ', user-scalable=no');
        setTimeout(() => {
          viewport.setAttribute('content', currentContent);
          // Additional zoom reset attempts
          document.body.style.zoom = '1';
          if (window.visualViewport) {
            window.scrollTo(0, 0);
          }
        }, 100);
      }
    }
  };

  const handleChatClose = () => {
    console.log('Chat closed, hasChatHistory remains:', true);
    setIsChatOpen(false);
    setChatPrompt('');
    // Keep hasChatHistory true so the back button remains visible
  };

  const handleBackToChat = () => {
    console.log('Back to chat clicked');
    setIsChatOpen(true);
  };

  console.log('Index state - isChatOpen:', isChatOpen, 'hasChatHistory:', hasChatHistory);

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
      <BackToChatButton 
        onBackToChat={handleBackToChat} 
        hasChatHistory={hasChatHistory && !isChatOpen} 
      />
      <TravelChatInterface 
        isOpen={isChatOpen} 
        onClose={handleChatClose}
        initialPrompt={chatPrompt}
      />
    </div>
  );
};

export default Index;
