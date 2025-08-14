
import { useState, useEffect, useRef } from 'react';

const Vision = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="vision" className="py-32 px-6 relative overflow-hidden bg-white dark:bg-black transition-colors duration-300" ref={sectionRef}>
      {/* Enhanced background with image */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <img 
            src="/lovable-uploads/5da0882d-c336-4a6c-b816-25ff575ea341.png" 
            alt="Tropical pool and mountains background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-white/90 dark:bg-black/90"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight text-black dark:text-white transition-colors duration-300">
            Travel for
            <br />
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-amber-500 bg-clip-text text-transparent">
              Every Journey
            </span>
          </h2>
          
          <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-16 transition-colors duration-300">
            From budget backpacking to luxury escapes, from emotional healing to adventure seeking—
            our AI understands your unique travel story and crafts the perfect experience.
          </p>
        </div>

        {/* HowItWorks Content - moved from Features section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Panel 1: AI Trip Planning */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  AI trip planning made simple.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Skip the endless research. Our AI understands your preferences and creates 
                  personalized itineraries in minutes. Just tell us what you like and we'll 
                  handle the rest.
                </p>
              </div>
              <div className="relative h-96 lg:h-[500px]">
                {/* Floating category cards */}
                <div className="absolute bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float" style={{ top: '10%', left: '20%' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl">🏖️</div>
                    <span className="font-medium text-foreground">Beach</span>
                  </div>
                </div>
                <div className="absolute bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float-delayed" style={{ top: '30%', right: '15%' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center text-white text-xl">🎭</div>
                    <span className="font-medium text-foreground">Theater</span>
                  </div>
                </div>
                <div className="absolute bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float" style={{ top: '60%', left: '10%' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-white text-xl">🦜</div>
                    <span className="font-medium text-foreground">Wildlife</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Discover Destinations */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="relative h-64">
                    <img 
                      src="/lovable-uploads/349adef3-59ea-405e-bc62-d704ea49bf62.png"
                      alt="Beautiful Destination"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white text-xl font-bold">Explore Destinations</h3>
                      <p className="text-white/80 text-sm">AI Travel Expert</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Discover inspiring destinations.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Browse curated travel experiences from real travelers. Save your favorites 
                  and customize them to create your perfect trip.
                </p>
              </div>
            </div>
          </div>

          {/* Panel 3: Book with Confidence */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src="/lovable-uploads/01acecfb-4a5e-4651-8343-d178f52a9ff1.png"
                      alt="Premium Resort"
                      className="w-full h-full object-cover rounded-t-2xl"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Premium Resort</h3>
                    <p className="text-sm text-muted-foreground mb-4">🏨 Luxury Hotel</p>
                    <button className="w-full bg-black text-white hover:bg-black/90 py-2 rounded-lg font-medium">
                      Book a room
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Book with confidence.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Get detailed recommendations with photos, reviews, and real pricing. 
                  Everything you need to book your perfect getaway in one place.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className={`transition-all duration-1200 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 px-12 py-4 rounded-full text-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 group relative overflow-hidden text-white">
            <span className="relative z-10">Join the Revolution</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Vision;
