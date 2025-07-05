
const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-2xl font-bold">Breathe & Getaway</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              An AI-driven travel discovery platform that connects your emotions to transformative journeys around the world.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                📧
              </div>
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                🐦
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-6">Discover</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Soul Journeys</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Healing Retreats</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Adventure Escapes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cultural Immersion</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6">Connect</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Manifesto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>Copyright © 2024 Breathe & Getaway. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
