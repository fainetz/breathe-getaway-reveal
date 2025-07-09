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
          const shouldScroll = scrollY > 100;
          setIsScrolled(shouldScroll);
          
          const isAtHeroSection = scrollY <= 100;
          
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
    <div className={`fixed z-50 transition-transform duration-150 ease-out ${
      !isScrolled 
        ? isMobile 
          ? 'top-[22%] left-4 right-4' // Mobile hero position - much higher to avoid carousel
          : 'top-[35%] left-1/2 -translate-x-1/2' // Desktop hero position - keeping this as it works
        : isMobile 
          ? 'bottom-6 left-4 right-4' // Mobile collapsed position
          : 'bottom-6 left-1/2 -translate-x-1/2' // Desktop collapsed position
    }`}>
      <div 
        className={`${
          isMobile ? 'w-full' : 'w-96'
        } ${
          isMobile ? 'h-[48px]' : 'h-[52px]'
        } relative overflow-hidden transition-transform duration-150 ease-out origin-center ${
          !isScrolled 
            ? 'scale-100' // Hero scale
            : isMobile 
              ? 'scale-100' // Mobile scale
              : shouldBeExpanded ? 'scale-100' : 'scale-[0.65]' // Desktop collapsed scale
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
              placeholder={!isScrolled ? "How are you feeling about travel?" : isMobile ? "How do you feel?" : "How are you feeling about travel?"}
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base font-medium transition-all duration-300 focus:scale-[1.01]"
              autoFocus={!isScrolled}
              onFocus={(e) => {
                if (!isScrolled) {
                  e.target.placeholder = "I'm feeling adventurous...";
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
                  e.target.placeholder = "How are you feeling about travel?";
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
