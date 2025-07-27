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
    <div className={`fixed ${isMobile ? 'bottom-20 px-4' : 'bottom-[max(1.5rem,env(safe-area-inset-bottom))]'} left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out ${
      isMobile && !shouldShowOnMobile ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
    }`}>
      <div 
        className={`${isMobile ? 'w-full max-w-sm' : 'w-80'} ${isExpanded ? 'h-[48px]' : 'h-[40px]'} relative overflow-visible transition-all duration-500 ease-out origin-center ${
          isExpanded ? 'scale-100' : 'scale-90'
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
        <div className={`absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 ${
          isExpanded ? 'rounded-2xl' : 'rounded-full'
        }`}>
        </div>
        
        {/* Contemporary Preview Tag - only shows when expanded */}
        {isExpanded && (
          <div className="absolute -top-2 left-4 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-900/90 to-blue-700/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-white/20">
              Preview
            </div>
          </div>
        )}

        {/* Collapsed state - round search pill */}
        {!isExpanded ? (
          <div className="relative w-full h-full flex items-center justify-center px-6">
            <Search className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2 transition-colors duration-300" />
            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-300">Search</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`relative w-full h-full flex items-center ${isMobile ? 'px-4' : 'px-5'}`}>
            <Search className={`${isMobile ? 'w-4 h-4 mr-2' : 'w-4 h-4 mr-3'} text-gray-400 dark:text-gray-500 flex-shrink-0`} />
            <input
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setIsUserTyping(true); // Mark as typing when user inputs text
              }}
              placeholder="Need escape..."
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm font-medium transition-all duration-300 focus:scale-[1.01]"
              style={{ fontSize: '16px' }}
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
              className={`ml-2 ${isMobile ? 'p-1.5' : 'p-2'} bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0`}
            >
              <ArrowRight className={`${isMobile ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5'}`} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExpandableSearch;
