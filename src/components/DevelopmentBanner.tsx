import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const DevelopmentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-xs">
      <div className="bg-gradient-to-br from-primary/90 to-accent/90 backdrop-blur-sm rounded-lg border border-primary/20 shadow-lg">
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary-foreground animate-pulse mt-0.5 flex-shrink-0" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-primary-foreground hover:bg-white/10 h-6 w-6 p-0 -mt-1 -mr-1"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-xs text-primary-foreground">
            <div className="font-semibold mb-1">We're developing!</div>
            <div className="opacity-90 leading-relaxed">Playground around and give us your feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentBanner;