import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Plane, Hotel, MapPin, Star, Heart, Send, Sparkles, Eye } from 'lucide-react';
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
  const [prompts, setPrompts] = useState<{[key: string]: string}>({});
  const [submittingPrompts, setSubmittingPrompts] = useState<{[key: string]: boolean}>({});
  const [showPromptBox, setShowPromptBox] = useState<{[key: string]: boolean}>({});

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
    if (!prompt?.trim() || submittingPrompts[componentType]) return;
    
    setSubmittingPrompts(prev => ({ ...prev, [componentType]: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Updating ${componentType} with prompt: ${prompt}`);
    
    setPrompts(prev => ({ ...prev, [componentType]: '' }));
    setSubmittingPrompts(prev => ({ ...prev, [componentType]: false }));
    setShowPromptBox(prev => ({ ...prev, [componentType]: false }));
    
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
      {/* Gentle Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/20" style={{ background: 'hsl(var(--background) / 0.85)' }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <button 
            onClick={handleBackClick}
            className="p-2.5 hover:bg-muted/40 rounded-xl transition-all duration-200 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-normal text-foreground lowercase tracking-wide">your escape</h1>
            <p className="text-sm text-muted-foreground font-light">inspired by "{query}"</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Soft Intro */}
        <div className="text-center space-y-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-light text-foreground leading-relaxed lowercase tracking-wide">
            {results.introText}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light text-lg leading-relaxed">
            everything curated for you. change any part with a simple prompt.
          </p>
        </div>

        {/* Vertical Trip List */}
        <div className="space-y-6">
          {/* Trip Header Card */}
          <div 
            className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-gentle)]"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-8 border-b border-border/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.08)' }}>
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground lowercase tracking-wide">tulum retreat</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-muted-foreground font-light">ai curated</span>
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></span>
                      <span className="text-sm text-muted-foreground font-light">2 days</span>
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></span>
                      <span className="text-sm text-primary font-normal">$600 total</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-light hover:bg-primary/90 transition-all duration-300 lowercase shadow-[var(--shadow-soft)]">
                    book this escape
                  </button>
                  <button className="p-3 hover:bg-muted/30 rounded-2xl transition-all duration-300">
                    <Heart className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Section */}
          <div 
            className="group/component rounded-2xl border border-border/20 transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-6 cursor-pointer" onClick={() => togglePromptBox('flight')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-normal text-foreground lowercase">flights</h4>
                    <p className="text-muted-foreground font-light">{results.flight.route}</p>
                    <p className="text-sm text-muted-foreground font-light mt-1">{results.flight.schedule}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-light text-foreground">{results.flight.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover/component:opacity-60 transition-all duration-300" />
                    <span className="text-xs text-muted-foreground font-light opacity-0 group-hover/component:opacity-100 transition-all duration-300">change this</span>
                  </div>
                </div>
              </div>
            </div>
            
            {showPromptBox.flight && (
              <div className="px-6 pb-6 border-t border-border/10 animate-in slide-in-from-top-2 duration-300">
                <div className="pt-4 flex gap-3">
                  <Textarea
                    value={prompts.flight || ''}
                    onChange={(e) => updatePrompt('flight', e.target.value)}
                    placeholder="different time? upgrade class? change airline?"
                    className="resize-none text-sm flex-1 font-light border-border/30 rounded-xl"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleInlinePromptSubmit('flight');
                      }
                    }}
                  />
                  <button
                    onClick={() => handleInlinePromptSubmit('flight')}
                    disabled={!prompts.flight?.trim() || submittingPrompts.flight}
                    className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 shadow-[var(--shadow-soft)]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hotel Section */}
          <div 
            className="group/component rounded-2xl border border-border/20 transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-6 cursor-pointer" onClick={() => togglePromptBox('hotel')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: 'hsl(var(--accent) / 0.1)' }}>
                    <Hotel className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-normal text-foreground lowercase">accommodation</h4>
                    <p className="text-muted-foreground font-light">{results.hotel.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 fill-accent/60 text-accent/60" />
                      <span className="text-sm text-muted-foreground font-light">{results.hotel.rating}</span>
                      <span className="text-sm text-muted-foreground font-light">• {results.hotel.description}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-light text-foreground">{results.hotel.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Edit className="w-4 h-4 text-muted-foreground opacity-0 group-hover/component:opacity-60 transition-all duration-300" />
                    <span className="text-xs text-muted-foreground font-light opacity-0 group-hover/component:opacity-100 transition-all duration-300">change this</span>
                  </div>
                </div>
              </div>
            </div>
            
            {showPromptBox.hotel && (
              <div className="px-6 pb-6 border-t border-border/10 animate-in slide-in-from-top-2 duration-300">
                <div className="pt-4 flex gap-3">
                  <Textarea
                    value={prompts.hotel || ''}
                    onChange={(e) => updatePrompt('hotel', e.target.value)}
                    placeholder="more luxury? beachfront? different vibe?"
                    className="resize-none text-sm flex-1 font-light border-border/30 rounded-xl"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleInlinePromptSubmit('hotel');
                      }
                    }}
                  />
                  <button
                    onClick={() => handleInlinePromptSubmit('hotel')}
                    disabled={!prompts.hotel?.trim() || submittingPrompts.hotel}
                    className="p-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 shadow-[var(--shadow-soft)]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Activities Section */}
          <div 
            className="rounded-2xl border border-border/20 transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-6 border-b border-border/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'hsl(var(--secondary) / 0.1)' }}>
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-normal text-foreground lowercase">experiences</h4>
                  <p className="text-muted-foreground font-light">curated moments for you</p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              {results.thingsToDo.map((activity, index) => (
                <div 
                  key={index}
                  className="group/activity p-4 rounded-xl hover:bg-muted/20 cursor-pointer transition-all duration-300"
                  onClick={() => togglePromptBox(`activity-${index}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ background: 'hsl(var(--secondary) / 0.08)' }}>
                        {getActivityIcon(activity.icon)}
                      </div>
                      <div>
                        <h5 className="font-normal text-foreground lowercase">{activity.title}</h5>
                        <p className="text-sm text-muted-foreground font-light">{activity.description}</p>
                        <p className="text-xs text-muted-foreground font-light mt-1">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Edit className="w-3 h-3 text-muted-foreground opacity-0 group-hover/activity:opacity-60 transition-all duration-300" />
                      <span className="text-xs text-muted-foreground font-light opacity-0 group-hover/activity:opacity-100 transition-all duration-300">edit</span>
                    </div>
                  </div>
                  
                  {showPromptBox[`activity-${index}`] && (
                    <div className="mt-4 pt-4 border-t border-border/10 animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-3">
                        <Textarea
                          value={prompts[`activity-${index}`] || ''}
                          onChange={(e) => updatePrompt(`activity-${index}`, e.target.value)}
                          placeholder="different activity? change time? more active?"
                          className="resize-none text-sm flex-1 font-light border-border/30 rounded-xl"
                          rows={2}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleInlinePromptSubmit(`activity-${index}`);
                            }
                          }}
                        />
                        <button
                          onClick={() => handleInlinePromptSubmit(`activity-${index}`)}
                          disabled={!prompts[`activity-${index}`]?.trim() || submittingPrompts[`activity-${index}`]}
                          className="p-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-all duration-300 disabled:opacity-50 shadow-[var(--shadow-soft)]"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Gems Section */}
          <div 
            className="rounded-2xl border border-border/20 transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="p-6 border-b border-border/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'hsl(var(--accent) / 0.1)' }}>
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-normal text-foreground lowercase">hidden gems</h4>
                  <p className="text-muted-foreground font-light">local secrets just for you</p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              {results.hiddenGems.map((gem, index) => (
                <div 
                  key={index}
                  className="group/gem p-4 rounded-xl hover:bg-muted/20 cursor-pointer transition-all duration-300"
                  onClick={() => togglePromptBox(`gem-${index}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-normal text-foreground lowercase">{gem.name}</h5>
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-lg font-light">{gem.type.toLowerCase()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-light mb-2">{gem.description}</p>
                      <p className="text-xs text-muted-foreground font-light italic">💡 {gem.insider_tip}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Edit className="w-3 h-3 text-muted-foreground opacity-0 group-hover/gem:opacity-60 transition-all duration-300" />
                      <span className="text-xs text-muted-foreground font-light opacity-0 group-hover/gem:opacity-100 transition-all duration-300">edit</span>
                    </div>
                  </div>
                  
                  {showPromptBox[`gem-${index}`] && (
                    <div className="mt-4 pt-4 border-t border-border/10 animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-3">
                        <Textarea
                          value={prompts[`gem-${index}`] || ''}
                          onChange={(e) => updatePrompt(`gem-${index}`, e.target.value)}
                          placeholder="different type of place? more adventurous? food focused?"
                          className="resize-none text-sm flex-1 font-light border-border/30 rounded-xl"
                          rows={2}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleInlinePromptSubmit(`gem-${index}`);
                            }
                          }}
                        />
                        <button
                          onClick={() => handleInlinePromptSubmit(`gem-${index}`)}
                          disabled={!prompts[`gem-${index}`]?.trim() || submittingPrompts[`gem-${index}`]}
                          className="p-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 shadow-[var(--shadow-soft)]"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TripResults;