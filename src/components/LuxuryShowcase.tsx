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
              <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden bg-black/10 dark:bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[32px] p-0">
                <div className="relative">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-600/30"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.3),transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.3),transparent_50%)]"></div>
                  </div>

                  {/* Header */}
                  <div className="relative p-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl blur-lg opacity-60"></div>
                        <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/20">
                          <Brain className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h1 className="text-4xl font-bold text-white mb-2">{showcaseImages[0].title}</h1>
                        <div className="flex items-center gap-3">
                          <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <span className="text-white/90 font-medium">{showcaseImages[0].category}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-medium">{showcaseImages[0].rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 max-h-[calc(95vh-200px)] overflow-y-auto">
                    <div className="space-y-10">
                      {/* Hero Image */}
                      <div className="relative h-[400px] rounded-3xl overflow-hidden group">
                        <img 
                          src={showcaseImages[0].image}
                          alt={showcaseImages[0].title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 mix-blend-overlay"></div>
                        
                        {/* Floating Stats */}
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                          <div className="bg-black/30 backdrop-blur-2xl rounded-2xl px-6 py-4 border border-white/20">
                            <div className="text-white font-semibold text-lg">{showcaseImages[0].price}</div>
                            <div className="text-white/70 text-sm">Pricing Tier</div>
                          </div>
                          <div className="bg-black/30 backdrop-blur-2xl rounded-2xl px-6 py-4 border border-white/20">
                            <div className="text-white font-semibold text-lg">{showcaseImages[0].location}</div>
                            <div className="text-white/70 text-sm">Coverage</div>
                          </div>
                        </div>
                      </div>

                      {/* Main Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Overview */}
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-white">Overview</h3>
                              </div>
                              <p className="text-white/80 leading-relaxed text-lg">
                                {showcaseImages[0].details}
                              </p>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-white">Key Features</h3>
                              </div>
                              <div className="space-y-4">
                                {showcaseImages[0].features.map((feature, index) => (
                                  <div key={index} className="group/item flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-lg"></div>
                                    <span className="text-white/90 font-medium">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* How It Works */}
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-white">How It Works</h3>
                              </div>
                              <p className="text-white/80 leading-relaxed text-lg">
                                {showcaseImages[0].howItWorks}
                              </p>
                            </div>
                          </div>

                          {/* Performance Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                              <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 text-center">
                                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                                <div className="text-white/70 text-sm">Accuracy</div>
                              </div>
                            </div>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                              <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 text-center">
                                <div className="text-3xl font-bold text-white mb-2">&lt;2s</div>
                                <div className="text-white/70 text-sm">Response</div>
                              </div>
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
                  <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden bg-black/10 dark:bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[32px] p-0">
                    <div className="relative">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-600/30"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.3),transparent_50%)]"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.3),transparent_50%)]"></div>
                      </div>

                      {/* Header */}
                      <div className="relative p-8 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl blur-lg opacity-60"></div>
                            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/20">
                              <IconComponent className="w-12 h-12 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-2">{item.title}</h1>
                            <div className="flex items-center gap-3">
                              <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                                <span className="text-white/90 font-medium">{item.category}</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/80">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-medium">{item.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative p-8 max-h-[calc(95vh-200px)] overflow-y-auto">
                        <div className="space-y-10">
                          {/* Hero Image */}
                          <div className="relative h-[400px] rounded-3xl overflow-hidden group">
                            <img 
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 mix-blend-overlay"></div>
                            
                            {/* Floating Stats */}
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                              <div className="bg-black/30 backdrop-blur-2xl rounded-2xl px-6 py-4 border border-white/20">
                                <div className="text-white font-semibold text-lg">{item.price}</div>
                                <div className="text-white/70 text-sm">Pricing Tier</div>
                              </div>
                              <div className="bg-black/30 backdrop-blur-2xl rounded-2xl px-6 py-4 border border-white/20">
                                <div className="text-white font-semibold text-lg">{item.location}</div>
                                <div className="text-white/70 text-sm">Coverage</div>
                              </div>
                            </div>
                          </div>

                          {/* Main Content Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                              {/* Overview */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                                  <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
                                    <h3 className="text-2xl font-bold text-white">Overview</h3>
                                  </div>
                                  <p className="text-white/80 leading-relaxed text-lg">
                                    {item.details}
                                  </p>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                                  <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></div>
                                    <h3 className="text-2xl font-bold text-white">Key Features</h3>
                                  </div>
                                  <div className="space-y-4">
                                    {item.features.map((feature, featureIndex) => (
                                      <div key={featureIndex} className="group/item flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-lg"></div>
                                        <span className="text-white/90 font-medium">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                              {/* How It Works */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                                  <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full"></div>
                                    <h3 className="text-2xl font-bold text-white">How It Works</h3>
                                  </div>
                                  <p className="text-white/80 leading-relaxed text-lg">
                                    {item.howItWorks}
                                  </p>
                                </div>
                              </div>

                              {/* Performance Stats */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 text-center">
                                    <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                                    <div className="text-white/70 text-sm">Accuracy</div>
                                  </div>
                                </div>
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 text-center">
                                    <div className="text-3xl font-bold text-white mb-2">&lt;2s</div>
                                    <div className="text-white/70 text-sm">Response</div>
                                  </div>
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