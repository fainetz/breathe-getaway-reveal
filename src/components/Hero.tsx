
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeBackground from './ThreeBackground';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <section className="relative h-screen flex flex-col px-4 sm:px-6">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Background overlay that adapts to theme */}
      <div className={`absolute inset-0 backdrop-blur-[1px] transition-colors duration-300 ${
        theme === 'light' ? 'bg-white/70' : 'bg-black/80'
      }`}></div>
      
      {/* Navigation - mobile responsive */}
      <nav className="relative z-50 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative overflow-hidden rounded-lg">
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/06d30aba-bf87-4b11-ad56-860979ba2ed6.png"
                  : "/lovable-uploads/3a90338f-3b9b-4d7f-a769-846168db9d31.png"
                }
                alt="Breathe & Getaway Logo"
                className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-black dark:text-white transition-colors duration-300 group-hover:scale-105 transition-transform">
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
          <div className="hidden md:flex items-center space-x-6">
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
          </div>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-b border-gray-200 dark:border-white/20 py-4 px-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
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

      {/* Main Content - Mobile responsive */}
      <div className="relative z-10 flex-1 flex items-center pt-4 sm:pt-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black dark:text-white mb-4 sm:mb-6 transition-colors duration-300 animate-fade-in">
              The Smarter,
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
                AI-Powered
              </span>
              <br />
              Escape Discovery
            </h1>
            
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mb-6 sm:mb-8 transition-colors duration-300 px-4 sm:px-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Harness the power of intuitive AI travel discovery. Tell us how you feel. We'll find where you need to go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
