import { useState } from 'react';
import { User, Sun, Moon, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Floating Action Button Style - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-[70] md:hidden">
        <button
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform ${
            isOpen 
              ? 'bg-primary text-primary-foreground rotate-45 scale-110' 
              : 'bg-background/90 text-foreground hover:scale-105 backdrop-blur-xl border border-border/40'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 mx-auto" />
          ) : (
            <div className="space-y-1 mx-auto">
              <div className="w-5 h-0.5 bg-current rounded"></div>
              <div className="w-3 h-0.5 bg-current rounded ml-auto"></div>
              <div className="w-4 h-0.5 bg-current rounded ml-auto"></div>
            </div>
          )}
        </button>
      </div>

      {/* Radial Menu Options */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[65] md:hidden"
            onClick={closeMenu}
          />
          
          {/* Floating Menu Items */}
          <div className="fixed bottom-6 right-6 z-[66] md:hidden">
            {/* Login/Signup Button */}
            <div 
              className={`absolute -top-20 -right-2 transform transition-all duration-300 ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                transitionDelay: isOpen ? '100ms' : '0ms'
              }}
            >
              <Link
                to="/auth"
                onClick={closeMenu}
                className="flex items-center gap-3 bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl px-4 py-3 text-foreground hover:bg-primary/10 transition-all duration-300 shadow-lg min-w-[140px]"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Join / Login</span>
              </Link>
            </div>

            {/* Theme Toggle Button */}
            <div 
              className={`absolute -top-36 -left-8 transform transition-all duration-300 ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                transitionDelay: isOpen ? '200ms' : '0ms'
              }}
            >
              <button
                onClick={() => {
                  toggleTheme();
                  closeMenu();
                }}
                className="flex items-center gap-3 bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl px-4 py-3 text-foreground hover:bg-primary/10 transition-all duration-300 shadow-lg min-w-[140px]"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span className="font-medium">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span className="font-medium">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;