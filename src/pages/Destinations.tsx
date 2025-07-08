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
      image: "/lovable-uploads/1533e217-0961-4fb1-b5e1-f06df6a6bf74.png", // Luxury hotel interior with tropical view
      price: "$89/per night",
      duration: "nightly",
      description: "Find inner peace among rice terraces and ancient temples in this transformative wellness retreat",
      mood: "Seeking Balance",
      tags: ["Meditation", "Yoga", "Spa"],
      rating: 4.9,
      featured: true,
      comingSoon: true
    },
    {
      id: 2,
      name: "Northern Lights Quest",
      location: "Tromsø, Norway",
      category: "adventure",
      type: "destination",
      image: "/lovable-uploads/462239f6-9a27-4b7d-a660-d8474967fd14.png", // Northern Lights aurora over snowy landscape
      price: "$2,199",
      duration: "5 days",
      description: "Chase aurora dreams in the Arctic wilderness with expert guides and luxury accommodations",
      mood: "Craving Wonder",
      tags: ["Aurora", "Dog Sledding", "Ice Hotel"],
      rating: 4.8,
      featured: true
    },
    {
      id: 3,
      name: "Kyoto Mindfulness",
      location: "Kyoto, Japan",
      category: "cultural",
      type: "destination",
      image: "/lovable-uploads/9c5debbc-9089-442d-babf-ae82a2684501.png", // Tropical boat scene
      price: "$1,899",
      duration: "6 days",
      description: "Discover zen through tea ceremonies and temple walks in Japan's ancient capital",
      mood: "Need Clarity",
      tags: ["Temples", "Tea Ceremony", "Gardens"],
      rating: 4.7,
      featured: true
    },
    {
      id: 4,
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
      id: 5,
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
      image: "/lovable-uploads/364e2553-6bc1-48c9-b72f-ce670d007e17.png", // Resort pathway with mountains
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
      name: "Swiss Alps Retreat",
      location: "Zermatt, Switzerland",
      category: "mountain",
      type: "hotel",
      image: "/lovable-uploads/33c21689-4a63-4d20-b050-b566ede4b771.png", // Rooftop pool with city lights
      price: "$149/per night",
      duration: "nightly",
      description: "Alpine luxury hotel with panoramic mountain views and world-class spa",
      mood: "Mountain Serenity",
      tags: ["Mountains", "Spa", "Luxury"],
      rating: 4.8,
      comingSoon: true
    },
    {
      id: 13,
      name: "Santorini Cliff Resort",
      location: "Santorini, Greece",
      category: "romantic",
      type: "hotel",
      image: "/lovable-uploads/80ab770e-b0fd-4df8-9d27-2021f7dca01a.png", // City rooftop infinity pool
      price: "$129/per night",
      duration: "nightly",
      description: "Cliffside luxury resort with infinity pools overlooking the Aegean Sea",
      mood: "Romantic Escape",
      tags: ["Cliffside", "Infinity Pool", "Sunset"],
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
      image: "/lovable-uploads/c442bea5-cadc-4e64-8f52-41dfc17b1f5d.png", // Cruise ship deck at sunset
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
      name: "Caribbean Paradise",
      location: "Miami to Caribbean",
      category: "relaxation",
      type: "cruise",
      image: "/lovable-uploads/917e68fa-9122-40f5-b1f0-77cb18b946e3.png", // Tropical resort pool
      price: "$1,299",
      duration: "5 nights",
      description: "Island hopping adventure with pristine beaches and crystal-clear waters",
      mood: "Tropical Bliss",
      tags: ["Caribbean", "Beaches", "Island Hopping"],
      rating: 4.5,
      comingSoon: true
    },
    {
      id: 16,
      name: "Northern Lights Expedition",
      location: "Norway Fjords",
      category: "adventure",
      type: "cruise",
      image: "/lovable-uploads/44271e40-b9f9-4b74-a5b9-9f414e3a5eac.png", // Aerial view of hotel pools
      price: "$3,499",
      duration: "10 nights",
      description: "Arctic expedition cruise to witness the spectacular Northern Lights phenomenon",
      mood: "Arctic Wonder",
      tags: ["Northern Lights", "Fjords", "Expedition"],
      rating: 4.8,
      comingSoon: true
    }
  ];

  const featuredDestinations = destinations.filter(dest => dest.featured);
  const categoryRows: CategoryRow[] = [
    {
      title: "Suggested",
      destinations: destinations.filter(dest => dest.rating && dest.rating >= 4.7)
    },
    {
      title: "Destinations",
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
    }, 6000);
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

      {/* Hero Section - Netflix Style */}
      {currentHero && (
        <section className="relative h-[80vh] overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0">
            {currentHero.image ? (
              <img 
                src={currentHero.image} 
                alt={currentHero.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex items-center px-6 md:px-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{currentHero.rating} • {currentHero.duration}</span>
                <span className="text-xs bg-red-600 px-2 py-1 rounded">FEATURED</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {currentHero.name}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                {currentHero.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {currentHero.tags.map((tag, index) => (
                  <span key={index} className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleCardClick(currentHero)}
                  className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-white/90 transition-all duration-200"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Explore Now
                </button>
                <button 
                  onClick={() => handleCardClick(currentHero)}
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-3 rounded font-semibold hover:bg-white/30 transition-all duration-200"
                >
                  <Info className="w-5 h-5" />
                  More Info
                </button>
              </div>

              <div className="flex items-center gap-2 mt-8">
                <span className="text-2xl font-bold text-green-400">{currentHero.price}</span>
                <span className="text-gray-300">• {currentHero.location}</span>
              </div>
            </div>
          </div>

          {/* Hero Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {featuredDestinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === heroIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Content Rows - Netflix Style */}
      <div className="pb-12">
        {categoryRows.map((row, rowIndex) => (
          <section key={rowIndex} className="mb-12">
            <div className="px-6 md:px-12 mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold">{row.title}</h2>
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
                className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
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

                       <div className="absolute top-3 right-3 flex flex-col gap-1">
                         {destination.comingSoon && (
                           <div className="bg-orange-500/90 backdrop-blur-sm rounded px-2 py-1">
                             <span className="text-xs font-bold">COMING SOON</span>
                           </div>
                         )}
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