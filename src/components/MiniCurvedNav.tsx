import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
  path: string;
  label: string;
  id: string;
}

interface MiniCurvedNavProps {
  isIntegrated?: boolean;
}

const navItems: NavItem[] = [
  { path: '/destinations', label: 'Destinations', id: 'destinations' },
  { path: '/', label: 'Home', id: 'home' },
  { path: '/community', label: 'Community', id: 'community' },
  { path: '/curated-trips', label: 'Trips', id: 'trips' },
  { path: '/chat', label: 'Chat', id: 'chat' },
  { path: '/faq', label: 'FAQ', id: 'faq' },
];

const MiniCurvedNav = ({ isIntegrated = false }: MiniCurvedNavProps) => {
  const location = useLocation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentPath = location.pathname;
  const isChatPage = currentPath === '/chat';
  const isHomePage = currentPath === '/';

  // Update active index based on current path
  useEffect(() => {
    const index = navItems.findIndex(item => item.path === currentPath);
    if (index !== -1 && index !== activeIndex) {
      setPreviousIndex(activeIndex);
      setIsTransitioning(true);
      setActiveIndex(index);
      
      // Reset transition state after animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }
  }, [currentPath, activeIndex]);

  // Update sliding indicator position
  useEffect(() => {
    const activeElement = itemRefs.current[activeIndex];
    if (activeElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      
      const left = activeRect.left - navRect.left;
      const width = activeRect.width;
      
      setIndicatorStyle({
        transform: `translateX(${left}px)`,
        width: `${width}px`,
      });
    }
  }, [activeIndex]);

  const handleNavigation = (path: string, index: number) => {
    if (isDragging) return;
    setActiveIndex(index);
    
    // Apple-like magnetic delay
    setTimeout(() => {
      navigate(path);
    }, 40);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dragDistance = e.clientX - dragStartX;
    const threshold = 20;
    
    if (Math.abs(dragDistance) > threshold) {
      const newIndex = dragDistance > 0 
        ? Math.min(activeIndex + 1, navItems.length - 1)
        : Math.max(activeIndex - 1, 0);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        setDragStartX(e.clientX);
        setTimeout(() => {
          navigate(navItems[newIndex].path);
        }, 40);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const dragDistance = e.touches[0].clientX - dragStartX;
    const threshold = 20;
    
    if (Math.abs(dragDistance) > threshold) {
      const newIndex = dragDistance > 0 
        ? Math.min(activeIndex + 1, navItems.length - 1)
        : Math.max(activeIndex - 1, 0);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        setDragStartX(e.touches[0].clientX);
        setTimeout(() => {
          navigate(navItems[newIndex].path);
        }, 40);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Get the previous, current, and next items for display
  const getPreviousItem = () => {
    const prevIndex = (activeIndex - 1 + navItems.length) % navItems.length;
    return navItems[prevIndex];
  };

  const getNextItem = () => {
    const nextIndex = (activeIndex + 1) % navItems.length;
    return navItems[nextIndex];
  };

  const currentItem = navItems[activeIndex];
  const previousItem = getPreviousItem();
  const nextItem = getNextItem();

  // Navigation functions for cycling through items
  const goToPrevious = () => {
    const newIndex = (activeIndex - 1 + navItems.length) % navItems.length;
    setPreviousIndex(activeIndex);
    setIsTransitioning(true);
    setActiveIndex(newIndex);
    
    setTimeout(() => {
      navigate(navItems[newIndex].path);
      setTimeout(() => setIsTransitioning(false), 400);
    }, 40);
  };

  const goToNext = () => {
    const newIndex = (activeIndex + 1) % navItems.length;
    setPreviousIndex(activeIndex);
    setIsTransitioning(true);
    setActiveIndex(newIndex);
    
    setTimeout(() => {
      navigate(navItems[newIndex].path);
      setTimeout(() => setIsTransitioning(false), 400);
    }, 40);
  };

  return (
    <div className={isIntegrated ? "relative" : "fixed top-20 left-1/2 transform -translate-x-1/2 z-30"}>
      <div 
        ref={navRef}
        className={`relative flex items-center justify-center select-none group ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-x' }}
      >
        {/* Compact minimal carousel */}
        <div className="relative flex items-center w-72 h-10 overflow-hidden">
          
          {/* Refined glass bubble - better aligned and visible in dark mode */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full pointer-events-none z-10 border"
            style={{
              background: isChatPage 
                ? 'rgba(255, 255, 255, 0.15)' 
                : theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              borderColor: isChatPage 
                ? 'rgba(255, 255, 255, 0.25)' 
                : theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(0, 0, 0, 0.08)',
              borderRadius: '20px',
              minWidth: '95px',
              width: 'fit-content',
              height: '36px',
              boxShadow: isChatPage 
                ? '0 1px 8px rgba(0, 0, 0, 0.3)' 
                : theme === 'dark'
                  ? '0 1px 8px rgba(0, 0, 0, 0.2)'
                  : '0 1px 8px rgba(0, 0, 0, 0.04)',
            }}
          />

          {/* Properly aligned sliding text */}
          <div 
            className="flex items-center space-x-1 transition-transform duration-700 ease-out relative z-20"
            style={{
              transform: `translateX(${85 - activeIndex * 100}px)`, // Better spacing for full text visibility: 100px per item
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {navItems.map((item, index) => {
              const isActive = index === activeIndex;
              const distance = Math.abs(index - activeIndex);
              
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    if (el && isActive) itemRefs.current[activeIndex] = el;
                  }}
                  onClick={() => handleNavigation(item.path, index)}
                  className={`relative px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-700 ease-out select-none min-w-[95px] flex items-center justify-center tracking-wide ${
                    isActive 
                      ? isHomePage
                        ? 'text-white scale-105'
                        : theme === 'dark' ? 'text-white scale-105' : 'text-black scale-105'
                      : distance === 1 
                        ? isHomePage
                          ? 'text-white/60 hover:text-white/80 scale-95 hover:scale-100'
                          : theme === 'dark' ? 'text-white/60 hover:text-white/80 scale-95 hover:scale-100' : 'text-black/60 hover:text-black/80 scale-95 hover:scale-100'
                        : isHomePage
                          ? 'text-white/30 scale-90'
                          : theme === 'dark' ? 'text-white/30 scale-90' : 'text-black/30 scale-90'
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Navigation dots - show all items, positioned closer */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
          {navItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(navItems[index].path, index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                index === activeIndex 
                  ? isChatPage 
                    ? 'bg-white/90 scale-125' 
                    : 'bg-primary/80 scale-125'
                  : isChatPage
                    ? 'bg-white/40 scale-75 hover:bg-white/60'
                    : 'bg-foreground/30 scale-75 hover:bg-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniCurvedNav;