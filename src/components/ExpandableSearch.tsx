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
          ? 'bottom-4 left-1/2 -translate-x-1/2' // Centered on mobile when scrolled
          : 'bottom-8 left-1/2 -translate-x-1/2' // Centered when scrolled on desktop
        : isMobile
          ? 'bottom-20 left-1/2 -translate-x-1/2' // Centered on mobile at hero
          : 'bottom-32 left-20 sm:left-24' // Positioned to align with "find" in the sub-heading
    }`}>
        <div 
        className={`transition-all duration-500 ease-out ${
          isMobile 
            ? 'w-80 max-w-[calc(100vw-2rem)]' // Fixed width on mobile with max-width constraint
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
        onClick={(e) => {
          console.log('Container clicked on mobile:', isMobile, 'shouldBeExpanded:', shouldBeExpanded);
          if (isMobile && !shouldBeExpanded) {
            console.log('Expanding search bar');
            setIsExpanded(true);
          }
        }}
        onTouchStart={(e) => {
          console.log('Touch start on container');
          if (isMobile && !shouldBeExpanded) {
            console.log('Touch expanding search bar');
            setIsExpanded(true);
          }
        }}
      >
        {!shouldBeExpanded ? (
          <div className="w-full h-full flex items-center justify-center px-3">
            <Search className="w-4 h-4 text-gray-700 dark:text-white mr-2 transition-colors duration-300" />
            <span className="text-gray-700 dark:text-white text-sm font-medium transition-colors duration-300">Search</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full h-full flex items-center px-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => {
                console.log('Input change:', e.target.value);
                setPrompt(e.target.value);
              }}
              onFocus={() => console.log('Input focused')}
              onBlur={() => console.log('Input blurred')}
              onClick={() => console.log('Input clicked')}
              placeholder={isMobile ? "How do you feel?" : "How are you feeling about travel?"}
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm transition-colors duration-300 text-[16px] pointer-events-auto"
              autoFocus={!isScrolled && !isMobile}
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
