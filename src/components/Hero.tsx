
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeBackground from './ThreeBackground';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

interface HeroProps {}

const Hero = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Category slides data
  const categorySlides = [
    {
      id: 'flights',
      title: 'Flight Destinations',
      description: 'Discover amazing destinations worldwide',
      image: '/lovable-uploads/92794f25-53c0-4644-af8d-3e9343c68684.png', // Santorini white buildings at sunset
      label: 'FLIGHTS',
      labelColor: 'bg-blue-600/90',
      comingSoon: false
    },
    {
      id: 'hotels',
      title: 'Hotels',
      description: 'Luxury accommodations and resorts',
      image: '/lovable-uploads/e2c6c5a8-65a5-4005-976d-25a14867e43e.png', // Luxury resort pool with palm trees at sunset
      label: 'HOTELS',
      labelColor: 'bg-green-600/90',
      comingSoon: true
    },
    {
      id: 'cruises',
      title: 'Cruises',
      description: 'Ocean adventures and island hopping',
      image: '/lovable-uploads/18aa8cb3-7178-47f3-b218-3aa6b8687db5.png', // Beautiful beach with umbrellas at sunset
      label: 'CRUISES',
      labelColor: 'bg-purple-600/90',
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

      {/* Main Content - Premium Layout */}
      <div className="relative z-10 flex-1 flex items-center pt-4 sm:pt-8 pb-8 sm:pb-16">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
          {/* Title */}
          <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black dark:text-white mb-3 sm:mb-4 transition-colors duration-300 animate-fade-in">
              The Smarter,
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Escape Discovery
            </h1>
            
            <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mb-4 sm:mb-6 transition-colors duration-300 mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Harness the power of intuitive AI travel discovery. Tell us how you feel. We'll find where you need to go.
            </p>

          </div>

          {/* Large Space for Search Bar */}
          <div className="h-16 sm:h-16 flex-shrink-0"></div>

          {/* Sleek Carousel Container */}
          <div className="relative flex-1 max-w-5xl mx-auto w-full group max-h-[280px] sm:max-h-[380px] mt-8 sm:mt-6">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hidden sm:block"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hidden sm:block"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators - Outside image on mobile, inside on desktop */}
            <div className="flex justify-center mt-4 sm:absolute sm:bottom-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:mt-0 z-30 gap-3">
              {categorySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-500 sm:bg-white shadow-lg scale-125' 
                      : 'bg-gray-400 sm:bg-white/40 hover:bg-gray-600 sm:hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Sliding Cards Container */}
            <div className="relative w-full h-[240px] sm:h-[380px] overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {categorySlides.map((slide, index) => (
                  <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                    <Link to="/destinations" className="block w-full h-full group/slide">
                      {/* Background Image */}
                      <img 
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover/slide:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      
                      {/* Category Label */}
                      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 sm:gap-3">
                        <div className={`${slide.labelColor} backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2`}>
                          <span className="text-xs sm:text-sm font-bold text-white">{slide.label}</span>
                        </div>
                        {slide.comingSoon && (
                          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-600/30">
                            <span className="text-xs sm:text-sm font-bold text-slate-300">COMING SOON</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 group-hover/slide:translate-y-[-4px] transition-transform duration-300">
                          {slide.title}
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-lg md:text-xl max-w-2xl group-hover/slide:translate-y-[-4px] transition-transform duration-300 delay-75">
                          {slide.description}
                        </p>
                        
                        {/* CTA Button */}
                        <div className="mt-3 sm:mt-6 group-hover/slide:translate-y-[-4px] transition-transform duration-300 delay-150">
                          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold hover:bg-white/30 transition-all duration-300">
                            <span className="text-sm sm:text-base">Explore {slide.title}</span>
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
