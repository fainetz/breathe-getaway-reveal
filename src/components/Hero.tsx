import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ShoppingCart, ChevronLeft, ChevronRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import ThreeBackground from './ThreeBackground';
import AuthButton from './AuthButton';
import MiniCurvedNav from './MiniCurvedNav';
import HeroFeatureCard from './HeroFeatureCard';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

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

  // Scroll detection to hide arrows on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-16 md:pt-0 overflow-hidden">{/* Added mobile padding for nav */}
      {/* Hero Background Image Overlay - Desktop */}
      <div className="hidden md:block">
        <HeroFeatureCard image="/lovable-uploads/8fa65681-7ecf-47e5-9043-3e9404f82eb6.png" />
      </div>
      {/* Hero Background Image Overlay - Mobile - using jungle pool villa image */}
      <div className="block md:hidden">
        <HeroFeatureCard image="/lovable-uploads/bd211cbe-1c3c-4836-9efb-bb3bec1325de.png" />
      </div>
      {/* 3D Background */}
      <ThreeBackground />

      {/* Navigation - AICM layout style */}
      <nav className="relative z-50 px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-7 h-7 sm:w-10 sm:h-10 relative overflow-hidden rounded-lg">
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
            <span className="text-lg sm:text-2xl font-bold text-foreground">
              <span className="hidden sm:inline">Breathe & Getaway</span>
              <span className="sm:hidden text-base">B&G</span>
            </span>
          </Link>

          {/* Mobile menu button - hidden since we have horizontal nav */}
          <div className="md:hidden"></div>


          {/* Desktop navigation - keep original position */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium relative group">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <ThemeToggle />
            <AuthButton />
            
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

        {/* Mobile navigation menu - removed since we have horizontal nav */}
      </nav>

      {/* Main Content - Heading on right, carousel on left */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 max-w-7xl mx-auto mt-8 md:mt-8">{/* Reduced top margin for mobile nav spacing */}
        {/* Left side - Main heading and description */}
        <div className="text-center lg:text-left lg:pr-8 order-1 lg:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-geist font-black leading-[1.1] sm:leading-[1.1] text-white mb-6 sm:mb-6 animate-fade-in px-2 sm:px-0 drop-shadow-lg">
            Skip the Plan. Get the Thrill.
          </h1>
          
          <p className="text-lg sm:text-lg md:text-xl lg:text-xl text-white leading-relaxed mb-6 sm:mb-8 animate-fade-in px-2 sm:px-0 max-w-md mx-auto lg:mx-0 font-bold drop-shadow-md" style={{ animationDelay: '0.3s' }}>
            the only travel platform made for spontaneous travelers.
          </p>
          
          {/* Join Waitlist Button */}
          <div className="mb-6 animate-fade-in px-2 sm:px-0 flex justify-center" style={{ animationDelay: '0.6s' }}>
            <Link to="/waitlist">
              <Button className="bg-black dark:bg-white text-white dark:text-black font-medium px-12 py-3 text-lg rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors duration-200 flex items-center gap-3 w-full sm:w-auto min-w-[280px]">
                Join the Waitlist
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/323d24a5-b33e-4aae-941e-a90580951450.png"
                    : "/lovable-uploads/0b267d24-4263-467e-9777-e1627c730fa4.png"
                  }
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
              </Button>
            </Link>
            <p className="text-sm text-white/80 font-medium mt-3">
              Get founding user perks and early access
            </p>
          </div>
          
          {/* Mobile search functionality is now handled by the floating ExpandableSearch component */}
        </div>

        {/* Right side - Empty space */}
        <div className="relative order-2 lg:order-2">
          {/* Empty space */}
        </div>
      </div>
      
      {/* Scroll indicator arrows */}
      
    </section>
  );
};

export default Hero;
