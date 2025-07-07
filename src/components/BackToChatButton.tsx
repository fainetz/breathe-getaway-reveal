
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface BackToChatButtonProps {
  onBackToChat: () => void;
  hasChatHistory: boolean;
}

const BackToChatButton = ({ onBackToChat, hasChatHistory }: BackToChatButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('BackToChatButton - hasChatHistory:', hasChatHistory);
    setIsVisible(hasChatHistory);
  }, [hasChatHistory]);

  console.log('BackToChatButton - isVisible:', isVisible);

  if (!isVisible) return null;

  return (
    <button
      onClick={onBackToChat}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-full p-4 shadow-lg hover:shadow-xl hover:bg-white/20 dark:hover:bg-white/20 hover:scale-105 transition-all duration-300 group"
      title="Return to Chat"
    >
      <ArrowRight className="w-6 h-6 text-gray-800 dark:text-white group-hover:translate-x-1 transition-transform duration-200" />
    </button>
  );
};

export default BackToChatButton;
