
import { useState, useEffect, useRef } from 'react';
import { X, Send, MapPin, Clock, DollarSign, Minimize2, Maximize2, Plane } from 'lucide-react';

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
        text: `Perfect! I found some incredible destinations that match your vibe. Here are my top recommendations:`,
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
    <div className="fixed inset-0 z-50">
      {/* Tropical Pool Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/442e1967-777c-43e6-9246-91b620e2151b.png')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 h-full flex">
        {/* Chat Section - Left Side (1/3) */}
        <div className={`${isChatMinimized ? 'w-16' : 'w-1/3'} transition-all duration-300 ease-out bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            {!isChatMinimized && (
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">AI Travel Concierge</h2>
                <p className="text-sm text-white/70">Your personal travel curator</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsChatMinimized(!isChatMinimized)}
                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
              >
                {isChatMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isChatMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 && (
                  <div className="text-center text-white/80 mt-20">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Plane className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Ready for your next adventure?</h3>
                      <p className="text-sm text-white/60">Tell me how you're feeling or what kind of experience you're craving!</p>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs ${message.isUser ? 'order-2' : 'order-1'}`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm font-medium ${
                        message.isUser 
                          ? 'bg-white text-gray-900 ml-4 shadow-lg' 
                          : 'bg-white/20 backdrop-blur-sm text-white mr-4 border border-white/20'
                      }`}>
                        <p className="leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 opacity-60 ${
                          message.isUser ? 'text-gray-600' : 'text-white/60'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 mr-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-white/20 p-6">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What's calling to you today?"
                    className="flex-1 px-4 py-3 text-sm bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/60 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="px-4 py-3 bg-white text-gray-900 rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center font-medium shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Results Section - Right Side (2/3) */}
        <div className={`${isChatMinimized ? 'flex-1' : 'w-2/3'} transition-all duration-300 ease-out bg-white/5 backdrop-blur-xl flex flex-col overflow-hidden`}>
          {/* Results Header */}
          <div className="p-8 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2">Curated Destinations</h2>
            <p className="text-white/70">Handpicked experiences based on your conversation</p>
          </div>

          {/* Results Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {currentDestinations.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div className="max-w-md">
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-white/60" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Your Journey Awaits</h3>
                  <p className="text-white/70 text-lg leading-relaxed">Share your travel dreams with our AI concierge and discover personalized destination recommendations crafted just for you.</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-8">
                {currentDestinations.map((destination) => (
                  <div key={destination.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-xl">
                    <div className="flex">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-48 h-40 object-cover"
                      />
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-xl font-bold text-white">{destination.name}</h4>
                          <span className="text-xl font-bold text-green-400 bg-green-400/20 px-3 py-1 rounded-lg backdrop-blur-sm">{destination.price}</span>
                        </div>
                        <div className="flex items-center text-white/80 mb-3">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="font-medium">{destination.location}</span>
                        </div>
                        <p className="text-white/70 mb-4 leading-relaxed">{destination.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {destination.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white/90 text-sm rounded-full border border-white/20 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <button className="flex-1 bg-white text-gray-900 font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg">
                            View Flights
                          </button>
                          <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                            Learn More
                          </button>
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
