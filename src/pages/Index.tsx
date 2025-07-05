
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import EmotionalHooks from '../components/EmotionalHooks';
import Vision from '../components/Vision';
import Footer from '../components/Footer';
import ChatBubble from '../components/ChatBubble';
import ExpandableSearch from '../components/ExpandableSearch';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <Features />
      <EmotionalHooks />
      <Vision />
      <div id="resultsSection" className="min-h-0"></div>
      <Footer />
      <ChatBubble />
      <ExpandableSearch />
    </div>
  );
};

export default Index;
