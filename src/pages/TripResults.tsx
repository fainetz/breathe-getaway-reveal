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
    <div className="min-h-screen" style={{ background: 'var(--gradient-soft)' }}>
      {/* Clean Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/50" style={{ background: 'hsl(var(--background) / 0.9)' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button 
            onClick={handleBackClick}
            className="p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-medium text-foreground">Your Trip</h1>
            <p className="text-xs text-muted-foreground">Based on: "{query}"</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Compact Hero Banner */}
        <div 
          className="relative -mx-4 -mt-8 mb-8 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/lovable-uploads/250f747d-157f-480c-9c25-76d931a9ad49.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '35vh',
            minHeight: '280px'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 px-4 max-w-4xl mx-auto animate-fade-in">
              <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <span className="text-white/90 text-sm font-medium">AI Curated Trip</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Your Perfect Escape
              </h1>
              <p className="text-lg text-white/90 font-light max-w-2xl mx-auto">
                {results.introText}
              </p>
            </div>
          </div>
        </div>

        {/* Trip Overview & Total */}
        <div className="mb-6">
          <div 
            className="rounded-2xl border border-border/50 backdrop-blur-sm"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-primary/70">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Tulum Retreat Experience</h2>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        AI Optimized
                      </span>
                      <span>•</span>
                      <span>2 days</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">$600</div>
                  <div className="text-xs text-muted-foreground">estimated total</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Trip Components */}
        <div className="space-y-4">
          {/* Flight Component */}
          <div 
            className="group/component rounded-xl border border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-4 cursor-pointer" onClick={() => togglePromptBox('flight')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    {panelStates.flight?.isLoading ? (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    ) : (
                      <Plane className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">Flights</h3>
                      <span className="text-sm text-muted-foreground font-medium">
                        {panelStates.flight?.data?.route || results.flight.route}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {panelStates.flight?.data?.schedule || results.flight.schedule}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-foreground">
                    {panelStates.flight?.data?.price || results.flight.price}
                  </span>
                  <div className="opacity-0 group-hover/component:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
                      <Edit className="w-4 h-4 text-primary" />
                      <span className="text-sm text-primary font-medium">Edit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {showPromptBox.flight && (
              <div className="px-4 pb-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
                <div className="pt-3 flex gap-2">
                  <Textarea
                    value={prompts.flight || ''}
                    onChange={(e) => updatePrompt('flight', e.target.value)}
                    placeholder="Different time? Upgrade class?"
                    className="resize-none text-sm flex-1 border-border/50 rounded-lg"
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
                    className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {panelStates.flight?.isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hotel - Compact */}
          <div 
            className="group/component rounded-xl border border-border transition-all duration-200 hover:shadow-[var(--shadow-soft)]"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-4 cursor-pointer" onClick={() => togglePromptBox('hotel')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    {panelStates.hotel?.isLoading ? (
                      <Loader2 className="w-4 h-4 text-accent animate-spin" />
                    ) : (
                      <Hotel className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">Hotel</h4>
                      <span className="text-sm text-muted-foreground">
                        {panelStates.hotel?.data?.name || results.hotel.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span className="text-xs text-muted-foreground">
                          {panelStates.hotel?.data?.rating || results.hotel.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {panelStates.hotel?.data?.description || results.hotel.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground">
                    {panelStates.hotel?.data?.price || results.hotel.price}
                  </span>
                  <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover/component:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
            
            {showPromptBox.hotel && (
              <div className="px-4 pb-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
                <div className="pt-3 flex gap-2">
                  <Textarea
                    value={prompts.hotel || ''}
                    onChange={(e) => updatePrompt('hotel', e.target.value)}
                    placeholder="More luxury? Beachfront? Different vibe?"
                    className="resize-none text-sm flex-1 border-border/50 rounded-lg"
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
                    className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
                  >
                    {panelStates.hotel?.isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Activities - Compact List */}
          <div 
            className="rounded-xl border border-border transition-all duration-200 hover:shadow-[var(--shadow-soft)]"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground">Activities</h4>
              </div>
            </div>
            
            <div className="divide-y divide-border/30">
              {results.thingsToDo.map((activity, index) => (
                <div 
                  key={index}
                  className="group/activity p-3 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => togglePromptBox(`activity-${index}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded bg-secondary/10">
                        {getActivityIcon(activity.icon)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-foreground">{activity.title}</h5>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                    <Edit className="w-3 h-3 text-muted-foreground opacity-0 group-hover/activity:opacity-100 transition-opacity" />
                  </div>
                  
                  {showPromptBox[`activity-${index}`] && (
                    <div className="mt-3 pt-3 border-t border-border/30 animate-in slide-in-from-top-2 duration-200" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        <Textarea
                          value={prompts[`activity-${index}`] || ''}
                          onChange={(e) => updatePrompt(`activity-${index}`, e.target.value)}
                          placeholder="Different activity? Change time?"
                          className="resize-none text-sm flex-1 border-border/50 rounded-lg"
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
                          className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
                        >
                          {panelStates[`activity-${index}`]?.isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Individual Hidden Gem Panels */}
          {results.hiddenGems.map((gem, index) => (
            <div 
              key={index}
              className="group/gem rounded-xl border border-border transition-all duration-200 hover:shadow-[var(--shadow-soft)]"
              style={{ background: 'var(--gradient-card)' }}
            >
              <div className="p-4 cursor-pointer" onClick={() => togglePromptBox(`gem-${index}`)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      {panelStates[`gem-${index}`]?.isLoading ? (
                        <Loader2 className="w-4 h-4 text-accent animate-spin" />
                      ) : (
                        <Eye className="w-4 h-4 text-accent" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">
                          {panelStates[`gem-${index}`]?.data?.name || gem.name}
                        </h4>
                        <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded font-medium">
                          {panelStates[`gem-${index}`]?.data?.type || gem.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {panelStates[`gem-${index}`]?.data?.description || gem.description}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        💡 {panelStates[`gem-${index}`]?.data?.insider_tip || gem.insider_tip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium">Hidden Gem</span>
                    <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover/gem:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
              
              {showPromptBox[`gem-${index}`] && (
                <div className="px-4 pb-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
                  <div className="pt-3 flex gap-2">
                    <Textarea
                      value={prompts[`gem-${index}`] || ''}
                      onChange={(e) => updatePrompt(`gem-${index}`, e.target.value)}
                      placeholder="Different type? More adventurous? Food focused?"
                      className="resize-none text-sm flex-1 border-border/50 rounded-lg"
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
                      className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                      {panelStates[`gem-${index}`]?.isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TripResults;