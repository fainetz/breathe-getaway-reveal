
import { useState, useEffect, useRef } from 'react';
import { X, Send, MapPin, Clock, DollarSign } from 'lucide-react';

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
      <div className="absolute inset-y-0 right-0 w-full max-w-4xl bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Travel Assistant</h2>
            <p className="text-gray-600 dark:text-gray-400">Let's find your perfect destination</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 h-[calc(100vh-200px)]">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
              <p className="text-lg mb-2">👋 Hi! I'm your AI travel companion</p>
              <p>Tell me how you're feeling or what kind of experience you're looking for!</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.isUser ? 'order-2' : 'order-1'}`}>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.isUser 
                    ? 'bg-blue-500 text-white ml-4' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mr-4'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 opacity-70 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {/* Destinations */}
                {message.destinations && (
                  <div className="mt-6 space-y-4">
                    {message.destinations.map((destination) => (
                      <div key={destination.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex">
                          <img 
                            src={destination.image} 
                            alt={destination.name}
                            className="w-32 h-32 object-cover"
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
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 mr-4">
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
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tell me more about what you're looking for..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TravelChatInterface;
