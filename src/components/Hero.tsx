
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeBackground from './ThreeBackground';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Load cart items to show count
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('travel-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };

    loadCart();
    window.addEventListener('storage', loadCart);
    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const itemCount = getCartItemCount();
  
  return (
    <section className="relative h-[80vh] sm:h-screen flex flex-col px-4 sm:px-6">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Background overlay that adapts to theme */}
      <div className={`absolute inset-0 backdrop-blur-[1px] transition-colors duration-300 ${
        theme === 'light' ? 'bg-white/70' : 'bg-black/80'
      }`}></div>
      
      {/* Navigation - mobile responsive */}
      <nav className="relative z-50 py-4">
        <div className="flex items-center justify-between w-full pl-4 pr-8">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative overflow-hidden rounded-lg">
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/62358993-d15b-4b81-9c51-49ab4c2e8d79.png"
                  : "/lovable-uploads/3a90338f-3b9b-4d7f-a769-846168db9d31.png"
                }
                alt="Breathe & Getaway Logo"
                className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105 ${
                  theme === 'dark' ? 'scale-90' : ''
                }`}
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-black dark:text-white transition-all duration-300 group-hover:scale-105">
              <span className="hidden sm:inline">Breathe & Getaway</span>
              <span className="sm:hidden">B&G</span>
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-black dark:text-white hover:scale-110 transition-transform duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 text-sm hover:scale-105 relative group">
              How it works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 text-sm hover:scale-105 relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link to="/destinations" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 text-sm hover:scale-105 relative group">
              Destinations
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="relative group">
              <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 flex items-center gap-1 text-sm hover:scale-105">
                Vision
                <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
              </button>
            </div>
            <ThemeToggle />
            
            {/* Subtle gap before cart */}
            <div className="w-4"></div>
            
            {/* Modern cart with theme-appropriate styling */}
            <Link to="/cart" className="relative group p-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/5 backdrop-blur-sm">
              <div className="relative">
                <ShoppingCart className={`w-5 h-5 transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'text-white/90 group-hover:text-white' 
                    : 'text-black/90 group-hover:text-black'
                }`} />
                {itemCount > 0 && (
                  <span className={`absolute -top-2 -right-2 rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                  }`}>
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-b border-gray-200 dark:border-white/20 py-4 px-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors py-2 hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <div className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                      {itemCount}
                    </span>
                  )}
                </div>
                Cart
              </Link>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors py-2 hover:translate-x-2 transition-transform duration-200">How it works</a>
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors py-2 hover:translate-x-2 transition-transform duration-200">Features</a>
              <Link to="/destinations" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors py-2 hover:translate-x-2 transition-transform duration-200">Destinations</Link>
              <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 py-2 hover:translate-x-2 transition-transform duration-200">
                Vision
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Three Category Cards */}
      <div className="relative z-10 flex-1 flex items-center pt-2 sm:pt-8 pb-16 sm:pb-0">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black dark:text-white mb-3 sm:mb-6 transition-colors duration-300 animate-fade-in">
              The Smarter,
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Escape Discovery
            </h1>
            
            <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mb-4 sm:mb-8 transition-colors duration-300 mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Harness the power of intuitive AI travel discovery. Tell us how you feel. We'll find where you need to go.
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Flight Destinations Card */}
            <Link to="/destinations" className="group relative overflow-hidden rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 hover:scale-105 transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/6b7f673a-c32c-4c6e-9496-bf8f5b86ec9a.png"
                  alt="Flight Destinations"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-600/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold text-white">FLIGHTS</span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Flight Destinations</h3>
                  <p className="text-gray-300 text-sm">Discover amazing destinations worldwide</p>
                </div>
              </div>
            </Link>

            {/* Hotels Card */}
            <Link to="/destinations" className="group relative overflow-hidden rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 hover:scale-105 transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/ad282feb-6c07-42fa-a2c1-b6262dc7d9a9.png"
                  alt="Hotels"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Category Label */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="bg-green-600/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold text-white">HOTELS</span>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600/30">
                    <span className="text-sm font-bold text-slate-300">COMING SOON</span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Hotels</h3>
                  <p className="text-gray-300 text-sm">Luxury accommodations and resorts</p>
                </div>
              </div>
            </Link>

            {/* Cruises Card */}
            <Link to="/destinations" className="group relative overflow-hidden rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 hover:scale-105 transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/c442bea5-cadc-4e64-8f52-41dfc17b1f5d.png"
                  alt="Cruises"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Category Label */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="bg-purple-600/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold text-white">CRUISES</span>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600/30">
                    <span className="text-sm font-bold text-slate-300">COMING SOON</span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Cruises</h3>
                  <p className="text-gray-300 text-sm">Ocean adventures and island hopping</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
