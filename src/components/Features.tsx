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
        
        {/* Panel 1: AI Trip Planning - Mobile Optimized */}
        <div className="mb-16 md:mb-32">
          {/* Mobile: Stacked Layout, Desktop: Side by Side */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Mobile: Header First */}
            <div className="text-center lg:text-left space-y-4 lg:space-y-6 mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                We plan. You breathe.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4 lg:px-0">
                One prompt gives you a complete trip — flights, stays, and activities — without you planning a thing.
              </p>
            </div>
            
            {/* Mobile: Compact Glassmorphism Interface */}
            <div className="relative px-4 lg:px-0">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden">
                
                {/* Compact Header */}
                <div className="bg-gradient-to-r from-primary/40 to-primary/20 backdrop-blur-sm p-3 sm:p-4 border-b border-white/30 dark:border-slate-700/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/40 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/50">
                        <span className="text-primary text-sm sm:text-base font-bold">AI</span>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-foreground">Bangkok Getaway</h3>
                        <p className="text-xs text-muted-foreground">3 days • ₿4,200</p>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/40">
                      Generated in 1.8s
                    </div>
                  </div>
                </div>
                
                {/* Mobile: Horizontal Scroll Cards */}
                <div className="p-3 sm:p-4">
                  
                  {/* Hotel - Featured */}
                  <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-xl p-3 border border-white/50 dark:border-slate-600/50 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">H</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">Your Stay</h4>
                    </div>
                    
                    <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-2 border border-white/60">
                      <div className="flex gap-3">
                        <img 
                          src="/lovable-uploads/937e23fd-265f-4986-991a-926a05637edf.png"
                          alt="Luxury hotel room"
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-medium text-foreground truncate">Tropical Sky Sanctuary</h5>
                          <p className="text-xs text-muted-foreground">4.9★ • ₿2,200/night</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activities - Horizontal Scroll */}
                  <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-xl p-3 border border-white/50 dark:border-slate-600/50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">3 Days of Adventures</h4>
                    </div>
                    
                    {/* Horizontal Scroll Container */}
                    <div className="overflow-x-auto scrollbar-hide">
                      <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
                        
                        {/* Day 1 Card */}
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-3 border border-white/60 min-w-[140px]">
                          <div className="flex items-center gap-2 mb-2">
                            <img 
                              src="/lovable-uploads/369021b4-c3a0-475c-be3b-9f9a6a9832a9.png"
                              alt="Temple"
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div>
                              <h6 className="text-xs font-medium text-foreground">Day 1</h6>
                              <p className="text-xs text-muted-foreground">Cultural</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Grand Palace & Markets</p>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full mt-1 inline-block">₿700</span>
                        </div>
                        
                        {/* Day 2 Card */}
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-3 border border-white/60 min-w-[140px]">
                          <div className="flex items-center gap-2 mb-2">
                            <img 
                              src="/lovable-uploads/e619ccb5-67bb-4172-a634-8a6911184a7c.png"
                              alt="Rooftop"
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div>
                              <h6 className="text-xs font-medium text-foreground">Day 2</h6>
                              <p className="text-xs text-muted-foreground">Urban</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Sky Bar & Night Market</p>
                          <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded-full mt-1 inline-block">₿1,100</span>
                        </div>
                        
                        {/* Day 3 Card */}
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-3 border border-white/60 min-w-[140px]">
                          <div className="flex items-center gap-2 mb-2">
                            <img 
                              src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                              alt="Spa"
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div>
                              <h6 className="text-xs font-medium text-foreground">Day 3</h6>
                              <p className="text-xs text-muted-foreground">Relax</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Luxury Spa Treatment</p>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full mt-1 inline-block">₿1,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="bg-gradient-to-r from-primary/30 to-primary/20 backdrop-blur-xl rounded-xl p-3 border border-primary/50 mt-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h5 className="text-sm font-semibold text-foreground">Ready to Book?</h5>
                        <p className="text-xs text-muted-foreground">5 experiences • 3 nights</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-lg text-xs font-medium border border-white/50 hover:bg-white/80 transition-colors">
                          Edit
                        </button>
                        <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Accent Elements - Smaller on Mobile */}
              <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-xl backdrop-blur-sm rotate-12 animate-pulse border border-white/40"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-lg backdrop-blur-sm -rotate-12 border border-white/40"></div>
            </div>
          </div>
        </div>

        {/* Panel 2: Community Discussions - Mobile Optimized */}
        <div className="mb-16 md:mb-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Mobile: Header First */}
            <div className="text-center lg:text-left space-y-4 lg:space-y-6 mb-8 lg:mb-0 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Where travelers like you connect
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4 lg:px-0">
                Join a community with travelers who know where to go, what to avoid, and maybe how to sneak into that rooftop bar.
              </p>
            </div>
            
            {/* Mobile: Compact Community Interface */}
            <div className="relative px-4 lg:px-0 lg:order-1">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden">
                
                {/* Community Header */}
                <div className="bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-sm p-3 sm:p-4 border-b border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/50">
                      <span className="text-blue-600 text-sm font-bold">ST</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Solo Travelers</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">127 online</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Compact Feed */}
                <div className="p-3 sm:p-4 space-y-3">
                  
                  {/* Live Question - Compact */}
                  <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-xl p-3 border border-white/50">
                    <div className="flex items-start gap-3">
                      <img 
                        src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-foreground">Marcus_Explorer</span>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">Bangkok</span>
                        </div>
                        <p className="text-xs text-foreground mb-2">Any rooftop bars to meet other travelers? Not tourist traps</p>
                        
                        {/* Small attached image */}
                        <div className="mb-2">
                          <img 
                            src="/lovable-uploads/42abd49b-cc9e-422e-863c-11d618b69cf3.png"
                            alt="Bangkok"
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex gap-3 text-muted-foreground">
                            <span>12 likes</span>
                            <span>3 replies</span>
                          </div>
                          <button className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full text-xs">
                            Invite
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Response */}
                  <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-xl p-3 border border-white/50">
                    <div className="flex items-start gap-3">
                      <img 
                        src="/lovable-uploads/89cebcb0-e02d-4029-ad34-dde0c27c4bd9.png"
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-foreground">Alex_Rooftops</span>
                          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full">Local</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Sky Bar at Lebua! Go around sunset, lots of solo travelers</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-xl p-3 border border-white/50">
                    <div className="flex items-center gap-3">
                      <img 
                        src="/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png"
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <span className="text-xs text-muted-foreground">Sarah_Backpacker is typing...</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 bg-gradient-to-r from-primary/30 to-primary/20 text-primary py-2 px-3 rounded-lg text-xs font-medium backdrop-blur-sm border border-primary/40">
                      Ask Question
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-400/30 to-emerald-400/30 text-green-700 dark:text-green-400 py-2 px-3 rounded-lg text-xs font-medium backdrop-blur-sm border border-green-400/40">
                      Join Meetup
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-xl backdrop-blur-sm rotate-12 animate-pulse border border-white/40"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-lg backdrop-blur-sm -rotate-12 border border-white/40"></div>
            </div>
          </div>
        </div>

        {/* Panel 3: AI Assistant - Mobile Optimized */}
        <div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Mobile: Header First */}
            <div className="text-center lg:text-left space-y-4 lg:space-y-6 mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Guess who's tagging along
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4 lg:px-0">
                We don't just get you there, we go with you. Our AI assistant finds transport, hidden spots, and connects you with other travelers.
              </p>
            </div>
            
            {/* Mobile: Compact Chat Interface */}
            <div className="relative px-4 lg:px-0">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden">
                
                {/* Compact Assistant Header */}
                <div className="bg-gradient-to-r from-primary/40 to-primary/20 backdrop-blur-sm p-3 sm:p-4 border-b border-white/30 dark:border-slate-700/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/50">
                      <span className="text-primary text-sm font-bold">AI</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Travel Assistant</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">Active in Bangkok</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Compact Chat Messages */}
                <div className="p-3 sm:p-4 space-y-3">
                  
                  {/* User Question */}
                  <div className="flex gap-2">
                    <img 
                      src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                      alt="User"
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-lg p-2 border border-white/50 flex-1">
                      <p className="text-xs text-foreground">What's happening tonight near my hotel?</p>
                    </div>
                  </div>

                  {/* AI Response - Events */}
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-gradient-to-r from-primary/70 to-primary/50 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-lg p-2 border border-white/50 flex-1">
                      <p className="text-xs mb-2 text-foreground">Here's what's happening tonight!</p>
                      
                      {/* Compact Events */}
                      <div className="space-y-1">
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-2 flex gap-2 items-center">
                          <img 
                            src="/lovable-uploads/e619ccb5-67bb-4172-a634-8a6911184a7c.png"
                            alt="Rooftop"
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">Rooftop Jazz • 8PM</p>
                            <p className="text-xs text-muted-foreground">5 min walk</p>
                          </div>
                        </div>
                        
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-2 flex gap-2 items-center">
                          <img 
                            src="/lovable-uploads/dea72317-53c3-46c5-9b99-aab06114fde8.png"
                            alt="Market"
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">Night Market • Until 2AM</p>
                            <p className="text-xs text-muted-foreground">10 min ride</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Follow-up */}
                  <div className="flex gap-2">
                    <img 
                      src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                      alt="User"
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-lg p-2 border border-white/50 flex-1">
                      <p className="text-xs text-foreground">How do I get to the rooftop bar?</p>
                    </div>
                  </div>

                  {/* AI Response - Transport */}
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-gradient-to-r from-primary/70 to-primary/50 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-lg p-2 border border-white/50 flex-1">
                      <p className="text-xs mb-2 text-foreground">Transport options:</p>
                      
                      {/* Transport Options - Horizontal Scroll */}
                      <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
                          <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-2 min-w-[80px] text-center">
                            <p className="text-xs font-medium text-foreground">BTS</p>
                            <p className="text-xs text-muted-foreground">₿45</p>
                          </div>
                          <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-2 min-w-[80px] text-center">
                            <p className="text-xs font-medium text-foreground">Motorbike</p>
                            <p className="text-xs text-muted-foreground">₿80</p>
                          </div>
                          <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-lg p-2 min-w-[80px] text-center">
                            <p className="text-xs font-medium text-foreground">Grab</p>
                            <p className="text-xs text-muted-foreground">₿120</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Community Connection */}
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-gradient-to-r from-primary/70 to-primary/50 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-xl rounded-lg p-2 border border-white/50 flex-1">
                      <p className="text-xs mb-2 text-foreground">3 travelers from your community going tonight:</p>
                      
                      <div className="flex gap-1">
                        <img src="/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png" alt="Sarah" className="w-6 h-6 rounded-full object-cover" />
                        <img src="/lovable-uploads/89cebcb0-e02d-4029-ad34-dde0c27c4bd9.png" alt="Alex" className="w-6 h-6 rounded-full object-cover" />
                        <img src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png" alt="Maria" className="w-6 h-6 rounded-full object-cover" />
                        <button className="w-6 h-6 bg-green-400/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-400/50">
                          <span className="text-green-600 text-xs">+</span>
                        </button>
                      </div>
                      
                      <p className="text-xs mt-1 text-muted-foreground">Want me to connect you?</p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-1">
                    <button className="flex-1 bg-gradient-to-r from-primary/30 to-primary/20 text-primary py-1.5 px-3 rounded-lg text-xs font-medium backdrop-blur-sm border border-primary/40">
                      Ask More
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-400/30 to-emerald-400/30 text-green-700 dark:text-green-400 py-1.5 px-3 rounded-lg text-xs font-medium backdrop-blur-sm border border-green-400/40">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-xl backdrop-blur-sm rotate-12 animate-pulse border border-white/40"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-lg backdrop-blur-sm -rotate-12 border border-white/40"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
