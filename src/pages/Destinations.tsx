import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Info, Star, InfoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import FullScreenDestination from '../components/FullScreenDestination';
import { useTheme } from '../contexts/ThemeContext';

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

interface CategoryRow {
  title: string;
  destinations: Destination[];
}

const Destinations = () => {
  const { theme } = useTheme();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const destinations: Destination[] = [
    // DESTINATIONS
    {
      id: 1,
      name: "Bali Soul Sanctuary",
      location: "Ubud, Indonesia",
      category: "healing",
      type: "hotel",
      image: "/lovable-uploads/5f365107-6261-4234-b664-965c3aea763b.png", // Tropical evening with palm trees and deck
      price: "$89/per night",
      duration: "nightly",
      description: "Find inner peace among rice terraces and ancient temples in this transformative wellness retreat",
      mood: "Seeking Balance",
      tags: ["Meditation", "Yoga", "Spa"],
      rating: 4.9,
      featured: false,
      comingSoon: true
    },
    {
      id: 2,
      name: "Santorini Dreams",
      location: "Santorini, Greece",
      category: "luxury",
      type: "destination",
      image: "/lovable-uploads/92794f25-53c0-4644-af8d-3e9343c68684.png", // Santorini white buildings at sunset
      price: "$2,199",
      duration: "5 days",
      description: "Experience ultimate luxury with stunning cliffside views and pristine Aegean waters",
      mood: "Craving Luxury",
      tags: ["Cliffside", "Sunset", "Luxury"],
      rating: 4.8,
      featured: true
    },
    {
      id: 3,
      name: "Tropical Beach Paradise",
      location: "Turks & Caicos",
      category: "relaxation",
      type: "destination",
      image: "/lovable-uploads/18aa8cb3-7178-47f3-b218-3aa6b8687db5.png", // Beautiful beach with umbrellas at sunset
      price: "$1,899",
      duration: "6 days",
      description: "Unwind on pristine beaches with crystal clear waters and spectacular sunset views",
      mood: "Need Relaxation",
      tags: ["Beach", "Sunset", "Paradise"],
      rating: 4.7,
      featured: true
    },
    {
      id: 4,
      name: "Mountain Pool Resort",
      location: "Bali, Indonesia", 
      category: "luxury",
      type: "destination",
      image: "/lovable-uploads/5da0882d-c336-4a6c-b816-25ff575ea341.png", // Tropical resort with infinity pool and mountains
      price: "$2,499",
      duration: "7 days",
      description: "Luxury resort experience with infinity pools surrounded by lush tropical mountains",
      mood: "Seeking Serenity",
      tags: ["Infinity Pool", "Mountains", "Luxury"],
      rating: 4.9,
      featured: true
    },
    {
      id: 5,
      name: "Luxury Pool Sanctuary",
      location: "Tulum, Mexico",
      category: "luxury",
      type: "destination", 
      image: "/lovable-uploads/e2c6c5a8-65a5-4005-976d-25a14867e43e.png", // Luxury resort pool with palm trees at sunset
      price: "$1,799",
      duration: "5 days",
      description: "Exclusive beachfront resort with pristine pools and tropical luxury",
      mood: "Ultimate Relaxation",
      tags: ["Pool", "Tropical", "Beachfront"],
      rating: 4.8,
      featured: true
    },
    {
      id: 114,
      name: "Santorini Sunset",
      location: "Santorini, Greece",
      category: "romantic",
      type: "destination",
      image: "/lovable-uploads/6b7f673a-c32c-4c6e-9496-bf8f5b86ec9a.png", // Amalfi Coast sunset
      price: "$1,699",
      duration: "4 days",
      description: "Romance awakens with Aegean sunsets and wine",
      mood: "Feeling Romantic",
      tags: ["Sunsets", "Wine", "Luxury"],
      rating: 4.6
    },
    {
      id: 115,
      name: "Patagonia Wild",
      location: "Torres del Paine, Chile",
      category: "adventure",
      type: "destination",
      image: "/lovable-uploads/a993028f-ad55-4fcd-bf8e-60a2820594d1.png", // Modern hotel city view
      price: "$2,499",
      duration: "8 days",
      description: "Reconnect with raw nature and your wild spirit",
      mood: "Need Freedom",
      tags: ["Hiking", "Wildlife", "Glaciers"],
      rating: 4.8
    },
    {
      id: 6,
      name: "Tuscany Healing",
      location: "Val d'Orcia, Italy",
      category: "healing",
      type: "destination",
      image: "/lovable-uploads/b6902c70-0899-4bb8-b8ae-a982867eac3c.png", // European riverside city
      price: "$1,799",
      duration: "6 days",
      description: "Heal your heart with rolling hills and fine wine",
      mood: "Need Healing",
      tags: ["Wine", "Countryside", "Cooking"],
      rating: 4.5
    },
    {
      id: 7,
      name: "Iceland Solitude",
      location: "Reykjavik, Iceland",
      category: "adventure",
      type: "destination",
      image: "/lovable-uploads/495f63b6-10b4-4636-9eaa-039faf98b098.png", // Overwater dining with stormy sky
      price: "$2,299",
      duration: "6 days",
      description: "Find solitude among glaciers and geysers",
      mood: "Need Escape",
      tags: ["Glaciers", "Hot Springs", "Northern Lights"],
      rating: 4.7
    },
    {
      id: 8,
      name: "Morocco Mystique",
      location: "Marrakech, Morocco",
      category: "cultural",
      type: "destination",
      image: "/lovable-uploads/a3d874ac-cf9d-49d9-8c6a-05b9ea62da47.png", // Cinque Terre colorful houses
      price: "$1,599",
      duration: "5 days",
      description: "Immerse in ancient traditions and vibrant markets",
      mood: "Seeking Adventure",
      tags: ["Markets", "Architecture", "Cuisine"],
      rating: 4.4
    },
    {
      id: 9,
      name: "Amalfi Coast Romance",
      location: "Positano, Italy",
      category: "romantic",
      type: "destination",
      image: "/lovable-uploads/4bedad66-82e6-44d2-a571-8ac9e6a3973d.png", // Tropical resort with palm trees
      price: "$2,199",
      duration: "5 days",
      description: "Coastal charm with intimate moments and Mediterranean bliss",
      mood: "Feeling Romantic",
      tags: ["Coast", "Luxury", "Dining"],
      rating: 4.8
    },
    {
      id: 10,
      name: "Amazon Wellness",
      location: "Iquitos, Peru",
      category: "healing",
      type: "destination",
      image: "/lovable-uploads/73d68dec-aaff-4cb1-9f42-798bc090860f.png", // Infinity pool ocean sunset
      price: "$1,899",
      duration: "8 days",
      description: "Jungle healing with ancient plant medicine traditions",
      mood: "Deep Healing",
      tags: ["Jungle", "Shamanic", "Nature"],
      rating: 4.3
    },
    // HOTELS
    {
      id: 11,
      name: "Maldives Overwater Villa",
      location: "Maldives",
      category: "luxury",
      type: "hotel",
      image: "/lovable-uploads/84e83280-d2ee-48a4-ba76-9feb7362ed10.png", // Illuminated boardwalk over water
      price: "$199/per night",
      duration: "nightly",
      description: "Private overwater villa with infinity pool and direct ocean access",
      mood: "Ultimate Luxury",
      tags: ["Overwater", "Private Pool", "Ocean"],
      rating: 4.9,
      comingSoon: true
    },
    {
      id: 12,
      name: "Infinity City Escape",
      location: "Dubai, UAE",
      category: "luxury",
      type: "hotel",
      image: "/lovable-uploads/9f082fcd-2f60-40ba-a703-582f95955704.png", // Luxury infinity pool with city skyline at night
      price: "$149/per night",
      duration: "nightly",
      description: "Luxury hotel with infinity pool overlooking stunning city skyline",
      mood: "Urban Luxury",
      tags: ["City Views", "Infinity Pool", "Luxury"],
      rating: 4.8,
      comingSoon: true
    },
    {
      id: 13,
      name: "Rooftop Paradise",
      location: "Singapore",
      category: "luxury",
      type: "hotel",
      image: "/lovable-uploads/ed0f836a-d91b-4585-8176-c12b7bb44d35.png", // Luxury rooftop pool with city skyline at night
      price: "$129/per night",
      duration: "nightly",
      description: "Rooftop infinity pool with panoramic city views and premium amenities",
      mood: "Skyline Serenity",
      tags: ["Rooftop", "City Views", "Infinity Pool"],
      rating: 4.7,
      comingSoon: true
    },
    // CRUISES
    {
      id: 14,
      name: "Mediterranean Discovery",
      location: "Barcelona to Rome",
      category: "cultural",
      type: "cruise",
      image: "/lovable-uploads/6a2f9c54-bbe6-4609-b27d-841996453813.png", // Cruise ship deck at sunset
      price: "$1,899",
      duration: "7 nights",
      description: "Explore ancient civilizations and stunning coastlines aboard a luxury cruise ship",
      mood: "Cultural Exploration",
      tags: ["Mediterranean", "History", "Luxury"],
      rating: 4.6,
      comingSoon: true
    },
    {
      id: 15,
      name: "Resort Paradise",
      location: "Greek Islands",
      category: "relaxation",
      type: "cruise",
      image: "/lovable-uploads/d1709257-3423-4d5d-98ba-75b2212febd3.png", // Resort with mountains and palm trees at dusk
      price: "$1,299",
      duration: "5 nights",
      description: "Island hopping adventure with pristine beaches and crystal-clear waters",
      mood: "Tropical Bliss",
      tags: ["Greek Islands", "Beaches", "Island Hopping"],
      rating: 4.5,
      comingSoon: true
    },
    {
      id: 16,
      name: "Urban Resort Experience",
      location: "Miami Beach",
      category: "luxury",
      type: "cruise",
      image: "/lovable-uploads/c076f873-5dcf-4eed-a632-26076d325426.png", // Aerial view of hotel pools
      price: "$3,499",
      duration: "10 nights",
      description: "Luxury resort experience with multiple pools and urban amenities",
      mood: "Urban Paradise",
      tags: ["Pools", "Urban", "Luxury"],
      rating: 4.8,
      comingSoon: true
    }
  ];

  const featuredDestinations = destinations.filter(dest => dest.featured);
  const categoryRows: CategoryRow[] = [
    {
      title: "Flight Destinations",
      destinations: destinations.filter(dest => dest.type === 'destination')
    },
    {
      title: "Hotels",
      destinations: destinations.filter(dest => dest.type === 'hotel')
    },
    {
      title: "Cruises",
      destinations: destinations.filter(dest => dest.type === 'cruise')
    }
  ];

  const handleCardClick = (destination: Destination) => {
    // Don't allow clicking on coming soon items
    if (destination.comingSoon) return;
    
    setSelectedDestination(destination);
    setIsFullScreenOpen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreenOpen(false);
    setSelectedDestination(null);
  };

  const handleNavigateDestination = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const scrollRow = (direction: 'left' | 'right', rowIndex: number) => {
    const container = document.getElementById(`row-${rowIndex}`);
    if (container) {
      const scrollAmount = 320; // Card width + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featuredDestinations.length);
    }, 10000); // Increased to 10s for smoother, more relaxed transitions
    return () => clearInterval(interval);
  }, [featuredDestinations.length]);

  const currentHero = featuredDestinations[heroIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white overflow-x-hidden">
      {/* Ambient background pattern */}
      <div className="fixed inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none"></div>
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 text-sm font-medium text-white hover:bg-black/60 hover:border-white/20 transition-all duration-300 shadow-2xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section - Full Screen Swipeable */}
      <section className="h-screen relative overflow-hidden">
        <div className="absolute top-24 left-6 md:left-12 z-30">
          <h2 className="text-2xl md:text-3xl font-bold">Featured</h2>
        </div>
        
        <div className="relative h-full group">
          {/* Navigation Arrows */}
          <button
            onClick={() => setHeroIndex(heroIndex === 0 ? featuredDestinations.length - 1 : heroIndex - 1)}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 opacity-70 hover:opacity-100 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setHeroIndex((heroIndex + 1) % featuredDestinations.length)}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 opacity-70 hover:opacity-100 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
            {featuredDestinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === heroIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Full Screen Card */}
          <div className="relative h-full w-full">
            <div className="absolute inset-0">
              {currentHero?.image ? (
                <img 
                  src={currentHero.image} 
                  alt={currentHero.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                    </div>
                    <p className="text-neutral-400">Image Coming Soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
              <div className="max-w-2xl">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentHero?.comingSoon && (
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600/30">
                      <span className="text-sm font-bold text-slate-300">COMING SOON</span>
                    </div>
                  )}
                  <div className="bg-blue-600/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold">FEATURED</span>
                  </div>
                  {currentHero?.rating && (
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{currentHero.rating}</span>
                    </div>
                  )}
                </div>

                {/* Title and Location */}
                <h1 className="text-4xl md:text-6xl font-bold mb-3">{currentHero?.name}</h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-4">{currentHero?.location}</p>
                
                {/* Description */}
                <p className="text-lg text-gray-400 mb-6 max-w-xl">{currentHero?.description}</p>
                
                {/* Price and CTA */}
                <div className="flex items-center gap-4">
                  <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-lg font-bold">{currentHero?.price}</span>
                  </div>
                  <button
                    onClick={() => currentHero && handleCardClick(currentHero)}
                    disabled={currentHero?.comingSoon}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      currentHero?.comingSoon 
                        ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-black hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {currentHero?.comingSoon ? 'Coming Soon' : 'Explore Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Rows - Netflix Style */}
      <div className="pb-12 pt-16">
        {categoryRows.map((row, rowIndex) => (
          <section key={rowIndex} className="mb-12">
            <div className="px-6 md:px-12 mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold">{row.title}</h2>
                {row.destinations.some(dest => dest.comingSoon) && (
                  <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600/30">
                    <span className="text-sm font-bold text-slate-300">COMING SOON</span>
                  </div>
                )}
                {(row.title === "Hotels" || row.title === "Cruises") && (
                  <div className="group relative">
                    <InfoIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap">
                        {row.title} will be sold by Breathe and Getaway soon
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-white/20 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative group">
              {/* Left Arrow */}
              <button
                onClick={() => scrollRow('left', rowIndex)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => scrollRow('right', rowIndex)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Scrollable Row */}
               <div 
                 id={`row-${rowIndex}`}
                 className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4 scroll-smooth"
                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
               >
                 {row.destinations.map((destination) => (
                   <div
                     key={destination.id}
                     onClick={() => handleCardClick(destination)}
                     className={`flex-none w-72 bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 group/card border border-gray-800/50 ${
                       destination.comingSoon 
                         ? 'cursor-not-allowed opacity-75' 
                         : 'cursor-pointer hover:scale-105'
                     }`}
                   >
                    <div className="relative h-40">
                      {destination.image ? (
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center group-hover/card:scale-105 transition-transform duration-300">
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 opacity-30">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                              </svg>
                            </div>
                            <p className="text-xs text-neutral-400">Image Coming Soon</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover/card:scale-105 transition-transform duration-300"></div>
                      
                      {destination.rating && (
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium">{destination.rating}</span>
                        </div>
                      )}

                       <div className="absolute top-3 right-3">
                         <div className="bg-green-500/90 backdrop-blur-sm rounded px-2 py-1">
                           <span className="text-xs font-bold">{destination.price}</span>
                         </div>
                       </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{destination.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{destination.location}</p>
                      <p className="text-gray-300 text-sm line-clamp-2 mb-3">{destination.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {destination.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-700/60 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Full Screen Destination View */}
      {selectedDestination && (
        <FullScreenDestination
          destination={selectedDestination}
          destinations={destinations}
          isOpen={isFullScreenOpen}
          onClose={handleCloseFullScreen}
          onNavigate={handleNavigateDestination}
        />
      )}
    </div>
  );
};

export default Destinations;