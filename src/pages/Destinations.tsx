import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Star, Sparkles, Heart, Calendar, Clock } from 'lucide-react';
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

  const destinations: Destination[] = [
    // DESTINATIONS
    {
      id: 1,
      name: "Bali Soul Sanctuary",
      location: "Ubud, Indonesia",
      category: "healing",
      type: "hotel",
      image: "/lovable-uploads/5f365107-6261-4234-b664-965c3aea763b.png",
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
      image: "/lovable-uploads/92794f25-53c0-4644-af8d-3e9343c68684.png",
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
      image: "/lovable-uploads/18aa8cb3-7178-47f3-b218-3aa6b8687db5.png",
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
      image: "/lovable-uploads/5da0882d-c336-4a6c-b816-25ff575ea341.png",
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
      image: "/lovable-uploads/e2c6c5a8-65a5-4005-976d-25a14867e43e.png",
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
      image: "/lovable-uploads/6b7f673a-c32c-4c6e-9496-bf8f5b86ec9a.png",
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
      image: "/lovable-uploads/a993028f-ad55-4fcd-bf8e-60a2820594d1.png",
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
      image: "/lovable-uploads/b6902c70-0899-4bb8-b8ae-a982867eac3c.png",
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
      image: "/lovable-uploads/495f63b6-10b4-4636-9eaa-039faf98b098.png",
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
      image: "/lovable-uploads/a3d874ac-cf9d-49d9-8c6a-05b9ea62da47.png",
      price: "$1,599",
      duration: "5 days",
      description: "Immerse in ancient traditions and vibrant markets",
      mood: "Seeking Adventure",
      tags: ["Markets", "Architecture", "Cuisine"],
      rating: 4.4
    },
    // HOTELS
    {
      id: 11,
      name: "Maldives Overwater Villa",
      location: "Maldives",
      category: "luxury",
      type: "hotel",
      image: "/lovable-uploads/84e83280-d2ee-48a4-ba76-9feb7362ed10.png",
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
      image: "/lovable-uploads/9f082fcd-2f60-40ba-a703-582f95955704.png",
      price: "$149/per night",
      duration: "nightly",
      description: "Luxury hotel with infinity pool overlooking stunning city skyline",
      mood: "Urban Luxury",
      tags: ["City Views", "Infinity Pool", "Luxury"],
      rating: 4.8,
      comingSoon: true
    },
    // CRUISES
    {
      id: 14,
      name: "Mediterranean Discovery",
      location: "Barcelona to Rome",
      category: "cultural",
      type: "cruise",
      image: "/lovable-uploads/6a2f9c54-bbe6-4609-b27d-841996453813.png",
      price: "$1,899",
      duration: "7 nights",
      description: "Explore ancient civilizations and stunning coastlines aboard a luxury cruise ship",
      mood: "Cultural Exploration",
      tags: ["Mediterranean", "History", "Luxury"],
      rating: 4.6,
      comingSoon: true
    }
  ];

  const featuredDestinations = destinations.filter(dest => dest.featured);
  const categoryRows: CategoryRow[] = [
    {
      title: "🏝️ Destinations",
      destinations: destinations.filter(dest => dest.type === 'destination')
    },
    {
      title: "🏨 Hotels",
      destinations: destinations.filter(dest => dest.type === 'hotel')
    },
    {
      title: "🚢 Cruises",
      destinations: destinations.filter(dest => dest.type === 'cruise')
    }
  ];

  const handleCardClick = (destination: Destination) => {
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
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featuredDestinations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredDestinations.length]);

  const currentHero = featuredDestinations[heroIndex];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Floating Elements Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-background/80 backdrop-blur-xl border border-border rounded-full px-5 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Your Dream Vacation Awaits
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Pick Your Perfect
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Escape
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From tropical beaches to mountain retreats, find the destination that matches your vibe and book your getaway today.
            </p>
          </div>

          {/* Featured Destinations Carousel */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">✨ Featured Escapes</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setHeroIndex(heroIndex === 0 ? featuredDestinations.length - 1 : heroIndex - 1)}
                  className="bg-background border border-border hover:bg-accent rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setHeroIndex((heroIndex + 1) % featuredDestinations.length)}
                  className="bg-background border border-border hover:bg-accent rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Large Featured Card */}
            <div className="relative h-[70vh] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
                 onClick={() => currentHero && handleCardClick(currentHero)}>
              <div className="absolute inset-0">
                {currentHero?.image ? (
                  <img 
                    src={currentHero.image} 
                    alt={currentHero.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      </div>
                      <p>Image Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-2xl space-y-4">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3">
                    {currentHero?.comingSoon && (
                      <div className="bg-muted/20 backdrop-blur-sm rounded-full px-3 py-1 border border-border/20">
                        <span className="text-xs font-medium text-muted-foreground">COMING SOON</span>
                      </div>
                    )}
                    <div className="bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-bold text-primary-foreground">FEATURED</span>
                    </div>
                    {currentHero?.rating && (
                      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium text-white">{currentHero.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Title and Location */}
                  <div>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">{currentHero?.name}</h3>
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin className="w-4 h-4" />
                      <span className="text-lg">{currentHero?.location}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/90 text-lg max-w-xl">{currentHero?.description}</p>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="bg-emerald-500 rounded-xl px-4 py-2">
                      <span className="text-lg font-bold text-white">{currentHero?.price}</span>
                    </div>
                    <button
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-2 text-white font-medium transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        currentHero && handleCardClick(currentHero);
                      }}
                    >
                      Explore Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {featuredDestinations.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHeroIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === heroIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Browse by Category */}
          <div className="space-y-12">
            {categoryRows.map((row, rowIndex) => (
              <section key={rowIndex} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">{row.title}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollRow('left', rowIndex)}
                      className="bg-background border border-border hover:bg-accent rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollRow('right', rowIndex)}
                      className="bg-background border border-border hover:bg-accent rounded-full p-2 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div 
                  id={`row-${rowIndex}`}
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {row.destinations.map((destination) => (
                    <div
                      key={destination.id}
                      onClick={() => handleCardClick(destination)}
                      className={`flex-none w-80 bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 group/card shadow-lg hover:shadow-xl ${
                        destination.comingSoon 
                          ? 'cursor-not-allowed opacity-75' 
                          : 'cursor-pointer hover:scale-[1.02]'
                      }`}
                    >
                      <div className="relative h-48">
                        {destination.image ? (
                          <img 
                            src={destination.image} 
                            alt={destination.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                              <div className="w-12 h-12 mx-auto mb-2 opacity-30">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                </svg>
                              </div>
                              <p className="text-xs">Image Coming Soon</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        {/* Status Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {destination.comingSoon && (
                            <div className="bg-muted/80 backdrop-blur-sm rounded-full px-2 py-1">
                              <span className="text-xs font-medium text-muted-foreground">COMING SOON</span>
                            </div>
                          )}
                          {destination.rating && (
                            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs font-medium text-white">{destination.rating}</span>
                            </div>
                          )}
                        </div>

                        {/* Price Badge */}
                        <div className="absolute top-3 right-3">
                          <div className="bg-emerald-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-sm font-bold text-white">{destination.price}</span>
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                          <Clock className="w-3 h-3 text-white" />
                          <span className="text-xs font-medium text-white">{destination.duration}</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg text-foreground line-clamp-1">{destination.name}</h3>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="text-sm">{destination.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">{destination.description}</p>
                        
                        <div className="flex flex-wrap gap-1">
                          {destination.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {!destination.comingSoon && (
                          <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-2 text-sm font-medium transition-colors">
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

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