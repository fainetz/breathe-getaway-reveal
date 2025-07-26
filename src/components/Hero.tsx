import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 dark:from-purple-900 dark:via-purple-800 dark:to-pink-900">
      {/* Geometric shapes background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-32 w-60 h-60 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-purple-200 to-transparent rounded-l-full opacity-30"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              AICM
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground hover:scale-110 transition-transform duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/create-store" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              Create a store
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              About
            </Link>
            <div className="relative group">
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 font-medium">
                KnowledgeBase
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border py-4 px-4 animate-fade-in">
            <div className="flex flex-col space-y-4 max-w-7xl mx-auto">
              <Link to="/create-store" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Create a store
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                About
              </Link>
              <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 py-2 text-left">
                KnowledgeBase
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6 animate-fade-in">
            The Smarter,
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Decentralized
            <br />
            Marketplace
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Harness the power of decentralized AI marketplace with AICM.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;