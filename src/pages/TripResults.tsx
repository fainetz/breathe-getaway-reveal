import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Plane, Hotel, MapPin, Star, Heart, Send, Sparkles, Eye, Loader2 } from 'lucide-react';
import { Textarea } from '../components/ui/textarea';
import { usePanelUpdates } from '../hooks/usePanelUpdates';

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
  const [prompts, setPrompts] = useState<{[key: string]: string}>({});
  const [showPromptBox, setShowPromptBox] = useState<{[key: string]: boolean}>({});
  
  const { panelStates, updatePanel } = usePanelUpdates(results);

  const query = searchParams.get('q') || '';

  // Map queries to specific destination images from CuratedTrips
  const getDestinationImages = (prompt: string) => {
    const promptLower = prompt.toLowerCase();
    
    // Map specific trip queries to their cover images
    if (promptLower.includes('barcelona') && promptLower.includes('toddler')) {
      return {
        hero: '/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png',
        hotel: '/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png'
      };
    }
    if (promptLower.includes('black woman') || promptLower.includes('safe alone')) {
      return {
        hero: '/lovable-uploads/c3e077fc-fb5b-4df6-9b8c-75bcc742e307.png',
        hotel: '/lovable-uploads/c3e077fc-fb5b-4df6-9b8c-75bcc742e307.png'
      };
    }
    if (promptLower.includes('solo') && promptLower.includes('japan') && promptLower.includes('introvert')) {
      return {
        hero: '/lovable-uploads/84e83280-d2ee-48a4-ba76-9feb7362ed10.png',
        hotel: '/lovable-uploads/84e83280-d2ee-48a4-ba76-9feb7362ed10.png'
      };
    }
    if (promptLower.includes('digital detox') && promptLower.includes('iceland')) {
      return {
        hero: '/lovable-uploads/5f342a0e-24bf-4a28-ba1c-e6c7aed09f67.png',
        hotel: '/lovable-uploads/5f342a0e-24bf-4a28-ba1c-e6c7aed09f67.png'
      };
    }
    if (promptLower.includes('wheelchair') && promptLower.includes('barcelona')) {
      return {
        hero: '/lovable-uploads/ad282feb-6c07-42fa-a2c1-b6262dc7d9a9.png',
        hotel: '/lovable-uploads/ad282feb-6c07-42fa-a2c1-b6262dc7d9a9.png'
      };
    }
    if (promptLower.includes('muslim') && promptLower.includes('paris')) {
      return {
        hero: '/lovable-uploads/9f082fcd-2f60-40ba-a703-582f95955704.png',
        hotel: '/lovable-uploads/9f082fcd-2f60-40ba-a703-582f95955704.png'
      };
    }
    if (promptLower.includes('vegan') && promptLower.includes('italy')) {
      return {
        hero: '/lovable-uploads/250f747d-157f-480c-9c25-76d931a9ad49.png',
        hotel: '/lovable-uploads/250f747d-157f-480c-9c25-76d931a9ad49.png'
      };
    }
    if (promptLower.includes('luxury') && promptLower.includes('kids') && promptLower.includes('bali')) {
      return {
        hero: '/lovable-uploads/33c21689-4a63-4d20-b050-b566ede4b771.png',
        hotel: '/lovable-uploads/33c21689-4a63-4d20-b050-b566ede4b771.png'
      };
    }
    if (promptLower.includes('mountains') && promptLower.includes('colorado') && promptLower.includes('off-grid')) {
      return {
        hero: '/lovable-uploads/462239f6-9a27-4b7d-a660-d8474967fd14.png',
        hotel: '/lovable-uploads/462239f6-9a27-4b7d-a660-d8474967fd14.png'
      };
    }
    if (promptLower.includes('croatia') && promptLower.includes('budget')) {
      return {
        hero: '/lovable-uploads/495f63b6-10b4-4636-9eaa-039faf98b098.png',
        hotel: '/lovable-uploads/495f63b6-10b4-4636-9eaa-039faf98b098.png'
      };
    }
    if (promptLower.includes('croatia') && promptLower.includes('baby')) {
      return {
        hero: '/lovable-uploads/5da0882d-c336-4a6c-b816-25ff575ea341.png',
        hotel: '/lovable-uploads/5da0882d-c336-4a6c-b816-25ff575ea341.png'
      };
    }
    if (promptLower.includes('teen') && promptLower.includes('japan') && promptLower.includes('anime')) {
      return {
        hero: '/lovable-uploads/57128f78-ae84-40b4-9e6e-e92dfb583dc4.png',
        hotel: '/lovable-uploads/57128f78-ae84-40b4-9e6e-e92dfb583dc4.png'
      };
    }
    if (promptLower.includes('introvert') && promptLower.includes('vietnam')) {
      return {
        hero: '/lovable-uploads/5f78a1b2-c7a5-4064-891c-f2ab5db2c767.png',
        hotel: '/lovable-uploads/5f78a1b2-c7a5-4064-891c-f2ab5db2c767.png'
      };
    }
    
    // Default fallback images
    return {
      hero: '/lovable-uploads/57128f78-ae84-40b4-9e6e-e92dfb583dc4.png',
      hotel: '/lovable-uploads/ba96e9ac-933d-4c61-90df-ba423b87b04d.png'
    };
  };

  const generateMockResults = (prompt: string): TripResults => {
    const isStressed = prompt.toLowerCase().includes('burnt out') || prompt.toLowerCase().includes('stressed');
    
    return {
      prompt,
      introText: isStressed 
        ? "you said you're burnt out. we got you. here's a soft place to land this weekend — flights, hotels, and a hand-picked plan made just for now."
        : "we hear you. here's something perfect for what you're feeling right now — everything ready to book.",
      subText: "everything's editable. click anything to rework it with a fresh prompt.",
      flight: {
        route: "msp → tulum",
        schedule: "friday 6:00pm — sunday return",
        details: "nonstop · main cabin · united airlines",
        price: "$420",
        suggestions: []
      },
      hotel: {
        name: "the jungle nook, tulum",
        rating: 4.8,
        description: "adults only · poolside breakfast · 5-min to beach",
        price: "$180/night",
        suggestions: []
      },
      thingsToDo: [
        {
          title: "sunrise beach meditation",
          description: "start your day with peaceful meditation as the sun rises over the caribbean",
          time: "6:00 am",
          icon: "sunrise"
        },
        {
          title: "street taco crawl",
          description: "authentic local tacos from 3 beloved neighborhood spots",
          time: "12:00 pm",
          icon: "food"
        },
        {
          title: "cenote swimming",
          description: "crystal clear freshwater swimming in ancient limestone caves",
          time: "3:00 pm",
          icon: "swim"
        },
        {
          title: "naps built in",
          description: "strategic rest time because you deserve it",
          time: "5:00 pm",
          icon: "rest"
        }
      ],
      hiddenGems: [
        {
          name: "la zebra beach club",
          description: "locals-only beach club with perfect sunset views and live music",
          type: "beach club",
          insider_tip: "ask for table 7 - best view and locals know you're in the know"
        },
        {
          name: "antojitos la chiapaneca",
          description: "tiny family taco stand that doesn't appear on any tourist maps",
          type: "food",
          insider_tip: "try the cochinita pibil - they only make 50 portions daily"
        },
        {
          name: "cenote escondido",
          description: "secret cenote known only to dive instructors and guides",
          type: "adventure",
          insider_tip: "bring underwater camera - the light beams at 11am are magical"
        }
      ]
    };
  };

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedResults = generateMockResults(query);
      setResults(generatedResults);
      setIsLoading(false);
    };

    if (query) {
      loadResults();
    }
  }, [query]);

  const handleInlinePromptSubmit = async (componentType: string) => {
    const prompt = prompts[componentType];
    if (!prompt?.trim() || panelStates[componentType]?.isLoading) return;
    
    try {
      await updatePanel(componentType, prompt);
      setPrompts(prev => ({ ...prev, [componentType]: '' }));
      setShowPromptBox(prev => ({ ...prev, [componentType]: false }));
    } catch (error) {
      console.error(`Failed to update ${componentType}:`, error);
    }
  };

  const updatePrompt = (componentType: string, value: string) => {
    setPrompts(prev => ({ ...prev, [componentType]: value }));
  };

  const togglePromptBox = (componentType: string) => {
    setShowPromptBox(prev => ({ ...prev, [componentType]: !prev[componentType] }));
  };

  const getActivityIcon = (iconType: string) => {
    const iconMap = {
      sunrise: <MapPin className="w-4 h-4 text-orange-400" />,
      food: <Star className="w-4 h-4 text-amber-500" />,
      swim: <MapPin className="w-4 h-4 text-blue-400" />,
      rest: <Heart className="w-4 h-4 text-purple-400" />
    };
    return iconMap[iconType as keyof typeof iconMap] || <MapPin className="w-4 h-4 text-muted-foreground" />;
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
            crafting your perfect escape...
          </p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">no results found</p>
          <button 
            onClick={handleBackClick}
            className="text-primary hover:underline"
          >
            go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/10" style={{ background: 'hsl(var(--background) / 0.8)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button 
            onClick={handleBackClick}
            className="p-2 hover:bg-blue-500/10 rounded-xl transition-all duration-300 text-muted-foreground hover:text-blue-600 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-200" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Your Perfect Escape</h1>
            <p className="text-sm text-muted-foreground">Based on: "{query}"</p>
          </div>
        </div>
      </div>

      {/* Hero Section with Destination Image */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getDestinationImages(query).hero} 
            alt="Destination" 
            className="w-full h-full object-contain bg-muted/20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-12 w-full">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl animate-scale-in">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Tulum Weekend</h2>
                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-lg">AI Optimized • 2 days • Handcrafted for you</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white mb-1">$600</div>
                  <div className="text-white/80">total experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Panel Layout */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flight Panel */}
          <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start gap-4 cursor-pointer" onClick={() => togglePromptBox('flight')}>
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <Plane className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground">Flights</h3>
                  <Edit className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="inline-block text-sm text-blue-600 bg-blue-100/80 dark:bg-blue-950/30 rounded-lg px-3 py-1 mb-3">
                  {results.flight.route}
                </span>
                <p className="text-muted-foreground mb-2">{results.flight.schedule}</p>
                <p className="text-sm text-muted-foreground">{results.flight.details}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-foreground">{results.flight.price}</span>
                </div>
              </div>
            </div>
            
            {showPromptBox.flight && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="space-y-3">
                  <Textarea
                    value={prompts.flight || ''}
                    onChange={(e) => updatePrompt('flight', e.target.value)}
                    placeholder="Different time? Upgrade class? Change airline?"
                    className="w-full"
                    rows={2}
                  />
                  <button
                    onClick={() => handleInlinePromptSubmit('flight')}
                    disabled={panelStates.flight?.isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {panelStates.flight?.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Update Flight
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hotel Panel */}
          <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start gap-4 cursor-pointer" onClick={() => togglePromptBox('hotel')}>
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                <Hotel className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground">Hotel</h3>
                  <Edit className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="inline-block text-sm text-emerald-600 bg-emerald-100/80 dark:bg-emerald-950/30 rounded-lg px-3 py-1 mb-3">
                  {results.hotel.name}
                </span>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-muted-foreground">{results.hotel.rating} rating</span>
                </div>
                <p className="text-muted-foreground mb-4">{results.hotel.description}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-foreground">{results.hotel.price}</span>
                </div>
              </div>
            </div>
            
            {showPromptBox.hotel && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="space-y-3">
                  <Textarea
                    value={prompts.hotel || ''}
                    onChange={(e) => updatePrompt('hotel', e.target.value)}
                    placeholder="More luxury? Different location? Specific amenities?"
                    className="w-full"
                    rows={2}
                  />
                  <button
                    onClick={() => handleInlinePromptSubmit('hotel')}
                    disabled={panelStates.hotel?.isLoading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {panelStates.hotel?.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Update Hotel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Activities Panel */}
        <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 mt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Curated Experiences</h3>
              <p className="text-muted-foreground">Hand-picked activities for your trip</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.thingsToDo.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors group"
                onClick={() => togglePromptBox(`activity-${index}`)}
              >
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950/30">
                  {getActivityIcon(activity.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium text-foreground">{activity.title}</h4>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <Edit className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Hidden Gems Panel */}
        <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 mt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Hidden Gems</h3>
              <p className="text-muted-foreground">Local secrets just for you</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.hiddenGems.map((gem, index) => {
              const gemImages = [
                "/lovable-uploads/6afa058e-fb1f-4eb8-8fbc-d2ce3df4e47f.png",
                "/lovable-uploads/73d68dec-aaff-4cb1-9f42-798bc090860f.png", 
                "/lovable-uploads/02c0dc39-74a0-4355-9275-75b1dd128c08.png"
              ];
              
              return (
                <div key={index} className="group cursor-pointer">
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-3">
                    <img 
                      src={gemImages[index]} 
                      alt={gem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{gem.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{gem.description}</p>
                  <p className="text-sm text-amber-600 font-medium bg-amber-100/80 dark:bg-amber-950/30 rounded-lg px-3 py-1">
                    💡 {gem.insider_tip}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResults;