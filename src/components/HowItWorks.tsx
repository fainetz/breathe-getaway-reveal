
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
      title: "Express Your Soul",
      description: "Tell us how you're feeling, what you're seeking, or what you need to escape from.",
      icon: "💭",
      image: "/lovable-uploads/714c97fb-6e3a-4bf5-b96e-7392ee44ab02.png" // Tropical beach
    },
    {
      title: "AI Understands You", 
      description: "Our emotional intelligence AI processes your deepest travel desires and intentions.",
      icon: "🧠",
      image: "/lovable-uploads/d4094bb5-5435-49f3-a075-70d9c35b93ce.png" // Tokyo skyline
    },
    {
      title: "Curated Just for You",
      description: "Receive personalized trips that match your emotional state and wanderlust needs.",
      icon: "✨",
      image: "/lovable-uploads/866f50c1-e4b0-4389-9339-917882af6b27.png" // Santorini sunset
    }
  ];

  return (
    <section id="how-it-works" className="pt-56 pb-32 sm:pt-64 sm:pb-32 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-black dark:via-gray-900/50 dark:to-black transition-colors duration-300 shadow-2xl dark:shadow-gray-900/50" ref={sectionRef}>
      {/* Enhanced background effects with image */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-8">
          <img 
            src="/lovable-uploads/18aa8cb3-7178-47f3-b218-3aa6b8687db5.png" 
            alt="Beach paradise background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/95 via-gray-100/95 to-gray-50/95 dark:from-black/95 dark:via-gray-900/95 dark:to-black/95"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 opacity-0 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent transition-colors duration-300 drop-shadow-lg">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            Beyond destinations. Beyond filters. We read between the lines of what your heart truly seeks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12" ref={stepsRef}>
          {steps.map((step, index) => (
            <div key={index} className="text-center group step-card opacity-0 transform translate-y-10 transition-all duration-1000 ease-out relative">
              <div className="bg-white/90 dark:bg-white/25 backdrop-blur-xl border border-gray-200 dark:border-white/30 rounded-3xl p-8 hover:bg-white/95 dark:hover:bg-white/35 transition-all duration-500 hover:scale-105 relative overflow-hidden shadow-2xl hover:shadow-3xl dark:shadow-black/50 dark:hover:shadow-black/70 h-full">
                {/* Background Image */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={`${step.title} background`}
                    className="w-full h-full object-cover opacity-0 group-hover:opacity-30 transition-opacity duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 dark:group-hover:from-blue-500/30 dark:group-hover:to-indigo-500/30 transition-all duration-500 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">{step.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300 drop-shadow-md group-hover:text-white dark:group-hover:text-white">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed transition-colors duration-300 group-hover:text-gray-100 dark:group-hover:text-gray-100">{step.description}</p>
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
