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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={handleBackClick}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-medium text-foreground">Your Perfect Trip</h1>
            <p className="text-sm text-muted-foreground">Based on: "{query}"</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Emotionally Tuned Intro */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground leading-relaxed">
            {results.introText}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {results.subText}
          </p>
        </div>

        {/* Vertical Trip Components */}
        <div className="space-y-8">
          {/* Flight Section */}
          <div className="group bg-gradient-to-br from-card/60 via-card/40 to-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
               onClick={() => togglePromptBox('flight')}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                  <Plane className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">Flight</h3>
                  <p className="text-sm text-muted-foreground">Click to customize</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {e.stopPropagation(); handleComponentClick('flight', results.flight);}}
                  className="p-2 hover:bg-muted/50 rounded-xl transition-colors"
                >
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </button>
                <button 
                  onClick={(e) => {e.stopPropagation(); togglePromptBox('flight');}}
                  className="p-2 hover:bg-primary/10 rounded-xl transition-colors"
                >
                  <Edit className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Route</p>
                <p className="text-lg font-semibold text-foreground">{results.flight.route}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Schedule</p>
                <p className="text-lg font-semibold text-foreground">{results.flight.schedule}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Price</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{results.flight.price}</p>
              </div>
            </div>
            
            {showPromptBox.flight && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-border/30 animate-in slide-in-from-top-2 duration-300">
                <div className="flex-1 relative">
                  <Textarea
                    value={prompts.flight}
                    onChange={(e) => updatePrompt('flight', e.target.value)}
                    placeholder="Want business class? Red-eye? Different airline? Tell me..."
                    className="resize-none bg-muted/30 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleInlinePromptSubmit('flight');
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Sparkles className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
                </div>
                <button
                  onClick={(e) => {e.stopPropagation(); handleInlinePromptSubmit('flight');}}
                  disabled={!prompts.flight.trim() || submittingPrompts.flight}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/80 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {submittingPrompts.flight ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Hotel Section */}
          <div className="group bg-gradient-to-br from-card/60 via-card/40 to-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 cursor-pointer"
               onClick={() => togglePromptBox('hotel')}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                  <Hotel className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">Hotel</h3>
                  <p className="text-sm text-muted-foreground">Click to customize</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {e.stopPropagation(); handleComponentClick('hotel', results.hotel);}}
                  className="p-2 hover:bg-muted/50 rounded-xl transition-colors"
                >
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </button>
                <button 
                  onClick={(e) => {e.stopPropagation(); togglePromptBox('hotel');}}
                  className="p-2 hover:bg-accent/10 rounded-xl transition-colors"
                >
                  <Edit className="w-5 h-5 text-accent" />
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Hotel</p>
                <p className="text-lg font-semibold text-foreground">{results.hotel.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">{results.hotel.rating}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Details</p>
                <p className="text-lg font-semibold text-foreground">{results.hotel.description}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Price</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">{results.hotel.price}</p>
              </div>
            </div>
            
            {showPromptBox.hotel && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-border/30 animate-in slide-in-from-top-2 duration-300">
                <div className="flex-1 relative">
                  <Textarea
                    value={prompts.hotel}
                    onChange={(e) => updatePrompt('hotel', e.target.value)}
                    placeholder="More luxury? Spa resort? Beach access? Tell me what you want..."
                    className="resize-none bg-muted/30 border-border/50 rounded-xl focus:ring-2 focus:ring-accent/20"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleInlinePromptSubmit('hotel');
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Sparkles className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
                </div>
                <button
                  onClick={(e) => {e.stopPropagation(); handleInlinePromptSubmit('hotel');}}
                  disabled={!prompts.hotel.trim() || submittingPrompts.hotel}
                  className="px-6 py-3 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-xl hover:from-accent/90 hover:to-accent/80 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {submittingPrompts.hotel ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Itinerary Section */}
          <div className="group bg-gradient-to-br from-card/60 via-card/40 to-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300 cursor-pointer"
               onClick={() => togglePromptBox('itinerary')}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-secondary-foreground transition-colors">Itinerary</h3>
                  <p className="text-sm text-muted-foreground">Click to customize</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {e.stopPropagation(); handleComponentClick('itinerary', results.thingsToDo);}}
                  className="p-2 hover:bg-muted/50 rounded-xl transition-colors"
                >
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </button>
                <button 
                  onClick={(e) => {e.stopPropagation(); togglePromptBox('itinerary');}}
                  className="p-2 hover:bg-secondary/10 rounded-xl transition-colors"
                >
                  <Edit className="w-5 h-5 text-secondary-foreground" />
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {results.thingsToDo.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-5 bg-gradient-to-r from-muted/40 to-muted/20 rounded-2xl hover:from-muted/50 hover:to-muted/30 transition-all duration-300">
                  <div className="p-2 bg-background/50 rounded-xl">
                    {getActivityIcon(activity.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-lg">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{activity.description}</p>
                    <p className="text-xs text-primary font-medium mt-3 bg-primary/10 px-2 py-1 rounded-full inline-block">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {showPromptBox.itinerary && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-border/30 animate-in slide-in-from-top-2 duration-300">
                <div className="flex-1 relative">
                  <Textarea
                    value={prompts.itinerary}
                    onChange={(e) => updatePrompt('itinerary', e.target.value)}
                    placeholder="More adventure? Just relaxation? Food tours? Tell me your vibe..."
                    className="resize-none bg-muted/30 border-border/50 rounded-xl focus:ring-2 focus:ring-secondary/20"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleInlinePromptSubmit('itinerary');
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Sparkles className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
                </div>
                <button
                  onClick={(e) => {e.stopPropagation(); handleInlinePromptSubmit('itinerary');}}
                  disabled={!prompts.itinerary.trim() || submittingPrompts.itinerary}
                  className="px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground rounded-xl hover:from-secondary/90 hover:to-secondary/80 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {submittingPrompts.itinerary ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Hidden Gems Section */}
          <div className="group bg-gradient-to-br from-card/60 via-card/40 to-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
               onClick={() => togglePromptBox('gems')}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                  <Camera className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">Hidden Gems</h3>
                  <p className="text-sm text-muted-foreground">Click to customize</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {e.stopPropagation(); handleComponentClick('gems', results.hiddenGems);}}
                  className="p-2 hover:bg-muted/50 rounded-xl transition-colors"
                >
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </button>
                <button 
                  onClick={(e) => {e.stopPropagation(); togglePromptBox('gems');}}
                  className="p-2 hover:bg-primary/10 rounded-xl transition-colors"
                >
                  <Edit className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-1 gap-5 mb-6">
              {results.hiddenGems.map((gem, index) => (
                <div key={index} className="p-6 bg-gradient-to-r from-muted/40 to-muted/20 rounded-2xl hover:from-muted/50 hover:to-muted/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full font-semibold tracking-wide">
                      {gem.type}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{gem.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{gem.description}</p>
                  <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-4 border-l-4 border-accent/30">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-accent font-semibold">Insider tip:</strong> {gem.insider_tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {showPromptBox.gems && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-border/30 animate-in slide-in-from-top-2 duration-300">
                <div className="flex-1 relative">
                  <Textarea
                    value={prompts.gems}
                    onChange={(e) => updatePrompt('gems', e.target.value)}
                    placeholder="Less touristy? More nightlife? Unique dining? Tell me what you're seeking..."
                    className="resize-none bg-muted/30 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleInlinePromptSubmit('gems');
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Sparkles className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
                </div>
                <button
                  onClick={(e) => {e.stopPropagation(); handleInlinePromptSubmit('gems');}}
                  disabled={!prompts.gems.trim() || submittingPrompts.gems}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/80 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {submittingPrompts.gems ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Quick adjustments</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-3 rounded-lg hover:bg-muted/50 border border-border/30">
              <Edit className="w-4 h-4" />
              "Make it more luxurious"
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-3 rounded-lg hover:bg-muted/50 border border-border/30">
              <Edit className="w-4 h-4" />
              "Less touristy places"
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-3 rounded-lg hover:bg-muted/50 border border-border/30">
              <Edit className="w-4 h-4" />
              "Add more adventure"
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-3 rounded-lg hover:bg-muted/50 border border-border/30">
              <Edit className="w-4 h-4" />
              "I just want to relax"
            </button>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-8">
          <button className="group bg-gradient-to-r from-primary to-accent text-primary-foreground px-12 py-6 rounded-3xl text-lg font-medium hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 shadow-2xl">
            <span className="flex items-center gap-3">
              Looks good? Tap to book, or tell me what to change
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Component Details Modal */}
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