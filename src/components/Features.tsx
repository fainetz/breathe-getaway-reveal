const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Keep the original title */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 text-black dark:text-white transition-colors duration-300 drop-shadow-lg px-4 sm:px-0 leading-tight">
            why breathe and getaway?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0">
            Because life's too short for boring trips and endless planning.
          </p>
        </div>
        
        {/* Panel 1: AI Trip Planning */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                We plan. You breathe.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                One prompt gives you a complete trip — flights, stays, and activities — without you planning a thing. You can adjust any part with a simple prompt, although we doubt it won't be perfect first try and when it's perfect, book it instantly, so you can be there right before sunset.
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
              {/* Travel App Interface Mockup */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-md">
                {/* App Header */}
                <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-slate-600"></div>
                    <h3 className="text-sm font-medium text-muted-foreground">Popular itineraries</h3>
                    <div className="w-6 h-6"></div>
                  </div>
                </div>
                
                {/* Destination Card */}
                <div className="p-4">
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <img 
                      src="/lovable-uploads/349adef3-59ea-405e-bc62-d704ea49bf62.png"
                      alt="Explore Destination"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="font-semibold">Explore Bali, Indonesia</h4>
                      <p className="text-xs opacity-90">7 Day Event • Page 1</p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      + Customize a trip
                    </button>
                    <button className="w-full border border-gray-200 dark:border-slate-600 text-foreground py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      ♡ Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Where travelers like you connect
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join a community with travelers who know where to go, what to avoid, and maybe how to sneak into that rooftop bar. A place to ask questions, share safety tips, trade local secrets, and even team up with others who share your values — making it easier to just leave.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 3: Book with Confidence */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Guess who's tagging along
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We don't just get you there, we go with you. Our on-trip assistant helps you find local transport, cheapest routes, uncover hidden spots, and even meet other travelers in your community. Especially useful when you need on-trip advice.
              </p>
            </div>
            <div className="relative">
              {/* Hotel Booking Interface Mockup */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-md">
                {/* Hotel Card */}
                <div className="relative">
                  <div className="relative rounded-t-2xl overflow-hidden">
                    <img 
                      src="/lovable-uploads/01acecfb-4a5e-4651-8343-d178f52a9ff1.png"
                      alt="Costa Luz Hotel"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hotel Details */}
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Costa Luz</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium ml-1">4.9</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">🏨 Luxury Hotel</span>
                    </div>
                  </div>
                  
                  {/* Photo Gallery Mockup */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="h-16 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900 rounded-lg"></div>
                    <div className="h-16 bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-800 dark:to-amber-900 rounded-lg"></div>
                    <div className="relative h-16 bg-gradient-to-br from-green-200 to-green-300 dark:from-green-800 dark:to-green-900 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium text-foreground/70">Show all photos</span>
                    </div>
                  </div>
                  
                  {/* Booking Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-muted-foreground">Check-In</p>
                        <p className="font-medium">Jul 21</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Check-Out</p>
                        <p className="font-medium">Jul 23</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border border-gray-200 dark:border-slate-600 rounded-lg p-3">
                      <span className="text-sm">4 Travelers, 2 Rooms</span>
                      <span className="text-muted-foreground">⌄</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                      Book a room
                    </button>
                    <button className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      + Add to trip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
