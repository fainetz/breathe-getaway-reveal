import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Info, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import FullScreenDestination from '../components/FullScreenDestination';
import { useTheme } from '../contexts/ThemeContext';

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
  rating?: number;
  featured?: boolean;
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
    {
      id: 1,
      name: "Bali Soul Sanctuary",
      location: "Ubud, Indonesia",
      category: "healing",
      image: "/lovable-uploads/223f6e4e-7c4d-4398-80d1-f058166444dc.png", // Luxury tropical resort with pool
      price: "$1,299",
      duration: "7 days",
      description: "Find inner peace among rice terraces and ancient temples in this transformative wellness retreat",
      mood: "Seeking Balance",
      tags: ["Meditation", "Yoga", "Spa"],
      rating: 4.9,
      featured: true
    },
    {
      id: 2,
      name: "Northern Lights Quest",
      location: "Tromsø, Norway",
      category: "adventure",
      image: "", // No arctic image available yet
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
      image: "/lovable-uploads/c87d30ab-2ea7-4fe4-b3ba-6ac362719695.png", // Cherry blossoms in Japan with boats
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
      image: "", // No Greek island image available yet
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
      image: "", // No mountain wilderness image available yet
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
      image: "", // No Italian countryside image available yet
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
      image: "", // No Iceland image available yet
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
      image: "", // No Moroccan image available yet
      price: "$1,599",
      duration: "5 days",
      description: "Immerse in ancient traditions and vibrant markets",
      mood: "Seeking Adventure",
      tags: ["Markets", "Architecture", "Cuisine"],
      rating: 4.4
    },
    {
      id: 9,
      name: "Swiss Alps Retreat",
      location: "Zermatt, Switzerland",
      category: "healing",
      image: "", // No mountain image available yet
      price: "$2,699",
      duration: "7 days",
      description: "Alpine serenity with mountain meditation and spa treatments",
      mood: "Need Reset",
      tags: ["Mountains", "Spa", "Fresh Air"],
      rating: 4.9
    },
    {
      id: 10,
      name: "Stargazing Desert",
      location: "Atacama, Chile",
      category: "adventure",
      image: "", // No desert image available yet
      price: "$1,999",
      duration: "5 days",
      description: "Connect with the cosmos under the clearest skies on Earth",
      mood: "Seeking Wonder",
      tags: ["Stargazing", "Desert", "Astronomy"],
      rating: 4.6
    },
    {
      id: 11,
      name: "Amalfi Coast Romance",
      location: "Positano, Italy",
      category: "romantic",
      image: "/lovable-uploads/a7fab89d-dbcb-4845-8318-72e3f843227c.png", // Aerial view of beautiful beach
      price: "$2,199",
      duration: "5 days",
      description: "Coastal charm with intimate moments and Mediterranean bliss",
      mood: "Feeling Romantic",
      tags: ["Coast", "Luxury", "Dining"],
      rating: 4.8
    },
    {
      id: 12,
      name: "Amazon Wellness",
      location: "Iquitos, Peru",
      category: "healing",
      image: "", // No jungle image available yet
      price: "$1,899",
      duration: "8 days",
      description: "Jungle healing with ancient plant medicine traditions",
      mood: "Deep Healing",
      tags: ["Jungle", "Shamanic", "Nature"],
      rating: 4.3
    }
  ];

  const featuredDestinations = destinations.filter(dest => dest.featured);
  const categoryRows: CategoryRow[] = [
    {
      title: "Trending Now",
      destinations: destinations.filter(dest => dest.rating && dest.rating >= 4.7)
    },
    {
      title: "Healing Retreats",
      destinations: destinations.filter(dest => dest.category === 'healing')
    },
    {
      title: "Adventure Awaits",
      destinations: destinations.filter(dest => dest.category === 'adventure')
    },
    {
      title: "Cultural Immersion",
      destinations: destinations.filter(dest => dest.category === 'cultural')
    },
    {
      title: "Romantic Escapes",
      destinations: destinations.filter(dest => dest.category === 'romantic')
    }
  ];

  const handleCardClick = (destination: Destination) => {
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
              <h2 className="text-xl md:text-2xl font-bold">{row.title}</h2>
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
                    className="flex-none w-72 bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group/card border border-gray-800/50"
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

                      <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm rounded px-2 py-1">
                        <span className="text-xs font-bold">{destination.price}</span>
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