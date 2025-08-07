import { useState } from 'react';
import { User, Sun, Moon, X, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Floating Action Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-[70] md:hidden">
        <button
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform ${
            isOpen 
              ? 'bg-primary text-primary-foreground scale-110' 
              : 'bg-background/90 backdrop-blur-md text-foreground hover:scale-105 border border-border/20 shadow-xl'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 mx-auto" />
          ) : (
            <Menu className="w-6 h-6 mx-auto" />
          )}
        </button>
      </div>

      {/* Pinterest-style Overlay Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[65] md:hidden animate-fade-in"
            onClick={closeMenu}
          />
          
          {/* Menu Panel - Pinterest Style */}
          <div className="fixed bottom-0 left-0 right-0 z-[66] md:hidden">
            <div className="bg-background/95 backdrop-blur-xl rounded-t-3xl border-t border-border/20 shadow-2xl animate-slide-in-bottom p-6 pb-8 mx-4 mb-4">
              {/* Menu Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">Menu</h3>
                
                {/* Login/Signup Option */}
                <Link
                  to="/auth"
                  onClick={closeMenu}
                  className="flex items-center gap-4 p-4 bg-muted/30 hover:bg-muted/50 rounded-2xl transition-all duration-200 hover:scale-[0.98] group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Join / Login</div>
                    <div className="text-sm text-muted-foreground">Access your account</div>
                  </div>
                </Link>

                {/* Theme Toggle Option */}
                <button
                  onClick={() => {
                    toggleTheme();
                    closeMenu();
                  }}
                  className="flex items-center gap-4 p-4 bg-muted/30 hover:bg-muted/50 rounded-2xl transition-all duration-200 hover:scale-[0.98] group w-full"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {theme === 'dark' ? (
                      <Sun className="w-6 h-6 text-primary" />
                    ) : (
                      <Moon className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-foreground">
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Switch to {theme === 'dark' ? 'light' : 'dark'} theme
                    </div>
                  </div>
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