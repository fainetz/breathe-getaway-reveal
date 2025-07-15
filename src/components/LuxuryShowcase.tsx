import { useState } from 'react';
import { ArrowRight, MapPin, Star } from 'lucide-react';

const LuxuryShowcase = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const showcaseImages = [
    {
      id: 1,
      image: '/lovable-uploads/3b801eab-1dcf-49ec-8a37-c1a0d4dcc314.png',
      title: 'Maldives Luxury Resort',
      subtitle: 'Overwater Bungalows & Infinity Views',
      location: 'Maldives',
      rating: 5.0,
      price: 'From $899/night',
      category: 'Ultra Luxury'
    },
    {
      id: 2,
      image: '/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png',
      title: 'Night Pool Paradise',
      subtitle: 'Evening Bliss Under Starlit Skies',
      location: 'Bali, Indonesia',
      rating: 4.9,
      price: 'From $649/night',
      category: 'Premium Resort'
    },
    {
      id: 3,
      image: '/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png',
      title: 'Mountain Desert Retreat',
      subtitle: 'Elevated Luxury with Panoramic Views',
      location: 'California, USA',
      rating: 4.8,
      price: 'From $549/night',
      category: 'Desert Luxury'
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
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">LUXURY COLLECTION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
            Where Dreams
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Meet Reality
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover handpicked luxury destinations that redefine the art of travel. Each location curated for the discerning traveler.
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Large Featured Image */}
          <div className="lg:row-span-2">
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
                  <button 
                    className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold transition-all duration-300 ${
                      hoveredImage === 0 ? 'bg-white/30 translate-x-2' : ''
                    }`}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Two Medium Images */}
          <div className="space-y-8">
            {showcaseImages.slice(1).map((item, index) => (
              <div 
                key={item.id}
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
                  <p className="text-white/70 text-sm mb-2">{item.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-sm">{item.price}</span>
                    <button 
                      className={`flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium transition-all duration-300 ${
                        hoveredImage === index + 1 ? 'bg-white/30 translate-x-1' : ''
                      }`}
                    >
                      View
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
            <span>Explore All Destinations</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowcase;