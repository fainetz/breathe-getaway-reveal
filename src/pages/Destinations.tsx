import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Star, Sparkles, Heart, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import FullScreenDestination from '../components/FullScreenDestination';
import FAQ from '../components/FAQ';
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
      title: "🏝️ AI-Curated Destinations",
      destinations: destinations.filter(dest => dest.type === 'destination')
    },
    {
      title: "🏨 Smart Hotel Matching",
      destinations: destinations.filter(dest => dest.type === 'hotel')
    },
    {
      title: "🧘‍♀️ Wellness-Focused Retreats",
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
    const container = document.getElementById(`carousel-${rowIndex}`);
    if (container) {
      const scrollAmount = 520;
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
          {/* Contemporary Header */}
          <div className="text-center mb-20 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm font-medium">
              <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full"></div>
              <Sparkles className="w-4 h-4 text-foreground/60" />
              <span className="text-foreground/80">AI-Powered Discovery</span>
            </div>
            
            <div className="relative">
              <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
                <span className="block text-foreground/90 mb-2">
                  Find Your
                </span>
                <span className="block text-foreground font-medium">
                  Perfect Escape
                </span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover destinations tailored to your preferences through intelligent travel curation
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

          {/* Magazine-Style Featured Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[80vh]">
              {/* Large Featured Card - Left Side */}
              <div className="lg:col-span-2">
                <div 
                  className="relative h-full rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
                  onClick={() => currentHero && handleCardClick(currentHero)}
                >
                  <div className="absolute inset-0">
                    {currentHero?.image ? (
                      <img 
                        src={currentHero.image} 
                        alt={currentHero.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted"></div>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg px-3 py-1">
                          <span className="text-sm font-medium text-primary-foreground">AI Recommended</span>
                        </div>
                        {currentHero?.rating && (
                          <div className="flex items-center gap-1 bg-background/20 backdrop-blur-sm rounded-lg px-3 py-1">
                            <Star className="w-4 h-4 text-primary fill-current" />
                            <span className="text-sm font-medium text-white">{currentHero.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        {currentHero?.name}
                      </h2>
                      
                      <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg">{currentHero?.location}</span>
                      </div>
                      
                      <p className="text-white/90 text-lg max-w-2xl">
                        {currentHero?.description}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <div className="bg-primary rounded-xl px-4 py-2">
                          <span className="text-lg font-bold text-primary-foreground">{currentHero?.price}</span>
                        </div>
                        <button 
                          className="bg-background/20 hover:bg-background/30 backdrop-blur-sm border border-border/30 rounded-xl px-6 py-2 text-white font-medium transition-all duration-300"
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
                </div>
              </div>
              
              {/* Right Side - Two Stacked Cards */}
              <div className="space-y-8">
                {featuredDestinations.slice(1, 3).map((destination, index) => (
                  <div 
                    key={destination.id}
                    className="relative h-[calc(50%-1rem)] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleCardClick(destination)}
                  >
                    <div className="absolute inset-0">
                      {destination.image ? (
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted"></div>
                      )}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                      <div className="flex items-center gap-2 text-white/80 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{destination.location}</span>
                      </div>
                      <div className="text-primary font-bold">{destination.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI-Powered Discovery Sections */}
          <div className="space-y-24">
            {categoryRows.map((row, rowIndex) => (
              <section key={rowIndex} className="space-y-8">
                {/* AI Section Header */}
                <div className="text-center space-y-6 max-w-4xl mx-auto">
                  <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-primary">AI-Powered Discovery</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-foreground">{row.title}</h2>
                  
                  <div className="space-y-4">
                    {rowIndex === 0 && (
                      <div className="space-y-3">
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          Our advanced AI analyzes over 50,000 destinations worldwide, matching your travel personality with perfect locations.
                        </p>
                        <p className="text-lg text-muted-foreground">
                          Using machine learning algorithms trained on millions of traveler preferences, weather patterns, cultural experiences, and real-time availability to curate your ideal escape.
                        </p>
                      </div>
                    )}
                    {rowIndex === 1 && (
                      <div className="space-y-3">
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          Smart accommodation matching powered by AI that understands luxury, comfort, and your unique preferences.
                        </p>
                        <p className="text-lg text-muted-foreground">
                          Our neural networks process guest reviews, amenity quality scores, location data, and service excellence ratings to find hotels that exceed your expectations.
                        </p>
                      </div>
                    )}
                    {rowIndex === 2 && (
                      <div className="space-y-3">
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          Transformative retreat recommendations using biometric wellness data and mindfulness compatibility scoring.
                        </p>
                        <p className="text-lg text-muted-foreground">
                          Advanced AI processes your stress levels, wellness goals, and spiritual preferences to match you with life-changing retreat experiences tailored to your inner journey.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Image Carousel */}
                <div className="relative">
                  <div 
                    id={`carousel-${rowIndex}`}
                    className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 px-4"
                    style={{ scrollSnapType: 'x mandatory' }}
                  >
                    {row.destinations.map((destination, index) => (
                      <div 
                        key={destination.id}
                        className="group flex-shrink-0 w-[500px] cursor-pointer"
                        style={{ scrollSnapAlign: 'start' }}
                        onClick={() => handleCardClick(destination)}
                      >
                        {/* Horizontal Card Layout */}
                        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                          <div className="flex h-64">
                            {/* Large Image - Left Side */}
                            <div className="relative w-3/5 overflow-hidden">
                              {destination.image ? (
                                <img 
                                  src={destination.image} 
                                  alt={destination.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                                  <div className="text-center text-muted-foreground">
                                    <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                                      <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                      </svg>
                                    </div>
                                    <p>High-Quality Image Loading</p>
                                  </div>
                                </div>
                              )}
                              
                              {/* Image Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                              
                              {/* Top Badges */}
                              <div className="absolute top-4 left-4 space-y-2">
                                {destination.featured && (
                                  <div className="bg-primary/90 backdrop-blur-sm rounded-xl px-3 py-1">
                                    <span className="text-xs font-bold text-primary-foreground">✨ AI RECOMMENDED</span>
                                  </div>
                                )}
                                {destination.comingSoon && (
                                  <div className="bg-background/90 backdrop-blur-sm rounded-xl px-3 py-1">
                                    <span className="text-xs font-medium text-muted-foreground">Coming Soon</span>
                                  </div>
                                )}
                              </div>
                              
                              {destination.rating && (
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-xl px-3 py-2">
                                  <Star className="w-4 h-4 text-primary fill-current" />
                                  <span className="text-sm font-bold text-foreground">{destination.rating}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Content - Right Side */}
                            <div className="w-2/5 p-6 flex flex-col justify-between">
                              <div className="space-y-4">
                                {/* Header */}
                                <div className="space-y-2">
                                  <h3 className="text-xl font-black text-card-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                                    {destination.name}
                                  </h3>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm font-medium">{destination.location}</span>
                                  </div>
                                </div>
                                
                                {/* AI Match Score */}
                                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-primary">AI Match Score</span>
                                    <span className="text-sm font-bold text-primary">
                                      {95 - index * 3}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-primary/20 rounded-full h-2">
                                    <div 
                                      className="bg-primary h-2 rounded-full transition-all duration-1000" 
                                      style={{ width: `${95 - index * 3}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                {/* Description */}
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                  {destination.description}
                                </p>
                                
                                {/* Mood & Tags */}
                                <div className="space-y-2">
                                  <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1">
                                    <Heart className="w-3 h-3 text-primary" />
                                    <span className="text-xs font-medium text-foreground">{destination.mood}</span>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-1">
                                    {destination.tags.slice(0, 2).map((tag, tagIndex) => (
                                      <div key={tagIndex} className="bg-muted/30 rounded-md px-2 py-1">
                                        <span className="text-xs text-muted-foreground">{tag}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Price & Action */}
                              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                                <div className="space-y-1">
                                  <div className="text-lg font-black text-primary">
                                    {destination.price}
                                  </div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {destination.duration}
                                  </div>
                                </div>
                                
                                {!destination.comingSoon && (
                                  <button 
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2 font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCardClick(destination);
                                    }}
                                  >
                                    <span className="flex items-center gap-2 text-sm">
                                      Book Now
                                      <ChevronRight className="w-3 h-3" />
                                    </span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Carousel Navigation */}
                  <div className="flex justify-center gap-3 mt-8">
                    <button
                      onClick={() => scrollRow('left', rowIndex)}
                      className="bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl p-3 transition-all duration-300 hover:scale-105"
                    >
                      <ChevronLeft className="w-5 h-5 text-primary" />
                    </button>
                    <button
                      onClick={() => scrollRow('right', rowIndex)}
                      className="bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl p-3 transition-all duration-300 hover:scale-105"
                    >
                      <ChevronRight className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
                
                {/* AI Insights Footer */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                    <span>Powered by advanced machine learning and real-time travel data</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rowIndex === 0 && "Our AI processes 10M+ data points daily including weather patterns, local events, safety scores, and traveler sentiment to ensure perfect timing for your journey."}
                    {rowIndex === 1 && "Smart algorithms analyze room quality, service excellence, location convenience, and guest satisfaction to match you with accommodations that exceed expectations."}
                    {rowIndex === 2 && "Wellness AI evaluates your stress levels, sleep patterns, mindfulness goals, and spiritual preferences to recommend transformative retreat experiences."}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Full Screen Destination Modal */}
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