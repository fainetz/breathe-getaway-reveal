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
        
        {/* Panel 1: AI Trip Planning - Space Efficient Mobile */}
        <div className="mb-12 md:mb-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Mobile: Compact Header */}
            <div className="text-center lg:text-left space-y-3 lg:space-y-6 mb-6 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
                We plan. You breathe.
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-4 lg:px-0">
                One prompt gives you a complete trip — flights, stays, and activities.
              </p>
            </div>
            
            {/* Mobile: Ultra Compact Interface */}
            <div className="relative px-3 lg:px-0">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-3xl rounded-xl sm:rounded-2xl shadow-xl border border-white/60 dark:border-slate-700/60">
                
                {/* Mini Header */}
                <div className="bg-gradient-to-r from-primary/50 to-primary/25 backdrop-blur-sm p-2.5 border-b border-white/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-white/50 rounded-lg flex items-center justify-center">
                        <span className="text-primary text-xs font-bold">AI</span>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-foreground">Bangkok Trip</h3>
                        <p className="text-xs text-muted-foreground">₿4,200 • 3 days</p>
                      </div>
                    </div>
                    <div className="text-xs bg-white/40 px-2 py-0.5 rounded text-muted-foreground">1.8s</div>
                  </div>
                </div>
                
                <div className="p-2.5 space-y-2.5">
                  
                  {/* Hotel - Mini */}
                  <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-2 border border-white/60">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">H</span>
                      </div>
                      <h4 className="text-xs font-semibold text-foreground">Stay</h4>
                    </div>
                    <div className="flex gap-2">
                      <img 
                        src="/lovable-uploads/937e23fd-265f-4986-991a-926a05637edf.png"
                        alt="Hotel"
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-medium text-foreground truncate">Tropical Sky Sanctuary</h5>
                        <p className="text-xs text-muted-foreground">₿2,200/night • 4.9★</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activities - Ultra Compact Scroll */}
                  <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-2 border border-white/60">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <h4 className="text-xs font-semibold text-foreground">Activities</h4>
                    </div>
                    
                    {/* Mini Horizontal Cards */}
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
                      <div className="bg-white/80 rounded-lg p-1.5 min-w-[90px] flex-shrink-0 border border-white/70">
                        <img 
                          src="/lovable-uploads/369021b4-c3a0-475c-be3b-9f9a6a9832a9.png"
                          alt="Temple"
                          className="w-full h-8 rounded object-cover mb-1"
                        />
                        <p className="text-xs font-medium text-foreground">Grand Palace</p>
                        <p className="text-xs text-muted-foreground">₿500</p>
                      </div>
                      
                      <div className="bg-white/80 rounded-lg p-1.5 min-w-[90px] flex-shrink-0 border border-white/70">
                        <img 
                          src="/lovable-uploads/e619ccb5-67bb-4172-a634-8a6911184a7c.png"
                          alt="Sky Bar"
                          className="w-full h-8 rounded object-cover mb-1"
                        />
                        <p className="text-xs font-medium text-foreground">Sky Bar</p>
                        <p className="text-xs text-muted-foreground">₿800</p>
                      </div>
                      
                      <div className="bg-white/80 rounded-lg p-1.5 min-w-[90px] flex-shrink-0 border border-white/70">
                        <img 
                          src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                          alt="Spa"
                          className="w-full h-8 rounded object-cover mb-1"
                        />
                        <p className="text-xs font-medium text-foreground">Luxury Spa</p>
                        <p className="text-xs text-muted-foreground">₿1,000</p>
                      </div>
                      
                      <div className="bg-white/80 rounded-lg p-1.5 min-w-[90px] flex-shrink-0 border border-white/70">
                        <img 
                          src="/lovable-uploads/dea72317-53c3-46c5-9b99-aab06114fde8.png"
                          alt="Market"
                          className="w-full h-8 rounded object-cover mb-1"
                        />
                        <p className="text-xs font-medium text-foreground">Night Market</p>
                        <p className="text-xs text-muted-foreground">₿300</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Row */}
                  <div className="flex gap-1.5">
                    <button className="flex-1 bg-white/60 text-foreground py-1.5 px-2 rounded-lg text-xs font-medium border border-white/60">
                      Edit
                    </button>
                    <button className="flex-1 bg-primary text-primary-foreground py-1.5 px-2 rounded-lg text-xs font-medium">
                      Book ₿4,200
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mini Floating Elements */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400/40 to-red-400/40 rounded-lg backdrop-blur-sm rotate-12 border border-white/50"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-green-400/40 to-emerald-400/40 rounded backdrop-blur-sm -rotate-12 border border-white/50"></div>
            </div>
          </div>
        </div>

        {/* Panel 2: Community - Space Efficient Mobile */}
        <div className="mb-12 md:mb-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Mobile: Compact Header */}
            <div className="text-center lg:text-left space-y-3 lg:space-y-6 mb-6 lg:mb-0 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
                Where travelers connect
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-4 lg:px-0">
                Join travelers who know the best spots and hidden gems.
              </p>
            </div>
            
            {/* Mobile: Ultra Compact Community */}
            <div className="relative px-3 lg:px-0 lg:order-1">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-3xl rounded-xl sm:rounded-2xl shadow-xl border border-white/60 dark:border-slate-700/60">
                
                {/* Mini Community Header */}
                <div className="bg-gradient-to-r from-blue-500/40 to-indigo-500/40 backdrop-blur-sm p-2.5 border-b border-white/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white/50 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-bold">ST</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-foreground">Solo Travelers</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">127 online</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2.5 space-y-2">
                  
                  {/* Live Question - Mini */}
                  <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-2 border border-white/60">
                    <div className="flex gap-2">
                      <img 
                        src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                        alt="User"
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs font-medium text-foreground">Marcus</span>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">Bangkok</span>
                        </div>
                        <p className="text-xs text-foreground mb-1">Best rooftop bars to meet travelers?</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">12 likes • 3 replies</span>
                          <button className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded text-xs">
                            Invite
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Responses */}
                  <div className="space-y-1.5">
                    <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-2 border border-white/60">
                      <div className="flex gap-2">
                        <img 
                          src="/lovable-uploads/89cebcb0-e02d-4029-ad34-dde0c27c4bd9.png"
                          alt="User"
                          className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-medium text-foreground">Alex </span>
                          <span className="text-xs text-muted-foreground">Sky Bar at Lebua! Go at sunset</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-2 border border-white/60">
                      <div className="flex items-center gap-2">
                        <img 
                          src="/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png"
                          alt="User"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-xs text-muted-foreground">Sarah is typing...</span>
                        <div className="flex gap-0.5 ml-auto">
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Row */}
                  <div className="flex gap-1.5 pt-1">
                    <button className="flex-1 bg-gradient-to-r from-primary/40 to-primary/20 text-primary py-1.5 px-2 rounded-lg text-xs font-medium border border-primary/50">
                      Ask
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-400/40 to-emerald-400/40 text-green-700 dark:text-green-400 py-1.5 px-2 rounded-lg text-xs font-medium border border-green-400/50">
                      Join
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mini Floating Elements */}
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-gradient-to-r from-blue-400/40 to-indigo-400/40 rounded-lg backdrop-blur-sm rotate-12 border border-white/50"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded backdrop-blur-sm -rotate-12 border border-white/50"></div>
            </div>
          </div>
        </div>

        {/* Panel 3: AI Assistant - Space Efficient Mobile */}
        <div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Mobile: Compact Header */}
            <div className="text-center lg:text-left space-y-3 lg:space-y-6 mb-6 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
                Guess who's tagging along
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-4 lg:px-0">
                Our AI assistant finds transport, hidden spots, and connects you with travelers.
              </p>
            </div>
            
            {/* Mobile: Ultra Compact Chat */}
            <div className="relative px-3 lg:px-0">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-3xl rounded-xl sm:rounded-2xl shadow-xl border border-white/60 dark:border-slate-700/60">
                
                {/* Mini Assistant Header */}
                <div className="bg-gradient-to-r from-primary/50 to-primary/25 backdrop-blur-sm p-2.5 border-b border-white/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white/50 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">AI</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-foreground">Travel Assistant</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">Active in Bangkok</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2.5 space-y-2">
                  
                  {/* User Question - Mini */}
                  <div className="flex gap-1.5">
                    <img 
                      src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                      alt="User"
                      className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-1.5 border border-white/60 flex-1">
                      <p className="text-xs text-foreground">What's happening tonight?</p>
                    </div>
                  </div>

                  {/* AI Response - Compact Events */}
                  <div className="flex gap-1.5">
                    <div className="w-5 h-5 bg-gradient-to-r from-primary/80 to-primary/60 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-1.5 border border-white/60 flex-1">
                      <p className="text-xs mb-1.5 text-foreground">Tonight's events:</p>
                      
                      {/* Mini Events Row */}
                      <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-0.5">
                        <div className="bg-white/80 rounded p-1 min-w-[70px] flex-shrink-0 text-center border border-white/70">
                          <img 
                            src="/lovable-uploads/e619ccb5-67bb-4172-a634-8a6911184a7c.png"
                            alt="Jazz"
                            className="w-full h-6 rounded object-cover mb-0.5"
                          />
                          <p className="text-xs font-medium text-foreground">Jazz 8PM</p>
                          <p className="text-xs text-muted-foreground">5min</p>
                        </div>
                        
                        <div className="bg-white/80 rounded p-1 min-w-[70px] flex-shrink-0 text-center border border-white/70">
                          <img 
                            src="/lovable-uploads/dea72317-53c3-46c5-9b99-aab06114fde8.png"
                            alt="Market"
                            className="w-full h-6 rounded object-cover mb-0.5"
                          />
                          <p className="text-xs font-medium text-foreground">Market</p>
                          <p className="text-xs text-muted-foreground">10min</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transport Question */}
                  <div className="flex gap-1.5">
                    <img 
                      src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                      alt="User"
                      className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-1.5 border border-white/60 flex-1">
                      <p className="text-xs text-foreground">How to get there?</p>
                    </div>
                  </div>

                  {/* AI Transport Response */}
                  <div className="flex gap-1.5">
                    <div className="w-5 h-5 bg-gradient-to-r from-primary/80 to-primary/60 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-1.5 border border-white/60 flex-1">
                      <p className="text-xs mb-1 text-foreground">Transport:</p>
                      
                      {/* Mini Transport Options */}
                      <div className="flex gap-1">
                        <div className="bg-white/80 rounded p-1 text-center flex-1 border border-white/70">
                          <p className="text-xs font-medium text-foreground">BTS</p>
                          <p className="text-xs text-muted-foreground">₿45</p>
                        </div>
                        <div className="bg-white/80 rounded p-1 text-center flex-1 border border-white/70">
                          <p className="text-xs font-medium text-foreground">Grab</p>
                          <p className="text-xs text-muted-foreground">₿120</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Community Connection - Mini */}
                  <div className="flex gap-1.5">
                    <div className="w-5 h-5 bg-gradient-to-r from-primary/80 to-primary/60 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-xl rounded-lg p-1.5 border border-white/60 flex-1">
                      <p className="text-xs mb-1 text-foreground">3 travelers going:</p>
                      <div className="flex gap-0.5 items-center">
                        <img src="/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png" alt="Sarah" className="w-4 h-4 rounded-full object-cover" />
                        <img src="/lovable-uploads/89cebcb0-e02d-4029-ad34-dde0c27c4bd9.png" alt="Alex" className="w-4 h-4 rounded-full object-cover" />
                        <img src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png" alt="Maria" className="w-4 h-4 rounded-full object-cover" />
                        <button className="w-4 h-4 bg-green-400/40 rounded-full flex items-center justify-center ml-1">
                          <span className="text-green-600 text-xs">+</span>
                        </button>
                        <span className="text-xs text-muted-foreground ml-1">Connect?</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Row */}
                  <div className="flex gap-1.5 pt-1">
                    <button className="flex-1 bg-gradient-to-r from-primary/40 to-primary/20 text-primary py-1.5 px-2 rounded-lg text-xs font-medium border border-primary/50">
                      Ask More
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-400/40 to-emerald-400/40 text-green-700 dark:text-green-400 py-1.5 px-2 rounded-lg text-xs font-medium border border-green-400/50">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mini Floating Elements */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-lg backdrop-blur-sm rotate-12 border border-white/50"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 rounded backdrop-blur-sm -rotate-12 border border-white/50"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
