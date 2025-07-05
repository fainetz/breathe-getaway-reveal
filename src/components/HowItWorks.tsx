
import { useEffect, useRef } from 'react';

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.step-card');
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('opacity-100', 'translate-y-0');
                step.classList.remove('opacity-0', 'translate-y-10');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section id="how-it-works" className="py-32 px-6 relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 opacity-0 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            How Soul-Travel Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Beyond destinations. Beyond filters. We read between the lines of what your heart truly seeks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12" ref={stepsRef}>
          {steps.map((step, index) => (
            <div key={index} className="text-center group step-card opacity-0 transform translate-y-10 transition-all duration-700 ease-out">
              <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/25 transition-all duration-500 hover:scale-105 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-6 -translate-y-1/2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent animate-pulse"></div>
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
