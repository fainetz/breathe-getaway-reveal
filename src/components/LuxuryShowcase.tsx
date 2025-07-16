import { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Star, X, Brain, Zap, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
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
    '/lovable-uploads/e4315854-b0ce-479e-815b-57637f36f5c0.png',
    '/lovable-uploads/0552923f-16b3-4d02-a0d3-b41d59de70ba.png',
    '/lovable-uploads/d29d3ffd-9214-4505-bd42-d66b6741152e.png',
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
              <DialogContent 
                style={isMobile ? {} : { 
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '95vw',
                  height: '95vh',
                  maxWidth: 'none',
                  maxHeight: 'none'
                }}
                className={`${
                  isMobile 
                    ? 'max-w-[95vw] max-h-[90vh] bg-white/5 dark:bg-gray-950/20 backdrop-blur-[40px] border-white/5 rounded-t-[32px] overflow-hidden' 
                    : 'bg-white dark:bg-gray-900 rounded-3xl border-0 shadow-2xl'
                } p-0 [&>button]:hidden`}
              >
                <DialogTitle className="sr-only">{showcaseImages[0].title}</DialogTitle>
                <DialogDescription className="sr-only">Detailed information about {showcaseImages[0].title}</DialogDescription>
                {isMobile ? (
                  <DraggableDialogContent>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-white mb-4">{showcaseImages[0].title}</h2>
                      <img src={showcaseImages[0].image} alt={showcaseImages[0].title} className="w-full h-64 object-cover rounded-lg mb-4" />
                      <p className="text-white/80 mb-4">{showcaseImages[0].details}</p>
                    </div>
                  </DraggableDialogContent>
                ) : (
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-8 p-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <Brain className="w-16 h-16 text-blue-600" />
                      <div className="flex-1">
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{showcaseImages[0].title}</h2>
                        <p className="text-2xl text-gray-500 dark:text-gray-400">{showcaseImages[0].category}</p>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">{showcaseImages[0].rating}</span>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-xl">
                          {showcaseImages[0].price}
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 grid grid-cols-2 gap-16 p-10 overflow-y-auto min-h-0 bg-gray-50 dark:bg-gray-800">
                      {/* Left Column */}
                      <div className="space-y-10">
                        <img 
                          src={showcaseImages[0].image} 
                          alt={showcaseImages[0].title} 
                          className="w-full h-[500px] object-cover rounded-3xl shadow-2xl" 
                        />
                        
                        <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl">
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h3>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl">{showcaseImages[0].howItWorks}</p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-10">
                        <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl">
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About This Feature</h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xl">{showcaseImages[0].details}</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl">
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Key Features</h3>
                          <div className="space-y-6">
                            {showcaseImages[0].features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-6 p-6 bg-blue-50 dark:bg-gray-800 rounded-2xl">
                                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1 flex-shrink-0"></div>
                                <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-8 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
                          <div className="flex items-center gap-4">
                            <MapPin className="w-8 h-8 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400 text-xl font-medium">{showcaseImages[0].location}</span>
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
                   <DialogContent 
                     style={isMobile ? {} : { 
                       position: 'fixed',
                       top: '50%',
                       left: '50%',
                       transform: 'translate(-50%, -50%)',
                       width: '95vw',
                       height: '95vh',
                       maxWidth: 'none',
                       maxHeight: 'none'
                     }}
                     className={`${
                       isMobile 
                         ? 'max-w-[95vw] max-h-[90vh] bg-white/5 dark:bg-gray-950/20 backdrop-blur-[40px] border-white/5 rounded-t-[32px] overflow-hidden' 
                         : 'bg-white dark:bg-gray-900 rounded-3xl border-0 shadow-2xl'
                     } p-0 [&>button]:hidden`}
                   >
                      <DialogTitle className="sr-only">{item.title}</DialogTitle>
                      <DialogDescription className="sr-only">Detailed information about {item.title}</DialogDescription>
                      {isMobile ? (
                        <DraggableDialogContent>
                          <div className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
                            <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                            <p className="text-white/80 mb-4">{item.details}</p>
                          </div>
                        </DraggableDialogContent>
                      ) : (
                        <div className="h-full flex flex-col">
                          {/* Header */}
                          <div className="flex items-center gap-8 p-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                            <IconComponent className="w-16 h-16 text-blue-600" />
                            <div className="flex-1">
                              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h2>
                              <p className="text-2xl text-gray-500 dark:text-gray-400">{item.category}</p>
                            </div>
                            <div className="flex items-center gap-8">
                              <div className="flex items-center gap-3">
                                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{item.rating}</span>
                              </div>
                              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-xl">
                                {item.price}
                              </div>
                            </div>
                          </div>

                          {/* Main Content */}
                          <div className="flex-1 grid grid-cols-2 gap-16 p-10 overflow-y-auto min-h-0 bg-gray-50 dark:bg-gray-800">
                            {/* Left Column */}
                            <div className="space-y-10">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl" 
                              />
                              
                              <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl">{item.howItWorks}</p>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-10">
                              <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About This Feature</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xl">{item.details}</p>
                              </div>
                              
                              <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Key Features</h3>
                                <div className="space-y-6">
                                  {item.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-6 p-6 bg-blue-50 dark:bg-gray-800 rounded-2xl">
                                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1 flex-shrink-0"></div>
                                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl font-medium">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center gap-8 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
                                <div className="flex items-center gap-4">
                                  <MapPin className="w-8 h-8 text-gray-500" />
                                  <span className="text-gray-600 dark:text-gray-400 text-xl font-medium">{item.location}</span>
                                </div>
                              </div>
                            </div>
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