import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  emoji?: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/destinations', label: 'Destinations', emoji: '🗺️' },
  { path: '/curated-trips', label: 'Curated Trips', emoji: '✈️' },
  { path: '/faq', label: 'FAQ', emoji: '❓' },
  { path: '/chat', label: 'Chat', emoji: '💬' },
];

const PremiumHorizontalNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentPath = location.pathname;

  // Auto-scroll to active item when path changes with luxury timing
  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.path === currentPath);
    if (activeIndex !== -1 && scrollRef.current) {
      const itemWidth = 140; // Approximate width of each nav item
      const scrollPosition = activeIndex * itemWidth - (scrollRef.current.clientWidth / 2) + (itemWidth / 2);
      
      // Luxury delayed scroll with smooth easing
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      }, 150); // AirPods-like magnetic delay
    }
  }, [currentPath]);

  const handleNavigation = (path: string) => {
    setIsTransitioning(true);
    
    // Luxury delay before navigation - like magnetic resistance
    setTimeout(() => {
      navigate(path);
      setTimeout(() => setIsTransitioning(false), 300); // Reset after transition
    }, 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed top-4 md:top-0 left-0 right-0 z-50">
      {/* Premium backdrop with luxury blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/80 backdrop-blur-xl border-b border-gradient-to-r from-border/20 via-border/40 to-border/20"></div>
      
      {/* Centered container with biblical elegance */}
      <div className="relative flex justify-center py-4 px-6">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-3 cursor-grab active:cursor-grabbing max-w-4xl"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {navItems.map((item, index) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                disabled={isTransitioning}
                className={`
                  group relative flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-semibold 
                  transition-all duration-500 ease-out select-none transform 
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary via-primary/90 to-accent text-white shadow-2xl shadow-primary/30 scale-105 translate-y-[-2px]' 
                    : 'bg-gradient-to-r from-card/80 to-card/60 text-white hover:from-card hover:to-card/80 hover:text-white hover:scale-102 border border-border/30 hover:border-border/50'
                  }
                  ${isTransitioning ? 'opacity-75 pointer-events-none' : ''}
                  backdrop-blur-sm
                `}
                style={{ 
                  minWidth: '130px',
                  animationDelay: `${index * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                }}
              >
                {/* Luxury inner glow effect */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-sm animate-pulse"></div>
                )}
                
                <span className="relative flex items-center justify-center gap-2.5 whitespace-nowrap">
                  {item.emoji && (
                    <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                      {item.emoji}
                    </span>
                  )}
                  <span className="font-medium tracking-wide">{item.label}</span>
                </span>
                
                {/* Magnetic hover effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-30' : ''}`}></div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Elegant bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
    </div>
  );
};

export default PremiumHorizontalNav;