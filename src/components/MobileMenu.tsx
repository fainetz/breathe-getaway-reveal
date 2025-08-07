import { useState } from 'react';
import { Menu, X, Sun, Moon, User, UserPlus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Menu Button - Top Right */}
      <div className="fixed top-4 right-4 z-[70] md:hidden">
        <button
          onClick={toggleMenu}
          className="p-3 bg-background/80 backdrop-blur-xl border border-border/40 rounded-2xl text-foreground hover:bg-muted/50 transition-all duration-300 shadow-lg"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[65] md:hidden"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-20 right-4 z-[66] md:hidden">
            <div className="bg-background/95 backdrop-blur-xl border border-border/40 rounded-3xl shadow-2xl p-6 min-w-[200px]">
              <div className="space-y-4">
                {/* Login/Signup Section */}
                <div className="space-y-3">
                  <Link
                    to="/auth"
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-3 rounded-2xl text-foreground hover:bg-muted/50 transition-all duration-300"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Login</span>
                  </Link>
                  
                  <Link
                    to="/auth?mode=signup"
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-3 rounded-2xl text-foreground hover:bg-muted/50 transition-all duration-300"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="font-medium">Sign Up</span>
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-border/30 my-4" />

                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    toggleTheme();
                    closeMenu();
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl text-foreground hover:bg-muted/50 transition-all duration-300 w-full"
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
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;