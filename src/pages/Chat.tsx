import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TravelChatInterface from '../components/TravelChatInterface';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPrompt = searchParams.get('q') || '';

  // Scroll to top on mobile when component mounts
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleChatClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 animate-fade-in">
      <TravelChatInterface 
        isOpen={true} 
        onClose={handleChatClose}
        initialPrompt={initialPrompt}
      />
    </div>
  );
};

export default Chat;