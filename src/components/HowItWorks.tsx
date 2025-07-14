
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
      image: "/lovable-uploads/de22e8da-fe87-45d1-935d-98454288fb98.png" // Tropical sunset with pool
    },
    {
      title: "AI Understands You", 
      description: "Our emotional intelligence AI processes your deepest travel desires and intentions.",
      icon: "🧠",
      image: "/lovable-uploads/d1152bbf-7697-443b-b12b-64d4dad5bbc9.png" // Luxury resort pool
    },
    {
      title: "Curated Just for You",
      description: "Receive personalized trips that match your emotional state and wanderlust needs.",
      icon: "✨",
      image: "/lovable-uploads/78652967-c3b7-4fde-891f-87bb8f204e5d.png" // Ocean view terrace
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

        <div className="grid md:grid-cols-3 gap-8" ref={stepsRef}>
          {steps.map((step, index) => (
            <div key={index} className="group step-card opacity-0 transform translate-y-10 transition-all duration-1000 ease-out relative">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl dark:shadow-black/30 dark:hover:shadow-black/50 h-full">
                {/* Featured Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={step.image} 
                    alt={`${step.title} - Beautiful travel destination`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content Below Image */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{step.description}</p>
                </div>
              </div>
              
              {/* Connection Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/3 -right-4 transform translate-x-1/2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-indigo-400 rotate-45 translate-x-1"></div>
                  </div>
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
