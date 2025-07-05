
import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

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
  const handleClick = () => {
    onCardClick(destination);
  };

  return (
    <div
      className={`transition-all duration-1000 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      <div className="relative bg-neutral-900/60 backdrop-blur-md border border-neutral-700/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-neutral-600/40">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={`https://images.unsplash.com/${destination.image}?w=400&h=300&fit=crop`}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Top overlay info */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <span className="text-xs font-medium text-neutral-200">{destination.duration}</span>
          </div>
          
          {/* Bottom overlay info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="bg-neutral-800/70 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-xs font-medium text-neutral-200">{destination.mood}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-white">{destination.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">
              {destination.name}
            </h3>
            
            <div className="flex items-center text-neutral-400 mb-3">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{destination.location}</span>
            </div>
          </div>

          <p className="text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-2">
            {destination.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {destination.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-neutral-800/50 border border-neutral-600/30 text-xs px-3 py-1 rounded-full text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Simple explore button */}
          <div className="pt-2 border-t border-neutral-700/30">
            <div className="flex items-center justify-center text-neutral-400 text-sm font-medium">
              <Navigation className="w-4 h-4 mr-2" />
              <span>Explore Journey</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCard;
