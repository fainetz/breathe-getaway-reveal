
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [prompt, setPrompt] = useState('');
  const [airport, setAirport] = useState('JFK');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search prompt:', prompt, 'Airport:', airport);
    // Results will be injected into #resultsSection
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
      resultsSection.innerHTML = '<div class="text-center py-20 text-gray-400">Search results will appear here...</div>';
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col px-6">
      {/* Background with space for future 3D video */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-50 py-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-2xl font-bold">Breathe & Getaway</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it works</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#vision" className="text-gray-300 hover:text-white transition-colors">Vision</a>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full hover:bg-white/20 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                The Smarter,
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                Escape Discovery
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                Harness the power of intuitive AI travel discovery. Tell us how you feel. We'll find where you need to go.
              </p>

              {/* Search Interface */}
              <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2 mb-6">
                  <div className="flex flex-col md:flex-row gap-2">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="I want to disappear into nature next weekend..."
                      className="flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-400 focus:outline-none text-lg"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={airport}
                        onChange={(e) => setAirport(e.target.value)}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none w-20 text-center"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                      >
                        Let's Getaway
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Floating suggestions */}
              <div className="flex flex-wrap gap-3 text-sm">
                {[
                  "Find me solitude by the ocean",
                  "Romantic weekend in Europe", 
                  "Adventure that challenges me",
                  "Healing retreat for the soul"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all text-gray-300 hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Element (Space for future 3D content) */}
            <div className="hidden lg:block">
              <div className="relative h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl"></div>
                {/* Placeholder for future 3D video or graphics */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-lg">AI-Powered Discovery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
