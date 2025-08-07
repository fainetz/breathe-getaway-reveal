import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const DevelopmentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-20 z-40 max-w-xs sm:max-w-sm md:right-24">
      <div className="bg-gradient-to-br from-primary/90 to-accent/90 backdrop-blur-sm rounded-lg border border-primary/20 shadow-lg">
        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground animate-pulse mt-0.5 flex-shrink-0" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-primary-foreground hover:bg-white/10 h-5 w-5 sm:h-6 sm:w-6 p-0 -mt-1 -mr-1"
            >
              <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Button>
          </div>
          <div className="text-[10px] sm:text-xs text-primary-foreground">
            <div className="font-semibold mb-1">Early Development Stage!</div>
            <div className="opacity-90 leading-relaxed">We're building something amazing. Share your feedback!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentBanner;