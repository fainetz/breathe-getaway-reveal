import { useState } from 'react';
import { User, Sun, Moon, X, Menu, MessageSquare, Lightbulb, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [featureRequest, setFeatureRequest] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isOnChatPage = location.pathname === '/chat';

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setShowFeedback(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (featureRequest.trim()) {
      console.log('Feature Request:', featureRequest);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFeatureRequest('');
        setShowFeedback(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* Development Banner - Mobile chat bubble */}
      {showBanner && (
        <div className="md:hidden fixed right-2 bottom-[4.5rem] z-[60] max-w-[140px]">
          <div className="relative">
            {/* Chat bubble */}
            <div className="bg-gradient-to-br from-primary/95 to-accent/95 backdrop-blur-sm rounded-xl border border-primary/20 shadow-lg p-2">
              <div className="flex items-start justify-between gap-1 mb-1">
                <Lightbulb className="h-2 w-2 text-primary-foreground animate-pulse mt-0.5 flex-shrink-0" />
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 h-3 w-3 p-0 rounded-full transition-colors flex items-center justify-center"
                >
                  <X className="h-1.5 w-1.5" />
                </button>
              </div>
              <div className="text-[8px] text-primary-foreground">
                <div className="font-semibold mb-0.5">Early dev! 👋</div>
                <div className="opacity-90 leading-tight">Tap menu for feedback</div>
              </div>
            </div>
            {/* Chat bubble tail pointing to menu button */}
            <div className="absolute -bottom-1 left-[4.5rem] w-2 h-2 bg-gradient-to-br from-primary/95 to-accent/95 transform rotate-45 border-r border-b border-primary/20"></div>
          </div>
        </div>
      )}

      {/* Floating Action Button - Fixed position, no animation */}
      <div className="fixed right-6 bottom-6 z-[70] md:hidden">
        <button
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isOpen 
              ? 'bg-primary text-primary-foreground scale-110' 
              : 'bg-background/90 backdrop-blur-md text-foreground hover:scale-105 border border-border/20 shadow-xl hover:shadow-2xl'
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
          
          {/* Menu Panel - Fixed position */}
          <div className="fixed left-0 right-0 bottom-0 z-[66] md:hidden">
            <div className="bg-background/95 backdrop-blur-xl rounded-t-3xl border-t border-border/20 shadow-2xl animate-slide-in-bottom p-6 pb-8 mx-4 mb-4">
              {!showFeedback ? (
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

                  {/* Feedback Option */}
                  <button
                    onClick={() => {
                      setShowFeedback(true);
                      setShowBanner(false);
                    }}
                    className="flex items-center gap-4 p-4 bg-muted/30 hover:bg-muted/50 rounded-2xl transition-all duration-200 hover:scale-[0.98] group w-full"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <div className="relative">
                        <MessageSquare className="w-6 h-6 text-primary" />
                        <Lightbulb className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">Feature Request</div>
                      <div className="text-sm text-muted-foreground">Share your ideas with us</div>
                    </div>
                  </button>

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
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setShowFeedback(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ←
                    </button>
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-semibold text-foreground">Feature Request</h3>
                  </div>
                  
                  {!isSubmitted ? (
                    <>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">
                          We'd love to hear your ideas! What features would make your travel planning experience even better?
                        </p>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                          value={featureRequest}
                          onChange={(e) => setFeatureRequest(e.target.value)}
                          placeholder="Describe your feature idea..."
                          className="w-full h-32 bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                          maxLength={500}
                        />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {featureRequest.length}/500
                          </span>
                          <button
                            type="submit"
                            disabled={!featureRequest.trim()}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Send Idea
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Lightbulb className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Thank you for your idea! 🎉
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Your feature request has been received.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;