import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Plane, Hotel, MapPin, Calendar, Star, ArrowRight, Eye, Heart, Camera, ChevronRight, Send, Sparkles } from 'lucide-react';
import TripComponentDetails from '../components/TripComponentDetails';
import { Textarea } from '../components/ui/textarea';

interface TripResults {
  prompt: string;
  introText: string;
  subText: string;
  flight: FlightResult;
  hotel: HotelResult;
  thingsToDo: ActivityResult[];
  hiddenGems: HiddenGemResult[];
}

interface FlightResult {
  route: string;
  schedule: string;
  details: string;
  price: string;
  suggestions: string[];
}

interface HotelResult {
  name: string;
  rating: number;
  description: string;
  price: string;
  imageUrl?: string;
  suggestions: string[];
}

interface ActivityResult {
  title: string;
  description: string;
  time: string;
  icon: string;
}

interface HiddenGemResult {
  name: string;
  description: string;
  type: string;
  insider_tip: string;
}

const TripResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<TripResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<{type: 'flight' | 'hotel' | 'itinerary' | 'gems', data: any} | null>(null);
  const [prompts, setPrompts] = useState<{[key: string]: string}>({
    flight: '',
    hotel: '',
    itinerary: '',
    gems: ''
  });
  const [submittingPrompts, setSubmittingPrompts] = useState<{[key: string]: boolean}>({});
  const [showPromptBox, setShowPromptBox] = useState<{[key: string]: boolean}>({
    flight: false,
    hotel: false,
    itinerary: false,
    gems: false
  });

  const query = searchParams.get('q') || '';

  const generateMockResults = (prompt: string): TripResults => {
    const isStressed = prompt.toLowerCase().includes('burnt out') || prompt.toLowerCase().includes('stressed');
    const isWeekend = prompt.toLowerCase().includes('weekend');
    
    return {
      prompt,
      introText: isStressed 
        ? "You said you're burnt out. We got you. Here's a soft place to land this weekend — flights, hotels, and a hand-picked plan made just for now."
        : "We hear you. Here's something perfect for what you're feeling right now — everything ready to book.",
      subText: "Everything's editable. Click anything to rework it with a fresh prompt. Want to leave later? Want fewer people? Just say it.",
      flight: {
        route: "MSP → Tulum",
        schedule: isWeekend ? "Friday 6:00PM — Sunday return" : "Tomorrow 8:00AM — Return flexible",
        details: "Nonstop · Main Cabin · United Airlines",
        price: "$420",
        suggestions: [
          "Want to leave Saturday instead?",
          "Show red-eye options", 
          "Change to business class"
        ]
      },
      hotel: {
        name: "The Jungle Nook, Tulum",
        rating: 4.8,
        description: "Adults Only · Poolside Breakfast · 5-min to beach",
        price: "$180/night",
        suggestions: [
          "Make it luxury",
          "Find a spa resort",
          "Show cheaper options"
        ]
      },
      thingsToDo: [
        {
          title: "Sunrise beach meditation",
          description: "Start your day with peaceful meditation as the sun rises over the Caribbean",
          time: "6:00 AM",
          icon: "sunrise"
        },
        {
          title: "Street taco crawl",
          description: "Authentic local tacos from 3 beloved neighborhood spots",
          time: "12:00 PM",
          icon: "food"
        },
        {
          title: "Cenote swimming",
          description: "Crystal clear freshwater swimming in ancient limestone caves",
          time: "3:00 PM",
          icon: "swim"
        },
        {
          title: "Naps built in",
          description: "Strategic rest time because you deserve it",
          time: "5:00 PM",
          icon: "rest"
        }
      ],
      hiddenGems: [
        {
          name: "La Zebra Beach Club",
          description: "Locals-only beach club with perfect sunset views and live music",
          type: "Beach Club",
          insider_tip: "Ask for table 7 - best view and locals know you're in the know"
        },
        {
          name: "Antojitos La Chiapaneca",
          description: "Tiny family taco stand that doesn't appear on any tourist maps",
          type: "Food",
          insider_tip: "Try the cochinita pibil - they only make 50 portions daily"
        },
        {
          name: "Cenote Escondido",
          description: "Secret cenote known only to dive instructors and guides",
          type: "Adventure",
          insider_tip: "Bring underwater camera - the light beams at 11am are magical"
        }
      ]
    };
  };

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedResults = generateMockResults(query);
      setResults(generatedResults);
      setIsLoading(false);
    };

    if (query) {
      loadResults();
    }
  }, [query]);

  const handleAdjustment = (cardType: string, suggestion: string) => {
    console.log(`Adjusting ${cardType}: ${suggestion}`);
    // Here you would trigger a new AI generation with the adjustment
  };

  const handleComponentClick = (type: 'flight' | 'hotel' | 'itinerary' | 'gems', data: any) => {
    setSelectedComponent({ type, data });
  };

  const handlePromptSubmit = (prompt: string, componentType: string) => {
    console.log(`Updating ${componentType} with prompt: ${prompt}`);
    // This would trigger a new AI generation with the prompt
    setSelectedComponent(null);
  };

  const handleInlinePromptSubmit = async (componentType: string) => {
    const prompt = prompts[componentType];
    if (!prompt.trim() || submittingPrompts[componentType]) return;
    
    setSubmittingPrompts(prev => ({ ...prev, [componentType]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Updating ${componentType} with prompt: ${prompt}`);
    
    // Clear prompt and update state
    setPrompts(prev => ({ ...prev, [componentType]: '' }));
    setSubmittingPrompts(prev => ({ ...prev, [componentType]: false }));
    
    // Navigate with updated query
    const newQuery = `${prompt} - modify ${componentType}`;
    navigate(`/trip-results?q=${encodeURIComponent(newQuery)}`);
  };

  const updatePrompt = (componentType: string, value: string) => {
    setPrompts(prev => ({ ...prev, [componentType]: value }));
  };

  const togglePromptBox = (componentType: string) => {
    setShowPromptBox(prev => ({ ...prev, [componentType]: !prev[componentType] }));
  };

  const getActivityIcon = (iconType: string) => {
    const iconMap = {
      sunrise: <Calendar className="w-5 h-5 text-orange-400" />,
      food: <Star className="w-5 h-5 text-amber-500" />,
      swim: <MapPin className="w-5 h-5 text-blue-400" />,
      rest: <Heart className="w-5 h-5 text-purple-400" />
    };
    return iconMap[iconType as keyof typeof iconMap] || <MapPin className="w-5 h-5 text-muted-foreground" />;
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground animate-pulse">
            Crafting your perfect escape...
          </p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No results found</p>
          <button 
            onClick={handleBackClick}
            className="text-primary hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-soft)' }}>
      {/* Gentle Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/20" style={{ background: 'hsl(var(--background) / 0.85)' }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <button 
            onClick={handleBackClick}
            className="p-2.5 hover:bg-muted/40 rounded-xl transition-all duration-200 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-normal text-foreground lowercase tracking-wide">your escape</h1>
            <p className="text-sm text-muted-foreground font-light">inspired by "{query}"</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Soft Intro */}
        <div className="text-center space-y-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-light text-foreground leading-relaxed lowercase tracking-wide">
            {results.introText.toLowerCase()}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light text-lg leading-relaxed">
            everything curated for you. change any part with a simple prompt.
          </p>
        </div>

        {/* Trip Cards - Modular & Soft */}
        <div className="space-y-8">
          {/* Main Trip Card */}
          <div 
            className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-gentle)]"
            style={{ background: 'var(--gradient-card)' }}
          >
            {/* Soft Trip Header */}
            <div className="p-8 border-b border-border/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.08)' }}>
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground lowercase tracking-wide">tulum retreat</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-muted-foreground font-light">ai curated</span>
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></span>
                      <span className="text-sm text-muted-foreground font-light">2 days</span>
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></span>
                      <span className="text-sm text-primary font-normal">$600 total</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-light hover:bg-primary/90 transition-all duration-300 lowercase shadow-[var(--shadow-soft)]">
                    book this escape
                  </button>
                  <button className="p-3 hover:bg-muted/30 rounded-2xl transition-all duration-300">
                    <Heart className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modular Component Cards */}
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Flight Card */}
                <div 
                  className="group/component p-6 rounded-2xl border border-border/20 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
                  style={{ background: 'var(--gradient-card)' }}
                  onClick={() => togglePromptBox('flight')}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                      <Plane className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-normal text-foreground lowercase">flights</h4>
                      <p className="text-sm text-muted-foreground font-light">msp → tulum</p>
                    </div>
                    <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover/component:opacity-60 transition-all duration-300" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-light text-foreground">{results.flight.price}</p>
                    <p className="text-sm text-muted-foreground font-light">friday 6pm return</p>
                  </div>
                  
                  {showPromptBox.flight && (
                    <div className="mt-6 pt-4 border-t border-border/20 animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-3">
                        <Textarea
                          value={prompts.flight}
                          onChange={(e) => updatePrompt('flight', e.target.value)}
                          placeholder="different time? upgrade class?"
                          className="resize-none text-sm flex-1 font-light border-border/30 rounded-xl"
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleInlinePromptSubmit('flight');
                            }
                          }}
                        />
                        <button
                          onClick={() => handleInlinePromptSubmit('flight')}
                          disabled={!prompts.flight.trim() || submittingPrompts.flight}
                          className="p-3 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 shadow-[var(--shadow-soft)]"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {!showPromptBox.flight && (
                    <div className="mt-4 pt-4 border-t border-border/10">
                      <button className="w-full text-xs text-muted-foreground font-light lowercase opacity-0 group-hover/component:opacity-100 transition-all duration-300">
                        ✏️ change this
                      </button>
                    </div>
                  )}
                </div>

                {/* Hotel Card */}
                <div 
                  className="group/component p-6 rounded-2xl border border-border/20 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
                  style={{ background: 'var(--gradient-card)' }}
                  onClick={() => togglePromptBox('hotel')}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl" style={{ background: 'hsl(var(--accent) / 0.1)' }}>
                      <Hotel className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-normal text-foreground lowercase">accommodation</h4>
                      <p className="text-sm text-muted-foreground font-light">the jungle nook</p>
                    </div>
                    <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover/component:opacity-60 transition-all duration-300" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-light text-foreground">{results.hotel.price}</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-accent/60 text-accent/60" />
                      <span className="text-sm text-muted-foreground font-light">{results.hotel.rating}</span>
                    </div>
                  </div>

                  {showPromptBox.hotel && (
                    <div className="mt-6 pt-4 border-t border-border/20 animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-3">
                        <Textarea
                          value={prompts.hotel}
                          onChange={(e) => updatePrompt('hotel', e.target.value)}
                          placeholder="more luxury? beachfront?"
                          className="resize-none text-sm flex-1 font-light border-border/30 rounded-xl"
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleInlinePromptSubmit('hotel');
                            }
                          }}
                        />
                        <button
                          onClick={() => handleInlinePromptSubmit('hotel')}
                          disabled={!prompts.hotel.trim() || submittingPrompts.hotel}
                          className="p-3 bg-accent text-accent-foreground rounded-xl text-sm hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 shadow-[var(--shadow-soft)]"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {!showPromptBox.hotel && (
                    <div className="mt-4 pt-4 border-t border-border/10">
                      <button className="w-full text-xs text-muted-foreground font-light lowercase opacity-0 group-hover/component:opacity-100 transition-all duration-300">
                        ✏️ change this
                      </button>
                    </div>
                  )}
                </div>

                {/* Itinerary Card */}
                <div 
                  className="group/component p-6 rounded-2xl border border-border/20 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
                  style={{ background: 'var(--gradient-card)' }}
                  onClick={() => togglePromptBox('itinerary')}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl" style={{ background: 'hsl(var(--secondary) / 0.1)' }}>
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-normal text-foreground lowercase">experiences</h4>
                      <p className="text-sm text-muted-foreground font-light">4 curated moments</p>
                    </div>
                     <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover/component:opacity-60 transition-all duration-300" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-light text-foreground">mixed pace</p>
                    <p className="text-sm text-muted-foreground font-light">rest included</p>
                  </div>

                  {showPromptBox.itinerary && (
                    <div className="mt-6 pt-4 border-t border-border/20 animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-3">
                        <Textarea
                          value={prompts.itinerary}
                          onChange={(e) => updatePrompt('itinerary', e.target.value)}
                          placeholder="more adventure? just relaxation?"
                          className="resize-none text-sm flex-1 font-light border-border/30 rounded-xl"
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleInlinePromptSubmit('itinerary');
                            }
                          }}
                        />
                        <button
                          onClick={() => handleInlinePromptSubmit('itinerary')}
                          disabled={!prompts.itinerary.trim() || submittingPrompts.itinerary}
                          className="p-3 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/90 transition-all duration-300 disabled:opacity-50 shadow-[var(--shadow-soft)]"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {!showPromptBox.itinerary && (
                    <div className="mt-4 pt-4 border-t border-border/10">
                      <button className="w-full text-xs text-muted-foreground font-light lowercase opacity-0 group-hover/component:opacity-100 transition-all duration-300">
                        ✏️ change this
                      </button>
                    </div>
                  )}
                </div>

                {/* Hidden Gems Component */}
                <div 
                  className="group/component p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                  onClick={() => togglePromptBox('gems')}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Camera className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">Hidden Gems</h4>
                      <p className="text-xs text-muted-foreground">3 secret spots</p>
                    </div>
                    <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover/component:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Local approved</p>
                    <p className="text-xs text-muted-foreground">Zero tourists</p>
                  </div>

                  {showPromptBox.gems && (
                    <div className="mt-4 pt-4 border-t border-border/30 animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        <Textarea
                          value={prompts.gems}
                          onChange={(e) => updatePrompt('gems', e.target.value)}
                          placeholder="More nightlife? Food focused?"
                          className="resize-none text-xs flex-1"
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleInlinePromptSubmit('gems');
                            }
                          }}
                        />
                        <button
                          onClick={() => handleInlinePromptSubmit('gems')}
                          disabled={!prompts.gems.trim() || submittingPrompts.gems}
                          className="p-2 bg-primary text-primary-foreground rounded-md text-xs hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Community Trip Examples */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Community Trip 1 */}
            <div className="group bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Digital Nomad Lisbon</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">by @nomadmike</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        <span className="text-xs text-muted-foreground">7 days</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        <span className="text-xs font-medium text-accent">$450</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-xs font-medium hover:bg-accent/90 transition-colors">
                      Book
                    </button>
                    <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <Plane className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">$200</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <Hotel className="w-4 h-4 text-accent mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">$35/nt</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <MapPin className="w-4 h-4 text-secondary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">6 spots</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <Star className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">4.9★</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Trip 2 */}
            <div className="group bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Tokyo Food Adventure</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">by @foodieguru</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        <span className="text-xs text-muted-foreground">5 days</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        <span className="text-xs font-medium text-secondary">$800</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/90 transition-colors">
                      Book
                    </button>
                    <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <Plane className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">$500</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <Hotel className="w-4 h-4 text-accent mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">$60/nt</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <MapPin className="w-4 h-4 text-secondary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">12 eats</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <Star className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">5.0★</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-muted hover:bg-muted/80 rounded-xl text-muted-foreground transition-colors">
              Show 8 more trips
            </button>
          </div>
        </div>
      </div>

      {/* Trip Component Details Modal */}
      {selectedComponent && (
        <TripComponentDetails
          type={selectedComponent.type}
          data={selectedComponent.data}
          isOpen={!!selectedComponent}
          onClose={() => setSelectedComponent(null)}
          onPromptSubmit={handlePromptSubmit}
        />
      )}
    </div>
  );
};

export default TripResults;