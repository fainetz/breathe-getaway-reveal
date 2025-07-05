
import { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, MapPin, Calendar, DollarSign, Plane, Clock } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);

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
    setIsVisible(false);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % destinations.length;
      setCurrentIndex(nextIndex);
      onNavigate(destinations[nextIndex]);
      setIsVisible(true);
    }, 200);
  };

  const navigatePrevious = () => {
    setIsVisible(false);
    setTimeout(() => {
      const prevIndex = currentIndex === 0 ? destinations.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      onNavigate(destinations[prevIndex]);
      setIsVisible(true);
    }, 200);
  };

  if (!isOpen || !destination) return null;

  const currentDestination = destinations[currentIndex] || destination;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black opacity-80"></div>
      
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
        className="absolute right-8 top-1/3 -translate-y-1/2 z-30 bg-neutral-800/60 hover:bg-neutral-700/80 backdrop-blur-sm border border-neutral-600/30 rounded-full p-3 text-neutral-300 hover:text-white transition-all duration-300 ease-out"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <button
        onClick={navigateNext}
        className="absolute right-8 bottom-1/3 translate-y-1/2 z-30 bg-neutral-800/60 hover:bg-neutral-700/80 backdrop-blur-sm border border-neutral-600/30 rounded-full p-3 text-neutral-300 hover:text-white transition-all duration-300 ease-out"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Navigation Indicator */}
      <div className="absolute bottom-8 right-8 z-30 bg-neutral-800/60 backdrop-blur-sm border border-neutral-600/30 rounded-full px-4 py-2">
        <span className="text-neutral-300 text-sm font-medium">
          {currentIndex + 1}/{destinations.length}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center p-8">
        <div className={`max-w-4xl w-full transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

          {/* Action Buttons */}
          <div className="flex gap-4 max-w-2xl mx-auto">
            <button className="flex-1 bg-neutral-700/60 hover:bg-neutral-600/80 border border-neutral-600/40 text-neutral-200 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105">
              View Available Flights
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 border border-neutral-500/40 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenDestination;
