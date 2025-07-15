import { useState } from 'react';
import { ArrowRight, MapPin, Star, X, Brain, Zap, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const LuxuryShowcase = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const showcaseImages = [
    {
      id: 1,
      image: '/lovable-uploads/5935897b-1c16-4e4f-8a47-50073b06561d.png',
      title: 'Luxury Retreat Finder',
      subtitle: 'Our AI analyzes thousands of luxury retreat options, considering your travel history, preferences, and budget constraints. Machine learning algorithms evaluate amenities, location exclusivity, and seasonal availability to curate the perfect getaway experience.',
      location: 'Worldwide',
      rating: 4.8,
      price: 'Exclusive Deals',
      category: 'Retreat Planning',
      details: 'Advanced algorithms scan luxury retreat databases, analyzing guest reviews, seasonal pricing, and amenity compatibility with your preferences. The AI considers factors like privacy levels, activity preferences, and dietary requirements to match you with retreats that exceed expectations.',
      icon: Brain,
      features: [
        'AI-powered preference analysis',
        'Real-time availability checking',
        'Personalized retreat matching',
        'Budget optimization algorithms',
        'Location exclusivity scoring'
      ],
      howItWorks: 'Our machine learning models analyze your travel history, preferences, and budget to create a unique profile. The AI then scans thousands of luxury retreat options, evaluating factors like amenities, location, seasonal pricing, and guest reviews to present you with curated options that perfectly match your desires.'
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
      details: 'Machine learning models analyze flight patterns, price fluctuations, and seat availability across multiple airlines. The AI considers your seating preferences, meal requirements, and schedule flexibility to secure the best flights at optimal prices.',
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
      title: 'AI Hotel Discovery',
      subtitle: 'Intelligent hotel matching leverages natural language processing to understand your accommodation preferences. The AI evaluates room types, amenities, location advantages, and guest satisfaction scores to present hotels that align perfectly with your luxury standards.',
      location: 'Personalized Results',
      rating: 5.0,
      price: 'Best Prices',
      category: 'Hotel Booking',
      details: 'Deep learning algorithms process hotel features, guest reviews, and location data to predict your satisfaction score for each property. The AI considers your check-in preferences, room requirements, and desired amenities to curate a personalized selection of luxury accommodations.',
      icon: Settings,
      features: [
        'Natural language preference processing',
        'Satisfaction score prediction',
        'Amenity compatibility matching',
        'Location advantage analysis',
        'Personalized hotel curation'
      ],
      howItWorks: 'Our intelligent hotel matching system uses natural language processing to understand your accommodation preferences from simple descriptions. The AI evaluates thousands of hotels, analyzing room types, amenities, and guest reviews to predict your satisfaction and present only the properties that align with your luxury standards.'
    }
  ];

  const additionalImages = [
    '/lovable-uploads/e4315854-b0ce-479e-815b-57637f36f5c0.png', // Luxury bathroom
    '/lovable-uploads/0552923f-16b3-4d02-a0d3-b41d59de70ba.png', // Ocean view pool
    '/lovable-uploads/d29d3ffd-9214-4505-bd42-d66b6741152e.png', // Sunset deck
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
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
          <div className="lg:row-span-2">
            <Dialog>
              <DialogTrigger asChild>
                <div 
                  className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
                  onMouseEnter={() => setHoveredImage(0)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img 
                    src={showcaseImages[0].image}
                    alt={showcaseImages[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                      <span className="text-white font-semibold text-sm">{showcaseImages[0].category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-white/80" />
                      <span className="text-white/90 text-sm">{showcaseImages[0].location}</span>
                      <div className="flex items-center gap-1 ml-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white/90 text-sm">{showcaseImages[0].rating}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{showcaseImages[0].title}</h3>
                    <p className="text-white/80 mb-4">{showcaseImages[0].subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{showcaseImages[0].price}</span>
                      <div 
                        className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold transition-all duration-300 ${
                          hoveredImage === 0 ? 'bg-white/30 translate-x-2' : ''
                        }`}
                      >
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 shadow-2xl">
                <DialogHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-t-xl"></div>
                  <DialogTitle className="relative flex items-center gap-4 text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2>{showcaseImages[0].title}</h2>
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">{showcaseImages[0].category}</p>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="overflow-y-auto max-h-[calc(85vh-120px)] space-y-8 pr-2">
                  {/* Hero Section */}
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={showcaseImages[0].image}
                      alt={showcaseImages[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-6">
                        <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                          <span className="text-white font-semibold text-sm">{showcaseImages[0].category}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{showcaseImages[0].rating} Rating</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Overview */}
                      <div className="bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          Overview
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {showcaseImages[0].details}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-xl p-4 border border-blue-200/20 text-center">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{showcaseImages[0].rating}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rating</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-md rounded-xl p-4 border border-green-200/20 text-center">
                          <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Global</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Coverage</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-md rounded-xl p-4 border border-purple-200/20 text-center">
                          <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Premium</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pricing</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* How It Works */}
                      <div className="bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          How It Works
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {showcaseImages[0].howItWorks}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          Key Features
                        </h3>
                        <div className="space-y-3">
                          {showcaseImages[0].features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-lg border border-white/10">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                              <span className="text-gray-800 dark:text-gray-200 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Two Medium Images */}
          <div className="space-y-8">
            {showcaseImages.slice(1).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div 
                      className="relative h-[280px] rounded-2xl overflow-hidden group cursor-pointer shadow-xl"
                      onMouseEnter={() => setHoveredImage(index + 1)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-white font-medium text-xs">{item.category}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-3 h-3 text-white/70" />
                          <span className="text-white/80 text-xs">{item.location}</span>
                          <div className="flex items-center gap-1 ml-2">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-white/80 text-xs">{item.rating}</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-white/70 text-sm mb-2 line-clamp-3">{item.subtitle.substring(0, 120)}...</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold text-sm">{item.price}</span>
                          <div 
                            className={`flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium transition-all duration-300 ${
                              hoveredImage === index + 1 ? 'bg-white/30 translate-x-1' : ''
                            }`}
                          >
                            View
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 shadow-2xl">
                    <DialogHeader className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-t-xl"></div>
                      <DialogTitle className="relative flex items-center gap-4 text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2>{item.title}</h2>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">{item.category}</p>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="overflow-y-auto max-h-[calc(85vh-120px)] space-y-8 pr-2">
                      {/* Hero Section */}
                      <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex items-center gap-6">
                            <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                              <span className="text-white font-semibold text-sm">{item.category}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-medium">{item.rating} Rating</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Overview */}
                          <div className="bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              Overview
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item.details}
                            </p>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-xl p-4 border border-blue-200/20 text-center">
                              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{item.rating}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rating</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-md rounded-xl p-4 border border-green-200/20 text-center">
                              <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Global</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Coverage</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-md rounded-xl p-4 border border-purple-200/20 text-center">
                              <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Premium</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pricing</div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* How It Works */}
                          <div className="bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                              How It Works
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item.howItWorks}
                            </p>
                          </div>

                          {/* Features */}
                          <div className="bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              Key Features
                            </h3>
                            <div className="space-y-3">
                              {item.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-3 p-3 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-lg border border-white/10">
                                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                                  <span className="text-gray-800 dark:text-gray-200 font-medium">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>

        {/* Bottom Image Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalImages.map((image, index) => (
            <div key={index} className="relative h-[200px] rounded-xl overflow-hidden group cursor-pointer shadow-lg">
              <img 
                src={image}
                alt={`Luxury detail ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
            <span>Try AI Travel Planning</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowcase;