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
          icon: "🧘‍♀️"
        },
        {
          title: "Street taco crawl",
          description: "Authentic local tacos from 3 beloved neighborhood spots",
          time: "12:00 PM",
          icon: "🌮"
        },
        {
          title: "Cenote swimming",
          description: "Crystal clear freshwater swimming in ancient limestone caves",
          time: "3:00 PM",
          icon: "🏊‍♂️"
        },
        {
          title: "Naps built in",
          description: "Strategic rest time because you deserve it",
          time: "5:00 PM",
          icon: "💤"
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
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Flight</h3>
                  <p className="text-sm text-muted-foreground">Tap details for full view</p>
                </div>
              </div>
              <button 
                onClick={() => handleComponentClick('flight', results.flight)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Route</p>
                <p className="font-medium text-foreground">{results.flight.route}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Schedule</p>
                <p className="font-medium text-foreground">{results.flight.schedule}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-2xl font-bold text-primary">{results.flight.price}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Textarea
                  value={prompts.flight}
                  onChange={(e) => updatePrompt('flight', e.target.value)}
                  placeholder="Want business class? Red-eye? Different airline? Tell me..."
                  className="resize-none bg-muted/50 border-border/50"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleInlinePromptSubmit('flight');
                    }
                  }}
                />
                <Sparkles className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
              </div>
              <button
                onClick={() => handleInlinePromptSubmit('flight')}
                disabled={!prompts.flight.trim() || submittingPrompts.flight}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submittingPrompts.flight ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Hotel Section */}
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Hotel className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Hotel</h3>
                  <p className="text-sm text-muted-foreground">Tap details for full view</p>
                </div>
              </div>
              <button 
                onClick={() => handleComponentClick('hotel', results.hotel)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hotel</p>
                <p className="font-medium text-foreground">{results.hotel.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{results.hotel.rating}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Details</p>
                <p className="font-medium text-foreground">{results.hotel.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-2xl font-bold text-accent">{results.hotel.price}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Textarea
                  value={prompts.hotel}
                  onChange={(e) => updatePrompt('hotel', e.target.value)}
                  placeholder="More luxury? Spa resort? Beach access? Tell me what you want..."
                  className="resize-none bg-muted/50 border-border/50"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleInlinePromptSubmit('hotel');
                    }
                  }}
                />
                <Sparkles className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
              </div>
              <button
                onClick={() => handleInlinePromptSubmit('hotel')}
                disabled={!prompts.hotel.trim() || submittingPrompts.hotel}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submittingPrompts.hotel ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Itinerary Section */}
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <MapPin className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Itinerary</h3>
                  <p className="text-sm text-muted-foreground">Tap details for full view</p>
                </div>
              </div>
              <button 
                onClick={() => handleComponentClick('itinerary', results.thingsToDo)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {results.thingsToDo.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <p className="text-xs text-primary font-medium mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Textarea
                  value={prompts.itinerary}
                  onChange={(e) => updatePrompt('itinerary', e.target.value)}
                  placeholder="More adventure? Just relaxation? Food tours? Tell me your vibe..."
                  className="resize-none bg-muted/50 border-border/50"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleInlinePromptSubmit('itinerary');
                    }
                  }}
                />
                <Sparkles className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
              </div>
              <button
                onClick={() => handleInlinePromptSubmit('itinerary')}
                disabled={!prompts.itinerary.trim() || submittingPrompts.itinerary}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submittingPrompts.itinerary ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Hidden Gems Section */}
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Hidden Gems</h3>
                  <p className="text-sm text-muted-foreground">Tap details for full view</p>
                </div>
              </div>
              <button 
                onClick={() => handleComponentClick('gems', results.hiddenGems)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-1 gap-4 mb-6">
              {results.hiddenGems.map((gem, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {gem.type}
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground mb-1">{gem.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{gem.description}</p>
                  <div className="bg-accent/10 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-accent">Insider tip:</strong> {gem.insider_tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Textarea
                  value={prompts.gems}
                  onChange={(e) => updatePrompt('gems', e.target.value)}
                  placeholder="Less touristy? More nightlife? Unique dining? Tell me what you're seeking..."
                  className="resize-none bg-muted/50 border-border/50"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleInlinePromptSubmit('gems');
                    }
                  }}
                />
                <Sparkles className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
              </div>
              <button
                onClick={() => handleInlinePromptSubmit('gems')}
                disabled={!prompts.gems.trim() || submittingPrompts.gems}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submittingPrompts.gems ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
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