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
        <div className="mb-16 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                We plan. You breathe.
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                One prompt gives you a complete trip — flights, stays, and activities — without you planning a thing. You can adjust any part with a simple prompt, although we doubt it won't be perfect first try and when it's perfect, book it instantly, so you can be there right before sunset.
              </p>
            </div>
            
            <div className="relative order-1 lg:order-2">
              {/* Mobile: Compact Card Stack, Desktop: Full Interface */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/40 overflow-hidden max-w-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/30 to-primary/15 backdrop-blur-sm p-3 lg:p-5 border-b border-white/30 dark:border-slate-700/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/40">
                        <span className="text-primary text-sm lg:text-xl font-bold">AI</span>
                      </div>
                      <div>
                        <h3 className="text-sm lg:text-lg font-bold text-foreground">Your Bangkok Getaway</h3>
                        <p className="text-xs lg:text-sm text-muted-foreground">3 days • Perfect for solo travelers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs lg:text-sm font-semibold text-foreground">Total: ₿4,200</p>
                      <p className="text-xs text-muted-foreground hidden lg:block">Generated in 1.8s</p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile: Alternating Description & Image Layout */}
                <div className="lg:hidden p-3 space-y-3">
                  {/* Hotel Description */}
                  <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-xl p-3 border border-white/40 dark:border-slate-600/40">
                    <h5 className="text-sm font-semibold text-foreground mb-2">Where You're Staying</h5>
                    <p className="text-xs text-muted-foreground">Tropical Sky Sanctuary in Central Bangkok - a luxury resort with spa, pool & garden. 4.9★ rating.</p>
                  </div>
                  
                  {/* Hotel Image */}
                  <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-xl p-2 border border-white/40 dark:border-slate-600/40">
                    <img 
                      src="/lovable-uploads/937e23fd-265f-4986-991a-926a05637edf.png"
                      alt="Luxury hotel room"
                      className="w-full h-32 rounded-lg object-cover object-top"
                    />
                    <div className="p-2">
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">₿2,200/night</span>
                    </div>
                  </div>
                  
                  {/* Activities Description */}
                  <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-xl p-3 border border-white/40 dark:border-slate-600/40">
                    <h5 className="text-sm font-semibold text-foreground mb-2">Your Adventures</h5>
                    <p className="text-xs text-muted-foreground">Visit the Grand Palace, enjoy Sky Bar at sunset, explore floating markets, and end with a luxury spa treatment.</p>
                  </div>
                  
                  {/* Activities Image */}
                  <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-xl p-2 border border-white/40 dark:border-slate-600/40">
                    <img 
                      src="/lovable-uploads/369021b4-c3a0-475c-be3b-9f9a6a9832a9.png"
                      alt="Grand Palace Temple"
                      className="w-full h-32 rounded-lg object-cover object-top"
                    />
                    <div className="p-2">
                      <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full">5 experiences</span>
                    </div>
                  </div>
                  
                  {/* Book Button */}
                  <div className="bg-gradient-to-r from-primary/30 to-primary/15 backdrop-blur-xl rounded-xl p-3 border border-primary/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-semibold text-foreground">Ready to Book?</h5>
                        <p className="text-xs text-muted-foreground">Total: ₿4,200 • 3 nights</p>
                      </div>
                      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-medium">
                        Book Trip
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Desktop: Full Layout */}
                <div className="hidden lg:block p-5 space-y-5 h-[480px] overflow-y-auto">
                  
                  {/* Where You're Staying */}
                  <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-slate-600/40">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
                        <span className="text-white text-sm font-bold">H</span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground">Where You're Staying</h4>
                    </div>
                    
                     <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 dark:border-slate-500/50">
                       <div className="flex gap-4">
                         <img 
                           src="/lovable-uploads/937e23fd-265f-4986-991a-926a05637edf.png"
                           alt="Luxury hotel room with modern design"
                           className="w-20 h-20 rounded-xl object-cover"
                         />
                         <div className="flex-1">
                           <h5 className="font-semibold text-foreground mb-1">Tropical Sky Sanctuary</h5>
                           <p className="text-sm text-muted-foreground mb-2">Central Bangkok • 4.9★ • Luxury Resort</p>
                           <div className="flex items-center gap-3">
                             <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">Spa</span>
                             <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">Pool & Garden</span>
                             <span className="text-sm font-semibold text-foreground">₿2,200/night</span>
                           </div>
                         </div>
                       </div>
                     </div>
                  </div>
                  
                  {/* Day-by-Day Grid Layout */}
                  <div className="space-y-4">
                    {/* Day 1 - Horizontal Layout */}
                    <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-slate-600/40">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-400 rounded-xl flex items-center justify-center">
                          <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <h4 className="font-semibold text-foreground">Day 1 - Cultural Immersion</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-slate-500/50">
                          <div className="flex items-center gap-2 mb-2">
                            <img 
                              src="/lovable-uploads/369021b4-c3a0-475c-be3b-9f9a6a9832a9.png"
                              alt="Temple"
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h6 className="text-sm font-medium text-foreground">Grand Palace</h6>
                              <p className="text-xs text-muted-foreground">9:00 AM</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Sacred temple complex with golden spires</p>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full mt-2 inline-block">₿500</span>
                        </div>
                        
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-slate-500/50">
                          <div className="flex items-center gap-2 mb-2">
                            <img 
                              src="/lovable-uploads/dea72317-53c3-46c5-9b99-aab06114fde8.png"
                              alt="Market"
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h6 className="text-sm font-medium text-foreground">Floating Market</h6>
                              <p className="text-xs text-muted-foreground">2:00 PM</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Traditional boat vendors and local crafts</p>
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full mt-2 inline-block">₿200</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Day 2 - Vertical Layout */}
                    <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-slate-600/40">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                          <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <h4 className="font-semibold text-foreground">Day 2 - Urban Adventures</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-slate-500/50">
                          <div className="flex items-start gap-3">
                            <img 
                              src="/lovable-uploads/e619ccb5-67bb-4172-a634-8a6911184a7c.png"
                              alt="Rooftop"
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h6 className="text-sm font-medium text-foreground">Sky Bar Experience</h6>
                                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded-full">₿800</span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">6:00 PM - Sunset cocktails on 63rd floor</p>
                              <p className="text-xs text-muted-foreground">Panoramic city views and craft cocktails</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-slate-500/50">
                          <div className="flex items-start gap-3">
                            <img 
                              src="/lovable-uploads/42abd49b-cc9e-422e-863c-11d618b69cf3.png"
                              alt="Street Food"
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h6 className="text-sm font-medium text-foreground">Night Market Food Tour</h6>
                                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full">₿300</span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">9:00 PM - Guided food adventure</p>
                              <p className="text-xs text-muted-foreground">Local street food favorites and hidden gems</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Day 3 - Single Feature */}
                    <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-slate-600/40">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <h4 className="font-semibold text-foreground">Day 3 - Departure Day</h4>
                      </div>
                      
                      <div className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 dark:border-slate-500/50">
                        <div className="flex items-center gap-4">
                          <img 
                            src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                            alt="Spa"
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="text-base font-medium text-foreground">Luxury Spa Treatment</h6>
                              <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full font-medium">₿1,000</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">10:00 AM - 1:00 PM • Perfect before flight</p>
                            <p className="text-sm text-muted-foreground">Traditional Thai massage and aromatherapy to end your trip relaxed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trip Actions */}
                  <div className="bg-gradient-to-r from-primary/30 to-primary/15 backdrop-blur-xl rounded-2xl p-4 border border-primary/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-foreground">Ready to Book?</h5>
                        <p className="text-sm text-muted-foreground">5 experiences • 3 nights stay</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm text-foreground px-4 py-2 rounded-xl text-sm font-medium border border-white/50 hover:bg-white/80 transition-colors">
                          Customize
                        </button>
                        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                          Book Trip
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Accent Elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl backdrop-blur-sm rotate-12 animate-pulse border border-white/40"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-xl backdrop-blur-sm -rotate-12 border border-white/40"></div>
              <div className="absolute top-20 -right-6 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-lg backdrop-blur-sm animate-bounce border border-white/40"></div>
            </div>
          </div>
        </div>

        {/* Panel 2: Community Discussions */}
        <div className="mb-16 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              {/* Community App Interface Mockup */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden max-w-md border border-white/40 dark:border-slate-700/40">
                {/* App Header with Cover Photo */}
                <div className="relative">
                  {/* Community Cover */}
                  <div className="h-20 bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-2 left-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-sm">ST</span>
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
                <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 h-[280px] lg:h-auto max-h-[400px] overflow-y-auto">
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
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">Bangkok</span>
                          <span className="text-xs text-muted-foreground">• just now</span>
                        </div>
                        <p className="text-sm text-foreground mb-3">Hey everyone! First time in Bangkok solo. Any recommendations for rooftop bars where I can actually meet other travelers? Not looking for tourist traps</p>
                        
                        {/* Attached Image */}
                        <div className="mb-3">
                          <div className="relative rounded-lg overflow-hidden">
                            <img 
                              src="/lovable-uploads/42abd49b-cc9e-422e-863c-11d618b69cf3.png"
                              alt="Bangkok skyline"
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Bangkok</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">Like 12</span>
                            <span className="flex items-center gap-1">Reply 3</span>
                            <span className="flex items-center gap-1">Share 2</span>
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
                        <p className="text-sm text-muted-foreground">Sky Bar at Lebua is amazing! Go around sunset, lots of solo travelers there</p>
                      </div>
                    </div>
                  </div>

                  {/* Community Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                    <button className="flex-1 bg-gradient-to-r from-primary/10 to-primary/5 text-primary py-2.5 px-3 rounded-lg text-xs font-medium hover:from-primary/20 hover:to-primary/10 transition-all duration-300">
                      Ask Question
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 py-2.5 px-3 rounded-lg text-xs font-medium hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-300">
                      Join Meetup
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Where travelers like you connect
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Join a community with travelers who know where to go, what to avoid, and maybe how to sneak into that rooftop bar. A place to ask questions, share safety tips, trade local secrets, and even team up with others who share your values — making it easier to just leave.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 3: Book with Confidence */}
        <div className="mb-16 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Guess who's tagging along
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                We don't just get you there, we go with you. Our on-trip assistant helps you find local transport, cheapest routes, uncover hidden spots, and even meet other travelers in your community. Especially useful when you need on-trip advice.
              </p>
            </div>
            <div className="relative">
              {/* Main Chat Interface - Activities Example */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-lg">
                {/* Assistant Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-4 border-b border-gray-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">AI</span>
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
                <div className="p-4 space-y-4 h-[500px] overflow-y-auto">
                  {/* User Question */}
                  <div className="flex justify-start gap-3">
                    <img 
                      src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm text-foreground">What's happening tonight near my hotel?</p>
                    </div>
                  </div>

                  {/* AI Response with Live Events */}
                  <div className="flex justify-end gap-3">
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm mb-3 text-foreground">Here are some great options near your hotel tonight!</p>
                      
                       {/* Events List with Images */}
                       <div className="space-y-2">
                         <div className="bg-white dark:bg-slate-600 rounded-lg p-2">
                           <div className="flex items-center gap-2 mb-1">
                             <img 
                               src="/lovable-uploads/e619ccb5-67bb-4172-a634-8a6911184a7c.png"
                               alt="Rooftop Jazz"
                               className="w-12 h-12 rounded object-cover"
                             />
                             <div>
                               <span className="text-xs font-medium text-foreground">Rooftop Jazz Night</span>
                               <p className="text-xs text-muted-foreground">Sky Bar • 8PM • 5 min walk</p>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-white dark:bg-slate-600 rounded-lg p-2">
                           <div className="flex items-center gap-2 mb-1">
                             <img 
                               src="/lovable-uploads/dea72317-53c3-46c5-9b99-aab06114fde8.png"
                               alt="Night Market"
                               className="w-12 h-12 rounded object-cover"
                             />
                             <div>
                               <span className="text-xs font-medium text-foreground">Night Market</span>
                               <p className="text-xs text-muted-foreground">Chatuchak • Until 2AM • 10 min ride</p>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-white dark:bg-slate-600 rounded-lg p-2">
                           <div className="flex items-center gap-2 mb-1">
                             <img 
                               src="/lovable-uploads/369021b4-c3a0-475c-be3b-9f9a6a9832a9.png"
                               alt="Temple Light Show"
                               className="w-12 h-12 rounded object-cover"
                             />
                             <div>
                               <span className="text-xs font-medium text-foreground">Temple Light Show</span>
                               <p className="text-xs text-muted-foreground">Wat Pho • 9PM • Free entry</p>
                             </div>
                           </div>
                         </div>
                       </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">AI</span>
                    </div>
                  </div>

                  {/* Follow-up User Question */}
                  <div className="flex justify-start gap-3">
                    <img 
                      src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm text-foreground">How do I get to the rooftop cinema?</p>
                    </div>
                  </div>

                  {/* AI Response with Transport Options */}
                  <div className="flex justify-end gap-3">
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm mb-2 text-foreground">Several options to get there!</p>
                      
                      <div className="space-y-2">
                        <div className="bg-white dark:bg-slate-600 rounded-lg p-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-foreground">BTS Skytrain</span>
                            <span className="text-xs text-muted-foreground">₿45 • 12 min</span>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-slate-600 rounded-lg p-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-foreground">Motorbike Taxi</span>
                            <span className="text-xs text-muted-foreground">₿80 • 8 min</span>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-slate-600 rounded-lg p-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-foreground">Grab Car</span>
                            <span className="text-xs text-muted-foreground">₿120 • 15 min</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs mt-2 text-muted-foreground">I recommend the BTS - it's reliable and you'll avoid traffic!</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">AI</span>
                    </div>
                  </div>

                  {/* Another User Question */}
                  <div className="flex justify-start gap-3">
                    <img 
                      src="/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm text-foreground">Any other travelers going to the rooftop cinema tonight?</p>
                    </div>
                  </div>

                  {/* AI Response with Community Match */}
                  <div className="flex justify-end gap-3">
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm mb-2 text-foreground">Yes! Found 3 travelers from your community going tonight:</p>
                      
                      <div className="space-y-1">
                        <div className="bg-white dark:bg-slate-600 rounded-lg p-2 flex items-center gap-2">
                          <img 
                            src="/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png"
                            alt="Sarah"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-foreground">Sarah, 28 • Solo traveler</span>
                        </div>
                        
                        <div className="bg-white dark:bg-slate-600 rounded-lg p-2 flex items-center gap-2">
                          <img 
                            src="/lovable-uploads/89cebcb0-e02d-4029-ad34-dde0c27c4bd9.png"
                            alt="Alex"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-foreground">Alex, 24 • Photography enthusiast</span>
                        </div>
                      </div>
                      
                      <p className="text-xs mt-2 text-muted-foreground">I can send them a message if you'd like to meet up!</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">AI</span>
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
