import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Destinations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    { id: 'all', name: 'All Destinations', emoji: '🌍' },
    { id: 'healing', name: 'Healing Retreats', emoji: '🧘‍♀️' },
    { id: 'adventure', name: 'Soul Adventures', emoji: '⛰️' },
    { id: 'cultural', name: 'Cultural Immersion', emoji: '🏛️' },
    { id: 'romantic', name: 'Romantic Escapes', emoji: '💕' }
  ];

  const destinations = [
    {
      id: 1,
      name: "Bali Soul Sanctuary",
      location: "Ubud, Indonesia",
      category: "healing",
      image: "photo-1537953773345-d172ccf13cf1",
      price: "$1,299",
      duration: "7 days",
      description: "Find inner peace among rice terraces and ancient temples",
      mood: "Seeking Balance",
      tags: ["Meditation", "Yoga", "Spa"]
    },
    {
      id: 2,
      name: "Northern Lights Quest",
      location: "Tromsø, Norway",
      category: "adventure",
      image: "photo-1578662996442-48f60103fc96",
      price: "$2,199",
      duration: "5 days",
      description: "Chase aurora dreams in the Arctic wilderness",
      mood: "Craving Wonder",
      tags: ["Aurora", "Dog Sledding", "Ice Hotel"]
    },
    {
      id: 3,
      name: "Kyoto Mindfulness",
      location: "Kyoto, Japan",
      category: "cultural",
      image: "photo-1545569341-9eb8b30979d9",
      price: "$1,899",
      duration: "6 days",
      description: "Discover zen through tea ceremonies and temple walks",
      mood: "Need Clarity",
      tags: ["Temples", "Tea Ceremony", "Gardens"]
    },
    {
      id: 4,
      name: "Santorini Sunset",
      location: "Santorini, Greece",
      category: "romantic",
      image: "photo-1570077188670-e3a8d69ac5ff",
      price: "$1,699",
      duration: "4 days",
      description: "Romance awakens with Aegean sunsets and wine",
      mood: "Feeling Romantic",
      tags: ["Sunsets", "Wine", "Luxury"]
    },
    {
      id: 5,
      name: "Patagonia Wild",
      location: "Torres del Paine, Chile",
      category: "adventure",
      image: "photo-1470071459604-3b5ec3a7fe05",
      price: "$2,499",
      duration: "8 days",
      description: "Reconnect with raw nature and your wild spirit",
      mood: "Need Freedom",
      tags: ["Hiking", "Wildlife", "Glaciers"]
    },
    {
      id: 6,
      name: "Tuscany Healing",
      location: "Val d'Orcia, Italy",
      category: "healing",
      image: "photo-1523906834658-6e24ef2386f9",
      price: "$1,799",
      duration: "6 days",
      description: "Heal your heart with rolling hills and fine wine",
      mood: "Need Healing",
      tags: ["Wine", "Countryside", "Cooking"]
    },
    {
      id: 7,
      name: "Iceland Solitude",
      location: "Reykjavik, Iceland",
      category: "adventure",
      image: "photo-1482938289607-e9573fc25ebb",
      price: "$2,299",
      duration: "6 days",
      description: "Find solitude among glaciers and geysers",
      mood: "Need Escape",
      tags: ["Glaciers", "Hot Springs", "Northern Lights"]
    },
    {
      id: 8,
      name: "Morocco Mystique",
      location: "Marrakech, Morocco",
      category: "cultural",
      image: "photo-1466442929976-97f336a657be",
      price: "$1,599",
      duration: "5 days",
      description: "Immerse in ancient traditions and vibrant markets",
      mood: "Seeking Adventure",
      tags: ["Markets", "Architecture", "Cuisine"]
    },
    {
      id: 9,
      name: "Swiss Alps Retreat",
      location: "Zermatt, Switzerland",
      category: "healing",
      image: "photo-1509316975850-ff9c5deb0cd9",
      price: "$2,699",
      duration: "7 days",
      description: "Alpine serenity with mountain meditation and spa treatments",
      mood: "Need Reset",
      tags: ["Mountains", "Spa", "Fresh Air"]
    },
    {
      id: 10,
      name: "Stargazing Desert",
      location: "Atacama, Chile",
      category: "adventure",
      image: "photo-1470813740244-df37b8c1edcb",
      price: "$1,999",
      duration: "5 days",
      description: "Connect with the cosmos under the clearest skies on Earth",
      mood: "Seeking Wonder",
      tags: ["Stargazing", "Desert", "Astronomy"]
    },
    {
      id: 11,
      name: "Amalfi Coast Romance",
      location: "Positano, Italy",
      category: "romantic",
      image: "photo-1570077188670-e3a8d69ac5ff",
      price: "$2,199",
      duration: "5 days",
      description: "Coastal charm with intimate moments and Mediterranean bliss",
      mood: "Feeling Romantic",
      tags: ["Coast", "Luxury", "Dining"]
    },
    {
      id: 12,
      name: "Amazon Wellness",
      location: "Iquitos, Peru",
      category: "healing",
      image: "photo-1509316975850-ff9c5deb0cd9",
      price: "$1,899",
      duration: "8 days",
      description: "Jungle healing with ancient plant medicine traditions",
      mood: "Deep Healing",
      tags: ["Jungle", "Shamanic", "Nature"]
    }
  ];

  const filteredDestinations = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-black" ref={sectionRef}>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Destinations That
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-gray-200 bg-clip-text text-transparent">
                Understand You
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Each destination is curated to match your emotional state and inner journey. Where will your soul find its next adventure?
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-purple-600/20 text-white border border-purple-500/30'
                    : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-600/40'
                }`}
              >
                <span className="text-lg">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-gray-900/40 backdrop-blur-lg border border-gray-700/50 rounded-xl overflow-hidden hover:bg-gray-800/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/10 hover:border-gray-500/40">
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${destination.image}?w=300&h=200&fit=crop`}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-200">
                      {destination.duration}
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-white">
                        {destination.mood}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-gray-200 transition-colors leading-tight">
                        {destination.name}
                      </h3>
                      <span className="text-sm font-bold text-gray-200 ml-2">
                        {destination.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="text-xs">{destination.location}</span>
                    </div>

                    <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2">
                      {destination.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {destination.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-800/60 border border-gray-600/40 text-xs px-2 py-1 rounded-full text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-white/10 hover:bg-white/20 border border-gray-600/40 hover:border-gray-500/60 py-2 rounded-lg text-sm font-medium text-white hover:text-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                      <Navigation className="w-3 h-3" />
                      Discover Journey
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
