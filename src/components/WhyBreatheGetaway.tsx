import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Map, Heart, Star, Plus, Send } from 'lucide-react';

const WhyBreatheGetaway = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // All available images from lovable-uploads
  const allImages = [
    '/lovable-uploads/00edbb5d-91bb-4546-8c70-9a4853c66fd0.png',
    '/lovable-uploads/01acecfb-4a5e-4651-8343-d178f52a9ff1.png',
    '/lovable-uploads/02c0dc39-74a0-4355-9275-75b1dd128c08.png',
    '/lovable-uploads/0552923f-16b3-4d02-a0d3-b41d59de70ba.png',
    '/lovable-uploads/06d30aba-bf87-4b11-ad56-860979ba2ed6.png',
    '/lovable-uploads/0decbeaa-5a20-4502-9bc8-f34891b33dfc.png',
    '/lovable-uploads/1533e217-0961-4fb1-b5e1-f06df6a6bf74.png',
    '/lovable-uploads/18aa8cb3-7178-47f3-b218-3aa6b8687db5.png',
    '/lovable-uploads/1b34fb02-ef92-4f9c-abad-7c07f22e9457.png',
    '/lovable-uploads/1df059f2-3338-4c1e-9b43-920c5f83c6c6.png',
    '/lovable-uploads/223f6e4e-7c4d-4398-80d1-f058166444dc.png',
    '/lovable-uploads/250f747d-157f-480c-9c25-76d931a9ad49.png',
    '/lovable-uploads/2a140d0b-7b6c-40c8-9aab-663da4cc8f70.png',
    '/lovable-uploads/2a8814a1-379a-452f-a2ce-54105ac8857f.png',
    '/lovable-uploads/33c21689-4a63-4d20-b050-b566ede4b771.png',
    '/lovable-uploads/349adef3-59ea-405e-bc62-d704ea49bf62.png',
    '/lovable-uploads/351a480e-1c69-4de6-9ab3-92d54304b347.png',
    '/lovable-uploads/364e2553-6bc1-48c9-b72f-ce670d007e17.png',
    '/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png',
    '/lovable-uploads/3b801eab-1dcf-49ec-8a37-c1a0d4dcc314.png',
    '/lovable-uploads/3f81b31d-0911-4669-829d-e28da3084ad5.png',
    '/lovable-uploads/40732476-5f3d-426e-b486-daf165370855.png',
    '/lovable-uploads/420c8eec-6663-4cc2-87c9-d0cbfcfcad0e.png',
    '/lovable-uploads/42abd49b-cc9e-422e-863c-11d618b69cf3.png',
    '/lovable-uploads/42f30823-7039-463f-8b34-fa31699595d9.png',
    '/lovable-uploads/44271e40-b9f9-4b74-a5b9-9f414e3a5eac.png',
    '/lovable-uploads/442e1967-777c-43e6-9246-91b620e2151b.png',
    '/lovable-uploads/462239f6-9a27-4b7d-a660-d8474967fd14.png',
    '/lovable-uploads/495f63b6-10b4-4636-9eaa-039faf98b098.png'
  ];

  // Travel categories with floating cards (Panel 1)
  const travelCategories = [
    { icon: '🏖️', title: 'Beach', color: 'from-blue-500 to-cyan-400' },
    { icon: '🎭', title: 'Theater', color: 'from-purple-500 to-pink-400' },
    { icon: '🦜', title: 'Wildlife', color: 'from-green-500 to-emerald-400' },
    { icon: '🍽️', title: 'Fine Dining', color: 'from-orange-500 to-amber-400' },
    { icon: '🏛️', title: 'Historical Tours', color: 'from-amber-600 to-yellow-500' },
    { icon: '🏨', title: 'Resorts', color: 'from-emerald-600 to-teal-500' },
    { icon: '💧', title: 'Water Sports', color: 'from-cyan-500 to-blue-400' },
    { icon: '🚴', title: 'Cycling', color: 'from-green-600 to-lime-500' },
    { icon: '🧘', title: 'Spa / Wellness', color: 'from-pink-500 to-rose-400' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Panel 1: Chat Interface Style */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                AI trip planning made simple.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Skip the endless research. Our AI understands your preferences and creates 
                personalized itineraries in minutes. Just tell us what you like and we'll 
                handle the rest.
              </p>
              <div className="relative">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border p-4 shadow-lg">
                  <input 
                    type="text" 
                    placeholder="Ask us anything..." 
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground border-none outline-none text-lg"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-muted-foreground" />
                      <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Button size="sm" className="rounded-full">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Floating category cards */}
            <div className="relative h-96 lg:h-[500px]">
              {travelCategories.map((category, index) => (
                <div
                  key={category.title}
                  className={`absolute bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'
                  }`}
                  style={{
                    top: `${Math.random() * 70}%`,
                    left: `${Math.random() * 70}%`,
                    animationDelay: `${index * 0.2}s`
                  }}
                  onMouseEnter={() => setHoveredCard(category.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-xl`}>
                      {category.icon}
                    </div>
                    <span className="font-medium text-foreground">{category.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Popular Itineraries Style */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Destination card */}
            <div className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <div className="relative h-64">
                  <img 
                    src={allImages[Math.floor(Math.random() * allImages.length)]}
                    alt="Explore Destination"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">Explore Destinations</h3>
                    <p className="text-white/80 text-sm">AI Travel Expert • Page 3</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {allImages.slice(0, 3).map((img, idx) => (
                      <img 
                        key={idx}
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-16 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Customize a trip
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Discover inspiring destinations.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Browse curated travel experiences from real travelers. Save your favorites 
                and customize them to create your perfect trip.
              </p>
              <Button className="group">
                Browse Inspiration
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Panel 3: Personalized Recommendations Style */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hotel booking interface */}
            <div className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={allImages[Math.floor(Math.random() * allImages.length)]}
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground">Premium Resort</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">4.9</span>
                    </div>
                    <p className="text-sm text-muted-foreground">🏨 Luxury Hotel</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {allImages.slice(5, 8).map((img, idx) => (
                      <img 
                        key={idx}
                        src={img}
                        alt={`Hotel ${idx + 1}`}
                        className="w-full h-12 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Check-In</p>
                        <p className="font-medium">Jul 21</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Check-Out</p>
                        <p className="font-medium">Jul 23</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">4 Travelers, 2 Rooms</p>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-black text-white hover:bg-black/90">
                      Book a room
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to trip
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Book with confidence.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Get detailed recommendations with photos, reviews, and real pricing. 
                Everything you need to book your perfect getaway in one place.
              </p>
              <Button className="group">
                Start Planning
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyBreatheGetaway;