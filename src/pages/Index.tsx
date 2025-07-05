
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import EmotionalHooks from '../components/EmotionalHooks';
import Vision from '../components/Vision';
import Footer from '../components/Footer';
import ChatBubble from '../components/ChatBubble';
import ExpandableSearch from '../components/ExpandableSearch';
import FloatingTravelElements from '../components/FloatingTravelElements';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden transition-colors duration-300">
      <Hero />
      <HowItWorks />
      <Features />
      <EmotionalHooks />
      <Vision />
      <div id="resultsSection" className="min-h-0"></div>
      <Footer />
      <ChatBubble />
      <ExpandableSearch />
      <FloatingTravelElements />
    </div>
  );
};

export default Index;
