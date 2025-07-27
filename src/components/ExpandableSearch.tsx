import { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';



interface ExpandableSearchProps {
  onSearchSubmit?: (query: string) => void;
}

const ExpandableSearch = ({ onSearchSubmit }: ExpandableSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<any>(null); // Adjust type as needed
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const shouldScroll = scrollY > 70; // Increased threshold for Safari
          setIsScrolled(shouldScroll);
          
          const isAtHeroSection = scrollY <= 150; // More generous hero section
          
          // For mobile, show search bar when scrolled down and not at hero section
          if (isMobile) {
            if (shouldScroll && !isAtHeroSection && !isFocused && !isUserTyping) {
              setIsExpanded(false); // Collapsed when scrolled
            } else if (isAtHeroSection) {
              setIsExpanded(true); // Expanded at hero section
            }
          } else {
            // Desktop behavior - prevent collapse when user is actively typing or focused
            if (shouldScroll && !isHovered && !isAtHeroSection && !isFocused && !isUserTyping) {
              setIsExpanded(false);
            } else if (isAtHeroSection) {
              setIsExpanded(true);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle Safari viewport changes
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHovered, isFocused, isUserTyping, isMobile]);

  // Add typing timeout effect
  useEffect(() => {
    if (isUserTyping) {
      const timeout = setTimeout(() => {
        setIsUserTyping(false);
      }, 2000); // Stop considering as typing after 2 seconds
      
      return () => clearTimeout(timeout);
    }
  }, [isUserTyping]);

  const isAtHeroSection = !isScrolled;
  const shouldBeExpanded = isAtHeroSection || isHovered || isFocused || isUserTyping;
  
  // For mobile, show search bar when scrolled away from hero section or when in hero section
  const shouldShowOnMobile = isMobile ? (isScrolled || isAtHeroSection || isFocused || isUserTyping) : true;

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!prompt.trim()) return;

   // Use the provided onSearchSubmit function instead of trying to fetch from localhost
   if (onSearchSubmit) {
     onSearchSubmit(prompt);
     setPrompt(''); // Clear the input after submission
   }
 };


  return (
    <div className={`fixed ${isMobile ? 'bottom-20' : 'bottom-[max(1.5rem,env(safe-area-inset-bottom))]'} left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out ${
      isMobile ? 'transform-gpu' : ''
    } ${
      isMobile && !shouldShowOnMobile ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
    }`}>
      <div 
        className={`${isMobile ? 'w-80 max-w-[calc(100vw-2rem)]' : 'w-96'} h-[52px] relative overflow-visible transition-all duration-500 ease-out origin-center ${
          isExpanded ? 'scale-100' : isMobile ? 'scale-[0.75]' : 'scale-[0.55]'
        }`}
        onMouseEnter={() => {
          setIsHovered(true);
          setIsExpanded(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isFocused && !isUserTyping) {
            setIsExpanded(false);
          }
        }}
        onClick={() => {
          setIsExpanded(true);
        }}
      >
        {/* Background with blur */}
        <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">
        </div>
        
        {/* Contemporary Preview Tag - only shows when expanded */}
        {isExpanded && (
          <div className="absolute -top-2 left-4 animate-fade-in">
            <div className="bg-gradient-to-r from-violet-500/90 to-fuchsia-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-white/20">
              Preview
            </div>
          </div>
        )}

        {/* Collapsed state */}
        {!isExpanded ? (
          <div className="relative w-full h-full flex items-center justify-center px-4">
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2 transition-colors duration-300" />
            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-300">Search</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`relative w-full h-full flex items-center ${isMobile ? 'px-4' : 'px-6'}`}>
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setIsUserTyping(true); // Mark as typing when user inputs text
              }}
              placeholder="Need escape..."
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base font-medium transition-all duration-300 focus:scale-[1.01]"
              onFocus={(e) => {
                setIsFocused(true);
                e.target.placeholder = "Heartbroken, excited, adventurous...";
                setIsExpanded(true);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                e.target.placeholder = "Need escape...";
                if (!isHovered && !isUserTyping) {
                  setIsExpanded(false);
                }
              }}
            />
            <button
              type="submit"
              className={`${isMobile ? 'ml-2' : 'ml-3'} p-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExpandableSearch;
