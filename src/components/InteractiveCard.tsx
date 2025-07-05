
import { useState } from 'react';
import { MapPin, Navigation, X, ChevronLeft, ChevronRight } from 'lucide-react';

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

interface InteractiveCardProps {
  destination: Destination;
  index: number;
  isVisible: boolean;
  onCardClick: (destination: Destination) => void;
}

const InteractiveCard = ({ destination, index, isVisible, onCardClick }: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onCardClick(destination);
  };

  return (
    <div
      className={`group transition-all duration-1000 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div 
        className={`relative bg-gray-900/40 backdrop-blur-lg border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-500 ease-out hover:border-gray-500/40 hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/20 ${
          isHovered ? 'transform-gpu' : ''
        }`}
      >
        {/* Image */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={`https://images.unsplash.com/${destination.image}?w=300&h=200&fit=crop`}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-200">
            {destination.duration}
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-white">
              {destination.mood}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-bold text-white group-hover:text-gray-200 transition-colors leading-tight">
              {destination.name}
            </h3>
            <span className="text-sm font-bold text-gray-200 ml-2">
              {destination.price}
            </span>
          </div>
          
          <div className="flex items-center text-gray-400 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="text-xs">{destination.location}</span>
          </div>

          <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2">
            {destination.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-800/60 border border-gray-600/40 text-xs px-2 py-1 rounded-full text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <button className="w-full bg-white/10 hover:bg-white/20 border border-gray-600/40 hover:border-gray-500/60 py-2 rounded-lg text-sm font-medium text-white hover:text-gray-100 transition-all duration-500 ease-out flex items-center justify-center gap-2 group-hover:shadow-lg">
            <Navigation className="w-3 h-3" />
            Discover Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCard;
