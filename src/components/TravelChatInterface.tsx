
import { useState, useRef, useEffect } from 'react';
import { X, Send, ChevronLeft, ChevronRight, MapPin, Calendar, DollarSign, Plane } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  price: string;
  duration: string;
  description: string;
  type: 'flight' | 'hotel' | 'cruise';
}

interface TravelChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const TravelChatInterface = ({ isOpen, onClose, initialPrompt }: TravelChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock destinations data
  const mockDestinations: Destination[] = [
    {
      id: '1',
      name: 'Santorini',
      location: 'Greece',
      image: '/lovable-uploads/81ee22b8-cbb0-4bfa-8e2b-3450bbcccd91.png',
      price: '$1,200',
      duration: '7 days',
      description: 'Experience the breathtaking sunsets and crystal-clear waters of this iconic Greek island.',
      type: 'flight'
    },
    {
      id: '2',
      name: 'Bali Resort',
      location: 'Indonesia',
      image: '/lovable-uploads/81ee22b8-cbb0-4bfa-8e2b-3450bbcccd91.png',
      price: '$800',
      duration: '5 days',
      description: 'Luxury resort with pristine beaches and world-class spa treatments.',
      type: 'hotel'
    },
    {
      id: '3',
      name: 'Mediterranean Cruise',
      location: 'Multiple Ports',
      image: '/lovable-uploads/81ee22b8-cbb0-4bfa-8e2b-3450bbcccd91.png',
      price: '$2,500',
      duration: '14 days',
      description: 'Explore multiple Mediterranean destinations in luxury and comfort.',
      type: 'cruise'
    }
  ];

  useEffect(() => {
    if (initialPrompt && isOpen && messages.length === 0) {
      handleInitialPrompt(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInitialPrompt = async (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: prompt,
      timestamp: new Date()
    };

    setMessages([userMessage]);
    setIsLoading(true);

    // Simulate AI response and destination loading
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: `I understand you're looking for travel options! Based on "${prompt}", I've found some amazing destinations that might be perfect for you. Take a look at the options on the right - you can scroll through them to see detailed information about flights, hotels, and cruises.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setDestinations(mockDestinations);
      setIsLoading(false);
    }, 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: "I'm here to help you find the perfect travel experience! Feel free to ask me about any of the destinations shown, or let me know what specific type of experience you're looking for.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex h-full">
        {/* Chat Section */}
        <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          isChatCollapsed ? 'w-0' : 'w-1/2'
        } flex flex-col`}>
          {!isChatCollapsed && (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Travel Assistant</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsChatCollapsed(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeMessage()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
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
              </ScrollArea>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about travel..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Destinations Section */}
        <div className={`bg-gray-50 dark:bg-gray-800 transition-all duration-300 ${
          isChatCollapsed ? 'w-full' : 'w-1/2'
        } flex flex-col`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">Travel Options</h3>
            <div className="flex items-center gap-2">
              {isChatCollapsed && (
                <button
                  onClick={() => setIsChatCollapsed(false)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Destinations List */}
          <ScrollArea className="flex-1 p-4">
            {destinations.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation to see travel destinations</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {destination.type}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {destination.name}
                        </h4>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {destination.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {destination.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {destination.duration}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                        {destination.description}
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          View Details
                        </button>
                        <button className="flex-1 border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TravelChatInterface;
