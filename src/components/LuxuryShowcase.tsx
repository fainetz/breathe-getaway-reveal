import { useState } from 'react';
import { ArrowRight, MapPin, Star, X, Brain, Zap, Settings, Ship } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const LuxuryShowcase = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

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
      image: '/lovable-uploads/4de955b4-f52a-41d2-a367-ad3cf57cc24e.png',
      title: 'Luxury Retreat Finder',
      subtitle: 'Our AI analyzes thousands of luxury retreat options, considering your travel history, preferences, and budget constraints. Machine learning algorithms evaluate amenities, location exclusivity, and seasonal availability to curate the perfect getaway experience.',
      location: 'Worldwide',
      rating: 4.8,
      price: 'Exclusive Deals',
      category: 'Retreat Planning',
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
    },
    {
      id: 4,
      image: '/lovable-uploads/842a29ec-208b-4d13-a0df-8916d618e5b9.png',
      title: 'Luxury Cruise Experience',
      subtitle: 'Experience the ultimate luxury cruise with AI-powered itinerary planning. Our intelligent system analyzes cruise routes, amenities, and seasonal conditions to find the perfect maritime escape that matches your preferences.',
      location: 'Ocean Adventures',
      rating: 4.9,
      price: 'Premium Voyages',
      category: 'Cruise Planning',
      details: 'Our AI cruise finder analyzes thousands of luxury cruise options, considering cabin preferences, dining experiences, entertainment options, and excursion possibilities. The system evaluates weather patterns, seasonal routes, and guest reviews to curate the perfect ocean adventure.',
      icon: Ship,
      features: [
        'Smart cruise route optimization',
        'Luxury cabin selection assistance',
        'Seasonal weather analysis',
        'Personalized excursion planning',
        'Onboard amenity matching'
      ],
      howItWorks: 'Our cruise AI processes your preferences for cabin type, dining style, and activity level to match you with the perfect cruise experience. The system analyzes ship amenities, route highlights, and seasonal conditions to ensure your luxury cruise exceeds expectations.'
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
              <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[90vh] sm:max-h-[95vh] overflow-hidden bg-white/5 dark:bg-gray-950/20 backdrop-blur-[40px] border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] rounded-t-[32px] sm:rounded-[40px] p-0 animate-slide-up-mobile sm:animate-slide-up">
                <div className="relative">
                  {/* ... keep existing code (modal content) */}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Two Medium Images (excluding cruise) */}
          <div className="space-y-8">
            {showcaseImages.slice(1, 3).map((item, index) => {
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
                  <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[90vh] sm:max-h-[95vh] overflow-hidden bg-white/5 dark:bg-gray-950/20 backdrop-blur-[40px] border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] rounded-t-[32px] sm:rounded-[40px] p-0 animate-slide-up-mobile sm:animate-slide-up">
                    <div className="relative">
                      {/* ... keep existing code (modal content) */}
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>

        {/* Full-width Cruise Experience */}
        {(() => {
          const cruiseItem = showcaseImages[3]; // Cruise is the 4th item
          const IconComponent = cruiseItem.icon;
          return (
            <div className="mb-16">
              <Dialog>
                <DialogTrigger asChild>
                  <div 
                    className="relative h-[250px] sm:h-[300px] lg:h-[400px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
                    onMouseEnter={() => setHoveredImage(3)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img 
                      src={cruiseItem.image}
                      alt={cruiseItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                        <span className="text-white font-semibold text-sm">{cruiseItem.category}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-white/80" />
                        <span className="text-white/90 text-sm">{cruiseItem.location}</span>
                        <div className="flex items-center gap-1 ml-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white/90 text-sm">{cruiseItem.rating}</span>
                        </div>
                      </div>
                       <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{cruiseItem.title}</h3>
                       <p className="text-white/80 mb-4 max-w-2xl">{cruiseItem.subtitle}</p>
                       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                         <span className="text-white font-semibold">{cruiseItem.price}</span>
                         <div 
                           className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base font-semibold transition-all duration-300 ${
                             hoveredImage === 3 ? 'bg-white/30 translate-x-2' : ''
                           }`}
                         >
                           <span className="hidden sm:inline">Explore Ocean Adventure</span>
                           <span className="sm:hidden">Explore</span>
                           <ArrowRight className="w-4 h-4" />
                         </div>
                       </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[90vh] sm:max-h-[95vh] overflow-hidden bg-white/5 dark:bg-gray-950/20 backdrop-blur-[40px] border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] rounded-t-[32px] sm:rounded-[40px] p-0 animate-slide-up-mobile sm:animate-slide-up">
                  <div className="relative">
                    {/* ... keep existing code (modal content) */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          );
        })()}

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