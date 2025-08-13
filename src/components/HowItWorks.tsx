
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
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "AI Trip Planner",
      description: "Skip the planning — we've got it covered. One prompt gives you a complete trip — flights, stays, activities — without you planning a thing. You can easily adjust any part with a simple prompt and book it instantly.",
      icon: "🤖",
      examples: ["Complete trips", "Instant adjustments", "One-click booking"]
    },
    {
      title: "Travel Communities", 
      description: "Where travelers like you connect. Join a community for travelers like you — a place to ask questions, share safety tips, discuss local secrets, and connect with others who are going where you're going or looking to travel together.",
      icon: "🌐",
      examples: ["Safety tips", "Local secrets", "Travel partners"]
    },
    {
      title: "On-Trip Assistant",
      description: "We don't just get you there — we go with you. Once your trip begins, our AI stays with you. Find the fastest local transport/ways to get around, discover hidden gems, and connect with others in your travel community — all without breaking your flow.",
      icon: "🧭",
      examples: ["Local transport", "Hidden gems", "Community connections"]
    }
  ];

  return (
    <section id="how-it-works" className="pt-56 pb-32 sm:pt-64 sm:pb-32 px-6 relative" ref={sectionRef}>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 opacity-0 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent transition-colors duration-300 drop-shadow-lg">
            Why Breathe and Get Away?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            We handle everything so you can focus on what matters — getting away and reconnecting with yourself.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12" ref={stepsRef}>
          {steps.map((step, index) => (
            <div key={index} className="text-center group step-card opacity-0 transform translate-y-10 transition-all duration-1000 ease-out">
              <div className="bg-white/80 dark:bg-white/20 backdrop-blur-xl border border-gray-200 dark:border-white/30 rounded-3xl p-8 hover:bg-white/90 dark:hover:bg-white/30 transition-all duration-500 hover:scale-105 relative overflow-hidden shadow-2xl hover:shadow-3xl dark:shadow-black/50 dark:hover:shadow-black/70">
                {/* Subtle blue gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-500/30 dark:to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">{step.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300 drop-shadow-md">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed transition-colors duration-300 mb-4">{step.description}</p>
                  
                  {/* Example cards */}
                  <div className="space-y-2">
                    {step.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-white/60 dark:bg-white/10 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                        "{example}"
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-6 -translate-y-1/2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 animate-pulse drop-shadow-sm"></div>
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
