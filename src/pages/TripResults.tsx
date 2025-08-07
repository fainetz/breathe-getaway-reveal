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
    const isIcelandTrip = prompt.toLowerCase().includes('digital detox') && prompt.toLowerCase().includes('iceland');
    
    if (isIcelandTrip) {
      return {
        prompt,
        introText: "disconnect to reconnect. seven days in iceland with no screens, just you and the raw beauty of nature.",
        subText: "everything's editable. click anything to rework it with a fresh prompt.",
        flight: {
          route: "jfk → reykjavik",
          schedule: "monday 8:00pm — monday return",
          details: "direct · premium economy · icelandair",
          price: "$890",
          suggestions: []
        },
        hotel: {
          name: "ion adventure hotel",
          rating: 4.9,
          description: "eco-luxury · northern lights · no wifi in rooms",
          price: "$320/night",
          imageUrl: "/lovable-uploads/495f63b6-10b4-4636-9eaa-039faf98b098.png",
          suggestions: []
        },
        thingsToDo: [
          {
            title: "glacier hike at sólheimajökull",
            description: "walk on ancient ice formations with expert guides",
            time: "9:00 am",
            icon: "mountain"
          },
          {
            title: "geysir & gullfoss tour",
            description: "witness earth's power at iceland's famous geysir and waterfall",
            time: "1:00 pm", 
            icon: "water"
          },
          {
            title: "blue lagoon & spa",
            description: "natural geothermal pools with healing silica mud",
            time: "6:00 pm",
            icon: "spa"
          },
          {
            title: "northern lights chase",
            description: "professional guide leads aurora hunting with no phones allowed",
            time: "10:00 pm",
            icon: "aurora"
          }
        ],
        hiddenGems: [
          {
            name: "seljavallalaug pool",
            description: "secret geothermal pool hidden in mountains, locals only",
            type: "hot spring",
            insider_tip: "hike starts behind abandoned farm - look for the worn path"
          },
          {
            name: "kvernufoss waterfall",
            description: "walk behind this hidden waterfall, no crowds ever",
            type: "waterfall",
            insider_tip: "park at skógafoss then walk 15 minutes east - most miss it completely"
          },
          {
            name: "fjörðnir restaurant",
            description: "michelin-level dining in a tiny village, reservations essential",
            type: "restaurant",
            insider_tip: "mention you're doing digital detox - chef gives special off-menu course"
          }
        ]
      };
    }
    
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
      rest: <Heart className="w-4 h-4 text-purple-400" />,
      mountain: <MapPin className="w-4 h-4 text-slate-500" />,
      water: <MapPin className="w-4 h-4 text-blue-500" />,
      spa: <MapPin className="w-4 h-4 text-emerald-500" />,
      aurora: <Sparkles className="w-4 h-4 text-purple-500" />
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Mobile-Optimized Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/20" style={{ background: 'hsl(var(--background) / 0.95)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button 
            onClick={handleBackClick}
            className="p-3 hover:bg-primary/10 rounded-xl transition-all duration-300 text-muted-foreground hover:text-primary group touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-200" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">Your Perfect Escape</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">Based on: "{query}"</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-8">
        {/* Mobile-First Layout */}
        <div className="space-y-6">
          {/* Hero Image - Mobile Optimized */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <img 
              src={getDestinationImages(query).hero} 
              alt="Destination" 
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">
                  {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') 
                    ? 'Iceland Digital Detox' 
                    : 'Tulum Weekend'}
                </h2>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">
                      AI Optimized • {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') ? '7 days' : '2 days'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') ? '$2,630' : '$600'}
                    </div>
                    <div className="text-white/80 text-xs sm:text-sm">total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Summary - Compact Design */}
          <div className="backdrop-blur-md bg-card/60 border border-border/20 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Trip Summary</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                AI Optimized
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') 
                    ? 'Reykjavik, Iceland • 7 days' 
                    : 'Tulum, Mexico • 2 days'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">
                  {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') ? '$2,630' : '$600'}
                </div>
                <div className="text-xs text-muted-foreground">total</div>
              </div>
            </div>
          </div>

          {/* Trip Itinerary - Mobile Optimized */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Your Itinerary</h3>
            </div>
            
            {/* Flight Item - Mobile Optimized */}
            <div className="backdrop-blur-sm bg-card/80 border border-border/50 rounded-xl p-4 sm:p-6 group cursor-pointer hover:shadow-xl hover:bg-card/90 transition-all duration-300 touch-manipulation"
                 onClick={() => togglePromptBox('flight')}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <Plane className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">
                      {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') ? 'Flight to Reykjavik' : 'Flight to Tulum'}
                    </h4>
                    <Edit className="w-4 h-4 text-blue-500 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-1 sm:space-y-2 mb-3">
                    <p className="text-sm sm:text-base text-muted-foreground font-medium">{results.flight.route} • {results.flight.schedule}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{results.flight.details}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg sm:text-xl font-bold text-foreground">{results.flight.price}</div>
                    <div className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-full">
                      Tap to edit
                    </div>
                  </div>
                </div>
              </div>
              {showPromptBox.flight && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Textarea
                    value={prompts.flight || ''}
                    onChange={(e) => updatePrompt('flight', e.target.value)}
                    placeholder="Different time? Upgrade class? Change airline?"
                    className="w-full mb-3 bg-background/50 backdrop-blur-sm text-base"
                    rows={3}
                  />
                  <button
                    onClick={() => handleInlinePromptSubmit('flight')}
                    disabled={panelStates.flight?.isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 font-medium touch-manipulation"
                  >
                    {panelStates.flight?.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Update Flight
                  </button>
                </div>
              )}
            </div>

            {/* Hotel Item - Mobile Optimized */}
            <div className="backdrop-blur-sm bg-card/80 border border-border/50 rounded-xl p-4 sm:p-6 group cursor-pointer hover:shadow-xl hover:bg-card/90 transition-all duration-300 touch-manipulation"
                 onClick={() => togglePromptBox('hotel')}>
              {results.hotel.imageUrl ? (
                // Image-focused layout for Iceland trip
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={results.hotel.imageUrl} 
                      alt={results.hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <Edit className="w-4 h-4 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{results.hotel.name}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm text-white/90">{results.hotel.rating} rating</span>
                          </div>
                          <p className="text-sm text-white/80">{results.hotel.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">{results.hotel.price}</div>
                          <div className="text-xs text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded-full">
                            Tap to edit
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Default panel layout for other trips
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <Hotel className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="text-base sm:text-lg font-semibold text-foreground">Hotel Stay</h4>
                      <Edit className="w-4 h-4 text-emerald-500 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-1 sm:space-y-2 mb-3">
                      <p className="text-sm sm:text-base text-muted-foreground font-medium">{results.hotel.name}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{results.hotel.rating} rating</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{results.hotel.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg sm:text-xl font-bold text-foreground">{results.hotel.price}</div>
                      <div className="text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-full">
                        Tap to edit
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showPromptBox.hotel && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Textarea
                    value={prompts.hotel || ''}
                    onChange={(e) => updatePrompt('hotel', e.target.value)}
                    placeholder="More luxury? Different location? Specific amenities?"
                    className="w-full mb-3 bg-background/50 backdrop-blur-sm text-base"
                    rows={3}
                  />
                  <button
                    onClick={() => handleInlinePromptSubmit('hotel')}
                    disabled={panelStates.hotel?.isLoading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 font-medium touch-manipulation"
                  >
                    {panelStates.hotel?.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Update Hotel
                  </button>
                </div>
              )}
            </div>

            {/* Activities List - Mobile Optimized */}
            {results.thingsToDo.map((activity, index) => (
              <div key={index} className="backdrop-blur-sm bg-card/80 border border-border/50 rounded-xl p-4 sm:p-6 group cursor-pointer hover:shadow-xl hover:bg-card/90 transition-all duration-300 touch-manipulation"
                   onClick={() => togglePromptBox(`activity-${index}`)}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    {getActivityIcon(activity.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="text-base sm:text-lg font-semibold text-foreground">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-1 rounded-full font-medium">
                        {activity.time}
                      </span>
                      <Edit className="w-4 h-4 text-purple-500 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">{activity.description}</p>
                    <div className="text-xs text-purple-600 bg-purple-50 dark:bg-purple-950/30 px-2 py-1 rounded-full w-fit">
                      Tap to customize
                    </div>
                  </div>
                </div>
                {showPromptBox[`activity-${index}`] && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Textarea
                      value={prompts[`activity-${index}`] || ''}
                      onChange={(e) => updatePrompt(`activity-${index}`, e.target.value)}
                      placeholder="Change time? Different activity? More/less active?"
                      className="w-full mb-3 bg-background/50 backdrop-blur-sm text-base"
                      rows={3}
                    />
                    <button
                      onClick={() => handleInlinePromptSubmit(`activity-${index}`)}
                      disabled={panelStates[`activity-${index}`]?.isLoading}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 font-medium touch-manipulation"
                    >
                      {panelStates[`activity-${index}`]?.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Update Activity
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hidden Gems - Mobile Optimized */}
          <div className="backdrop-blur-md bg-card/70 border border-border/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">Hidden Gems</h3>
            </div>
            
            <div className="space-y-6">
              {results.hiddenGems.map((gem, index) => (
                <div key={index} className="border-b border-border/30 last:border-b-0 pb-6 last:pb-0">
                  <h4 className="font-semibold text-foreground mb-2 text-base sm:text-lg">{gem.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{gem.description}</p>
                  <div className="backdrop-blur-sm bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/50 rounded-xl p-3">
                    <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                      💡 {gem.insider_tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Bottom Spacing */}
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
};

export default TripResults;