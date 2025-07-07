import { useState, useEffect, useRef } from 'react';
import { X, Send, MapPin, Clock, DollarSign, Minimize2, Maximize2, Plane, ShoppingCart, Calendar, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FullScreenDestination from './FullScreenDestination';

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
  flightDestination?: string;
  airportCode?: string;
}

interface CartItem {
  id: string;
  destination: Destination;
  quantity: number;
  addedAt: Date;
}

const TravelChatInterface = ({ isOpen, onClose, initialPrompt }: TravelChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [currentDestinations, setCurrentDestinations] = useState<Destination[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mockDestinations: Destination[] = [
    {
      id: '1',
      name: 'MSP to Santorini',
      location: 'Santorini, Greece',
      price: '$899',
      image: '/lovable-uploads/06d30aba-bf87-4b11-ad56-860979ba2ed6.png',
      description: 'Direct flight to the stunning Greek island with breathtaking sunset views over the Aegean Sea.',
      tags: ['Direct Flight', 'Sunset Views', 'Mediterranean'],
      flightDestination: 'Santorini, Greece',
      airportCode: 'JTR'
    },
    {
      id: '2',
      name: 'MSP to Tokyo',
      location: 'Tokyo, Japan',
      price: '$1,299',
      image: '/lovable-uploads/3a90338f-3b9b-4d7f-a769-846168db9d31.png',
      description: 'Experience authentic Japanese culture in the bustling capital city with convenient connections.',
      tags: ['Cultural', 'Modern City', 'Premium Service'],
      flightDestination: 'Tokyo, Japan',
      airportCode: 'NRT'
    },
    {
      id: '3',
      name: 'MSP to Bali',
      location: 'Denpasar, Indonesia',
      price: '$1,150',
      image: '/lovable-uploads/62358993-d15b-4b81-9c51-49ab4c2e8d79.png',
      description: 'Fly to the tropical paradise of Bali with stunning rice terraces and spiritual wellness experiences.',
      tags: ['Tropical Paradise', 'Wellness', 'Island Life'],
      flightDestination: 'Bali, Indonesia',
      airportCode: 'DPS'
    }
  ];

  const getFlightDetails = (destination: Destination) => {
    const flightTimes = ['6:30 AM', '11:45 AM', '3:20 PM', '8:15 PM'];
    const airlines = ['Delta', 'United', 'American', 'Emirates'];
    const flightDurations = ['8h 45m', '12h 30m', '6h 15m', '14h 20m'];
    const destinationIndex = parseInt(destination.id) || 0;
    
    return {
      departure: flightTimes[destinationIndex % flightTimes.length],
      airline: airlines[destinationIndex % airlines.length],
      flightTime: flightDurations[destinationIndex % flightDurations.length],
      flightNumber: `${airlines[destinationIndex % airlines.length].substring(0, 2).toUpperCase()}${1000 + destinationIndex}`
    };
  };

  const convertToFullScreenDestination = (destination: Destination) => {
    return {
      id: parseInt(destination.id),
      name: destination.flightDestination || destination.location,
      location: destination.location,
      category: 'flight',
      image: destination.image.replace('/lovable-uploads/', ''),
      price: destination.price,
      duration: '5 days', // Default duration
      description: destination.description,
      mood: 'Ready to Fly',
      tags: destination.tags
    };
  };

  const handleCardClick = (destination: Destination) => {
    console.log('Flight card clicked:', destination.name);
    setSelectedDestination(destination);
    setIsFullScreenOpen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreenOpen(false);
    setSelectedDestination(null);
  };

  const handleNavigateDestination = (destination: any) => {
    // Convert back to chat destination format if needed
    const chatDestination = currentDestinations.find(d => d.id === destination.id.toString());
    if (chatDestination) {
      setSelectedDestination(chatDestination);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('travel-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

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
      let botResponse = '';
      
      // Check if this is a "Learn More" request about a destination
      const learnMoreMatch = text.match(/learn more about (.*)/i);
      if (learnMoreMatch) {
        const destinationName = learnMoreMatch[1];
        const destination = mockDestinations.find(d => 
          d.name.toLowerCase().includes(destinationName.toLowerCase()) ||
          d.location.toLowerCase().includes(destinationName.toLowerCase())
        );
        
        if (destination) {
          botResponse = `Let me tell you more about the flight to ${destination.flightDestination}! ${destination.description} This route offers ${destination.tags.join(', ').toLowerCase()} experiences. The flight typically includes premium amenities and arrives at ${destination.airportCode} airport. Would you like to know about specific flight times, airline options, or ground transportation?`;
        } else {
          botResponse = `I'd love to tell you more! Could you clarify which flight destination you're interested in learning about?`;
        }
      } else {
        botResponse = `Perfect! I found some incredible flight destinations that match your vibe. Here are my top flight recommendations with available routes:`;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
        destinations: learnMoreMatch ? undefined : mockDestinations
      };

      setMessages(prev => [...prev, botMessage]);
      if (!learnMoreMatch) {
        setCurrentDestinations(mockDestinations);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleLearnMore = (destination: Destination) => {
    handleSendMessage(`Learn more about ${destination.name}`);
  };

  const handleAddToCart = (destination: Destination) => {
    const savedCart = localStorage.getItem('travel-cart');
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItem = currentCart.find((item: CartItem) => item.destination.id === destination.id);
    
    let newCart;
    if (existingItem) {
      newCart = currentCart.map((item: CartItem) => 
        item.destination.id === destination.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        destination,
        quantity: 1,
        addedAt: new Date()
      };
      newCart = [...currentCart, newItem];
    }
    
    localStorage.setItem('travel-cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleFullScreenAddToCart = (destination: any) => {
    const chatDestination = currentDestinations.find(d => d.id === destination.id.toString());
    if (chatDestination) {
      handleAddToCart(chatDestination);
    }
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/442e1967-777c-43e6-9246-91b620e2151b.png')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 h-full flex">
        <div className={`${isChatMinimized ? 'w-16' : 'w-1/3'} transition-all duration-300 ease-out bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col`}>
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            {!isChatMinimized && (
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">AI Travel Concierge</h2>
                <p className="text-sm text-white/70">Your personal travel curator</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={handleCartClick}
                  className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsChatMinimized(!isChatMinimized)}
                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
                title={isChatMinimized ? "Expand Chat" : "Minimize Chat"}
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

          {isChatMinimized && (
            <div 
              className="flex-1 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-white/5 transition-all duration-200"
              onClick={() => setIsChatMinimized(false)}
              title="Click to expand chat"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 hover:bg-white/30 transition-all duration-200">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-white/60 text-xs text-center">
                <p className="font-medium mb-1">Chat</p>
                <p>Click to expand</p>
              </div>
              {messages.length > 0 && (
                <div className="mt-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </div>
          )}

          {!isChatMinimized && (
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
          )}

          {!isChatMinimized && (
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
          )}
        </div>

        <div className={`${isChatMinimized ? 'flex-1' : 'w-2/3'} transition-all duration-300 ease-out bg-white/5 backdrop-blur-xl flex flex-col overflow-hidden`}>
          <div className="p-8 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2">Available Flights</h2>
            <p className="text-white/70">Flight recommendations based on your conversation</p>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {currentDestinations.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div className="max-w-md">
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Plane className="w-12 h-12 text-white/60" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Your Flight Awaits</h3>
                  <p className="text-white/70 text-lg leading-relaxed">Share your travel dreams with our AI concierge and discover personalized flight recommendations crafted just for you.</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-8">
                {currentDestinations.map((destination) => {
                  const flightDetails = getFlightDetails(destination);
                  return (
                    <div 
                      key={destination.id} 
                      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.02]"
                      onClick={() => handleCardClick(destination)}
                    >
                      <div className="flex">
                        <div className="relative w-48 h-40">
                          <img 
                            src={destination.image} 
                            alt={destination.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                            <span className="text-xs font-medium text-white">{flightDetails.airline} {flightDetails.flightNumber}</span>
                          </div>

                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                            <span className="text-xs font-medium text-white">{flightDetails.flightTime}</span>
                          </div>
                          
                          <div className="absolute bottom-3 left-3">
                            <div className="bg-neutral-800/70 backdrop-blur-sm rounded-lg px-2 py-1">
                              <span className="text-xs font-medium text-white">Departs {flightDetails.departure}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-bold text-white">{destination.name}</h4>
                            <span className="text-xl font-bold text-green-400 bg-green-400/20 px-3 py-1 rounded-lg backdrop-blur-sm">{destination.price}</span>
                          </div>
                          <div className="flex items-center text-white/80 mb-3">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="font-medium">{destination.location}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center text-white/80 text-sm">
                              <Plane className="w-4 h-4 mr-2 text-blue-400" />
                              <span>Direct Flight</span>
                            </div>
                            <div className="flex items-center text-white/80 text-sm">
                              <Clock className="w-4 h-4 mr-2 text-green-400" />
                              <span>On Time</span>
                            </div>
                            <div className="flex items-center text-white/80 text-sm">
                              <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                              <span>Flexible Dates</span>
                            </div>
                            <div className="flex items-center text-white/80 text-sm">
                              <span className="w-4 h-4 mr-2 text-orange-400 font-bold text-xs">✈</span>
                              <span>Premium Economy</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-blue-800/30 border border-blue-600/40 text-xs px-3 py-1 rounded-full text-blue-300">
                              Free Baggage
                            </span>
                            <span className="bg-green-800/30 border border-green-600/40 text-xs px-3 py-1 rounded-full text-green-300">
                              Refundable
                            </span>
                            <span className="bg-purple-800/30 border border-purple-600/40 text-xs px-3 py-1 rounded-full text-purple-300">
                              Wi-Fi
                            </span>
                          </div>

                          <div className="flex gap-3">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(destination);
                              }}
                              className="flex-1 bg-white text-gray-900 font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Book Flight
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLearnMore(destination);
                              }}
                              className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                            >
                              Flight Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedDestination && (
        <FullScreenDestination
          destination={convertToFullScreenDestination(selectedDestination)}
          destinations={currentDestinations.map(convertToFullScreenDestination)}
          isOpen={isFullScreenOpen}
          onClose={handleCloseFullScreen}
          onNavigate={handleNavigateDestination}
          onAddToCart={handleFullScreenAddToCart}
        />
      )}
    </div>
  );
};

export default TravelChatInterface;
