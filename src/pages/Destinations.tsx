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
  type: 'hotel' | 'destination' | 'retreat';
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
    // LUXURY RETREATS
    {
      id: 14,
      name: "Alpine Wellness Sanctuary",
      location: "Swiss Alps, Switzerland",
      category: "wellness",
      type: "retreat",
      image: "/lovable-uploads/6a2f9c54-bbe6-4609-b27d-841996453813.png",
      price: "$3,299",
      duration: "7 days",
      description: "Transform your mind and body in a luxury mountain retreat with world-class spa treatments and meditation",
      mood: "Complete Transformation",
      tags: ["Wellness", "Spa", "Mountain Views"],
      rating: 4.9,
      comingSoon: false
    },
    {
      id: 15,
      name: "Maldivian Soul Retreat",
      location: "Private Island, Maldives",
      category: "luxury",
      type: "retreat",
      image: "/lovable-uploads/84e83280-d2ee-48a4-ba76-9feb7362ed10.png",
      price: "$4,999",
      duration: "10 days",
      description: "Ultimate luxury retreat on a private island with personal wellness coaches and underwater meditation",
      mood: "Pure Bliss",
      tags: ["Private Island", "Wellness", "Underwater"],
      rating: 5.0,
      featured: true
    },
    {
      id: 16,
      name: "Tuscany Culinary Retreat",
      location: "Val d'Orcia, Italy",
      category: "culinary",
      type: "retreat",
      image: "/lovable-uploads/b6902c70-0899-4bb8-b8ae-a982867eac3c.png",
      price: "$2,799",
      duration: "6 days",
      description: "Immerse yourself in Italian gastronomy with master chefs in a luxury villa setting",
      mood: "Culinary Adventure",
      tags: ["Cooking", "Wine", "Luxury Villa"],
      rating: 4.8,
      featured: true
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
      title: "🧘‍♀️ Luxury Retreats",
      destinations: destinations.filter(dest => dest.type === 'retreat')
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
      {/* Subtle Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-muted/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-muted/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-muted/3 rounded-full blur-3xl"></div>
      </div>

      {/* Elegant Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="group flex items-center gap-3 bg-background/95 backdrop-blur-xl border border-border rounded-2xl px-6 py-4 text-sm font-medium text-foreground hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Clean Hero Section */}
      <section className="relative min-h-screen pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Refined Header */}
          <div className="text-center mb-20 space-y-8">
            <div className="inline-flex items-center gap-3 bg-muted/50 backdrop-blur-sm border border-border rounded-full px-6 py-3 text-sm font-medium">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <Sparkles className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Discover Your Perfect Escape</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
              <span className="block text-foreground mb-2">
                Where Will You
              </span>
              <span className="block text-muted-foreground">
                Escape Today?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover extraordinary destinations that will create memories you'll treasure forever.
            </p>
            
            {/* Subtle Mood Selector */}
            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {[
                { emoji: "🏖️", text: "Beach Vibes" },
                { emoji: "🏔️", text: "Mountain Magic" },
                { emoji: "🧘‍♀️", text: "Soul Healing" },
                { emoji: "🍷", text: "Luxury Life" }
              ].map((mood, index) => (
                <button
                  key={index}
                  className="group bg-muted/30 hover:bg-muted/50 border border-border rounded-2xl px-5 py-3 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-lg mr-2">{mood.emoji}</span>
                  <span className="text-sm font-medium text-foreground">
                    {mood.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Elegant Featured Destination */}
          <div className="mb-32">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-foreground">
                Featured Destination
              </h2>
              <p className="text-lg text-muted-foreground">
                Close your eyes and imagine yourself here
              </p>
            </div>

            {/* Clean Hero Card */}
            <div className="relative h-[80vh] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-700"
                 onClick={() => currentHero && handleCardClick(currentHero)}>
              
              {/* Image Background */}
              <div className="absolute inset-0 overflow-hidden">
                {currentHero?.image ? (
                  <img 
                    src={currentHero.image} 
                    alt={currentHero.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-muted"></div>
                )}
              </div>

              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Clean Status Badges */}
              <div className="absolute top-8 right-8 space-y-3">
                {currentHero?.comingSoon && (
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-border">
                    <span className="text-sm font-medium text-muted-foreground">Coming Soon</span>
                  </div>
                )}
                <div className="bg-primary/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-sm font-medium text-primary-foreground">Featured</span>
                </div>
                {currentHero?.rating && (
                  <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-xl px-4 py-2">
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <span className="text-sm font-medium text-foreground">{currentHero.rating}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                <div className="max-w-4xl space-y-6">
                  {/* Mood Badge */}
                  <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm border border-border/20 rounded-full px-6 py-2">
                    <Heart className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-white">{currentHero?.mood}</span>
                  </div>
                  
                  {/* Title & Location */}
                  <div className="space-y-3">
                    <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                      {currentHero?.name}
                    </h3>
                    <div className="flex items-center gap-3 text-white/90">
                      <MapPin className="w-5 h-5" />
                      <span className="text-xl font-medium">{currentHero?.location}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/95 text-xl max-w-3xl leading-relaxed">
                    {currentHero?.description}
                  </p>
                  
                  {/* Price & Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                    <div className="bg-primary rounded-xl px-6 py-3">
                      <span className="text-xl font-bold text-primary-foreground">{currentHero?.price}</span>
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        className="group bg-background/20 hover:bg-background/30 backdrop-blur-xl border border-border/30 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          currentHero && handleCardClick(currentHero);
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Book Now
                        </span>
                      </button>
                      
                      <button className="group bg-background/10 hover:bg-background/20 backdrop-blur-xl border border-border/20 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300">
                        <span className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Save
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {currentHero?.tags.map((tag, index) => (
                      <div key={index} className="bg-background/20 backdrop-blur-sm border border-border/20 rounded-full px-4 py-2">
                        <span className="text-sm text-white/90">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simple Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHeroIndex(heroIndex === 0 ? featuredDestinations.length - 1 : heroIndex - 1);
                }}
                className="absolute left-8 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/30 backdrop-blur-sm border border-border/20 rounded-full p-3 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHeroIndex((heroIndex + 1) % featuredDestinations.length);
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/30 backdrop-blur-sm border border-border/20 rounded-full p-3 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* Clean Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {featuredDestinations.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHeroIndex(index);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === heroIndex 
                        ? 'w-8 h-2 bg-white' 
                        : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Clean Category Explorer */}
          <div className="space-y-20">
            {categoryRows.map((row, rowIndex) => (
              <section key={rowIndex} className="space-y-8">
                {/* Clean Category Header */}
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black text-foreground">
                    {row.title}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {rowIndex === 0 && "Discover breathtaking destinations around the world"}
                    {rowIndex === 1 && "Luxury accommodations where every detail matters"}
                    {rowIndex === 2 && "Transformative experiences for mind, body and soul"}
                  </p>
                  
                  {/* Simple Navigation */}
                  <div className="flex justify-center gap-3 pt-4">
                    <button
                      onClick={() => scrollRow('left', rowIndex)}
                      className="bg-muted hover:bg-muted/80 border border-border rounded-xl p-3 transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <button
                      onClick={() => scrollRow('right', rowIndex)}
                      className="bg-muted hover:bg-muted/80 border border-border rounded-xl p-3 transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5 text-foreground" />
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