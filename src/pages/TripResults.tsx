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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Trip Timeline - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <img 
                src={getDestinationImages(query).hero} 
                alt="Destination" 
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-bold text-white mb-2">Tulum Weekend</h2>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI Optimized • 2 days</span>
                </div>
              </div>
            </div>

            {/* Trip Itinerary List */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground mb-6">Your Itinerary</h3>
              
              {/* Flight Item */}
              <div className="bg-card border border-border rounded-xl p-6 group cursor-pointer hover:shadow-md transition-all duration-300"
                   onClick={() => togglePromptBox('flight')}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">Flight to Tulum</h4>
                      <Edit className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground mb-3">{results.flight.route} • {results.flight.schedule}</p>
                    <p className="text-sm text-muted-foreground mb-3">{results.flight.details}</p>
                    <div className="text-lg font-bold text-foreground">{results.flight.price}</div>
                  </div>
                </div>
                {showPromptBox.flight && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Textarea
                      value={prompts.flight || ''}
                      onChange={(e) => updatePrompt('flight', e.target.value)}
                      placeholder="Different time? Upgrade class? Change airline?"
                      className="w-full mb-3"
                      rows={2}
                    />
                    <button
                      onClick={() => handleInlinePromptSubmit('flight')}
                      disabled={panelStates.flight?.isLoading}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {panelStates.flight?.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Update
                    </button>
                  </div>
                )}
              </div>

              {/* Hotel Item */}
              <div className="bg-card border border-border rounded-xl p-6 group cursor-pointer hover:shadow-md transition-all duration-300"
                   onClick={() => togglePromptBox('hotel')}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                    <Hotel className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">Hotel Stay</h4>
                      <Edit className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground mb-2">{results.hotel.name}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-muted-foreground">{results.hotel.rating} rating</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{results.hotel.description}</p>
                    <div className="text-lg font-bold text-foreground">{results.hotel.price}</div>
                  </div>
                </div>
                {showPromptBox.hotel && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Textarea
                      value={prompts.hotel || ''}
                      onChange={(e) => updatePrompt('hotel', e.target.value)}
                      placeholder="More luxury? Different location? Specific amenities?"
                      className="w-full mb-3"
                      rows={2}
                    />
                    <button
                      onClick={() => handleInlinePromptSubmit('hotel')}
                      disabled={panelStates.hotel?.isLoading}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {panelStates.hotel?.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Update
                    </button>
                  </div>
                )}
              </div>

              {/* Activities List */}
              {results.thingsToDo.map((activity, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 group cursor-pointer hover:shadow-md transition-all duration-300"
                     onClick={() => togglePromptBox(`activity-${index}`)}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center text-white">
                      {getActivityIcon(activity.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-foreground">{activity.title}</h4>
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                          {activity.time}
                        </span>
                        <Edit className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Summary Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Trip Overview Card */}
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Trip Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-medium text-foreground">Tulum, Mexico</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">2 Days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-bold text-foreground text-xl">$600</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Trip Type</span>
                  <span className="font-medium text-foreground">Relaxation</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="font-semibold text-foreground mb-3">What's Included</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Round-trip flights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">2 nights accommodation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Curated activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Local insider tips</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Gems */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Hidden Gems</h3>
              </div>
              
              <div className="space-y-4">
                {results.hiddenGems.map((gem, index) => (
                  <div key={index} className="border-b border-border/50 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-foreground mb-1">{gem.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{gem.description}</p>
                    <p className="text-xs text-amber-600 bg-amber-100/80 dark:bg-amber-950/30 rounded px-2 py-1">
                      💡 {gem.insider_tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResults;