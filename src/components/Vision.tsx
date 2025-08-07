
import { useState, useEffect, useRef } from 'react';

const Vision = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const visionCards = [
    {
      icon: "🛫",
      title: "Budget Adventures",
      description: "Smart deals and value-focused trips that make amazing experiences accessible to everyone.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "🌿", 
      title: "Wellness Escapes",
      description: "Restorative journeys designed for healing, reflection, and personal growth through travel.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: "✨",
      title: "Premium Experiences", 
      description: "Full-service luxury travel with comprehensive planning and exclusive access to exceptional destinations.",
      gradient: "from-amber-500 to-orange-500"
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
        setCurrentCard((prev) => (prev + 1) % visionCards.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isVisible, visionCards.length]);

  return (
    <section id="vision" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-white dark:bg-black transition-colors duration-300" ref={sectionRef}>
      {/* Enhanced background with image */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <img 
            src="/lovable-uploads/5da0882d-c336-4a6c-b816-25ff575ea341.png" 
            alt="Tropical pool and mountains background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-white/90 dark:bg-black/90"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-6 sm:mb-8 md:mb-12 leading-tight text-black dark:text-white transition-colors duration-300 px-2 sm:px-0">
            Travel for
            <br />
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-amber-500 bg-clip-text text-transparent">
              Every Journey
            </span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 sm:mb-12 md:mb-16 transition-colors duration-300 px-4 sm:px-6 lg:px-0">
            From budget backpacking to luxury escapes, from emotional healing to adventure seeking—
            our AI understands your unique travel story and crafts the perfect experience.
          </p>
        </div>

        {/* Mobile-optimized Card Carousel */}
        <div className="relative mb-12 sm:mb-16 h-64 sm:h-72 md:h-80">
          {visionCards.map((card, index) => (
            <div
              key={index}
              className={`absolute inset-0 transform ${
                currentCard === index
                  ? 'opacity-100 scale-100 translate-y-0 z-20'
                  : index === (currentCard + 1) % visionCards.length
                  ? 'opacity-20 scale-95 translate-y-4 translate-x-4 sm:translate-x-8 z-10'
                  : index === (currentCard - 1 + visionCards.length) % visionCards.length
                  ? 'opacity-20 scale-95 translate-y-4 -translate-x-4 sm:-translate-x-8 z-10'
                  : 'opacity-0 scale-90 translate-y-8 z-0'
              }`}
              style={{
                transition: 'all 3000ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                transitionProperty: 'opacity, transform'
              }}
            >
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 mx-auto max-w-xs sm:max-w-md h-full relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-500 touch-manipulation">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500">{card.icon}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-black dark:text-white transition-colors duration-300 leading-tight">{card.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-center transition-colors duration-300 text-sm sm:text-base">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simplified Navigation Dots */}
        <div className="flex justify-center space-x-3 mb-16">
          {visionCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCard(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentCard === index 
                  ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50' 
                  : 'bg-gray-400 dark:bg-white/40 hover:bg-gray-600 dark:hover:bg-white/60 hover:scale-110'
              }`}
            />
          ))}
        </div>

        <div className={`transition-all duration-1200 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 px-12 py-4 rounded-full text-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 group relative overflow-hidden text-white">
            <span className="relative z-10">Join the Revolution</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Vision;
