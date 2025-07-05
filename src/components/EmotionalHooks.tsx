
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
      { threshold: 0.3 }
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
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVisible, examples.length]);

  return (
    <section className="py-32 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              When Words 
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Become Journeys
              </span>
            </h2>
            
            <div className="space-y-8 relative h-80">
              {examples.map((example, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 transform ${
                    currentExample === index 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-30 translate-y-4 scale-95'
                  }`}
                >
                  <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/25 transition-all duration-300">
                    <p className="text-lg text-gray-200 italic mb-2">"{example.quote}"</p>
                    <p className={`text-sm text-${example.color}-400 font-medium`}>→ {example.destination}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress indicators */}
            <div className="flex space-x-2 mt-8">
              {examples.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    currentExample === index ? 'bg-purple-500 w-8' : 'bg-white/30 w-4'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl p-8 group hover:bg-white/25 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">Beyond Booking</h3>
                <p className="text-gray-200 text-lg leading-relaxed mb-6">
                  We don't just find you flights and hotels. We interpret your emotions, understand your needs, and craft experiences that heal, inspire, and transform.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-semibold">Soul-Curated</p>
                    <p className="text-sm text-gray-300">Every trip designed for your inner journey</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl p-8 group hover:bg-white/25 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Transformative Travel</h3>
                <p className="text-gray-200 leading-relaxed">
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
