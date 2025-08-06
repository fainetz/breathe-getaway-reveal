import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

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

const MobileHorizontalNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Don't render on desktop
  if (!isMobile) return null;

  const currentPath = location.pathname;

  // Auto-scroll to active item when path changes
  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.path === currentPath);
    if (activeIndex !== -1 && scrollRef.current) {
      const itemWidth = 120; // Approximate width of each nav item
      const scrollPosition = activeIndex * itemWidth - (scrollRef.current.clientWidth / 2) + (itemWidth / 2);
      scrollRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [currentPath]);

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
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-3 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 select-none
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
              style={{ minWidth: '100px' }}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                {item.emoji && <span className="text-base">{item.emoji}</span>}
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileHorizontalNav;