import { useState, useRef } from 'react';
import { X, Edit, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';

interface TripComponentDetailsProps {
  type: 'flight' | 'hotel' | 'itinerary' | 'gems';
  data: any;
  isOpen: boolean;
  onClose: () => void;
  onPromptSubmit: (prompt: string, componentType: string) => void;
}

const TripComponentDetails = ({ 
  type, 
  data, 
  isOpen, 
  onClose, 
  onPromptSubmit 
}: TripComponentDetailsProps) => {
  const [promptInput, setPromptInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen || !data) return null;

  const handlePromptSubmit = async () => {
    if (!promptInput.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onPromptSubmit(promptInput, type);
    
    // Navigate to new results with updated query
    const newQuery = `${promptInput} - modify ${type}`;
    navigate(`/trip-results?q=${encodeURIComponent(newQuery)}`);
    
    setIsSubmitting(false);
    setPromptInput('');
    onClose();
  };

  const getSuggestedPrompts = () => {
    switch (type) {
      case 'flight':
        return [
          "Show me business class options",
          "I want to leave Saturday instead",
          "Find me red-eye flights",
          "Change to a different airline"
        ];
      case 'hotel':
        return [
          "Make it more luxurious",
          "Find a spa resort",
          "Show me cheaper options",
          "I want beachfront only"
        ];
      case 'itinerary':
        return [
          "Add more adventure activities",
          "I just want to relax and sleep",
          "Include local food tours",
          "Make it more cultural"
        ];
      case 'gems':
        return [
          "Show me less touristy places",
          "Find unique dining experiences",
          "I want off-the-beaten-path spots",
          "Add nightlife recommendations"
        ];
      default:
        return [];
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'flight':
        return (
          <div className="space-y-6">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Flight Details</h3>
              <div className="space-y-3">
                <p className="text-xl font-medium text-foreground">{data.route}</p>
                <p className="text-muted-foreground">{data.schedule}</p>
                <p className="text-muted-foreground">{data.details}</p>
                <p className="text-3xl font-bold text-primary">{data.price}</p>
              </div>
            </div>
            
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Flight Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Aircraft:</span>
                  <span className="ml-2 text-foreground">Boeing 737-800</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Cabin:</span>
                  <span className="ml-2 text-foreground">Main Cabin</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Baggage:</span>
                  <span className="ml-2 text-foreground">1 Carry-on included</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Seat Selection:</span>
                  <span className="ml-2 text-foreground">Available for fee</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'hotel':
        return (
          <div className="space-y-6">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Hotel Details</h3>
              <div className="space-y-3">
                <p className="text-xl font-medium text-foreground">{data.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(data.rating) ? 'text-yellow-400' : 'text-muted-foreground'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-foreground font-medium">{data.rating}</span>
                </div>
                <p className="text-muted-foreground">{data.description}</p>
                <p className="text-3xl font-bold text-accent">{data.price}</p>
              </div>
            </div>
            
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Amenities</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Free WiFi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Pool Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Breakfast Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Beach Access</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'itinerary':
        return (
          <div className="space-y-6">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Your Itinerary</h3>
              <div className="space-y-4">
                {data.map((activity: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      <p className="text-xs text-primary font-medium mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'gems':
        return (
          <div className="space-y-6">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Hidden Gems</h3>
              <div className="space-y-4">
                {data.map((gem: any, index: number) => (
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
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'flight': return 'Flight Details';
      case 'hotel': return 'Hotel Details';
      case 'itinerary': return 'Itinerary Details';
      case 'gems': return 'Hidden Gems';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-medium text-foreground">{getTitle()}</h1>
            <p className="text-sm text-muted-foreground">Tap to edit or make changes</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-full">
        <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
          {renderContent()}
        </div>
      </ScrollArea>

      {/* Prompt Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Suggested Prompts */}
          <div className="flex flex-wrap gap-2">
            {getSuggestedPrompts().map((prompt, index) => (
              <button
                key={index}
                onClick={() => setPromptInput(prompt)}
                className="text-sm px-3 py-1.5 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={`Tell me how to improve this ${type}...`}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handlePromptSubmit();
                  }
                }}
              />
              <div className="absolute right-2 bottom-2">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            
            <button
              onClick={handlePromptSubmit}
              disabled={!promptInput.trim() || isSubmitting}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripComponentDetails;