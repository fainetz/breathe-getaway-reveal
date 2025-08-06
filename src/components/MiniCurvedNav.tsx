import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/destinations', label: 'Destinations', id: 'destinations' },
  { path: '/curated-trips', label: 'Get Trips', id: 'trips' },
  { path: '/chat', label: 'Chat', id: 'chat' },
];

const MiniCurvedNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentPath = location.pathname;

  // Update active index based on current path
  useEffect(() => {
    const index = navItems.findIndex(item => item.path === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [currentPath]);

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

  const getItemOpacity = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.5;
    return 0.25;
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30">
      <div 
        ref={navRef}
        className={`relative flex items-center gap-0.5 bg-background/70 backdrop-blur-lg border border-border/20 rounded-full px-2 py-1.5 shadow-sm cursor-grab select-none ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          touchAction: 'pan-x',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding indicator */}
        <div
          className="absolute top-1.5 bg-primary/80 rounded-full transition-all duration-150 ease-out"
          style={{
            ...indicatorStyle,
            height: 'calc(100% - 12px)',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0.2, 1)',
          }}
        />

        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => handleNavigation(item.path, index)}
              className={`
                relative z-10 px-4 py-2 text-sm font-medium rounded-full
                transition-all duration-150 ease-out select-none touch-manipulation
                ${isActive 
                  ? 'text-primary-foreground' 
                  : 'text-foreground/60 hover:text-foreground/80'
                }
              `}
              style={{
                opacity: getItemOpacity(index),
                transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0.2, 1)',
              }}
            >
              {item.label}
            </button>
          );
        })}
        
        {/* Subtle drag indicator dots */}
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 flex gap-1">
          {navItems.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all duration-200 ${
                index === activeIndex 
                  ? 'bg-primary/60 scale-110' 
                  : 'bg-foreground/20 scale-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniCurvedNav;