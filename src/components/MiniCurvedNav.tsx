import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Made', id: 'made' },
  { path: '/curated-trips', label: 'Get Trips', id: 'trips' },
  { path: '/faq', label: 'FAQ', id: 'faq' },
];

const MiniCurvedNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
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
    setActiveIndex(index);
    
    // Apple-like magnetic delay
    setTimeout(() => {
      navigate(path);
    }, 80);
  };

  const getItemOpacity = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.7;
    return 0.4;
  };

  const getItemScale = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.95;
    return 0.9;
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        ref={navRef}
        className="relative flex items-center gap-1 bg-background/80 backdrop-blur-xl border border-border/30 rounded-full px-2 py-1.5 shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Sliding indicator background */}
        <div
          className="absolute top-1.5 bg-primary/20 dark:bg-primary/30 rounded-full transition-all duration-300 ease-out"
          style={{
            ...indicatorStyle,
            height: 'calc(100% - 12px)',
            transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        />
        
        {/* Active indicator pill */}
        <div
          className="absolute top-1.5 bg-primary rounded-full transition-all duration-300 ease-out"
          style={{
            ...indicatorStyle,
            height: 'calc(100% - 12px)',
            transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
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
                transition-all duration-300 ease-out
                ${isActive 
                  ? 'text-primary-foreground' 
                  : 'text-foreground/70 hover:text-foreground'
                }
              `}
              style={{
                opacity: getItemOpacity(index),
                transform: `scale(${getItemScale(index)})`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCurvedNav;