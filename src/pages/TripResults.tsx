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
    const isBarcelonaFamily = prompt.toLowerCase().includes('barcelona') && prompt.toLowerCase().includes('toddler');
    
    if (isBarcelonaFamily) {
      return {
        prompt,
        introText: "family adventure in barcelona designed for toddlers who love exploration and parents who deserve ease. everything planned, nothing forgotten.",
        subText: "everything's editable. click anything to rework it with a fresh prompt.",
        flight: {
          route: "jfk → barcelona",
          schedule: "friday 8:00pm — sunday return",
          details: "direct · premium economy · delta airlines",
          price: "$680",
          suggestions: []
        },
        hotel: {
          name: "hotel casa bonay",
          rating: 4.7,
          description: "family suites · playground · 10-min to park güell",
          price: "$220/night",
          imageUrl: "/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png",
          suggestions: []
        },
        thingsToDo: [
          {
            title: "park güell morning magic",
            description: "early access tour when toddlers are fresh, plus playground time",
            time: "9:00 am",
            icon: "sunrise"
          },
          {
            title: "barcelona beach & picnic",
            description: "family-friendly barceloneta with toddler play areas and easy food",
            time: "12:00 pm",
            icon: "swim"
          },
          {
            title: "magic fountain show",
            description: "evening water and light show that mesmerizes little ones",
            time: "7:00 pm",
            icon: "sparkles"
          },
          {
            title: "early hotel rest",
            description: "planned downtime for naps and family recharge",
            time: "3:00 pm",
            icon: "rest"
          }
        ],
        hiddenGems: [
          {
            name: "parc de la ciutadella playground",
            description: "massive playground with toddler swings and family picnic spots",
            type: "family park",
            insider_tip: "go tuesday mornings - local moms meet here and kids play together"
          },
          {
            name: "mercat de sant antoni",
            description: "covered market with toddler-friendly finger foods and high chairs",
            type: "market",
            insider_tip: "ask maria at the fruit stand - she gives free samples to kids"
          },
          {
            name: "chocolate factory tour",
            description: "hands-on chocolate making perfect for curious toddler hands",
            type: "activity",
            insider_tip: "book the 10am slot - naptime is built into the schedule afterward"
          }
        ]
      };
    }
    
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
      aurora: <Sparkles className="w-4 h-4 text-purple-500" />,
      sparkles: <Sparkles className="w-4 h-4 text-yellow-500" />
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
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/20" style={{ background: 'hsl(var(--background) / 0.95)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button 
            onClick={handleBackClick}
            className="p-3 hover:bg-primary/10 rounded-xl transition-all duration-300 text-muted-foreground hover:text-primary group touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-200" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                Example Response
              </div>
            </div>
            <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">AI understands you. The community's been there</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">Based on: "{query}"</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-6 sm:px-6 lg:px-8">
        {/* Desktop: Side-by-Side Layout with improved spacing */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - Takes up 3 columns on desktop */}
          <div className="xl:col-span-3 space-y-8">
            {/* Hero Section with enhanced design */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={getDestinationImages(query).hero} 
                alt="Destination" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Floating content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 lg:p-8 shadow-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                        {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') 
                          ? 'Iceland Digital Detox' 
                          : 'Barcelona Family Adventure'}
                      </h1>
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">AI Optimized</span>
                        </div>
                        <span className="text-white/60">•</span>
                        <span className="text-sm">
                          {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') ? '7 days' : '3-4 days'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    {results?.introText}
                  </p>
                </div>
              </div>
            </div>

            {/* Flight & Hotel Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Flight Card */}
              <div className="group relative backdrop-blur-md bg-card/80 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Plane className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Flight</h3>
                  </div>
                  <button 
                    onClick={() => togglePromptBox('flight')}
                    className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xl font-bold text-foreground">{results?.flight?.route}</div>
                    <div className="text-sm text-muted-foreground">{results?.flight?.schedule}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{results?.flight?.details}</div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-2xl font-bold text-primary">{results?.flight?.price}</span>
                    <span className="text-xs text-muted-foreground">per person</span>
                  </div>
                </div>

                {showPromptBox.flight && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-xl border-2 border-dashed border-border">
                    <Textarea
                      placeholder="Adjust flight preferences..."
                      value={prompts.flight || ''}
                      onChange={(e) => updatePrompt('flight', e.target.value)}
                      className="resize-none border-0 bg-transparent focus:ring-0 text-sm"
                      rows={2}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleInlinePromptSubmit('flight')}
                        disabled={panelStates.flight?.isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        {panelStates.flight?.isLoading ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Send className="w-3 h-3" />
                        )}
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Hotel Card */}
              <div className="group relative backdrop-blur-md bg-card/80 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Hotel className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Hotel</h3>
                  </div>
                  <button 
                    onClick={() => togglePromptBox('hotel')}
                    className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xl font-bold text-foreground">{results?.hotel?.name}</div>
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(Math.floor(results?.hotel?.rating || 0))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-sm text-muted-foreground">({results?.hotel?.rating})</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{results?.hotel?.description}</div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-2xl font-bold text-primary">{results?.hotel?.price}</span>
                    <span className="text-xs text-muted-foreground">per night</span>
                  </div>
                </div>

                {showPromptBox.hotel && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-xl border-2 border-dashed border-border">
                    <Textarea
                      placeholder="Adjust hotel preferences..."
                      value={prompts.hotel || ''}
                      onChange={(e) => updatePrompt('hotel', e.target.value)}
                      className="resize-none border-0 bg-transparent focus:ring-0 text-sm"
                      rows={2}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleInlinePromptSubmit('hotel')}
                        disabled={panelStates.hotel?.isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        {panelStates.hotel?.isLoading ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Send className="w-3 h-3" />
                        )}
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Daily Itinerary */}
            <div className="backdrop-blur-md bg-card/60 border border-border/50 rounded-2xl p-6 lg:p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Daily Itinerary</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span>Personalized for you</span>
                </div>
              </div>
              
              <div className="grid gap-4">
                {results?.thingsToDo?.map((activity, index) => (
                  <div key={index} className="group flex gap-4 p-4 hover:bg-muted/50 rounded-xl transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                        {getActivityIcon(activity.icon)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {activity.title}
                        </h4>
                        <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Gems */}
            <div className="backdrop-blur-md bg-card/60 border border-border/50 rounded-2xl p-6 lg:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Hidden Gems</h3>
              </div>
              
              <div className="grid gap-6">
                {results?.hiddenGems?.map((gem, index) => (
                  <div key={index} className="group p-4 border border-border/50 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                          {gem.name}
                        </h4>
                        <span className="inline-block px-2 py-1 bg-secondary/80 text-secondary-foreground text-xs rounded-lg mt-1">
                          {gem.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {gem.description}
                    </p>
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                          <span className="font-semibold">Insider tip:</span> {gem.insider_tip}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Trip Summary Card */}
            <div className="backdrop-blur-md bg-card/80 border border-border/50 rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Trip Summary</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Destination</div>
                  <div className="font-semibold text-lg">
                    {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') 
                      ? 'Reykjavik, Iceland' 
                      : 'Barcelona, Spain'}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Duration</div>
                  <div className="font-semibold">
                    {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') ? '7 days' : '3-4 days'}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Travelers</div>
                  <div className="font-semibold">Family with toddlers</div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-2">Estimated Total</div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {query.toLowerCase().includes('digital detox') && query.toLowerCase().includes('iceland') ? '$2,630' : '$1,200'}
                  </div>
                  <div className="text-xs text-muted-foreground">per person</div>
                </div>

                <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg">
                  Book This Trip
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-md bg-card/60 border border-border/50 rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold text-foreground mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full p-3 text-left hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-3">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Save Trip</span>
                </button>
                <button className="w-full p-3 text-left hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-3">
                  <Send className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Share Trip</span>
                </button>
                <button className="w-full p-3 text-left hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-3">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Customize</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Waitlist Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm rounded-2xl border border-primary/10 p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Coming Soon
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Love what you see?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              This is just a preview of what's possible. Join our waitlist to be the first to experience fully personalized travel planning powered by AI.
            </p>
            <button 
              onClick={() => navigate('/#waitlist')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResults;