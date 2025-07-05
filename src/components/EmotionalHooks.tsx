
import { useState, useEffect, useRef } from 'react';

const EmotionalHooks = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const examples = [
    {
      quote: "I need to feel small again under vast skies",
      destination: "Iceland Northern Lights Escape",
      color: "purple"
    },
    {
      quote: "Find me a place where time moves differently", 
      destination: "Monasteries of Bhutan Retreat",
      color: "pink"
    },
    {
      quote: "I want to disappear into music and culture",
      destination: "Jazz Clubs of New Orleans",
      color: "blue"
    },
    {
      quote: "Help me reconnect with ancient wisdom",
      destination: "Sacred Temples of Kyoto",
      color: "teal"
    },
    {
      quote: "I crave the rhythm of ocean waves",
      destination: "Secluded Beaches of Maldives",
      color: "cyan"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentExample((prev) => (prev + 1) % examples.length);
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [isVisible, examples.length]);

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-black dark:via-gray-900/30 dark:to-black transition-colors duration-300" ref={sectionRef}>
      {/* Enhanced background with subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-black dark:text-white transition-colors duration-300">
              When Words 
              <br />
              <span className="text-gray-700 dark:text-gray-300">
                Become Journeys
              </span>
            </h2>
            
            <div className="space-y-8 relative h-80">
              {examples.map((example, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    currentExample === index 
                      ? 'opacity-100 translate-y-0 scale-100 z-10' 
                      : 'opacity-0 translate-y-4 scale-95 z-0'
                  }`}
                >
                  <div className="bg-white/80 dark:bg-white/20 backdrop-blur-xl border border-gray-200 dark:border-white/30 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/30 transition-all duration-300 shadow-xl">
                    <p className="text-lg text-gray-700 dark:text-gray-100 italic mb-2 transition-colors duration-300">"{example.quote}"</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">→ {example.destination}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced progress indicators */}
            <div className="flex space-x-2 mt-8">
              {examples.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentExample === index ? 'bg-gray-600 dark:bg-gray-400 w-8 shadow-lg' : 'bg-gray-400 dark:bg-white/40 w-4'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className={`space-y-8 transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="bg-white/80 dark:bg-white/20 backdrop-blur-xl border border-gray-200 dark:border-white/30 rounded-3xl p-8 group hover:bg-white/90 dark:hover:bg-white/30 transition-all duration-500 shadow-2xl hover:shadow-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6 text-black dark:text-white transition-colors duration-300">Beyond Booking</h3>
                <p className="text-gray-700 dark:text-gray-100 text-lg leading-relaxed mb-6 transition-colors duration-300">
                  We don't just find you flights and hotels. We interpret your emotions, understand your needs, and craft experiences that heal, inspire, and transform.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
                  <div>
                    <p className="font-semibold text-black dark:text-white transition-colors duration-300">Soul-Curated</p>
                    <p className="text-sm text-gray-600 dark:text-gray-200 transition-colors duration-300">Every trip designed for your inner journey</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-white/20 backdrop-blur-xl border border-gray-200 dark:border-white/30 rounded-3xl p-8 group hover:bg-white/90 dark:hover:bg-white/30 transition-all duration-500 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white transition-colors duration-300">Transformative Travel</h3>
                <p className="text-gray-700 dark:text-gray-100 leading-relaxed transition-colors duration-300">
                  Return home not just with photos, but with a renewed sense of self and purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmotionalHooks;
