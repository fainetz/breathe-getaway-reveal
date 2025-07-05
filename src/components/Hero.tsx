
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeBackground from './ThreeBackground';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col px-6">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Black background overlay with transparency for 3D visibility */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]"></div>
      
      {/* Navigation - exactly like AICM */}
      <nav className="relative z-50 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-2xl font-bold">Breathe & Getaway</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it works</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">Destinations</Link>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                Vision
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Left aligned like AICM */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-white mb-8">
              The Smarter,
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Escape Discovery
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl mb-12">
              Harness the power of intuitive AI travel discovery. Tell us how you feel. We'll find where you need to go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
