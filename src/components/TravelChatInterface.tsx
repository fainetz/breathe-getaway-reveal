
import { useState, useEffect, useRef } from 'react';
import { X, Send, MapPin, Clock, DollarSign, Minimize2, Maximize2 } from 'lucide-react';

interface TravelChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  destinations?: Destination[];
}

interface Destination {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  tags: string[];
}

const TravelChatInterface = ({ isOpen, onClose, initialPrompt }: TravelChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [currentDestinations, setCurrentDestinations] = useState<Destination[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockDestinations: Destination[] = [
    {
      id: '1',
      name: 'Santorini Sunset Villa',
      location: 'Santorini, Greece',
      price: '$299/night',
      image: '/lovable-uploads/06d30aba-bf87-4b11-ad56-860979ba2ed6.png',
      description: 'A breathtaking villa with panoramic sunset views over the Aegean Sea.',
      tags: ['Romantic', 'Sunset Views', 'Luxury']
    },
    {
      id: '2',
      name: 'Kyoto Temple Stay',
      location: 'Kyoto, Japan',
      price: '$180/night',
      image: '/lovable-uploads/3a90338f-3b9b-4d7f-a769-846168db9d31.png',
      description: 'Experience authentic Japanese culture in a traditional temple setting.',
      tags: ['Cultural', 'Meditation', 'Traditional']
    },
    {
      id: '3',
      name: 'Bali Rice Terrace Resort',
      location: 'Ubud, Bali',
      price: '$150/night',
      image: '/lovable-uploads/62358993-d15b-4b81-9c51-49ab4c2e8d79.png',
      description: 'Wake up to stunning rice terrace views in the heart of Bali.',
      tags: ['Nature', 'Peaceful', 'Wellness']
    }
  ];

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I found some amazing destinations based on "${text}". Here are my top recommendations that match your vibe:`,
        isUser: false,
        timestamp: new Date(),
        destinations: mockDestinations
      };

      setMessages(prev => [...prev, botMessage]);
      setCurrentDestinations(mockDestinations);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0 flex">
        {/* Chat Section - Left Side */}
        <div className={`${isChatMinimized ? 'w-16' : 'w-1/2'} transition-all duration-300 ease-out bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isChatMinimized && (
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Travel Agent</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let's find your perfect destination</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsChatMinimized(!isChatMinimized)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isChatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isChatMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                    <p className="text-base mb-2">👋 Hi! I'm your AI travel companion</p>
                    <p className="text-sm">Tell me how you're feeling or what kind of experience you're looking for!</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs ${message.isUser ? 'order-2' : 'order-1'}`}>
                      <div className={`px-3 py-2 rounded-2xl text-sm ${
                        message.isUser 
                          ? 'bg-blue-500 text-white ml-4' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mr-4'
                      }`}>
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 opacity-70 ${
                          message.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-2 mr-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about travel..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Results Section - Right Side */}
        <div className={`${isChatMinimized ? 'flex-1' : 'w-1/2'} transition-all duration-300 ease-out bg-gray-50 dark:bg-gray-950 flex flex-col overflow-hidden`}>
          {/* Results Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Recommended Destinations</h2>
            <p className="text-gray-600 dark:text-gray-400">Based on your conversation with our AI travel agent</p>
          </div>

          {/* Results Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {currentDestinations.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Start a conversation</h3>
                  <p className="text-gray-600 dark:text-gray-400">Tell our AI about your travel preferences and we'll show you personalized destination recommendations here.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {currentDestinations.map((destination) => (
                  <div key={destination.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-40 h-32 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{destination.name}</h4>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">{destination.price}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{destination.location}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{destination.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {destination.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelChatInterface;
