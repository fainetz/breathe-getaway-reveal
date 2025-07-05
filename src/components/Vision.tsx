
const Vision = () => {
  return (
    <section id="vision" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
          The Future of 
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Conscious Travel
          </span>
        </h2>
        
        <p className="text-2xl text-gray-300 leading-relaxed mb-16">
          Imagine a world where every journey is perfectly aligned with your inner landscape. 
          Where AI doesn't just understand destinations, but understands you.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-3">Global Discovery</h3>
            <p className="text-gray-400">Access to hidden gems and transformative experiences across all continents.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3">Emotional AI</h3>
            <p className="text-gray-400">Technology that reads between the lines of your deepest travel desires.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3">Serendipity Engine</h3>
            <p className="text-gray-400">Calculated magic that puts you in the right place at the perfect moment.</p>
          </div>
        </div>

        <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-12 py-4 rounded-full text-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
          Join the Revolution
        </button>
      </div>
    </section>
  );
};

export default Vision;
