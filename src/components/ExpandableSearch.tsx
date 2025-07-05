
import { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const ExpandableSearch = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldScroll = scrollY > 100;
      setIsScrolled(shouldScroll);
      
      // Keep expanded if at top of landing page (hero section)
      const isAtHeroSection = scrollY <= 100;
      
      // Auto-collapse when scrolling if not hovered and not at hero section
      if (shouldScroll && !isHovered && !isAtHeroSection) {
        setIsExpanded(false);
      } else if (isAtHeroSection) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovered]);

  // Determine if should be expanded based on scroll and hover state
  const isAtHeroSection = !isScrolled;
  const shouldBeExpanded = isAtHeroSection || isHovered;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search prompt:', prompt);
    // Handle search logic here
  };

  return (
    <div className={`fixed z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'bottom-8 left-1/2 transform -translate-x-1/2' // Center bottom when scrolled
        : 'bottom-32 left-8' // Under hero content when not scrolled
    }`}>
      <div 
        className={`transition-all duration-500 ease-out ${
          shouldBeExpanded ? 'w-96' : 'w-32'
        } h-12 bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-full hover:bg-white/90 dark:hover:bg-white/15 overflow-hidden transition-colors duration-300`}
        onMouseEnter={() => {
          setIsHovered(true);
          setIsExpanded(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isScrolled) {
            setIsExpanded(false);
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
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How are you feeling about travel?"
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm transition-colors duration-300"
              autoFocus={!isScrolled}
            />
            <button
              type="submit"
              className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
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
