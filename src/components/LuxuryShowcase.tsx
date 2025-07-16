import { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Star, X, Brain, Zap, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DraggableDialogContent from './DraggableDialogContent';
import { useIsMobile } from '@/hooks/use-mobile';

const LuxuryShowcase = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const showcaseImages = [
    {
      id: 1,
      image: '/lovable-uploads/5935897b-1c16-4e4f-8a47-50073b06561d.png',
      title: 'AI Hotel Discovery',
      subtitle: 'Intelligent hotel matching leverages natural language processing to understand your accommodation preferences. The AI evaluates room types, amenities, location advantages, and guest satisfaction scores to present hotels that align perfectly with your luxury standards.',
      location: 'Personalized Results',
      rating: 5.0,
      price: 'Best Prices',
      category: 'Hotel Booking',
      comingSoon: true,
      details: 'Deep learning algorithms process hotel features, guest reviews, and location data to predict your satisfaction score for each property. The AI considers your check-in preferences, room requirements, and desired amenities to curate a personalized selection of luxury accommodations.',
      icon: Brain,
      features: [
        'Natural language preference processing',
        'Satisfaction score prediction',
        'Amenity compatibility matching',
        'Location advantage analysis',
        'Personalized hotel curation'
      ],
      howItWorks: 'Our intelligent hotel matching system uses natural language processing to understand your accommodation preferences from simple descriptions. The AI evaluates thousands of hotels, analyzing room types, amenities, and guest reviews to predict your satisfaction and present only the properties that align with your luxury standards.'
    },
    {
      id: 2,
      image: '/lovable-uploads/e741e714-0f47-4218-abfd-18a2af844425.png',
      title: 'Flight & Seat Selection',
      subtitle: 'Smart flight AI processes millions of route combinations, seat maps, and airline policies to find your ideal journey. The system learns from your travel patterns and preferences to recommend optimal flight times, seat selections, and connection strategies.',
      location: 'Global Routes',
      rating: 4.9,
      price: 'Optimized Fares',
      category: 'Flight Search',
      isNew: true,
      details: 'Machine learning models analyze flight patterns, price fluctuations, and seat availability across multiple airlines. The AI considers your seating preferences, meal requirements, and schedule flexibility to secure the best flights at optimal prices. We also ensure you get a window seat on the side where the sun sets during your flight for the most breathtaking views.',
      icon: Zap,
      features: [
        'Smart seat selection algorithms',
        'Multi-airline price comparison',
        'Route optimization analysis',
        'Personalized flight recommendations',
        'Real-time availability tracking'
      ],
      howItWorks: 'Our AI processes millions of flight combinations, analyzing seat maps, airline policies, and pricing trends. The system learns your preferences for departure times, seating arrangements, and connection preferences to recommend the perfect flight options within your budget.'
    },
    {
      id: 3,
      image: '/lovable-uploads/3f81b31d-0911-4669-829d-e28da3084ad5.png',
      title: 'Luxury Retreat Finder',
      subtitle: 'Our AI analyzes thousands of luxury retreat options, considering your travel history, preferences, and budget constraints. Machine learning algorithms evaluate amenities, location exclusivity, and seasonal availability to curate the perfect getaway experience.',
      location: 'Worldwide',
      rating: 4.8,
      price: 'Exclusive Deals',
      category: 'Retreat Planning',
      comingSoon: true,
      details: 'Advanced algorithms scan luxury retreat databases, analyzing guest reviews, seasonal pricing, and amenity compatibility with your preferences. The AI considers factors like privacy levels, activity preferences, and dietary requirements to match you with retreats that exceed expectations.',
      icon: Settings,
      features: [
        'AI-powered preference analysis',
        'Real-time availability checking',
        'Personalized retreat matching',
        'Budget optimization algorithms',
        'Location exclusivity scoring'
      ],
      howItWorks: 'Our machine learning models analyze your travel history, preferences, and budget to create a unique profile. The AI then scans thousands of luxury retreat options, evaluating factors like amenities, location, seasonal pricing, and guest reviews to present you with curated options that perfectly match your desires.'
    }
  ];

  const additionalImages = [
    '/lovable-uploads/e4315854-b0ce-479e-815b-57637f36f5c0.png', // Luxury bathroom
    '/lovable-uploads/0552923f-16b3-4d02-a0d3-b41d59de70ba.png', // Ocean view pool
    '/lovable-uploads/d29d3ffd-9214-4505-bd42-d66b6741152e.png', // Sunset deck
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">LUXURY FEATURES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
            AI-Powered
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Luxury Travel
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience intelligent luxury travel planning. Our AI analyzes your preferences, reviews, and requirements to find your perfect match.
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Large Featured Image */}
          <div className={`lg:row-span-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <Dialog>
              <DialogTrigger asChild>
                <div 
                  className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] transform-gpu"
                  onMouseEnter={() => setHoveredImage(0)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img 
                    src={showcaseImages[0].image}
                    alt={showcaseImages[0].title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  {/* Floating Badges */}
                  <div className="absolute top-6 left-6 transition-all duration-500 group-hover:scale-110 group-hover:translate-x-2 flex gap-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500">
                      <span className="text-white font-semibold text-sm">{showcaseImages[0].category}</span>
                    </div>
                    {showcaseImages[0].comingSoon && (
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 backdrop-blur-sm rounded-full px-3 py-2 border border-purple-400/30 group-hover:scale-105 transition-all duration-500">
                        <span className="text-white font-bold text-sm">COMING SOON</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-3 transition-all duration-500 group-hover:translate-x-2">
                      <MapPin className="w-4 h-4 text-white/80 group-hover:text-white transition-colors duration-500" />
                      <span className="text-white/90 text-sm group-hover:text-white transition-colors duration-500">{showcaseImages[0].location}</span>
                      <div className="flex items-center gap-1 ml-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-500" />
                        <span className="text-white/90 text-sm group-hover:text-white transition-colors duration-500">{showcaseImages[0].rating}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 transition-all duration-500 group-hover:translate-x-2">{showcaseImages[0].title}</h3>
                    <p className="text-white/80 mb-4 transition-all duration-500 group-hover:text-white/90 group-hover:translate-x-2">{showcaseImages[0].subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold transition-all duration-500 group-hover:translate-x-2 group-hover:scale-105">{showcaseImages[0].price}</span>
                      <div 
                        className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold transition-all duration-500 hover:bg-white/30 hover:scale-105 ${
                          hoveredImage === 0 ? 'bg-white/30 translate-x-2 scale-105' : ''
                        }`}
                      >
                        Explore
                        <ArrowRight className={`w-4 h-4 transition-transform duration-500 ${hoveredImage === 0 ? 'translate-x-1' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className={`max-w-[95vw] sm:max-w-4xl lg:max-w-6xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden border shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] p-0 [&>button]:hidden ${
                isMobile 
                  ? 'bg-white/5 dark:bg-gray-950/20 backdrop-blur-[40px] border-white/5 rounded-t-[32px] top-auto bottom-0 data-[state=open]:animate-slide-up-mobile data-[state=closed]:animate-slide-down-mobile' 
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl top-[50%] bottom-auto data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out'
              }`}>
                <DialogTitle className="sr-only">{showcaseImages[0].title}</DialogTitle>
                {isMobile ? (
                  <DraggableDialogContent>
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-slate-500/5 to-gray-600/10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(148,163,184,0.08),transparent_70%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(100,116,139,0.08),transparent_70%)]"></div>
                  </div>

                  {/* Header */}
                  <div className="relative p-4 sm:p-6 lg:p-10 pb-4 sm:pb-6 lg:pb-8 border-b border-white/5">
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-300/20 to-gray-400/20 rounded-2xl sm:rounded-3xl blur-2xl opacity-40"></div>
                        <div className="relative bg-white/10 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 border border-white/10">
                          <Brain className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white/90" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1 className="text-xl sm:text-2xl lg:text-5xl font-light text-white/95 mb-2 sm:mb-3 tracking-tight truncate">{showcaseImages[0].title}</h1>
                        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                          <div className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10">
                            <span className="text-white/80 font-medium text-sm sm:text-base lg:text-lg">{showcaseImages[0].category}</span>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 text-white/70">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300/80 fill-amber-300/80" />
                            <span className="font-medium text-sm sm:text-base lg:text-lg">{showcaseImages[0].rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-4 sm:p-6 lg:p-10 max-h-[calc(90vh-120px)] sm:max-h-[calc(95vh-220px)] overflow-y-auto">
                    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                      {/* Hero Image */}
                      <div className="relative h-48 sm:h-64 lg:h-[420px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden group">
                        <img 
                          src={showcaseImages[0].image}
                          alt={showcaseImages[0].title}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-slate-900/20 mix-blend-overlay"></div>
                        
                        {/* Floating Elements */}
                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8 flex items-center justify-between gap-2 sm:gap-4">
                          <div className="bg-black/20 backdrop-blur-3xl rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-6 border border-white/10">
                            <div className="text-white/95 font-medium text-sm sm:text-base lg:text-xl mb-1">{showcaseImages[0].price}</div>
                            <div className="text-white/60 text-xs sm:text-sm">Pricing Model</div>
                          </div>
                          <div className="bg-black/20 backdrop-blur-3xl rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-6 border border-white/10">
                            <div className="text-white/95 font-medium text-sm sm:text-base lg:text-xl mb-1">{showcaseImages[0].location}</div>
                            <div className="text-white/60 text-xs sm:text-sm">Global Reach</div>
                          </div>
                        </div>
                      </div>

                      {/* Main Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
                        {/* Left Column */}
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                          {/* Overview */}
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-400/8 to-gray-500/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                            <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-slate-300 to-gray-400 rounded-full opacity-60"></div>
                                <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">Overview</h3>
                              </div>
                              <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                                {showcaseImages[0].details}
                              </p>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/8 to-slate-500/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                            <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-gray-300 to-slate-400 rounded-full opacity-60"></div>
                                <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">Key Features</h3>
                              </div>
                              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                                {showcaseImages[0].features.map((feature, index) => (
                                  <div key={index} className="group/item flex items-center gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-5 bg-white/2 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-400">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-slate-300 to-gray-400 rounded-full opacity-60 flex-shrink-0"></div>
                                    <span className="text-white/80 font-light text-sm sm:text-base lg:text-lg">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                          {/* How It Works */}
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/8 to-gray-400/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                            <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-gray-300 to-slate-400 rounded-full opacity-60"></div>
                                <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">How It Works</h3>
                              </div>
                              <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                                {showcaseImages[0].howItWorks}
                              </p>
                            </div>
                          </div>

                          {/* Performance Stats */}
                          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-gray-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                              <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/5 text-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/95 mb-2 sm:mb-3">99.9%</div>
                                <div className="text-white/60 text-xs sm:text-sm font-light">AI Accuracy</div>
                              </div>
                            </div>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                              <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/5 text-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/95 mb-2 sm:mb-3">&lt;2s</div>
                                <div className="text-white/60 text-xs sm:text-sm font-light">Response Time</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </DraggableDialogContent>
                ) : (
                  <div className="bg-white dark:bg-gray-900">
                    {/* Desktop Version - Clean design with proper contrast */}
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-lg">
                            <Brain className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{showcaseImages[0].title}</h1>
                          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                            <div className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10">
                              <span className="text-white/80 font-medium text-sm sm:text-base lg:text-lg">{showcaseImages[0].category}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-white/70">
                              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300/80 fill-amber-300/80" />
                              <span className="font-medium text-sm sm:text-base lg:text-lg">{showcaseImages[0].rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative pt-6 sm:pt-8 lg:pt-10 max-h-[calc(95vh-220px)] overflow-y-auto">
                      <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                        {/* Hero Image */}
                        <div className="relative h-48 sm:h-64 lg:h-[420px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden group">
                          <img 
                            src={showcaseImages[0].image}
                            alt={showcaseImages[0].title}
                            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-slate-900/20 mix-blend-overlay"></div>
                          
                          {/* Floating Elements */}
                          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8 flex items-center justify-between gap-2 sm:gap-4">
                            <div className="bg-black/20 backdrop-blur-3xl rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-6 border border-white/10">
                              <div className="text-white/95 font-medium text-sm sm:text-base lg:text-xl mb-1">{showcaseImages[0].price}</div>
                              <div className="text-white/60 text-xs sm:text-sm">Pricing Model</div>
                            </div>
                            <div className="bg-black/20 backdrop-blur-3xl rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-6 border border-white/10">
                              <div className="text-white/95 font-medium text-sm sm:text-base lg:text-xl mb-1">{showcaseImages[0].location}</div>
                              <div className="text-white/60 text-xs sm:text-sm">Global Reach</div>
                            </div>
                          </div>
                        </div>

                        {/* Rest of content - same as mobile but without drag wrapper */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
                          {/* Left Column */}
                          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                            {/* Overview */}
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/8 to-gray-500/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                              <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                  <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-slate-300 to-gray-400 rounded-full opacity-60"></div>
                                  <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">Overview</h3>
                                </div>
                                <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                                  {showcaseImages[0].details}
                                </p>
                              </div>
                            </div>

                            {/* Features */}
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/8 to-slate-500/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                              <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                  <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-gray-300 to-slate-400 rounded-full opacity-60"></div>
                                  <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">Key Features</h3>
                                </div>
                                <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                                  {showcaseImages[0].features.map((feature, index) => (
                                    <div key={index} className="group/item flex items-center gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-5 bg-white/2 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-400">
                                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-slate-300 to-gray-400 rounded-full opacity-60 flex-shrink-0"></div>
                                      <span className="text-white/80 font-light text-sm sm:text-base lg:text-lg">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                            {/* How It Works */}
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/8 to-gray-400/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                              <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                  <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-gray-300 to-slate-400 rounded-full opacity-60"></div>
                                  <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">How It Works</h3>
                                </div>
                                <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                                  {showcaseImages[0].howItWorks}
                                </p>
                              </div>
                            </div>

                            {/* Performance Stats */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-gray-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/5 text-center">
                                  <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/95 mb-2 sm:mb-3">99.9%</div>
                                  <div className="text-white/60 text-xs sm:text-sm font-light">AI Accuracy</div>
                                </div>
                              </div>
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/5 text-center">
                                  <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/95 mb-2 sm:mb-3">&lt;2s</div>
                                  <div className="text-white/60 text-xs sm:text-sm font-light">Response Time</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {/* Two Medium Images */}
          <div className="space-y-8">
            {showcaseImages.slice(1).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id}
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                  style={{ transitionDelay: `${(index + 1) * 200 + 500}ms` }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div 
                        className="relative h-[280px] rounded-2xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.03] transform-gpu"
                        onMouseEnter={() => setHoveredImage(index + 1)}
                        onMouseLeave={() => setHoveredImage(null)}
                    >
                        <img 
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4 transition-all duration-500 group-hover:scale-110 group-hover:translate-x-1 flex gap-2">
                          <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 group-hover:bg-black/40 group-hover:border group-hover:border-white/20 transition-all duration-500">
                            <span className="text-white font-medium text-xs">{item.category}</span>
                          </div>
                          {item.isNew && (
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-sm rounded-full px-2 py-1 border border-orange-400/30 group-hover:scale-105 transition-all duration-500">
                              <span className="text-white font-bold text-xs">NEW</span>
                            </div>
                          )}
                          {item.comingSoon && (
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 backdrop-blur-sm rounded-full px-2 py-1 border border-purple-400/30 group-hover:scale-105 transition-all duration-500">
                              <span className="text-white font-bold text-xs">COMING SOON</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-4 left-4 right-4 transition-all duration-500 group-hover:translate-y-[-2px]">
                          <div className="flex items-center gap-2 mb-2 transition-all duration-500 group-hover:translate-x-1">
                            <MapPin className="w-3 h-3 text-white/70 group-hover:text-white transition-colors duration-500" />
                            <span className="text-white/80 text-xs group-hover:text-white transition-colors duration-500">{item.location}</span>
                            <div className="flex items-center gap-1 ml-2">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-500" />
                              <span className="text-white/80 text-xs group-hover:text-white transition-colors duration-500">{item.rating}</span>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-1 transition-all duration-500 group-hover:translate-x-1">{item.title}</h4>
                          <p className="text-white/70 text-sm mb-2 line-clamp-3 transition-all duration-500 group-hover:text-white/80 group-hover:translate-x-1">{item.subtitle.substring(0, 120)}...</p>
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold text-sm transition-all duration-500 group-hover:translate-x-1 group-hover:scale-105">{item.price}</span>
                            <div 
                              className={`flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium transition-all duration-500 hover:bg-white/30 hover:scale-105 ${
                                hoveredImage === index + 1 ? 'bg-white/30 translate-x-1 scale-105' : ''
                              }`}
                            >
                              View
                              <ArrowRight className={`w-3 h-3 transition-transform duration-500 ${hoveredImage === index + 1 ? 'translate-x-0.5' : ''}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                   <DialogContent className={`max-w-[95vw] sm:max-w-4xl lg:max-w-6xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden border shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] p-0 [&>button]:hidden ${
                     isMobile 
                       ? 'bg-white/5 dark:bg-gray-950/20 backdrop-blur-[40px] border-white/5 rounded-t-[32px] top-auto bottom-0 data-[state=open]:animate-slide-up-mobile data-[state=closed]:animate-slide-down-mobile' 
                       : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl top-[50%] bottom-auto data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out'
                   }`}>
                      <DialogTitle className="sr-only">{item.title}</DialogTitle>
                      {isMobile ? (
                        <DraggableDialogContent>
                          {/* Mobile Version - with drag wrapper and fixed header */}
                          {/* Subtle Background Pattern */}
                          <div className="absolute inset-0 opacity-30">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-slate-500/5 to-gray-600/10"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(148,163,184,0.08),transparent_70%)]"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(100,116,139,0.08),transparent_70%)]"></div>
                          </div>

                          {/* Header */}
                          <div className="relative p-4 sm:p-6 lg:p-10 pb-4 sm:pb-6 lg:pb-8 border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
                        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-300/20 to-gray-400/20 rounded-2xl sm:rounded-3xl blur-2xl opacity-40"></div>
                            <div className="relative bg-white/10 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 border border-white/10">
                              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white/90" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl lg:text-5xl font-light text-white/95 mb-2 sm:mb-3 tracking-tight truncate">{item.title}</h1>
                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                              <div className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10">
                                <span className="text-white/80 font-medium text-sm sm:text-base lg:text-lg">{item.category}</span>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3 text-white/70">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300/80 fill-amber-300/80" />
                                <span className="font-medium text-sm sm:text-base lg:text-lg">{item.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                       <div className="relative p-4 sm:p-6 lg:p-10 max-h-[calc(90vh-180px)] overflow-y-auto" data-scrollable>
                        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                          {/* Hero Image */}
                          <div className="relative h-48 sm:h-64 lg:h-[420px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden group">
                            <img 
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-slate-900/20 mix-blend-overlay"></div>
                            
                            {/* Floating Elements */}
                            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8 flex items-center justify-between gap-2 sm:gap-4">
                              <div className="bg-black/20 backdrop-blur-3xl rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-6 border border-white/10">
                                <div className="text-white/95 font-medium text-sm sm:text-base lg:text-xl mb-1">{item.price}</div>
                                <div className="text-white/60 text-xs sm:text-sm">Pricing Model</div>
                              </div>
                              <div className="bg-black/20 backdrop-blur-3xl rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-6 border border-white/10">
                                <div className="text-white/95 font-medium text-sm sm:text-base lg:text-xl mb-1">{item.location}</div>
                                <div className="text-white/60 text-xs sm:text-sm">Global Reach</div>
                              </div>
                            </div>
                          </div>

                          {/* Main Content Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
                            {/* Left Column */}
                            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                              {/* Overview */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/8 to-gray-500/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                                <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                    <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-slate-300 to-gray-400 rounded-full opacity-60"></div>
                                    <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">Overview</h3>
                                  </div>
                                  <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                                    {item.details}
                                  </p>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-400/8 to-slate-500/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                                <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                    <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-gray-300 to-slate-400 rounded-full opacity-60"></div>
                                    <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">Key Features</h3>
                                  </div>
                                  <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                                    {item.features.map((feature, featureIndex) => (
                                      <div key={featureIndex} className="group/item flex items-center gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-5 bg-white/2 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-400">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-slate-300 to-gray-400 rounded-full opacity-60 flex-shrink-0"></div>
                                        <span className="text-white/80 font-light text-sm sm:text-base lg:text-lg">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                              {/* How It Works */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/8 to-gray-400/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                                <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                    <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-gray-300 to-slate-400 rounded-full opacity-60"></div>
                                    <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">How It Works</h3>
                                  </div>
                                  <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                                    {item.howItWorks}
                                  </p>
                                </div>
                              </div>

                              {/* Performance Stats */}
                              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-gray-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                  <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/5 text-center">
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/95 mb-2 sm:mb-3">99.9%</div>
                                    <div className="text-white/60 text-xs sm:text-sm font-light">AI Accuracy</div>
                                  </div>
                                </div>
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                  <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/5 text-center">
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/95 mb-2 sm:mb-3">&lt;2s</div>
                                    <div className="text-white/60 text-xs sm:text-sm font-light">Response Time</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </DraggableDialogContent>
                      ) : (
                        <div className="p-4 sm:p-6 lg:p-10">
                          {/* Desktop Version - Direct content without drag wrapper */}
                          {/* Subtle Background Pattern */}
                          <div className="absolute inset-0 opacity-30">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-slate-500/5 to-gray-600/10"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(148,163,184,0.08),transparent_70%)]"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(100,116,139,0.08),transparent_70%)]"></div>
                          </div>

                          {/* Header */}
                          <div className="relative pb-4 sm:pb-6 lg:pb-8 border-b border-white/5">
                            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-300/20 to-gray-400/20 rounded-2xl sm:rounded-3xl blur-2xl opacity-40"></div>
                                <div className="relative bg-white/10 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 border border-white/10">
                                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white/90" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h1 className="text-xl sm:text-2xl lg:text-5xl font-light text-white/95 mb-2 sm:mb-3 tracking-tight truncate">{item.title}</h1>
                                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10">
                                    <span className="text-white/80 font-medium text-sm sm:text-base lg:text-lg">{item.category}</span>
                                  </div>
                                  <div className="flex items-center gap-2 sm:gap-3 text-white/70">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300/80 fill-amber-300/80" />
                                    <span className="font-medium text-sm sm:text-base lg:text-lg">{item.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative pt-6 sm:pt-8 lg:pt-10 max-h-[calc(95vh-220px)] overflow-y-auto">
                            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                              {/* Hero Image */}
                              <div className="relative h-48 sm:h-64 lg:h-[420px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden group">
                                <img 
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-slate-900/20 mix-blend-overlay"></div>
                                
                                {/* Floating Elements */}
                                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8 flex items-center justify-between gap-2 sm:gap-4">
                                  <div className="bg-black/20 backdrop-blur-3xl rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-6 border border-white/10">
                                    <div className="text-white/95 font-medium text-sm sm:text-base lg:text-xl mb-1">{item.price}</div>
                                    <div className="text-white/60 text-xs sm:text-sm">Pricing Model</div>
                                  </div>
                                  <div className="bg-black/20 backdrop-blur-3xl rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-6 border border-white/10">
                                    <div className="text-white/95 font-medium text-sm sm:text-base lg:text-xl mb-1">{item.location}</div>
                                    <div className="text-white/60 text-xs sm:text-sm">Global Reach</div>
                                  </div>
                                </div>
                              </div>

                              {/* Rest of content */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
                                {/* Left Column */}
                                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                                  {/* Overview */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-400/8 to-gray-500/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                                    <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                        <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-slate-300 to-gray-400 rounded-full opacity-60"></div>
                                        <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">Overview</h3>
                                      </div>
                                      <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                                        {item.details}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Features */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400/8 to-slate-500/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                                    <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                        <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-gray-300 to-slate-400 rounded-full opacity-60"></div>
                                        <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">Key Features</h3>
                                      </div>
                                      <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                                        {item.features.map((feature, featureIndex) => (
                                          <div key={featureIndex} className="group/item flex items-center gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-5 bg-white/2 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-400">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-slate-300 to-gray-400 rounded-full opacity-60 flex-shrink-0"></div>
                                            <span className="text-white/80 font-light text-sm sm:text-base lg:text-lg">{feature}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                                  {/* How It Works */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-500/8 to-gray-400/8 rounded-2xl sm:rounded-3xl lg:rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                                    <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-500">
                                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                        <div className="w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-gray-300 to-slate-400 rounded-full opacity-60"></div>
                                        <h3 className="text-lg sm:text-xl lg:text-3xl font-light text-white/95">How It Works</h3>
                                      </div>
                                      <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
                                        {item.howItWorks}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Performance Stats */}
                                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                    <div className="relative group">
                                      <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-gray-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                      <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/5 text-center">
                                        <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/95 mb-2 sm:mb-3">99.9%</div>
                                        <div className="text-white/60 text-xs sm:text-sm font-light">AI Accuracy</div>
                                      </div>
                                    </div>
                                    <div className="relative group">
                                      <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                      <div className="relative bg-white/3 backdrop-blur-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/5 text-center">
                                        <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/95 mb-2 sm:mb-3">&lt;2s</div>
                                        <div className="text-white/60 text-xs sm:text-sm font-light">Response Time</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                           </div>
                         </div>
                        </DraggableDialogContent>
                       ) : (
                         <div className="p-6 bg-white dark:bg-gray-900 max-h-[calc(85vh-100px)] overflow-y-auto">
                           <div className="flex items-center gap-4 mb-6">
                             <IconComponent className="w-8 h-8 text-blue-600" />
                             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
                           </div>
                           <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                           <p className="text-gray-600 dark:text-gray-300 mb-4">{item.details}</p>
                           <div className="space-y-2">
                             {item.features.map((feature, idx) => (
                               <div key={idx} className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                 <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                               </div>
                             ))}
                           </div>
                         </div>
                       )}
                    </DialogContent>
                  </Dialog>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Image Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalImages.map((image, index) => (
            <div 
              key={index} 
              className={`relative h-[200px] rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-700 hover:scale-[1.02] transform-gpu ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150 + 800}ms` }}
            >
              <img 
                src={image}
                alt={`Luxury detail ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-gray-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <span className="relative z-10">Try AI Travel Planning</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 relative z-10" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowcase;