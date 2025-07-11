import { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';



interface ExpandableSearchProps {
  onSearchSubmit?: (query: string) => void;
}

const ExpandableSearch = ({ onSearchSubmit }: ExpandableSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<any>(null); // Adjust type as needed
  

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
          
          if (shouldScroll && !isHovered && !isAtHeroSection) {
            setIsExpanded(false);
          } else if (isAtHeroSection) {
            setIsExpanded(true);
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
  }, [isHovered]);

  const isAtHeroSection = !isScrolled;
  const shouldBeExpanded = isAtHeroSection || isHovered;

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
    <div className={`fixed z-40 transition-transform duration-500 ease-out ${
      !isScrolled 
        ? isMobile 
          ? 'top-[31vh] left-4 right-4' // Use vh for Safari compatibility
          : 'top-[50%] left-1/2 -translate-x-1/2' // Desktop hero position
        : isMobile 
          ? 'bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2' // Respect safe area
          : 'bottom-8 left-1/2 -translate-x-1/2' // Desktop collapsed position - moved up
    }`}>
      <div 
  className={`${
    isMobile ? 'w-full' : 'w-96'
  } ${
    isMobile ? 'h-[48px]' : 'h-[52px]'
  } relative overflow-hidden transition-all duration-500 ease-out origin-center ${
    shouldBeExpanded ? 'scale-100' : 'scale-[0.75]'
  }`}
        onMouseEnter={() => {
          if (!isMobile && isScrolled) {
            setIsHovered(true);
            setIsExpanded(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile && isScrolled) {
            setIsHovered(false);
            setIsExpanded(false);
          }
        }}
        onClick={() => {
          if (isMobile && isScrolled && !shouldBeExpanded) {
            setIsExpanded(true);
          }
        }}
      >
        {/* Simplified background with blur */}
        <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">
        </div> 

        {/* Collapsed state for desktop when scrolled */}
        {isScrolled && !shouldBeExpanded && !isMobile ? (
          <div className="relative w-full h-full flex items-center justify-center px-4">
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2 transition-colors duration-300" />
            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-300">Search</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative w-full h-full flex items-center px-6">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={!isScrolled ? "Need escape..." : isMobile ? "Escape..." : "Need escape..."}
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base font-medium transition-all duration-300 focus:scale-[1.01]"
              autoFocus={!isScrolled}
              onFocus={(e) => {
                if (!isScrolled) {
                  e.target.placeholder = "Heartbroken, excited, adventurous...";
                }
                if (isMobile) {
                  e.target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center', 
                    inline: 'nearest' 
                  });
                }
              }}
              onBlur={(e) => {
                if (!isScrolled) {
                  e.target.placeholder = "Need escape...";
                }
                if (isMobile) {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }
              }}
            />
            <button
              type="submit"
              className="ml-3 p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0"
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
