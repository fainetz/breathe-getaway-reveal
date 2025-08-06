import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  id: string;
}

interface MiniCurvedNavProps {
  isIntegrated?: boolean;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/destinations', label: 'Destinations', id: 'destinations' },
  { path: '/curated-trips', label: 'Trips', id: 'trips' },
  { path: '/chat', label: 'Chat', id: 'chat' },
  { path: '/faq', label: 'FAQ', id: 'faq' },
];

const MiniCurvedNav = ({ isIntegrated = false }: MiniCurvedNavProps) => {
  const location = useLocation();
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
        <div className="relative flex items-center w-80 h-10 overflow-hidden">
          
          {/* Minimal glass bubble */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full pointer-events-none z-10"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              minWidth: '110px',
              height: '36px',
            }}
          />

          {/* Fixed sliding text with proper alignment */}
          <div 
            className="flex items-center space-x-8 transition-transform duration-700 ease-out relative z-20"
            style={{
              transform: `translateX(${140 - activeIndex * 118}px)`, // Center calculation: bubble position - item offset
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
                  className={`relative px-6 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-700 ease-out select-none min-w-[110px] flex items-center justify-center tracking-wide ${
                    isActive 
                      ? 'text-foreground scale-105' 
                      : distance === 1 
                        ? 'text-foreground/50 hover:text-foreground/70 scale-95 hover:scale-100' 
                        : 'text-foreground/25 scale-90'
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
        
        {/* Navigation dots - show all items, positioned below */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1">
          {navItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(navItems[index].path, index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                index === activeIndex 
                  ? 'bg-primary/80 scale-125' 
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