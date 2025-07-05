
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, DollarSign } from 'lucide-react';

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
      } else if (e.key === 'ArrowLeft') {
        navigatePrevious();
      } else if (e.key === 'ArrowRight') {
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
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 bg-gray-900/80 hover:bg-gray-800/80 border border-gray-700/50 rounded-full p-2 text-white hover:text-gray-300 transition-all duration-300"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={navigatePrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-800/80 border border-gray-700/50 rounded-full p-3 text-white hover:text-gray-300 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={navigateNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-800/80 border border-gray-700/50 rounded-full p-3 text-white hover:text-gray-300 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center h-full py-20">
        {/* Image */}
        <div className="relative h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden">
          <img
            src={`https://images.unsplash.com/${currentDestination.image}?w=800&h=600&fit=crop`}
            alt={currentDestination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white">
              {currentDestination.mood}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {currentDestination.name}
            </h1>
            <div className="flex items-center text-gray-300 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{currentDestination.location}</span>
            </div>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed">
            {currentDestination.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center text-gray-400 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-white font-semibold">{currentDestination.duration}</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center text-gray-400 mb-2">
                <DollarSign className="w-4 h-4 mr-2" />
                <span className="text-sm">Starting from</span>
              </div>
              <p className="text-white font-semibold">{currentDestination.price}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {currentDestination.tags.map((tag) => (
              <span
                key={tag}
                className="bg-purple-900/30 border border-purple-700/50 text-purple-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-900/50">
            Book This Journey
          </button>

          {/* Navigation Indicator */}
          <div className="flex justify-center space-x-2 pt-4">
            {destinations.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenDestination;
