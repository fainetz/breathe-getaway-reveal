import { useState, useEffect, useRef } from 'react';
import { X, ChevronUp, ChevronDown, MapPin, Calendar, DollarSign, Plane, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from './ui/scroll-area';

interface Destination {
  id: number;
  name: string;
  location: string;
  category: string;
  type: 'hotel' | 'destination' | 'cruise';
  image: string;
  price: string;
  duration: string;
  description: string;
  mood: string;
  tags: string[];
  rating?: number;
  featured?: boolean;
  comingSoon?: boolean;
}

interface CartItem {
  id: string;
  destination: any;
  quantity: number;
  addedAt: Date;
}

interface FullScreenDestinationProps {
  destination: Destination;
  destinations: Destination[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (destination: Destination) => void;
  onAddToCart?: (destination: Destination) => void;
}

const FullScreenDestination = ({ 
  destination, 
  destinations, 
  isOpen, 
  onClose, 
  onNavigate,
  onAddToCart 
}: FullScreenDestinationProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && destination) {
      const index = destinations.findIndex(d => d.id === destination.id);
      setCurrentIndex(index !== -1 ? index : 0);
      // Smooth entrance animation
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [destination, destinations, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || isTransitioning) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowUp') {
        navigatePrevious();
      } else if (e.key === 'ArrowDown') {
        navigateNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, isTransitioning]);

  const navigateNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setScrollDirection('down');
    setIsVisible(false);
    
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % destinations.length;
      setCurrentIndex(nextIndex);
      onNavigate(destinations[nextIndex]);
      
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setScrollDirection(null);
          setIsTransitioning(false);
        }, 500);
      }, 100);
    }, 300);
  };

  const navigatePrevious = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setScrollDirection('up');
    setIsVisible(false);
    
    setTimeout(() => {
      const prevIndex = currentIndex === 0 ? destinations.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      onNavigate(destinations[prevIndex]);
      
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setScrollDirection(null);
          setIsTransitioning(false);
        }, 500);
      }, 100);
    }, 300);
  };

  const scrollToAboutSection = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSearchFlights = () => {
    const destinationPrompt = `I want to plan a trip to ${currentDestination.name} in ${currentDestination.location}. This is a ${currentDestination.duration} ${currentDestination.category} experience for ${currentDestination.price}. ${currentDestination.description}`;
    navigate(`/chat?q=${encodeURIComponent(destinationPrompt)}`);
  };

  if (!isOpen || !destination) return null;

  const currentDestination = destinations[currentIndex] || destination;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black opacity-80"></div>
      
      {/* Directional scroll indicator */}
      {scrollDirection && (
        <div className={`absolute inset-0 z-10 pointer-events-none transition-all duration-500 ${
          scrollDirection === 'down' 
            ? 'bg-gradient-to-b from-transparent via-neutral-800/20 to-neutral-700/40' 
            : 'bg-gradient-to-t from-transparent via-neutral-800/20 to-neutral-700/40'
        }`}>
          <div className={`absolute left-1/2 transform -translate-x-1/2 text-neutral-400 ${
            scrollDirection === 'down' ? 'bottom-20 animate-bounce' : 'top-20 animate-bounce'
          }`}>
            {scrollDirection === 'down' ? (
              <ChevronDown className="w-12 h-12" />
            ) : (
              <ChevronUp className="w-12 h-12" />
            )}
          </div>
        </div>
      )}
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-30 bg-neutral-800/60 hover:bg-neutral-700/80 backdrop-blur-sm border border-neutral-600/30 rounded-full p-3 text-neutral-300 hover:text-white transition-all duration-300 ease-out"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={navigatePrevious}
        disabled={isTransitioning}
        className="absolute right-8 top-1/3 -translate-y-1/2 z-30 bg-neutral-800/60 hover:bg-neutral-700/80 backdrop-blur-sm border border-neutral-600/30 rounded-full p-3 text-neutral-300 hover:text-white transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <button
        onClick={navigateNext}
        disabled={isTransitioning}
        className="absolute right-8 bottom-1/3 translate-y-1/2 z-30 bg-neutral-800/60 hover:bg-neutral-700/80 backdrop-blur-sm border border-neutral-600/30 rounded-full p-3 text-neutral-300 hover:text-white transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Navigation Indicator */}
      <div className="absolute bottom-8 right-8 z-30 bg-neutral-800/60 backdrop-blur-sm border border-neutral-600/30 rounded-full px-4 py-2">
        <span className="text-neutral-300 text-sm font-medium">
          {currentIndex + 1}/{destinations.length}
        </span>
      </div>

      {/* Fixed Action Buttons - Updated */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-4 max-w-2xl w-full px-8">
        <button 
          onClick={handleSearchFlights}
          className="flex-1 bg-white text-gray-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm hover:bg-white/90 flex items-center justify-center gap-3"
        >
          <Search className="w-5 h-5" />
          Search for Flights
        </button>
        <button 
          onClick={scrollToAboutSection}
          className="flex-1 bg-white/10 hover:bg-white/20 border border-neutral-500/40 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
        >
          View Details
        </button>
      </div>

      {/* Scrollable Main Content */}
      <ScrollArea className="relative z-20 h-full">
        <div className="min-h-screen flex items-center justify-center p-8 pb-32">
          <div className={`max-w-4xl w-full transition-all duration-500 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : scrollDirection === 'down' 
                ? 'opacity-0 -translate-y-8' 
                : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-none tracking-tight">
                {currentDestination.name}
              </h1>
              <div className="flex items-center justify-center text-neutral-300 mb-8">
                <MapPin className="w-6 h-6 mr-3" />
                <span className="text-2xl font-light">{currentDestination.location}</span>
              </div>
              
              {/* Mood Badge */}
              <div className="inline-block bg-neutral-700/40 border border-neutral-600/30 rounded-full px-6 py-3 mb-8">
                <span className="text-neutral-200 text-lg font-medium">{currentDestination.mood}</span>
              </div>
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-neutral-700/40">
                <Plane className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <div className="text-neutral-400 text-sm mb-1">Flight Time</div>
                <div className="text-white text-lg font-semibold">3h 45m from MSP</div>
              </div>
              
              <div className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-neutral-700/40">
                <Clock className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <div className="text-neutral-400 text-sm mb-1">Check-in</div>
                <div className="text-white text-lg font-semibold">less than a minute</div>
              </div>
              
              <div className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-neutral-700/40">
                <Calendar className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <div className="text-neutral-400 text-sm mb-1">Duration</div>
                <div className="text-white text-lg font-semibold">{currentDestination.duration}</div>
              </div>
              
              <div className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-neutral-700/40">
                <DollarSign className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <div className="text-neutral-400 text-sm mb-1">Starting from</div>
                <div className="text-white text-lg font-semibold">{currentDestination.price}</div>
              </div>
            </div>

            {/* Experience Metrics */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-neutral-300 text-lg font-medium">Nature Immersion</span>
                  <span className="text-white text-sm">9/10</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-neutral-300 text-lg font-medium">Digital Detox</span>
                  <span className="text-white text-sm">8/10</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Extended Description Section */}
            <div ref={aboutSectionRef} className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-semibold text-white mb-4">About This Experience</h3>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                {currentDestination.description}
              </p>
              <p className="text-neutral-400 leading-relaxed">
                Immerse yourself in a transformative journey that speaks to your soul. This carefully curated experience offers the perfect blend of adventure, relaxation, and personal growth. Whether you're seeking healing, wonder, or simply a change of pace, this destination provides the ideal backdrop for your next chapter.
              </p>
            </div>

            {/* Additional Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-white mb-4">What's Included</h4>
                <ul className="space-y-2 text-neutral-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Accommodation in premium locations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Expert local guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Curated activities and experiences
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    24/7 concierge support
                  </li>
                </ul>
              </div>
              
              <div className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-600/30 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-white mb-4">Perfect For</h4>
                <ul className="space-y-2 text-neutral-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Solo travelers seeking transformation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Couples wanting deeper connection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Anyone needing life clarity
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Digital detox seekers
                  </li>
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {currentDestination.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-neutral-700/30 border border-neutral-600/40 text-neutral-200 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-neutral-600/40 hover:scale-105"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FullScreenDestination;
