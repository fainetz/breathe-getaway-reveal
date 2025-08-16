
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Map, Plane, MessageCircle, HelpCircle, ShoppingCart } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/destinations', label: 'Destinations', icon: Map },
  { path: '/curated-trips', label: 'Trips', icon: Plane },
  { path: '/community', label: 'Community', icon: MessageCircle },
  { path: '/faq', label: 'FAQ', icon: HelpCircle },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
];

interface MiniCurvedNavProps {
  isIntegrated?: boolean;
}

const MiniCurvedNav = ({ isIntegrated = false }: MiniCurvedNavProps) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    if (isIntegrated) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isIntegrated]);

  const currentPath = location.pathname;

  return (
    <nav 
      className={`
        bg-white/80 backdrop-blur-md border border-gray-200/30 rounded-full px-4 py-2 shadow-lg
        transition-all duration-300 z-50
        ${isIntegrated && isScrolled ? 'translate-y-2 scale-95 opacity-90' : ''}
      `}
    >
      <div className="flex items-center space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex items-center justify-center px-3 py-2 rounded-full text-sm font-medium
                transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }
              `}
            >
              <Icon className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">{item.label}</span>
              
              {isActive && (
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MiniCurvedNav;
