
import { useState } from 'react';
import { MapPin, Plane, Clock, Calendar } from 'lucide-react';

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

  // Generate flight-specific details based on destination
  const getFlightDetails = () => {
    const flightTimes = ['6:30 AM', '11:45 AM', '3:20 PM', '8:15 PM'];
    const airlines = ['Delta', 'United', 'American', 'Emirates'];
    const flightDuration = destination.duration.replace(' days', 'h 30m');
    
    return {
      departure: flightTimes[destination.id % flightTimes.length],
      airline: airlines[destination.id % airlines.length],
      flightTime: flightDuration,
      flightNumber: `${airlines[destination.id % airlines.length].substring(0, 2).toUpperCase()}${1000 + destination.id}`
    };
  };

  const flightDetails = getFlightDetails();

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
          
          {/* Flight Number & Airline */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <span className="text-xs font-medium text-neutral-200">{flightDetails.airline} {flightDetails.flightNumber}</span>
          </div>

          {/* Flight Duration */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <span className="text-xs font-medium text-neutral-200">{flightDetails.flightTime}</span>
          </div>
          
          {/* Bottom overlay info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="bg-neutral-800/70 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-xs font-medium text-neutral-200">Departs {flightDetails.departure}</span>
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

          {/* Flight Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-neutral-300 text-sm">
              <Plane className="w-4 h-4 mr-2 text-blue-400" />
              <span>Direct Flight</span>
            </div>
            <div className="flex items-center text-neutral-300 text-sm">
              <Clock className="w-4 h-4 mr-2 text-green-400" />
              <span>On Time</span>
            </div>
            <div className="flex items-center text-neutral-300 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-purple-400" />
              <span>Flexible Dates</span>
            </div>
            <div className="flex items-center text-neutral-300 text-sm">
              <span className="w-4 h-4 mr-2 text-orange-400 font-bold text-xs">✈</span>
              <span>Premium Economy</span>
            </div>
          </div>

          {/* Flight Tags */}
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

          {/* Book Flight button */}
          <div className="pt-2 border-t border-neutral-700/30">
            <div className="flex items-center justify-center text-neutral-400 text-sm font-medium hover:text-white transition-colors">
              <Plane className="w-4 h-4 mr-2" />
              <span>Book Flight</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCard;
