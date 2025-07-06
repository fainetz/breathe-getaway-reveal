
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black transition-colors duration-300 relative overflow-hidden shadow-2xl dark:shadow-gray-900/50">
      {/* Subtle travel path animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse shadow-sm"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6 group">
              <div className="w-8 h-8 relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/3a90338f-3b9b-4d7f-a769-846168db9d31.png" 
                  alt="Breathe & Getaway Logo"
                  className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105 ${
                    theme === 'dark' ? 'brightness-0 invert' : ''
                  }`}
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:scale-105 transition-transform drop-shadow-sm">
                <span className="hidden sm:inline">Breathe & Getaway</span>
                <span className="sm:hidden">B&G</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6 transition-colors duration-300 text-sm sm:text-base">
              An AI-driven travel discovery platform that connects your emotions to transformative journeys around the world.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer touch-manipulation hover:scale-110 hover:rotate-12 shadow-md hover:shadow-lg">
                📧
              </div>
              <div className="w-10 h-10 bg-gray-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer touch-manipulation hover:scale-110 hover:-rotate-12 shadow-md hover:shadow-lg">
                🐦
              </div>
            </div>
          </div>

          <div className="group">
            <h3 className="font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white transition-colors duration-300 text-base sm:text-lg group-hover:text-blue-500 transition-colors drop-shadow-sm">Discover</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm sm:text-base">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 touch-manipulation py-1 block hover:translate-x-2 hover:text-blue-500 hover:drop-shadow-sm">Soul Journeys</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 touch-manipulation py-1 block hover:translate-x-2 hover:text-blue-500 hover:drop-shadow-sm">Healing Retreats</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 touch-manipulation py-1 block hover:translate-x-2 hover:text-blue-500 hover:drop-shadow-sm">Adventure Escapes</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 touch-manipulation py-1 block hover:translate-x-2 hover:text-blue-500 hover:drop-shadow-sm">Cultural Immersion</a></li>
            </ul>
          </div>

          <div className="group">
            <h3 className="font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white transition-colors duration-300 text-base sm:text-lg group-hover:text-blue-500 transition-colors drop-shadow-sm">Connect</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm sm:text-base">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 touch-manipulation py-1 block hover:translate-x-2 hover:text-blue-500 hover:drop-shadow-sm">About</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 touch-manipulation py-1 block hover:translate-x-2 hover:text-blue-500 hover:drop-shadow-sm">Manifesto</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 touch-manipulation py-1 block hover:translate-x-2 hover:text-blue-500 hover:drop-shadow-sm">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 touch-manipulation py-1 block hover:translate-x-2 hover:text-blue-500 hover:drop-shadow-sm">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-6 sm:pt-8 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm sm:text-base">
          <p className="hover:text-blue-500 transition-colors duration-300 hover:drop-shadow-sm">Copyright © 2024 Breathe & Getaway. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
