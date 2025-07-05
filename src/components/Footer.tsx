
const Footer = () => {
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                <span className="hidden sm:inline">Breathe & Getaway</span>
                <span className="sm:hidden">B&G</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6 transition-colors duration-300 text-sm sm:text-base">
              An AI-driven travel discovery platform that connects your emotions to transformative journeys around the world.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10 transition-colors cursor-pointer touch-manipulation">
                📧
              </div>
              <div className="w-10 h-10 bg-gray-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10 transition-colors cursor-pointer touch-manipulation">
                🐦
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white transition-colors duration-300 text-base sm:text-lg">Discover</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm sm:text-base">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation py-1 block">Soul Journeys</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation py-1 block">Healing Retreats</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation py-1 block">Adventure Escapes</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation py-1 block">Cultural Immersion</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white transition-colors duration-300 text-base sm:text-lg">Connect</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm sm:text-base">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation py-1 block">About</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation py-1 block">Manifesto</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation py-1 block">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation py-1 block">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-6 sm:pt-8 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm sm:text-base">
          <p>Copyright © 2024 Breathe & Getaway. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
