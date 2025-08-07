
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
      title: "Tell Us Your Story",
      description: "Whether it's 'cheapest way to leave this weekend' or 'I need to disappear in luxury'—we understand every travel need.",
      icon: "💭",
      examples: ["Under $200 trip", "I need to get away", "Something stress-free"]
    },
    {
      title: "AI Reads Your Needs", 
      description: "Our intelligence adapts: budget optimization for students, emotional healing for escapists, concierge service for executives.",
      icon: "🧠",
      examples: ["Smart deals", "Healing destinations", "Luxury coordination"]
    },
    {
      title: "Perfect Match Delivered",
      description: "From hostels to private jets, from group tours to personal chefs—receive exactly what your situation calls for.",
      icon: "✨",
      examples: ["Budget adventures", "Soul retreats", "VIP experiences"]
    }
  ];

  return (
    <section id="how-it-works" className="pt-24 pb-24 sm:pt-32 sm:pb-32 md:pt-40 md:pb-40 px-6 sm:px-8 relative" ref={sectionRef}>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 sm:mb-24 md:mb-28 opacity-0 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 sm:mb-10 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent transition-colors duration-300 drop-shadow-lg leading-tight">
            How It Works for Everyone
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-6 lg:px-0">
            One intelligent system that adapts to your style—whether budget-conscious, emotionally seeking, or craving luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16" ref={stepsRef}>
          {steps.map((step, index) => (
            <div key={index} className="text-center group step-card opacity-0 transform translate-y-10 transition-all duration-1000 ease-out">
              <div className="bg-white/80 dark:bg-white/20 backdrop-blur-xl border border-gray-200 dark:border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 hover:bg-white/90 dark:hover:bg-white/30 transition-all duration-500 hover:scale-105 active:scale-95 relative overflow-hidden shadow-2xl hover:shadow-3xl dark:shadow-black/50 dark:hover:shadow-black/70 touch-manipulation">
                {/* Subtle blue gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-500/30 dark:to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">{step.icon}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white transition-colors duration-300 drop-shadow-md leading-tight">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed transition-colors duration-300 mb-3 sm:mb-4 text-sm sm:text-base">{step.description}</p>
                  
                  {/* Example cards */}
                  <div className="space-y-1.5 sm:space-y-2">
                    {step.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-white/60 dark:bg-white/10 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
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
