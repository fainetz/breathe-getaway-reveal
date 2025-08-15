const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Keep the original title */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 text-black dark:text-white transition-colors duration-300 drop-shadow-lg px-4 sm:px-0 leading-tight">
            Why breathe & getaway?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0">
            Because when that urge hits, we're here to book your trip.
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
              {/* Central AI Brain */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
              </div>
              
              {/* Floating input bubble */}
              <div className="absolute bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-slate-700 animate-float" style={{ top: '5%', left: '10%', maxWidth: '200px' }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm">💬</div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">You say:</p>
                    <p className="text-sm font-medium text-foreground">"I want to go somewhere warm next weekend"</p>
                  </div>
                </div>
              </div>

              {/* Generated trip components */}
              <div className="absolute bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float-delayed" style={{ top: '15%', right: '5%' }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-400 flex items-center justify-center text-white text-sm">✈️</div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Flight</p>
                    <p className="text-xs text-muted-foreground">$280</p>
                  </div>
                </div>
              </div>

              <div className="absolute bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float" style={{ top: '45%', right: '10%' }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-white text-sm">🏨</div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Hotel</p>
                    <p className="text-xs text-muted-foreground">$120/night</p>
                  </div>
                </div>
              </div>

              <div className="absolute bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float-delayed" style={{ top: '70%', left: '5%' }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center text-white text-sm">🎯</div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Activities</p>
                    <p className="text-xs text-muted-foreground">5 planned</p>
                  </div>
                </div>
              </div>

              {/* Complete trip card */}
              <div className="absolute bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-4 shadow-xl border-2 border-primary/20 animate-float" style={{ bottom: '10%', right: '15%', maxWidth: '180px' }}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-white">✨</div>
                  <p className="text-sm font-semibold text-foreground mb-1">Trip Ready!</p>
                  <p className="text-xs text-muted-foreground">Book in 1 click</p>
                </div>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                    <stop offset="100%" stopColor="rgb(147, 51, 234)" />
                  </linearGradient>
                </defs>
                <path d="M 50% 50% Q 80% 20% 90% 25%" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                </path>
                <path d="M 50% 50% Q 80% 70% 85% 60%" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="2.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 50% 50% Q 20% 80% 15% 75%" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="3s" repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          </div>
        </div>

        {/* Panel 2: Community Discussions */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Community App Interface Mockup */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-md">
                {/* App Header with Cover Photo */}
                <div className="relative">
                  {/* Community Cover */}
                  <div className="h-20 bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-2 left-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-sm">🏔️</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">Solo Travelers</h3>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-white/90">127 online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Discussion Feed */}
                <div className="p-4 space-y-4">
                  {/* Live Question from User */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img 
                          src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                          alt="User avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-foreground">Marcus_Explorer</span>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">📍 Bangkok</span>
                          <span className="text-xs text-muted-foreground">• just now</span>
                        </div>
                        <p className="text-sm text-foreground mb-3">Hey everyone! First time in Bangkok solo. Any recommendations for rooftop bars where I can actually meet other travelers? Not looking for tourist traps 🌆</p>
                        
                        {/* Attached Image */}
                        <div className="mb-3">
                          <div className="relative rounded-lg overflow-hidden">
                            <img 
                              src="/lovable-uploads/42abd49b-cc9e-422e-863c-11d618b69cf3.png"
                              alt="Bangkok skyline"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Bangkok</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">❤️ 12</span>
                            <span className="flex items-center gap-1">💬 3 replies</span>
                            <span className="flex items-center gap-1">📤 2 shares</span>
                          </div>
                          <button className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                            Send Invite
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Responses */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <img 
                        src="/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png"
                        alt="User avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">Sarah_Backpacker</span>
                          <span className="text-xs text-green-600 dark:text-green-400">• typing...</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>

                    {/* Quick Reply */}
                    <div className="flex items-start gap-3">
                      <img 
                        src="/lovable-uploads/89cebcb0-e02d-4029-ad34-dde0c27c4bd9.png"
                        alt="User avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">Alex_Rooftops</span>
                          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full">Local Guide</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Sky Bar at Lebua is amazing! Go around sunset, lots of solo travelers there ✨</p>
                      </div>
                    </div>
                  </div>

                  {/* Community Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                    <button className="flex-1 bg-gradient-to-r from-primary/10 to-primary/5 text-primary py-2.5 px-3 rounded-lg text-xs font-medium hover:from-primary/20 hover:to-primary/10 transition-all duration-300">
                      💬 Ask Question
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 py-2.5 px-3 rounded-lg text-xs font-medium hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-300">
                      🌍 Join Meetup
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
              {/* Main AI Assistant Interface */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-md">
                {/* Assistant Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-4 border-b border-gray-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-lg">🤖</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">AI Travel Assistant</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">Active in Bangkok</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                 {/* Chat Messages */}
                <div className="p-4 space-y-4 h-80 overflow-y-auto">
                  {/* AI Response First */}
                  <div className="flex justify-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-3 max-w-sm">
                      <p className="text-sm text-foreground mb-3">🌆 Amazing rooftop events tonight:</p>
                      
                      {/* Event Cards */}
                      <div className="space-y-2">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <div className="flex gap-3">
                            <img 
                              src="/lovable-uploads/a1506915-e011-43ee-b8b7-034196d2c51e.png"
                              alt="Rooftop cinema"
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">Rooftop Cinema</p>
                              <p className="text-xs text-muted-foreground">8:30 PM • Under the stars</p>
                              <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full">🎬 Live</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <div className="flex gap-3">
                            <img 
                              src="/lovable-uploads/b35a9b1b-a4f8-4fed-9304-1262070ceada.png"
                              alt="Jazz club"
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">Jazz Session</p>
                              <p className="text-xs text-muted-foreground">9 PM • Garden vibes</p>
                              <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">🎵 Live</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Follow-up Question */}
                  <div className="flex justify-end gap-3">
                    <div className="bg-blue-500 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm text-white">Perfect! Can you help me get to the Jazz Session? I'm staying near Khao San Road.</p>
                    </div>
                    <img 
                      src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>

                  {/* AI Transport Response */}
                  <div className="flex justify-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-3 max-w-sm">
                      <p className="text-sm text-foreground mb-3">🚗 Here are your best routes:</p>
                      
                      {/* Route Options */}
                      <div className="space-y-2">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border-l-2 border-green-500">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-foreground">🚕 Taxi</span>
                            <span className="text-xs text-green-600 dark:text-green-400">Fastest</span>
                          </div>
                          <p className="text-xs text-muted-foreground">15 min • ฿180 • Direct route</p>
                        </div>
                        
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-foreground">🚇 BTS</span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">Cheapest</span>
                          </div>
                          <p className="text-xs text-muted-foreground">25 min • ฿42 • Saphan Taksin + walk</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                    <button className="flex-1 bg-primary/10 text-primary py-2 px-3 rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors">
                      🎫 Get Tickets
                    </button>
                    <button className="flex-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-2 px-3 rounded-lg text-xs font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      📍 Directions
                    </button>
                  </div>
                </div>

              {/* Smaller Transport Example - Glassmorphism overlay */}
              <div className="absolute -right-8 top-20 w-44 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-3 animate-float-delayed">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/50 dark:border-slate-600/50">
                  <div className="w-5 h-5 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">Transport Helper</span>
                </div>
                
                <div className="space-y-2">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 rounded-lg p-2 max-w-28">
                      <p className="text-xs text-white">Best way to Sky Bar?</p>
                    </div>
                  </div>
                  
                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-2 max-w-32">
                      <p className="text-xs text-foreground mb-1">🚕 Taxi: 15 min, ฿200</p>
                      <p className="text-xs text-foreground">🚇 BTS: 25 min, ฿42</p>
                      <p className="text-xs text-muted-foreground mt-1">💡 Use Grab app</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Smaller overlapping transport routing chat example */}
              <div className="absolute -left-8 top-12 z-10 animate-float">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-white/30 dark:border-slate-700/50 max-w-[240px]">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/50 dark:border-slate-600/50">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🗺️</span>
                    </div>
                    <span className="text-xs font-medium text-foreground">Route Assistant</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg px-2 py-1 text-xs max-w-[160px]">
                        How do I get from airport to my hotel?
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-[8px]">🤖</span>
                      </div>
                      <div className="bg-gray-100/80 dark:bg-slate-700/80 rounded-lg px-2 py-1 text-xs text-muted-foreground">
                        🚄 **Airport Rail Link**
                        45 mins • 45฿ • Most reliable
                        
                        🚕 **Taxi**
                        60 mins • 400฿ • Door-to-door
                        
                        🚌 **Bus A1**
                        60 mins • 30฿ • Budget option
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg px-2 py-1 text-xs">
                        Book the train!
                      </div>
                    </div>
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
