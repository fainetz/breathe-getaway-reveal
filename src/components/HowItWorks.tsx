
const HowItWorks = () => {
  const steps = [
    {
      title: "Express Your Soul",
      description: "Tell us how you're feeling, what you're seeking, or what you need to escape from.",
      icon: "💭"
    },
    {
      title: "AI Understands You", 
      description: "Our emotional intelligence AI processes your deepest travel desires and intentions.",
      icon: "🧠"
    },
    {
      title: "Curated Just for You",
      description: "Receive personalized trips that match your emotional state and wanderlust needs.",
      icon: "✨"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            How Soul-Travel Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Beyond destinations. Beyond filters. We read between the lines of what your heart truly seeks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className="text-6xl mb-6">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-6 -translate-y-1/2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
