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
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl border-0 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] rounded-3xl">
                <DialogHeader className="relative overflow-hidden rounded-t-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-indigo-500/20 backdrop-blur-sm"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)] opacity-30"></div>
                  <DialogTitle className="relative flex items-center gap-6 text-4xl font-bold mb-8 text-gray-900 dark:text-white p-8 pb-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-30"></div>
                      <div className="relative p-4 bg-gradient-to-br from-blue-600/90 to-indigo-600/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">{showcaseImages[0].title}</h2>
                      <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                        {showcaseImages[0].category}
                      </p>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-8 pt-0">
                  <div className="space-y-10">
                    {/* Hero Section */}
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
                      <img 
                        src={showcaseImages[0].image}
                        alt={showcaseImages[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 mix-blend-overlay"></div>
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center gap-6">
                          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl px-6 py-3 border border-white/20 shadow-lg">
                            <span className="text-white font-semibold">{showcaseImages[0].category}</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/90">
                            <div className="relative">
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50"></div>
                            </div>
                            <span className="font-semibold text-lg">{showcaseImages[0].rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-8">
                        {/* Overview Card */}
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                              {showcaseImages[0].details}
                            </p>
                          </div>
                        </div>

                        {/* Enhanced Stats */}
                        <div className="grid grid-cols-3 gap-6">
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 text-center">
                              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">{showcaseImages[0].rating}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">AI Rating</div>
                            </div>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 text-center">
                              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">Global</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Reach</div>
                            </div>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 text-center">
                              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Elite</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Tier</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-8">
                        {/* How It Works Card */}
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg"></div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">How It Works</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                              {showcaseImages[0].howItWorks}
                            </p>
                          </div>
                        </div>

                        {/* Features Card */}
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h3>
                            </div>
                            <div className="space-y-4">
                              {showcaseImages[0].features.map((feature, index) => (
                                <div key={index} className="relative group/item">
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                  <div className="relative flex items-center gap-4 p-4 bg-white/40 dark:bg-gray-700/40 backdrop-blur-xl rounded-2xl border border-white/10 group-hover/item:bg-white/60 dark:group-hover/item:bg-gray-700/60 transition-all">
                                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                                    <span className="text-gray-800 dark:text-gray-200 font-medium text-lg">{feature}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
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
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl border-0 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] rounded-3xl">
                    <DialogHeader className="relative overflow-hidden rounded-t-3xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-indigo-500/20 backdrop-blur-sm"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)] opacity-30"></div>
                      <DialogTitle className="relative flex items-center gap-6 text-4xl font-bold mb-8 text-gray-900 dark:text-white p-8 pb-0">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-30"></div>
                          <div className="relative p-4 bg-gradient-to-br from-blue-600/90 to-indigo-600/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">{item.title}</h2>
                          <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                            {item.category}
                          </p>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-8 pt-0">
                      <div className="space-y-10">
                        {/* Hero Section */}
                        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
                          <img 
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 mix-blend-overlay"></div>
                          <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex items-center gap-6">
                              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl px-6 py-3 border border-white/20 shadow-lg">
                                <span className="text-white font-semibold">{item.category}</span>
                              </div>
                              <div className="flex items-center gap-3 text-white/90">
                                <div className="relative">
                                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50"></div>
                                </div>
                                <span className="font-semibold text-lg">{item.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                          {/* Left Column */}
                          <div className="space-y-8">
                            {/* Overview Card */}
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl">
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                  {item.details}
                                </p>
                              </div>
                            </div>

                            {/* Enhanced Stats */}
                            <div className="grid grid-cols-3 gap-6">
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 text-center">
                                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">{item.rating}</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">AI Rating</div>
                                </div>
                              </div>
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 text-center">
                                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">Global</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Reach</div>
                                </div>
                              </div>
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 text-center">
                                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Elite</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Tier</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-8">
                            {/* How It Works Card */}
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl">
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg"></div>
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">How It Works</h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                  {item.howItWorks}
                                </p>
                              </div>
                            </div>

                            {/* Features Card */}
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl">
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h3>
                                </div>
                                <div className="space-y-4">
                                  {item.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="relative group/item">
                                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                      <div className="relative flex items-center gap-4 p-4 bg-white/40 dark:bg-gray-700/40 backdrop-blur-xl rounded-2xl border border-white/10 group-hover/item:bg-white/60 dark:group-hover/item:bg-gray-700/60 transition-all">
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                                        <span className="text-gray-800 dark:text-gray-200 font-medium text-lg">{feature}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
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