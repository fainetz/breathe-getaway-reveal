
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
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
      title="Return to Chat"
    >
      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
    </button>
  );
};

export default BackToChatButton;
