const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Keep the original title */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 text-black dark:text-white transition-colors duration-300 drop-shadow-lg px-4 sm:px-0 leading-tight">
            Features for Every Traveler
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0">
            Budget-conscious? Seeking emotional healing? Want luxury without effort? Our AI adapts to your exact travel personality.
          </p>
        </div>
        
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
                    alt="Tropical Paradise Destination"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">Tropical Paradise</h3>
                    <p className="text-white/90 text-sm">⭐⭐⭐⭐⭐ (127 experiences)</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <span className="text-white">❤️</span>
                    </div>
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
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/lovable-uploads/01acecfb-4a5e-4651-8343-d178f52a9ff1.png"
                    alt="Premium Resort"
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Best Price
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Premium Resort & Spa</h3>
                  <p className="text-sm text-muted-foreground mb-3">🏨 Luxury Hotel • ⭐⭐⭐⭐⭐</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">$299/night</span>
                    <span className="text-sm text-muted-foreground line-through">$459</span>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium transition-colors">
                    Book Now
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
    </section>
  );
};

export default Features;
