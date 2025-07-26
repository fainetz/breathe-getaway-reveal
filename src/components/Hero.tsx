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
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
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
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              How it works
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              Features
            </a>
            <Link to="/destinations" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              Destinations
            </Link>
            <div className="relative group">
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 font-medium">
                Vision
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
            </div>
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border py-4 px-4 animate-fade-in">
            <div className="flex flex-col space-y-4 max-w-7xl mx-auto">
              <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center gap-2">
                <div className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                      {itemCount}
                    </span>
                  )}
                </div>
                Cart
              </Link>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors py-2">How it works</a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors py-2">Features</a>
              <Link to="/destinations" className="text-muted-foreground hover:text-foreground transition-colors py-2">Destinations</Link>
              <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 py-2 text-left">
                Vision
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Heading on right, carousel on left */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Left side - Image carousel */}
        <div className="relative group order-2 lg:order-1">
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

          {/* Carousel Container */}
          <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-2xl shadow-2xl">
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
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className={`${slide.labelColor} backdrop-blur-sm rounded-full px-3 py-1.5`}>
                        <span className="text-xs font-bold text-white">{slide.label}</span>
                      </div>
                      {slide.comingSoon && (
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-slate-600/30">
                          <span className="text-xs font-bold text-slate-300">COMING SOON</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover/slide:translate-y-[-4px] transition-transform duration-300">
                        {slide.title}
                      </h2>
                      <p className="text-gray-300 text-sm sm:text-base max-w-2xl group-hover/slide:translate-y-[-4px] transition-transform duration-300 delay-75">
                        {slide.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 gap-3 flex">
              {categorySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Main heading and description */}
        <div className="text-left lg:pl-8 order-1 lg:order-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6 animate-fade-in">
            The Smarter,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Escape Discovery
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Harness the power of intuitive AI travel discovery. Tell us how you feel. We'll find where you need to go.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
