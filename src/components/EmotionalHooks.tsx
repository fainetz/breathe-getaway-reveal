
const EmotionalHooks = () => {
  return (
    <section className="py-32 px-6 relative">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              When Words 
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Become Journeys
              </span>
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <p className="text-lg text-gray-300 italic mb-2">"I need to feel small again under vast skies"</p>
                <p className="text-sm text-purple-400">→ Iceland Northern Lights Escape</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <p className="text-lg text-gray-300 italic mb-2">"Find me a place where time moves differently"</p>
                <p className="text-sm text-pink-400">→ Monasteries of Bhutan Retreat</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <p className="text-lg text-gray-300 italic mb-2">"I want to disappear into music and culture"</p>
                <p className="text-sm text-blue-400">→ Jazz Clubs of New Orleans</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-6">Beyond Booking</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We don't just find you flights and hotels. We interpret your emotions, understand your needs, and craft experiences that heal, inspire, and transform.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <p className="font-semibold">Soul-Curated</p>
                  <p className="text-sm text-gray-400">Every trip designed for your inner journey</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-4">Transformative Travel</h3>
              <p className="text-gray-300 leading-relaxed">
                Return home not just with photos, but with a renewed sense of self and purpose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmotionalHooks;
