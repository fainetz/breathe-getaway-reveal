
import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Lightbulb } from 'lucide-react';

const FeatureRequestBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [featureRequest, setFeatureRequest] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showMobileBanner, setShowMobileBanner] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  // Check if user has visited before and show mobile banner
  useEffect(() => {
    // Always check localStorage first
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (hasVisitedBefore) {
      setHasVisited(true);
      return;
    }
    
    // Only show on mobile and for first-time visitors
    const checkMobile = () => window.innerWidth < 768;
    
    if (!hasVisitedBefore && checkMobile()) {
      setHasVisited(false);
      
      // Show banner after a short delay
      const showTimer = setTimeout(() => {
        setShowMobileBanner(true);
      }, 1500);
      
      // Hide banner after 4 seconds and mark as visited
      const hideTimer = setTimeout(() => {
        setShowMobileBanner(false);
        localStorage.setItem('hasVisitedBefore', 'true');
        setHasVisited(true);
      }, 5500);
      
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setHasVisited(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (featureRequest.trim()) {
      // Here you would normally send the request to your backend
      console.log('Feature Request:', featureRequest);
      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFeatureRequest('');
        setIsOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* Feature Request Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white/95 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-2xl z-50 transition-colors duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  Feature Request
                </h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {!isSubmitted ? (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    We'd love to hear your ideas! What features would make your travel planning experience even better?
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    All ideas are welcome - no matter how big or small! 🌟
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={featureRequest}
                    onChange={(e) => setFeatureRequest(e.target.value)}
                    placeholder="Describe your feature idea... (e.g., 'I wish I could filter destinations by weather', 'Add a budget calculator', etc.)"
                    className="w-full h-32 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 resize-none"
                    maxLength={500}
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
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
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Thank you for your idea! 🎉
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your feature request has been received. We appreciate your input in making our platform better!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sliding Banner - Only on mobile for first-time visitors */}
      {showMobileBanner && (
        <div className="md:hidden fixed top-1/2 left-0 z-50 transform -translate-y-1/2">
          <div className={`bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-r-2xl shadow-lg p-3 transition-transform duration-700 ease-out ${
            showMobileBanner ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 animate-pulse flex-shrink-0" />
              <div className="text-sm font-medium">
                Share feature ideas! →
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Banner - Desktop only */}
      {showBanner && (
        <div className="hidden md:block fixed bottom-24 right-20 z-40 max-w-xs">
          <div className="relative">
            {/* Chat bubble */}
            <div className="bg-gradient-to-br from-primary/95 to-accent/95 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-lg p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <Lightbulb className="h-3 w-3 text-primary-foreground animate-pulse mt-0.5 flex-shrink-0" />
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 h-5 w-5 p-0 rounded-full transition-colors flex items-center justify-center"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
              <div className="text-xs text-primary-foreground">
                <div className="font-semibold mb-1">Hey! We're in early development 👋</div>
                <div className="opacity-90 leading-relaxed">Click here to share feedback →</div>
              </div>
            </div>
            {/* Chat bubble tail */}
            <div className="absolute -bottom-1 right-4 w-3 h-3 bg-gradient-to-br from-primary/95 to-accent/95 transform rotate-45 border-r border-b border-primary/20"></div>
          </div>
        </div>
      )}

      {/* Floating Feature Request Button - Desktop only */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setShowBanner(false);
        }}
        className="hidden md:flex fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 items-center justify-center z-30 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <Lightbulb className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
          </div>
        )}
      </button>
    </>
  );
};

export default FeatureRequestBox;
