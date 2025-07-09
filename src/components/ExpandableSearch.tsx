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
    <div className="w-full max-w-md mx-auto">
      <div className={`${
        isMobile ? 'w-full' : 'w-96'
      } ${
        isMobile ? 'h-[48px]' : 'h-[52px]'
      } relative overflow-hidden transition-transform duration-150 ease-out mx-auto`}>
        {/* Simplified background with blur */}
        <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">
        </div>

        {/* Always show expanded form since it's not floating */}
        <form onSubmit={handleSubmit} className="relative w-full h-full flex items-center px-6">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="How are you feeling about travel?"
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base font-medium transition-all duration-300 focus:scale-[1.01]"
            autoFocus={false}
          />
          <button
            type="submit"
            className="ml-3 p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpandableSearch;
