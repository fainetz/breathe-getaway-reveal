import { useState, useEffect, useRef } from 'react';
import { X, Send, MapPin, Clock, DollarSign, Minimize2, Maximize2, Plane, ShoppingCart, Calendar, MessageCircle, ChevronLeft, ArrowLeft, DessertIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import FullScreenDestination from './FullScreenDestination';
import Destinations from '@/pages/Destinations';
type ChatHistoryItem = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};








interface TravelChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}
export interface Destination {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;




  flightreason: string;
  flightDestination?: string;
  airportCode?: string;
  flightairline?: string;
  flightnumber?: string[] | string;
  flightarrival?: string;
  flightdeparture?: string;
  flightduration?: string;
  flightclass?: string;
  mood?: string;
  rating?: number;
  featured?: boolean;
  comingSoon?: boolean;
  stops?: number;
  tags?: string[];
}
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  destinations?: Destination[];
}








interface CartItem {
  id: string;
  destination: Destination;
  quantity: number;
  addedAt: Date;
}

const TravelChatInterface = ({ isOpen, onClose, initialPrompt }: TravelChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
       { role: 'system', content: "You are Breathe & Getaway AI, an expert travel assistant." }
     ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [currentDestinations, setCurrentDestinations] = useState<Destination[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showCinematicPause, setShowCinematicPause] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [flightResults, setFlightResults] = useState(null);
  
  const handleSendMessage = async (messageText?: string) => {
    const text = messageText ?? inputValue.trim();
    if (!text) return;
  
    // 1) Show the user's message in the UI
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
  
    // 2) Add to our local chatHistory
    const newHistory: ChatHistoryItem[] = [
      ...chatHistory,
      { role: 'user' as 'system' | 'user' | 'assistant', content: text }
    ];
    setChatHistory(newHistory);
  
    // 3) Show loader
    setIsLoading(true);
  
    try {
      // 4) Send both the user_input and the full history
      const response = await fetch(
        'https://breath-and-escape.onrender.com/ai_travel_agent',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_input: text,
            chat_history: newHistory
          })
        }
      );
  
      const data = await response.json();
      console.log('Response from backend:', data);
  
      // 5) Overwrite our history with the updated one from the server
      if (data.chat_history) {
        setChatHistory(data.chat_history as ChatHistoryItem[]);
      }
      console.log('Updated chat history:',response);
      // 6) Flight results?
      if (data.flights) {
        const mapped = data.flights.map((f: any, i: number) => {
          const parsed = JSON.parse(f.best_flight); // ✅ parse the stringified JSON
        
          return {
            id: (i + 1).toString(),
            name: parsed.destination,
            location: parsed.from,
            price: `$${parsed.price}`,
            image: parsed.imageUrl || '/default-flight.jpg',
            description: parsed.reason || 'Auto-suggested flight option',
            flightDestination: parsed.to,
            airportCode: parsed.from,
            flightairline: parsed.airline,
            flightnumber: Array.isArray(parsed.flights) ? parsed.flights : [],
            flightarrival: parsed.arrival,
            flightdeparture: parsed.departure,
            flightduration: parsed.duration || '5 days',
            flightclass: parsed.cabin_class || parsed.class,
          };
        });

        setCurrentDestinations(mapped);
        console.log('Mapped flight destinations:', mapped);
        console.log('Current destinations:', currentDestinations);
        // optional summary in the chat UI
        const summary: Message = {
          id: (Date.now() + 1).toString(),
          text: "Here are some flight options I've found for you:",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, summary]);
      }
  
      // 7) Plain AI response?
      if (data.response) {
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
  
    } catch (err) {
      console.error('Error talking to backend:', err);
    } finally {
      setIsLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
    
  
 
  const navigate = useNavigate();

  // *** REPLACE WITH YOUR API DATA ***
  // This mock data should be replaced with your flight search API response
  // Structure: Array of Destination objects with id, name, location, price, image, description, tags, etc.
  // TODO: Replace this with: const destinations = await yourFlightAPI.search(searchQuery);


  // *** REPLACE WITH YOUR FLIGHT DETAILS API ***
  // This function generates mock flight details for display
  // TODO: Replace with actual flight details from your API response
  // Your API should return: departure time, airline, flight duration, flight number

  const convertToFullScreenDestination = (destination: Destination) => {
    return {
      id: parseInt(destination.id),
      name: destination.flightDestination || destination.location,
      location: destination.location,
      category: 'flight',
      type: 'destination' as const,
      image: destination.image,
      price: destination.price,
      duration: destination.flightduration || '5 days',
      description: destination.description,
      mood: 'Ready to Fly',
      rating: 4.5,
      featured: false,
      comingSoon: false,
      tags: ['flight', 'travel'],
  
      // 👇 Use destination.flightnumber directly, no extra const
      airline: destination.flightairline,
      flightNumber: Array.isArray(destination.flightnumber)
        ? destination.flightnumber.join(' / ')
        : destination.flightnumber || '',
  
      departure: destination.flightdeparture,
      arrival: destination.flightarrival,
      cabinClass: destination.flightclass,
      stops: Array.isArray(destination.flightnumber)
        ? Math.max(destination.flightnumber.length - 1, 0)
        : 0,
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('travel-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      // Send the initial prompt as the first message
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  

    
    

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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-luxury-midnight via-luxury-carbon to-luxury-midnight dark:from-luxury-midnight dark:via-luxury-carbon dark:to-luxury-midnight">
      {/* Premium mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-40"></div>
      {/* Luxury radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-luxury-gold/10 via-transparent to-luxury-gold/5"></div>
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl animate-floating"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-wanderlust-terracotta/5 rounded-full blur-3xl animate-floating" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 h-full flex flex-col md:flex-row">
        {/* Mobile: Toggle between chat and destinations */}
        {isMobile && showDestinations ? (
          <div className="flex-1 glass-luxury flex flex-col overflow-hidden rounded-t-3xl border border-luxury-gold/20">
            {/* Mobile destinations header */}
            <div className="p-6 border-b border-luxury-gold/20 flex items-center gap-4 glass-premium relative">
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/5 to-transparent"></div>
              <button
                onClick={() => setShowDestinations(false)}
                className="relative z-10 p-3 rounded-2xl glass-premium hover:bg-luxury-gold/20 transition-all duration-300 text-luxury-platinum hover:text-luxury-gold hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 relative z-10">
                <h2 className="text-xl font-bold text-shimmer">Your Elite Adventures</h2>
                <p className="text-sm text-luxury-platinum/80">Curated luxury experiences</p>
              </div>
              <div className="relative">
                <button 
                  onClick={handleCartClick}
                  className="p-2 rounded-xl hover:bg-accent/20 transition-all duration-300 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getCartItemCount()}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-accent/20 transition-all duration-300 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile destinations list */}
            <div className="flex-1 overflow-y-auto p-4">
               <div className="space-y-4">
                 {currentDestinations.map((destination, index) => {
            
                   return (
                     <div 
                       key={destination.id} 
                       className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-xl animate-slide-up opacity-0"
                       style={{ 
                         animationDelay: `${index * 150}ms`,
                         animationFillMode: 'forwards'
                       }}
                     >
                      <div className="relative h-32">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                        <span className="text-xs font-medium text-white">{destination.flightairline}</span>
                        </div>
                        
                        <div className="absolute bottom-2 left-2">
                          <h4 className="text-sm font-bold text-white">{destination.name}</h4>
                          <p className="text-xs text-white/80">{destination.location}</p>
                        </div>
                        
                        <div className="absolute top-2 right-2 bg-green-500/90 backdrop-blur-sm rounded px-2 py-1">
                          <span className="text-xs font-bold text-white">{destination.price}</span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center text-white/80 text-xs">
                            <Plane className="w-3 h-3 mr-1 text-blue-400" />
                            <span>Direct</span>
                          </div>
                          <div className="flex items-center text-white/80 text-xs">
                            <Clock className="w-3 h-3 mr-1 text-green-400" />
                            <span>{new Date(destination.flightdeparture).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>


                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(destination);
                            }}
                            className="flex-1 bg-white text-gray-900 font-medium py-2 px-3 rounded-lg hover:bg-white/90 transition-all duration-200 text-sm flex items-center justify-center gap-1"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            Book
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(destination);
                            }}
                            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 text-sm"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Panel - Mobile: Full width, Desktop: 1/3 */}
            <div className={`${isChatMinimized && !isMobile ? 'w-16' : isMobile ? 'flex-1' : 'w-1/3'} transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] glass-luxury ${isMobile ? '' : 'border-r border-luxury-gold/30'} flex flex-col relative overflow-hidden`}>
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-luxury-gold/20 bg-gradient-to-r from-luxury-gold/10 to-transparent relative">
                <div className="absolute inset-0 glass-premium"></div>
                {!isChatMinimized && (
                  <div className="flex-1 animate-fade-in relative z-10">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-luxury-gold to-wanderlust-terracotta flex items-center justify-center shadow-2xl animate-premium-glow border border-luxury-gold/30">
                        <Plane className="w-6 h-6 text-luxury-midnight" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-shimmer tracking-tight">ÉLITE WANDERLUST</h2>
                        <p className="text-xs md:text-sm text-luxury-platinum/80 font-medium uppercase tracking-widest">Premium Travel Concierge</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative">
                    <button 
                      onClick={handleCartClick}
                      className="p-4 rounded-2xl glass-premium hover:bg-luxury-gold/20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-luxury-platinum hover:text-luxury-gold hover:scale-110 group hover-luxury"
                    >
                      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
                    </button>
                    {getCartItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-luxury-gold to-wanderlust-terracotta text-luxury-midnight text-xs rounded-full h-6 w-6 md:h-7 md:w-7 flex items-center justify-center font-bold animate-scale-in shadow-2xl ring-2 ring-luxury-gold/50 animate-premium-glow">
                        {getCartItemCount()}
                      </span>
                    )}
                  </div>
                  {!isMobile && (
                    <button
                      onClick={() => setIsChatMinimized(!isChatMinimized)}
                      className="p-3 rounded-2xl hover:bg-accent/20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-muted-foreground hover:text-foreground hover:scale-110 group"
                      title={isChatMinimized ? "Expand Chat" : "Minimize Chat"}
                    >
                      {isChatMinimized ? <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" /> : <Minimize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-3 rounded-2xl hover:bg-accent/20 hover:bg-destructive/20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-muted-foreground hover:text-destructive hover:scale-110 group"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {isChatMinimized && !isMobile && (
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
                <ScrollArea className="flex-1 h-0 chat-scroll">
                  <div className="px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8">
                    {messages.length === 0 && !showCinematicPause && (
                      <div className="text-center pt-16 md:pt-24 animate-fade-in">
                        <div className="mb-12">
                          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-12 rounded-3xl glass-luxury bg-gradient-to-br from-luxury-gold/30 to-wanderlust-terracotta/30 flex items-center justify-center shadow-2xl animate-premium-glow border border-luxury-gold/50 animate-floating">
                            <Plane className="w-12 h-12 md:w-16 md:h-16 text-luxury-gold animate-pulse" />
                          </div>
                          <h3 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-shimmer">Where does your elite journey begin?</h3>
                          <p className="text-lg md:text-xl text-luxury-platinum/80 font-medium leading-relaxed max-w-lg mx-auto">Share your luxury travel aspirations with our premium AI concierge...</p>
                          
                          {/* Premium decoration elements */}
                          <div className="flex justify-center mt-8 space-x-2">
                            <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-wanderlust-terracotta rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {showCinematicPause && (
                      <div className="flex justify-center py-16 animate-fade-in">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl glass-luxury bg-gradient-to-br from-luxury-gold/20 to-wanderlust-terracotta/20 flex items-center justify-center animate-premium-glow border border-luxury-gold/30">
                            <MessageCircle className="w-10 h-10 text-luxury-gold animate-pulse" />
                          </div>
                          <p className="text-xl text-shimmer font-semibold">Curating your luxury experience...</p>
                          <p className="text-sm text-luxury-platinum/70 mt-2">Our AI concierge is crafting the perfect journey</p>
                        </div>
                      </div>
                    )}

                    {messages.map((message, index) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                         <div className={`max-w-[85%] md:max-w-xs ${message.isUser ? 'order-2' : 'order-1'}`}>
                           <div className={`px-6 md:px-8 py-4 md:py-6 rounded-3xl text-sm md:text-base font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] hover-luxury ${
                             message.isUser 
                               ? 'bg-gradient-to-br from-luxury-gold to-wanderlust-terracotta text-luxury-midnight ml-4 md:ml-6 shadow-2xl border border-luxury-gold/30 glass-premium' 
                               : 'glass-luxury text-luxury-platinum mr-4 md:mr-6 border border-luxury-gold/20 shadow-2xl'
                           }`}>
                             <p className="leading-relaxed">{message.text}</p>
                              <p className={`text-xs mt-4 opacity-70 font-medium ${
                                message.isUser ? 'text-luxury-midnight/70' : 'text-luxury-platinum/70'
                              }`}>
                               {message.timestamp.toLocaleTimeString()}
                             </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Mobile: Show destinations button */}
                    {isMobile && currentDestinations.length > 0 && (
                      <div className="flex justify-center pt-8 animate-slide-up">
                        <button
                          onClick={() => setShowDestinations(true)}
                          className="btn-luxury text-luxury-midnight font-bold py-6 px-10 rounded-3xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl flex items-center gap-4 hover:scale-110 hover-luxury animate-shimmer text-lg"
                        >
                          <Plane className="w-6 h-6" />
                          View {currentDestinations.length} Elite Flight Options
                        </button>
                      </div>
                    )}

                    {isLoading && (
                      <div className="flex justify-center py-8 animate-fade-in">
                        <div className="glass-luxury rounded-3xl px-10 py-8 shadow-2xl border border-luxury-gold/30 animate-premium-glow">
                          <div className="flex items-center gap-6">
                            <div className="flex space-x-3">
                              <div className="w-4 h-4 bg-luxury-gold rounded-full animate-bounce"></div>
                              <div className="w-4 h-4 bg-wanderlust-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                              <div className="w-4 h-4 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                            <span className="text-shimmer font-semibold text-lg">Curating your elite journey...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              )}

              {!isChatMinimized && (
                <div className="border-t border-luxury-gold/20 p-6 md:p-8 bg-gradient-to-r from-luxury-gold/10 to-transparent glass-premium relative">
                  <div className="absolute inset-0 glass-luxury"></div>
                  <form onSubmit={handleSubmit} className="flex items-center gap-6 relative z-10">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Describe your dream luxury destination..."
                      className={`flex-1 px-8 md:px-10 py-6 md:py-8 text-lg glass-luxury border border-luxury-gold/30 rounded-3xl text-luxury-platinum placeholder-luxury-platinum/60 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium leading-relaxed shadow-2xl ${
                        inputFocused 
                          ? 'border-luxury-gold/60 shadow-2xl scale-[1.02] ring-2 ring-luxury-gold/30 animate-premium-glow' 
                          : 'hover:border-luxury-gold/50 focus:border-luxury-gold/60'
                      } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                      style={{ fontSize: 'max(16px, 1rem)' }}
                      disabled={isLoading}
                      onFocus={(e) => {
                        setInputFocused(true);
                        if (window.innerWidth < 768) {
                          // Smooth scroll to center the input
                          e.target.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center', 
                            inline: 'nearest' 
                          });
                        }
                      }}
                      onBlur={() => {
                        setInputFocused(false);
                        if (window.innerWidth < 768) {
                          // Reset any zoom and scale after losing focus
                          setTimeout(() => {
                            document.documentElement.style.zoom = '1';
                            document.body.style.zoom = '1';
                          }, 100);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className={`btn-luxury rounded-3xl font-bold text-luxury-midnight flex items-center justify-center min-w-[80px] md:min-w-[100px] py-6 md:py-8 px-8 md:px-10 ${
                        isLoading || !inputValue.trim() 
                          ? 'opacity-40 cursor-not-allowed scale-95' 
                          : 'hover-luxury active:scale-95 group animate-premium-glow'
                      }`}
                    >
                      <Send className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </form>
                </div>
              )}
            </div>
            {/* Desktop Destinations Panel */}
            {!isMobile && (
              <div className={`${isChatMinimized ? 'flex-1' : 'w-2/3'} transition-all duration-300 ease-out bg-white/5 backdrop-blur-2xl flex flex-col overflow-hidden shadow-2xl`}>
                <div className="p-8 border-b border-white/20 bg-gradient-to-r from-white/5 to-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Plane className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Available Flights</h2>
                  </div>
                  <p className="text-white/70 ml-13">Flight recommendations based on your conversation</p>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                  {currentDestinations.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                      <div className="max-w-md">
                        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-2xl">
                          <Plane className="w-12 h-12 text-white/80 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Your Flight Awaits</h3>
                        <p className="text-white/70 text-lg leading-relaxed">Share your travel dreams with our AI concierge and discover personalized flight recommendations crafted just for you.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-8">
                    {currentDestinations.map((destination, index) => {
                      return (
                        <div 
                          key={destination.id} 
                          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-xl animate-slide-up opacity-0"
                          style={{ 
                            animationDelay: `${index * 200}ms`,
                            animationFillMode: 'forwards'
                          }}
                        >
                          <div className="flex">
                            <div className="relative w-48 h-40">
                              <img 
                                src={destination.image} 
                                alt={destination.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            
                  
                              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                                <span className="text-xs font-medium text-white">
                                  {destination.flightairline}
                                </span>
                              </div>
                              
                              <div className="absolute bottom-3 left-3">
                                <div className="bg-neutral-800/70 backdrop-blur-sm rounded-lg px-2 py-1">
                                  <span className="text-xs font-medium text-white">
                                    Departs {new Date(destination.flightdeparture).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                  
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="text-xl font-bold text-white">
                                  {destination.name}
                                </h4>
                                <span className="text-xl font-bold text-green-400 bg-green-400/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                                  ${destination.price}
                                </span>
                              </div>
                  
                              <div className="flex items-center text-white/80 mb-3">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span className="font-medium">
                                  Arrives in {destination.name} at {new Date(destination.flightarrival).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
})
}
                                  
                                </span>
                              </div>
                  
                              <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="flex items-center text-white/80 text-sm">
                                  <Plane className="w-4 h-4 mr-2 text-blue-400" />
                                  <span>{destination.flightnumber.length <= 1 ? "Direct Flight" : `${destination.flightnumber.length - 1} Stop(s)`}</span>
                                </div>
                                <div className="flex items-center text-white/80 text-sm">
                                  <Clock className="w-4 h-4 mr-2 text-green-400" />
                                  <span>Departs from {destination.location} at {new Date(destination.flightdeparture).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="flex items-center text-white/80 text-sm">
                                  <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                                  <span>{new Date(destination.flightarrival).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-white/80 text-sm">
                                  <span className="w-4 h-4 mr-2 text-orange-400 font-bold text-xs">✈</span>
                                  <span>{destination.flightclass}</span>
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
                  
                              <p className="text-white/80 text-sm">{destination.description}</p>
                              <div className="flex gap-3 mt-4">
                                <button 
                                  onClick={() => handleAddToCart(destination)}
                                  className="flex-1 bg-white text-gray-900 font-medium py-3 px-4 rounded-lg hover:bg-white/90 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  Book Flight
                                </button>
                                <button 
                                  onClick={() => handleCardClick(destination)}
                                  className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
                                >
                                  View Details
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
            )}
          </>
        )}
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
