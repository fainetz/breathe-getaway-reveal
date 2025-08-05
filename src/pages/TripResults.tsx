import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Plus, Plane, Hotel, MapPin, Calendar, Star, ArrowRight, Eye, Heart, Camera } from 'lucide-react';

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

        {/* Main Trip Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Flight Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 space-y-6 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-card-foreground">Flight</h3>
                </div>
                <span className="text-2xl font-bold text-primary">{results.flight.price}</span>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl font-medium text-foreground">{results.flight.route}</p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {results.flight.schedule}
                </p>
                <p className="text-muted-foreground">{results.flight.details}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/30">
                {results.flight.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAdjustment('flight', suggestion)}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group/suggestion w-full text-left p-2 rounded-lg hover:bg-muted/50"
                  >
                    <Edit className="w-4 h-4 opacity-60 group-hover/suggestion:opacity-100" />
                    <span>"{suggestion}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hotel Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 space-y-6 hover:bg-card/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <Hotel className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-medium text-card-foreground">Hotel</h3>
                </div>
                <span className="text-2xl font-bold text-accent">{results.hotel.price}</span>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl font-medium text-foreground">{results.hotel.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{results.hotel.rating}</span>
                  </div>
                  <span className="text-muted-foreground">— {results.hotel.description}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/30">
                {results.hotel.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAdjustment('hotel', suggestion)}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors group/suggestion w-full text-left p-2 rounded-lg hover:bg-muted/50"
                  >
                    <Edit className="w-4 h-4 opacity-60 group-hover/suggestion:opacity-100" />
                    <span>"{suggestion}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Things to Do */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary/10 rounded-xl">
              <MapPin className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-2xl font-medium text-foreground">Your Itinerary</h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {results.thingsToDo.map((activity, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4 hover:bg-card/60 transition-all duration-300">
                  <div className="text-3xl">{activity.icon}</div>
                  <div>
                    <h4 className="font-medium text-foreground">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <p className="text-xs text-primary font-medium mt-2">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-muted/50">
              <Plus className="w-4 h-4" />
              "Add cenote swimming"
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-muted/50">
              <Plus className="w-4 h-4" />
              "Skip activities — I just wanna sleep"
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-muted/50">
              <Plus className="w-4 h-4" />
              "Add a night market"
            </button>
          </div>
        </div>

        {/* Hidden Gems */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-medium text-foreground">Hidden Gems</h3>
            <span className="text-sm text-muted-foreground">Local secrets just for you</span>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {results.hiddenGems.map((gem, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4 hover:bg-card/60 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {gem.type}
                      </span>
                    </div>
                    <Heart className="w-5 h-5 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">{gem.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{gem.description}</p>
                  </div>
                  
                  <div className="pt-3 border-t border-border/30">
                    <div className="flex items-start gap-2">
                      <div className="p-1 bg-accent/10 rounded">
                        <Camera className="w-3 h-3 text-accent" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong>Insider tip:</strong> {gem.insider_tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-12">
          <button className="group bg-gradient-to-r from-primary to-accent text-primary-foreground px-12 py-6 rounded-3xl text-lg font-medium hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 shadow-2xl">
            <span className="flex items-center gap-3">
              Looks good? Tap to book, or tell me what to change
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripResults;