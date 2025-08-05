import { useState } from 'react';
import { Search, Send, Edit, Plus, Plane, Hotel, MapPin, Calendar, Star, ArrowRight } from 'lucide-react';

interface FlightAIGeneratorProps {
  onResultsGenerated?: (results: any) => void;
}

interface GeneratedResults {
  prompt: string;
  introText: string;
  subText: string;
  flight: FlightResult;
  hotel: HotelResult;
  itinerary: ItineraryResult;
}

interface FlightResult {
  route: string;
  schedule: string;
  details: string;
  suggestions: string[];
}

interface HotelResult {
  name: string;
  rating: number;
  description: string;
  suggestions: string[];
}

interface ItineraryResult {
  activities: string[];
  suggestions: string[];
}

const FlightAIGenerator = ({ onResultsGenerated }: FlightAIGeneratorProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeneratedResults | null>(null);

  const generateMockResults = (prompt: string): GeneratedResults => {
    // Mock AI response generation based on prompt analysis
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
        suggestions: [
          "Make it luxury",
          "Find a spa resort",
          "Show cheaper options"
        ]
      },
      itinerary: {
        activities: [
          "🧘‍♀️ Sunrise beach meditation",
          "🌮 Street taco crawl", 
          "💤 Naps built in"
        ],
        suggestions: [
          "Add cenote swimming",
          "Skip activities — I just wanna sleep",
          "Add a night market"
        ]
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedResults = generateMockResults(query);
    setResults(generatedResults);
    setIsLoading(false);
    
    if (onResultsGenerated) {
      onResultsGenerated(generatedResults);
    }
  };

  const handleAdjustment = (cardType: string, suggestion: string) => {
    console.log(`Adjusting ${cardType}: ${suggestion}`);
    // Here you would trigger a new AI generation with the adjustment
  };

  if (results) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Emotionally Tuned Intro */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed">
            {results.introText}
          </h2>
          <p className="text-muted-foreground text-sm">
            {results.subText}
          </p>
        </div>

        {/* Result Cards */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Flight Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-card-foreground">Flight</h3>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium text-foreground">{results.flight.route}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {results.flight.schedule}
                </p>
                <p className="text-sm text-muted-foreground">{results.flight.details}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/30">
                {results.flight.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAdjustment('flight', suggestion)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group/suggestion w-full text-left"
                  >
                    <Edit className="w-3 h-3 opacity-60 group-hover/suggestion:opacity-100" />
                    <span>"{suggestion}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hotel Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Hotel className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-medium text-card-foreground">Hotel</h3>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium text-foreground">{results.hotel.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{results.hotel.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">— {results.hotel.description}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/30">
                {results.hotel.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAdjustment('hotel', suggestion)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors group/suggestion w-full text-left"
                  >
                    <Edit className="w-3 h-3 opacity-60 group-hover/suggestion:opacity-100" />
                    <span>"{suggestion}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Itinerary Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="font-medium text-card-foreground">Itinerary</h3>
              </div>
              
              <div className="space-y-2">
                {results.itinerary.activities.map((activity, index) => (
                  <p key={index} className="text-sm text-foreground">{activity}</p>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-border/30">
                {results.itinerary.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAdjustment('itinerary', suggestion)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group/suggestion w-full text-left"
                  >
                    <Plus className="w-3 h-3 opacity-60 group-hover/suggestion:opacity-100" />
                    <span>"{suggestion}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-8">
          <button className="group bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-2xl font-medium hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 shadow-lg">
            <span className="flex items-center gap-2">
              Looks good? Tap to book, or tell me what to change
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-medium text-foreground">✨ Flight AI Generator</h2>
            <p className="text-sm text-muted-foreground">
              Tell me how you're feeling, and I'll craft the perfect escape
            </p>
          </div>
          
          <div className="relative flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="I'm a burnt out tech worker, need somewhere to go this weekend..."
                className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                style={{ fontSize: '16px' }}
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-4 rounded-xl hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {isLoading && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground animate-pulse">
                Crafting your perfect escape...
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FlightAIGenerator;