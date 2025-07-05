
const Features = () => {
  const features = [
    {
      title: "Emotional Intelligence",
      description: "AI that reads your mood, energy, and deepest travel desires to match you with transformative experiences.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      title: "Instant Everything", 
      description: "From flights to hidden gems, we handle every detail so you can focus on your journey within.",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      title: "Curated Authenticity",
      description: "Skip the tourist traps. Find experiences that resonate with your soul and create lasting memories.",
      gradient: "from-blue-500 to-teal-500"
    },
    {
      title: "Serendipitous Discovery",
      description: "Uncover places and experiences you never knew existed but were exactly what you needed.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      title: "Last-Minute Magic",
      description: "Spontaneous escapes made simple. Perfect for when you need to disappear into adventure.",
      gradient: "from-orange-500 to-pink-500"
    },
    {
      title: "Mindful Travel",
      description: "Every recommendation considers your mental space and what will truly nourish your spirit.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Travel That Understands You
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Every feature designed to bridge the gap between where you are and where your soul needs to be.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-500 hover:scale-105 h-full">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}></div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
