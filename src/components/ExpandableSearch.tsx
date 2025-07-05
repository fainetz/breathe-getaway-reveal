
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
      setIsScrolled(scrollY > 100); // Collapse after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if should be expanded based on scroll and hover state
  const shouldBeExpanded = !isScrolled || isHovered;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search prompt:', prompt);
    // Handle search logic here
  };

  return (
    <div className={`fixed z-50 transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'bottom-8 left-1/2 transform -translate-x-1/2' // Center bottom when scrolled
        : 'top-80 left-8' // Under hero text content when not scrolled
    }`}>
      <div 
        className={`transition-all duration-300 ease-in-out ${
          shouldBeExpanded ? 'w-96' : 'w-12'
        } h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full hover:bg-white/15`}
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
          <div className="w-full h-full flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full h-full flex items-center px-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How are you feeling about travel?"
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              autoFocus={!isScrolled}
            />
            <button
              type="submit"
              className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExpandableSearch;
