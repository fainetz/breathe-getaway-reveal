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

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* Trip Components */}
        <div className="space-y-8">
          {/* Flight Component */}
          <div className="group/component bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-blue-200/30 dark:border-border/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in">
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 opacity-0 group-hover/component:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-8 cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-300" onClick={() => togglePromptBox('flight')}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover/component:scale-110 group-hover/component:rotate-3 transition-all duration-300">
                      {panelStates.flight?.isLoading ? (
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      ) : (
                        <Plane className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-2xl font-bold text-foreground">Flights</h3>
                        <span className="text-lg text-blue-600 dark:text-blue-400 font-semibold px-3 py-1 bg-blue-100/80 dark:bg-blue-950/30 rounded-lg">
                          {panelStates.flight?.data?.route || results.flight.route}
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground mb-1">
                        {panelStates.flight?.data?.schedule || results.flight.schedule}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {panelStates.flight?.data?.details || results.flight.details}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-foreground">
                      {panelStates.flight?.data?.price || results.flight.price}
                    </span>
                    <Edit className="w-5 h-5 text-blue-500 opacity-0 group-hover/component:opacity-100 transition-all duration-300 group-hover/component:scale-110" />
                  </div>
                </div>
              </div>
              
              {showPromptBox.flight && (
                <div className="px-8 pb-8 border-t border-blue-200/30 dark:border-border/30 bg-blue-50/30 dark:bg-blue-950/10 animate-fade-in">
                  <div className="pt-6 flex gap-4">
                    <Textarea
                      value={prompts.flight || ''}
                      onChange={(e) => updatePrompt('flight', e.target.value)}
                      placeholder="Different time? Upgrade class? More direct route?"
                      className="resize-none text-base flex-1 border-blue-200/50 dark:border-border/50 rounded-xl h-12 bg-white/80 dark:bg-background/80"
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
                      disabled={!prompts.flight?.trim() || panelStates.flight?.isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      {panelStates.flight?.isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      <span className="font-semibold">Update</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hotel Component with Image */}
          <div className="group/component bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-blue-200/30 dark:border-border/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover/component:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex">
                <div className="flex-1 p-8 cursor-pointer hover:bg-emerald-50/30 dark:hover:bg-emerald-950/10 transition-all duration-300" onClick={() => togglePromptBox('hotel')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover/component:scale-110 group-hover/component:rotate-3 transition-all duration-300">
                        {panelStates.hotel?.isLoading ? (
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        ) : (
                          <Hotel className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="text-2xl font-bold text-foreground">Hotel</h4>
                          <span className="text-lg text-emerald-600 dark:text-emerald-400 font-semibold px-3 py-1 bg-emerald-100/80 dark:bg-emerald-950/30 rounded-lg">
                            {panelStates.hotel?.data?.name || results.hotel.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                            <span className="text-lg text-muted-foreground font-semibold">
                              {panelStates.hotel?.data?.rating || results.hotel.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-lg text-muted-foreground">
                          {panelStates.hotel?.data?.description || results.hotel.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-foreground">
                        {panelStates.hotel?.data?.price || results.hotel.price}
                      </span>
                      <Edit className="w-5 h-5 text-emerald-500 opacity-0 group-hover/component:opacity-100 transition-all duration-300 group-hover/component:scale-110" />
                    </div>
                  </div>
                </div>
                
                <div className="w-48 relative overflow-hidden">
                  <img 
                    src={getDestinationImages(query).hotel} 
                    alt="Hotel" 
                    className="w-full h-full object-cover group-hover/component:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20 dark:to-black/20"></div>
                </div>
              </div>
              
              {showPromptBox.hotel && (
                <div className="px-8 pb-8 border-t border-emerald-200/30 dark:border-border/30 bg-emerald-50/30 dark:bg-emerald-950/10 animate-fade-in">
                  <div className="pt-6 flex gap-4">
                    <Textarea
                      value={prompts.hotel || ''}
                      onChange={(e) => updatePrompt('hotel', e.target.value)}
                      placeholder="More luxury? Beachfront? Different vibe?"
                      className="resize-none text-base flex-1 border-emerald-200/50 dark:border-border/50 rounded-xl h-12 bg-white/80 dark:bg-background/80"
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
                      disabled={!prompts.hotel?.trim() || panelStates.hotel?.isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      {panelStates.hotel?.isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      <span className="font-semibold">Update</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activities with Dynamic Images */}
          <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-blue-200/30 dark:border-border/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-8 border-b border-purple-200/30 dark:border-border/30">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">Curated Experiences</h4>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                {results.thingsToDo.map((activity, index) => {
                  const activityImages = [
                    "/lovable-uploads/02c0dc39-74a0-4355-9275-75b1dd128c08.png", // cenote
                    "/lovable-uploads/5f78a1b2-c7a5-4064-891c-f2ab5db2c767.png", // Japanese street
                    "/lovable-uploads/6afa058e-fb1f-4eb8-8fbc-d2ce3df4e47f.png", // tropical pool
                    "/lovable-uploads/f61bb501-3d6d-43ab-a67e-a604877983b8.png"  // luxury lobby
                  ];
                  
                  return (
                    <div 
                      key={index}
                      className="group/activity relative overflow-hidden rounded-xl border border-purple-200/30 dark:border-border/30 hover:border-purple-300/50 dark:hover:border-purple-500/30 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={() => togglePromptBox(`activity-${index}`)}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={activityImages[index]} 
                          alt={activity.title} 
                          className="w-full h-full object-cover group-hover/activity:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover/activity:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute top-4 right-4">
                          <span className="text-sm font-semibold text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 mt-1">
                            {getActivityIcon(activity.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-lg font-bold text-white mb-2">{activity.title}</h5>
                            <p className="text-white/90 text-sm leading-relaxed">{activity.description}</p>
                          </div>
                          <Edit className="w-5 h-5 text-white opacity-0 group-hover/activity:opacity-100 transition-all duration-300 group-hover/activity:scale-110 flex-shrink-0" />
                        </div>
                      </div>
                      
                      {showPromptBox[`activity-${index}`] && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                          <div className="w-full max-w-md space-y-4">
                            <Textarea
                              value={prompts[`activity-${index}`] || ''}
                              onChange={(e) => updatePrompt(`activity-${index}`, e.target.value)}
                              placeholder="Different activity? Time change?"
                              className="resize-none text-base w-full border-white/30 rounded-xl h-12 bg-white/90 dark:bg-background/90 text-foreground"
                              rows={1}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleInlinePromptSubmit(`activity-${index}`);
                                }
                              }}
                            />
                            <button
                              onClick={() => handleInlinePromptSubmit(`activity-${index}`)}
                              disabled={!prompts[`activity-${index}`]?.trim() || panelStates[`activity-${index}`]?.isLoading}
                              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                            >
                              {panelStates[`activity-${index}`]?.isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Send className="w-5 h-5" />
                              )}
                              <span className="font-semibold">Update Experience</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
          </div>

            </div>
          </div>

          {/* Hidden Gems */}
          <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-blue-200/30 dark:border-border/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-8 border-b border-amber-200/30 dark:border-border/30">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground">Hidden Gems</h4>
                    <p className="text-muted-foreground">Insider secrets just for you</p>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-amber-200/20 dark:divide-border/20">
                {results.hiddenGems.map((gem, index) => (
                  <div 
                    key={index}
                    className="group/gem p-8 hover:bg-amber-50/30 dark:hover:bg-amber-950/10 cursor-pointer transition-all duration-300"
                    onClick={() => togglePromptBox(`gem-${index}`)}
                  >
                    <div className="flex items-start gap-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-200/30 dark:border-amber-800/30 mt-1 group-hover/gem:scale-110 group-hover/gem:rotate-3 transition-all duration-300">
                        {panelStates[`gem-${index}`]?.isLoading ? (
                          <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                        ) : (
                          <Eye className="w-6 h-6 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-foreground">
                            {panelStates[`gem-${index}`]?.data?.name || gem.name}
                          </h4>
                          <span className="text-sm px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 text-amber-700 dark:text-amber-300 rounded-full font-semibold border border-amber-200/50 dark:border-amber-800/50">
                            {panelStates[`gem-${index}`]?.data?.type || gem.type}
                          </span>
                        </div>
                        <p className="text-lg text-muted-foreground mb-3 leading-relaxed">
                          {panelStates[`gem-${index}`]?.data?.description || gem.description}
                        </p>
                        <div className="flex items-start gap-3 p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/30 dark:border-amber-800/30">
                          <span className="text-xl">💡</span>
                          <p className="text-amber-800 dark:text-amber-200 italic font-medium">
                            {panelStates[`gem-${index}`]?.data?.insider_tip || gem.insider_tip}
                          </p>
                        </div>
                      </div>
                      <Edit className="w-5 h-5 text-amber-500 opacity-0 group-hover/gem:opacity-100 transition-all duration-300 group-hover/gem:scale-110 flex-shrink-0" />
                    </div>
                
                    {showPromptBox[`gem-${index}`] && (
                      <div className="mt-6 pt-6 border-t border-amber-200/30 dark:border-border/30 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-4">
                          <Textarea
                            value={prompts[`gem-${index}`] || ''}
                            onChange={(e) => updatePrompt(`gem-${index}`, e.target.value)}
                            placeholder="Different type? More adventurous? Food focused?"
                            className="resize-none text-base flex-1 border-amber-200/50 dark:border-border/50 rounded-xl h-12 bg-white/80 dark:bg-background/80"
                            rows={1}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleInlinePromptSubmit(`gem-${index}`);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleInlinePromptSubmit(`gem-${index}`)}
                            disabled={!prompts[`gem-${index}`]?.trim() || panelStates[`gem-${index}`]?.isLoading}
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                          >
                            {panelStates[`gem-${index}`]?.isLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Send className="w-5 h-5" />
                            )}
                            <span className="font-semibold">Update</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
          </div>

        </div>

        {/* Curated Trips Section */}
        <div className="mt-16 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">More Curated Escapes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked destinations that match your vibe. Each one crafted for different moods and moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Desert Luxury */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-white/20 dark:border-border/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/cdf92cc1-d292-4962-a500-ff2c4cea50f8.png" 
                  alt="Desert luxury resort" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1">
                  <span className="text-white font-semibold text-sm">3 days</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Desert Luxury Retreat</h3>
                  <p className="text-muted-foreground">Escape to serene desert landscapes with world-class amenities and breathtaking sunset views.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">4.9</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">$890</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Ocean Sunset Cruise */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-white/20 dark:border-border/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/5f342a0e-24bf-4a28-ba1c-e6c7aed09f67.png" 
                  alt="Ocean sunset cruise" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1">
                  <span className="text-white font-semibold text-sm">4 days</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Sunset Ocean Escape</h3>
                  <p className="text-muted-foreground">Drift across crystal waters while golden hour paints the sky in unforgettable colors.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">$1,240</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Beach Paradise */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-white/20 dark:border-border/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/42abd49b-cc9e-422e-863c-11d618b69cf3.png" 
                  alt="Tropical beach paradise" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1">
                  <span className="text-white font-semibold text-sm">5 days</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Tropical Beach Haven</h3>
                  <p className="text-muted-foreground">Pure paradise with pristine beaches, turquoise waters, and endless summer vibes.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">4.9</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">$1,450</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Beach Resort */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-white/20 dark:border-border/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer" style={{ animationDelay: '0.3s' }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/e9d5ad59-e162-4bd4-9d0a-93d2db78784f.png" 
                  alt="Luxury beach resort" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1">
                  <span className="text-white font-semibold text-sm">6 days</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Luxury Beach Resort</h3>
                  <p className="text-muted-foreground">Indulge in premium beachfront luxury with world-class service and stunning ocean views.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">4.9</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">$2,100</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Sydney Harbor */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-white/20 dark:border-border/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer" style={{ animationDelay: '0.4s' }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/d8d78727-e0ae-4b6a-b395-f4b12aff2ed5.png" 
                  alt="Sydney Opera House at sunset" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1">
                  <span className="text-white font-semibold text-sm">7 days</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Sydney Cultural Experience</h3>
                  <p className="text-muted-foreground">Iconic architecture, harbor views, and vibrant city culture in Australia's crown jewel.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">$1,890</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* European Village */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-white/20 dark:border-border/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer" style={{ animationDelay: '0.5s' }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/lovable-uploads/9100a082-d403-4661-98f6-c96ed8198fdd.png" 
                  alt="European riverside village" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1">
                  <span className="text-white font-semibold text-sm">8 days</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">European Village Romance</h3>
                  <p className="text-muted-foreground">Discover charming riverside villages with cobblestone streets and old-world magic.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">4.9</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">$1,650</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Second Row with Different Layouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Modern Desert Suite */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-white/20 dark:border-border/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer" style={{ animationDelay: '0.6s' }}>
              <div className="flex h-64">
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 text-amber-700 dark:text-amber-300 rounded-full text-sm font-semibold">
                        Premium Suite
                      </span>
                      <span className="text-sm text-muted-foreground">4 days</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Modern Desert Sanctuary</h3>
                    <p className="text-muted-foreground">Ultra-modern architecture meets natural beauty in this glass-walled desert retreat.</p>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">4.9</span>
                      </div>
                      <span className="text-3xl font-bold text-foreground">$2,890</span>
                    </div>
                  </div>
                </div>
                <div className="w-64 relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/f032d5e7-5538-43fe-9e78-ef39fc4af5e6.png" 
                    alt="Modern luxury desert suite" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20 dark:to-black/20"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Hidden Cave Adventure */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-white/20 dark:border-border/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in cursor-pointer" style={{ animationDelay: '0.7s' }}>
              <div className="flex h-64">
                <div className="w-64 relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/5342f8bb-2402-49b1-8309-561a6a22fe69.png" 
                    alt="Hidden cenote cave swimming" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 dark:to-black/20"></div>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-950 dark:to-teal-950 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                        Adventure
                      </span>
                      <span className="text-sm text-muted-foreground">3 days</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Hidden Cenote Explorer</h3>
                    <p className="text-muted-foreground">Swim in secret underground caves with crystal-clear waters and magical light beams.</p>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">4.8</span>
                      </div>
                      <span className="text-3xl font-bold text-foreground">$890</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-12">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-200/30 dark:border-border/30 rounded-2xl px-8 py-6">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <p className="text-lg text-muted-foreground">
                Can't find the perfect match? 
                <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline ml-2" onClick={() => navigate('/chat')}>
                  Let's create something custom for you →
                </button>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripResults;