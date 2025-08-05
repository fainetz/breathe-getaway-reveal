import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThreeBackground from './ThreeBackground';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Premium resort category slides with new luxury images
  const categorySlides = [
    {
      id: 'sunset-palm-resort',
      title: 'Sunset Palm Resort',
      description: 'Ultimate tropical luxury with infinity pools and palm-fringed paradise',
      image: '/lovable-uploads/ec79ecde-c51a-4448-9b2d-5328f1399e1d.png',
      label: 'HOTELS',
      labelColor: 'bg-gradient-to-r from-emerald-600 to-teal-700',
      comingSoon: true
    },
    {
      id: 'azure-beach-club',
      title: 'Azure Beach Club',
      description: 'Pristine white sands meet crystal-clear waters in this exclusive retreat',
      image: '/lovable-uploads/349adef3-59ea-405e-bc62-d704ea49bf62.png',
      label: 'FLIGHT DESTINATION',
      labelColor: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      comingSoon: false
    },
    {
      id: 'santorini-village',
      title: 'Santorini Village',
      description: 'Iconic whitewashed buildings and stunning sunsets over the Aegean Sea',
      image: '/lovable-uploads/01acecfb-4a5e-4651-8343-d178f52a9ff1.png',
      label: 'FLIGHT DESTINATION',
      labelColor: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      comingSoon: false
    },
    {
      id: 'desert-mountain-retreat',
      title: 'Desert Mountain Retreat',
      description: 'Serene mountain sanctuary with breathtaking desert landscapes and luxury amenities',
      image: '/lovable-uploads/7db62447-03ed-4252-9041-e865fded8997.png',
      label: 'RETREAT',
      labelColor: 'bg-gradient-to-r from-amber-600 to-orange-700',
      comingSoon: true
    }
  ];

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

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categorySlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [categorySlides.length]);

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categorySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categorySlides.length) % categorySlides.length);
  };

  const itemCount = getCartItemCount();

  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Navigation - AICM layout style */}
      <nav className="relative z-50 px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
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
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              <span className="hidden sm:inline">Breathe & Getaway</span>
              <span className="sm:hidden">B&G</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground hover:scale-110 transition-transform duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation - original links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium relative group">
              How it works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link to="/destinations" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium relative group">
              Destinations
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium relative group">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <ThemeToggle />
            
            {/* Cart */}
            <Link to="/cart" className="relative group p-2 rounded-lg transition-all duration-300 hover:scale-105">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-blue-50/95 via-indigo-50/95 to-blue-100/95 dark:from-slate-950/95 dark:via-slate-900/95 dark:to-slate-950/95 backdrop-blur-lg border-b border-blue-200/50 dark:border-slate-800/50 py-4 px-4 animate-fade-in shadow-xl">
            <div className="flex flex-col space-y-4 max-w-7xl mx-auto">
              <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors py-3 flex items-center gap-2 px-3 rounded-lg hover:bg-blue-100/50 dark:hover:bg-slate-800/30 relative group">
                <div className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                      {itemCount}
                    </span>
                  )}
                </div>
                Cart
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-8"></span>
              </Link>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-blue-100/50 dark:hover:bg-slate-800/30 relative group">
                How it works
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-16"></span>
              </a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-blue-100/50 dark:hover:bg-slate-800/30 relative group">
                Features
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-12"></span>
              </a>
              <Link to="/destinations" className="text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-blue-100/50 dark:hover:bg-slate-800/30 relative group">
                Destinations
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-16"></span>
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-blue-100/50 dark:hover:bg-slate-800/30 relative group">
                FAQ
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-8"></span>
              </Link>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Heading on right, carousel on left */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Left side - Main heading and description */}
        <div className="text-left lg:pr-8 order-1 lg:order-1">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-geist font-semibold leading-tight text-foreground mb-6 animate-fade-in">
            <span>AI That Gets You</span>
            <br className="sm:hidden" />
            <span className="sm:inline"> And Gets You</span>
            <br />
            <span>There </span>
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Smarter</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            A Good trip doesn't start with filters and compromises. It starts with clarity — and a booking that just feels right, no second-guessing, no stress.
          </p>
          
          {/* Waitlist text - positioned to appear under search */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm sm:text-base text-muted-foreground">
              Join the waitlist for founding user perks
            </p>
          </div>
          
          {/* Mobile search functionality is now handled by the floating ExpandableSearch component */}
        </div>

        {/* Right side - Empty space where carousel was */}
        <div className="relative order-2 lg:order-2">
          {/* Left empty as requested */}
        </div>
      </div>
      
      {/* Scroll indicator arrows */}
      
    </section>
  );
};

export default Hero;
