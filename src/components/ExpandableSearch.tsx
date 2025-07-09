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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldScroll = scrollY > 100;
      setIsScrolled(shouldScroll);
      
      const isAtHeroSection = scrollY <= 100;
      
      if (shouldScroll && !isHovered && !isAtHeroSection) {
        setIsExpanded(false);
      } else if (isAtHeroSection) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className={`fixed z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? isMobile 
          ? 'bottom-4 left-4 right-20' // Leave space for feature button on mobile when scrolled
          : 'bottom-8 left-1/2 -translate-x-1/2' // Centered when scrolled on desktop
        : 'opacity-0 pointer-events-none' // Hidden when at hero section since search is integrated
    }`}>
      <div 
        className={`transition-all duration-500 ease-out ${
          isMobile 
            ? 'w-full' // Always full width on mobile
            : shouldBeExpanded ? 'w-96' : 'w-32'
        } h-12 bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-full hover:bg-white/90 dark:hover:bg-white/15 overflow-hidden transition-colors duration-300`}
        onMouseEnter={() => {
          if (!isMobile) {
            setIsHovered(true);
            setIsExpanded(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsHovered(false);
            if (isScrolled) {
              setIsExpanded(false);
            }
          }
        }}
        onClick={() => {
          if (isMobile && !shouldBeExpanded) {
            setIsExpanded(true);
          }
        }}
      >
        {!shouldBeExpanded && !isMobile ? (
          <div className="w-full h-full flex items-center justify-center px-3">
            <Search className="w-4 h-4 text-gray-700 dark:text-white mr-2 transition-colors duration-300" />
            <span className="text-gray-700 dark:text-white text-sm font-medium transition-colors duration-300">Search</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full h-full flex items-center px-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={isMobile ? "How do you feel?" : "How are you feeling about travel?"}
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base md:text-sm transition-all duration-300 focus:scale-105"
              autoFocus={!isScrolled && !isMobile}
              onFocus={(e) => {
                if (isMobile) {
                  // Smooth scroll to center the input
                  e.target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center', 
                    inline: 'nearest' 
                  });
                }
              }}
              onBlur={(e) => {
                if (isMobile) {
                  // Reset any zoom and scroll back to normal position
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }
              }}
            />
            <button
              type="submit"
              className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors touch-manipulation"
            >
              <ArrowRight className="w-4 h-4 text-gray-700 dark:text-white transition-colors duration-300" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExpandableSearch;
