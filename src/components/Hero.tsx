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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

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
      image: '/lovable-uploads/phonebg.png',
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

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation trigger on load
  useEffect(() => {
    setIsLoaded(true);
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
    <>
      {/* Mobile Navigation - Outside container */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-transparent">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-7 h-7 relative overflow-hidden rounded-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/62358993-d15b-4b81-9c51-49ab4c2e8d79.png"
                  : "/lovable-uploads/3a90338f-3b9b-4d7f-a769-846168db9d31.png"
                }
                alt="Breathe & Getaway Logo"
                className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
                  theme === 'dark' ? 'scale-90' : ''
                } ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
              />
            </div>
            <span className="text-base font-bold text-black transform transition-all duration-300 group-hover:scale-105">
              B&G
            </span>
          </Link>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-16 md:pt-0 overflow-hidden transition-all duration-1000">{/* Fixed dark mode colors */}
        {/* Hero Background Image Overlay - Desktop */}
        <div 
          className="hidden md:block transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        >
          <HeroFeatureCard image="/lovable-uploads/8fa65681-7ecf-47e5-9043-3e9404f82eb6.png" />
        </div>
        {/* Hero Background Image Overlay - Mobile - using jungle pool villa image */}
        <div className="block md:hidden animate-fade-in">
          <HeroFeatureCard image="/lovable-uploads/bd211cbe-1c3c-4836-9efb-bb3bec1325de.png" />
        </div>
        {/* 3D Background */}
        <ThreeBackground />

        {/* Desktop Navigation */}
        <nav className="hidden md:block relative z-50 px-4 sm:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 relative overflow-hidden rounded-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/62358993-d15b-4b81-9c51-49ab4c2e8d79.png"
                    : "/lovable-uploads/3a90338f-3b9b-4d7f-a769-846168db9d31.png"
                  }
                  alt="Breathe & Getaway Logo"
                  className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
                    theme === 'dark' ? 'scale-90' : ''
                  } ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                />
              </div>
              <span className="text-2xl font-bold text-black dark:text-white transform transition-all duration-300 group-hover:scale-105">
                Breathe & Getaway
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="flex items-center space-x-8">
              <Link to="/faq" className="text-white hover:text-white/80 transition-all duration-300 font-medium relative group transform hover:scale-105">
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <ThemeToggle />
              <AuthButton />
              
              {/* Cart */}
              <Link to="/cart" className="relative group p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:animate-pulse" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px] animate-bounce">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content - Heading on right, carousel on left */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px- sm:px-6 max-w-7xl mx-auto mt-8 md:mt-8">{/* Reduced top margin for mobile nav spacing */}
          {/* Left side - Main heading and description */}
          <div 
            className="text-center lg:text-left lg:pr-8 order-1 lg:order-1 flex flex-col items-center lg:items-start"
            style={{
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-geist font-black leading-[1.1] sm:leading-[1.1] text-white mb-6 sm:mb-6 animate-fade-in px-2 sm:px-0 drop-shadow-lg transform transition-all duration-700 hover:scale-105">
              Skip the Plan. Get the Thrill.
            </h1>
            
            <p className="text-lg sm:text-lg md:text-xl lg:text-xl text-white leading-relaxed mb-6 sm:mb-8 animate-fade-in px-2 sm:px-0 max-w-md mx-auto lg:mx-0 font-bold drop-shadow-md transform transition-all duration-700 hover:scale-105" style={{ animationDelay: '0.3s' }}>
              the only travel platform made for spontaneous travelers.
            </p>
            
            {/* Join Waitlist Button */}
            <div className="mb-6 animate-fade-in px-2 sm:px-0 flex flex-col items-center transform transition-all duration-700 hover:scale-105" style={{ animationDelay: '0.6s' }}>
              <Link to="/waitlist">
                <Button className="bg-white text-black font-medium px-8 py-3 text-lg rounded-lg hover:bg-white/90 transition-all duration-300 flex items-center gap-3 transform hover:scale-110 hover:shadow-2xl group">
                  <span className="group-hover:animate-pulse">Join the Waitlist</span>
                  <img 
                    src="/lovable-uploads/323d24a5-b33e-4aae-941e-a90580951450.png"
                    alt="Logo"
                    className="w-10 h-10 object-contain transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                  />
                </Button>
              </Link>
              <p className="text-sm text-white/80 font-medium mt-3 text-center w-full animate-pulse">
                Get founding user perks and early access
              </p>
            </div>
            <div className="relative w-full">
            <div className="relative w-full sm:flex sm:justify-start">
  {/* Desktop version - inline placement */}
  <div className="relative w-full sm:flex sm:justify-start">
  {/* Desktop version - inline placement */}
  <div className="hidden sm:flex mt-4 text-white/70 text-sm flex-col items-center w-fit animate-bounce sm:ml-2 transition-all duration-300 hover:text-white hover:scale-110">
    <span className="font-medium">Learn more</span>
    <svg
      className="w-5 h-5 mt-4 text-white/80 transition-transform duration-300 hover:translate-y-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
</div>
  {/* Mobile version - floats at 40vh */}
  <div className="sm:hidden absolute top-[25vh] left-1/2 transform -translate-x-1/2 text-white/70 text-sm flex flex-col items-center animate-bounce pointer-events-none">
    <span className="font-medium animate-pulse">Learn more</span>
    <svg
      className="w-5 h-5 mt-1 text-white/80 animate-bounce"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
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
    </>
  );
};

export default Hero;
