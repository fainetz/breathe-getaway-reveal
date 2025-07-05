
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeBackground from './ThreeBackground';
import ThemeToggle from './ThemeToggle';

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col px-6">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Background overlay that adapts to theme */}
      <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-[1px] transition-colors duration-300"></div>
      
      {/* Navigation - smaller and more compact */}
      <nav className="relative z-50 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-xl font-bold text-black dark:text-white transition-colors duration-300">Breathe & Getaway</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm">How it works</a>
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm">Features</a>
            <Link to="/destinations" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm">Destinations</Link>
            <div className="relative group">
              <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 text-sm">
                Vision
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content - Left aligned and more compact */}
      <div className="relative z-10 flex-1 flex items-center pt-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-black dark:text-white mb-6 transition-colors duration-300">
              The Smarter,
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Escape Discovery
            </h1>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mb-8 transition-colors duration-300">
              Harness the power of intuitive AI travel discovery. Tell us how you feel. We'll find where you need to go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
