
import { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface BackToChatButtonProps {
  onBackToChat: () => void;
  hasChatHistory: boolean;
}

const BackToChatButton = ({ onBackToChat, hasChatHistory }: BackToChatButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(hasChatHistory);
  }, [hasChatHistory]);

  if (!isVisible) return null;

  return (
    <button
      onClick={onBackToChat}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
      title="Return to Chat"
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-gray-700 dark:text-white" />
        <ArrowRight className="w-4 h-4 text-gray-700 dark:text-white group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </button>
  );
};

export default BackToChatButton;
