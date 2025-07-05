
import { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, MapPin, Calendar, DollarSign } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Destination {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
  price: string;
  duration: string;
  description: string;
  mood: string;
  tags: string[];
}

interface FullScreenDestinationProps {
  destination: Destination;
  destinations: Destination[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (destination: Destination) => void;
}

const FullScreenDestination = ({ 
  destination, 
  destinations, 
  isOpen, 
  onClose, 
  onNavigate 
}: FullScreenDestinationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen && destination) {
      const index = destinations.findIndex(d => d.id === destination.id);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [destination, destinations, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
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
  }, [isOpen, currentIndex]);

  const navigateNext = () => {
    const nextIndex = (currentIndex + 1) % destinations.length;
    setCurrentIndex(nextIndex);
    onNavigate(destinations[nextIndex]);
  };

  const navigatePrevious = () => {
    const prevIndex = currentIndex === 0 ? destinations.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    onNavigate(destinations[prevIndex]);
  };

  if (!isOpen || !destination) return null;

  const currentDestination = destinations[currentIndex] || destination;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/95 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-600/50 rounded-full p-2 text-neutral-200 hover:text-white transition-all duration-300 ease-in"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Vertical Navigation Buttons */}
      <button
        onClick={navigatePrevious}
        className="absolute right-6 top-1/3 -translate-y-1/2 z-20 bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-600/50 rounded-full p-3 text-neutral-200 hover:text-white transition-all duration-300 ease-in"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <button
        onClick={navigateNext}
        className="absolute right-6 bottom-1/3 translate-y-1/2 z-20 bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-600/50 rounded-full p-3 text-neutral-200 hover:text-white transition-all duration-300 ease-in"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Scrollable Content */}
      <ScrollArea className="h-full w-full">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-7xl w-full bg-neutral-800/60 backdrop-blur-lg border border-neutral-600/30 rounded-2xl overflow-hidden transition-all duration-500 ease-in">
            <div className="grid lg:grid-cols-2 min-h-[80vh]">
              {/* Image Section - Left */}
              <div className="relative">
                <img
                  src={`https://images.unsplash.com/${currentDestination.image}?w=800&h=800&fit=crop`}
                  alt={currentDestination.name}
                  className="w-full h-full object-cover transition-all duration-700 ease-in"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/20"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-neutral-800/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-neutral-100 border border-neutral-600/30">
                    {currentDestination.mood}
                  </div>
                </div>
              </div>

              {/* Content Section - Right */}
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-neutral-100 mb-4 leading-tight transition-all duration-300 ease-in">
                    {currentDestination.name}
                  </h1>
                  <div className="flex items-center text-neutral-300 mb-6">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{currentDestination.location}</span>
                  </div>
                </div>

                <p className="text-neutral-300 text-lg leading-relaxed">
                  {currentDestination.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-700/40 backdrop-blur-sm border border-neutral-600/30 rounded-xl p-4 transition-all duration-300 ease-in hover:bg-neutral-700/60">
                    <div className="flex items-center text-neutral-400 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="text-neutral-100 font-semibold">{currentDestination.duration}</p>
                  </div>
                  <div className="bg-neutral-700/40 backdrop-blur-sm border border-neutral-600/30 rounded-xl p-4 transition-all duration-300 ease-in hover:bg-neutral-700/60">
                    <div className="flex items-center text-neutral-400 mb-2">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm">Starting from</span>
                    </div>
                    <p className="text-neutral-100 font-semibold">{currentDestination.price}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentDestination.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-700/30 border border-neutral-600/40 text-neutral-200 px-3 py-1 rounded-full text-sm transition-all duration-300 ease-in hover:bg-neutral-600/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-semibold py-4 rounded-xl transition-all duration-300 ease-in shadow-lg hover:shadow-neutral-900/50 border border-neutral-600/30">
                  Book This Journey
                </button>

                {/* Navigation Indicator */}
                <div className="flex justify-center space-x-2 pt-4">
                  {destinations.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ease-in ${
                        index === currentIndex ? 'bg-neutral-400' : 'bg-neutral-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FullScreenDestination;
