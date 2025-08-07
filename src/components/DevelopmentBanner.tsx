import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const DevelopmentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/90 to-accent/90 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
            <div className="text-sm text-primary-foreground">
              <span className="font-semibold">We're developing exciting new features!</span>
              <span className="ml-2 opacity-90">Playground around and give us your feedback</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-primary-foreground hover:bg-white/10 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentBanner;