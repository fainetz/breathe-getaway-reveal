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
  { path: '/curated-trips', label: 'Trips', id: 'trips' },
  { path: '/chat', label: 'Chat', id: 'chat' },
  { path: '/faq', label: 'FAQ', id: 'faq' },
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

  // Get the 3 visible items centered around the active item
  const getVisibleItems = () => {
    const visibleItems = [];
    const startIndex = Math.max(0, activeIndex - 1);
    const endIndex = Math.min(navItems.length - 1, activeIndex + 1);
    
    // Always show exactly 3 items
    if (activeIndex === 0) {
      // Show first 3 items
      for (let i = 0; i < Math.min(3, navItems.length); i++) {
        visibleItems.push({ ...navItems[i], originalIndex: i });
      }
    } else if (activeIndex === navItems.length - 1) {
      // Show last 3 items
      for (let i = Math.max(0, navItems.length - 3); i < navItems.length; i++) {
        visibleItems.push({ ...navItems[i], originalIndex: i });
      }
    } else {
      // Show 3 items centered around active
      for (let i = startIndex; i <= endIndex; i++) {
        visibleItems.push({ ...navItems[i], originalIndex: i });
      }
    }
    
    return visibleItems;
  };

  const getItemOpacity = (originalIndex: number) => {
    if (originalIndex === activeIndex) return 1;
    return 0.4; // Fade effect for non-active items
  };

  const getItemScale = (originalIndex: number) => {
    if (originalIndex === activeIndex) return 1;
    return 0.85; // Slightly smaller for non-active items
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30">
      <div 
        ref={navRef}
        className={`relative flex items-center gap-1 backdrop-blur-lg rounded-full px-3 py-2 shadow-lg cursor-grab select-none ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px', // Outer curve as requested
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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
        {/* Sliding indicator - only for the active item in visible range */}
        {visibleItems.some(item => item.originalIndex === activeIndex) && (
          <div
            className="absolute bg-primary/20 transition-all duration-200 ease-out"
            style={{
              ...indicatorStyle,
              height: 'calc(100% - 16px)',
              top: '8px',
              borderRadius: '16px', // Inner curve as requested
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0.2, 1)',
            }}
          />
        )}

        {visibleItems.map((item) => {
          const isActive = item.originalIndex === activeIndex;
          return (
            <button
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current[item.originalIndex] = el;
              }}
              onClick={() => handleNavigation(item.path, item.originalIndex)}
              className={`
                relative z-10 px-4 py-2 text-sm font-medium transition-all duration-200 ease-out select-none touch-manipulation
                ${isActive 
                  ? 'text-primary-foreground font-semibold' 
                  : 'text-foreground/70 hover:text-foreground'
                }
              `}
              style={{
                opacity: getItemOpacity(item.originalIndex),
                transform: `scale(${getItemScale(item.originalIndex)})`,
                borderRadius: '16px', // Inner curve for buttons
                transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0.2, 1)',
              }}
            >
              {item.label}
            </button>
          );
        })}
        
        {/* Navigation dots - show all items */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {navItems.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all duration-200 ${
                index === activeIndex 
                  ? 'bg-primary/80 scale-125' 
                  : 'bg-foreground/30 scale-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniCurvedNav;