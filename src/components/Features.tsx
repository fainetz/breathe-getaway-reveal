
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Features = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const slidesPerView = 3;

  const features = [
    {
      title: "AI-Powered Specific Search",
      description: "Search for oddly specific things using AI - find flights with sunset views or hotels with vintage typewriters in the lobby.",
      gradient: "from-cyan-500 to-blue-500"
    },
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(features.length / slidesPerView));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(features.length / slidesPerView)) % Math.ceil(features.length / slidesPerView));
  };

  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-white dark:bg-black transition-colors duration-300 shadow-2xl dark:shadow-gray-900/60" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="overflow-x-auto lg:overflow-visible">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-black dark:text-white transition-colors duration-300 drop-shadow-lg whitespace-nowrap lg:whitespace-normal">
              Travel That Understands You
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0">
            Every feature designed to bridge the gap between where you are and where your soul needs to be.
          </p>
        </div>

        {/* Desktop: Horizontal Sliding Carousel */}
        <div className="hidden lg:block relative">
          <div className="overflow-hidden px-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-1/3 flex-shrink-0">
                  <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="bg-white/90 dark:bg-white/15 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-2xl p-6 hover:bg-white dark:hover:bg-white/25 transition-all duration-500 hover:scale-102 h-full relative overflow-hidden shadow-xl hover:shadow-2xl dark:shadow-black/30 dark:hover:shadow-black/50">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                      <div className="relative z-10">
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}></div>
                        <h3 className="text-xl font-bold mb-4 text-black dark:text-white transition-colors duration-300 drop-shadow-sm">{feature.title}</h3>
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed transition-colors duration-300">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 dark:bg-white/20 backdrop-blur-sm border border-gray-200 dark:border-white/30 rounded-full p-3 hover:bg-white dark:hover:bg-white/30 transition-all duration-300 text-black dark:text-white shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 dark:bg-white/20 backdrop-blur-sm border border-gray-200 dark:border-white/30 rounded-full p-3 hover:bg-white dark:hover:bg-white/30 transition-all duration-300 text-black dark:text-white shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(features.length / slidesPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                  currentSlide === index ? 'bg-purple-500 scale-125 shadow-purple-500/50' : 'bg-gray-400 dark:bg-white/30 hover:bg-gray-600 dark:hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Horizontal Scrolling Layout */}
        <div className="lg:hidden">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4 w-max">
              {features.map((feature, index) => (
                <div key={index} className="w-80 flex-shrink-0">
                  <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="bg-white/90 dark:bg-white/15 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-2xl p-6 sm:p-8 transition-all duration-500 relative overflow-hidden shadow-xl dark:shadow-black/30 touch-manipulation hover:scale-102 active:scale-98 h-full">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 group-active:opacity-40 transition-all duration-500`}></div>
                      
                      <div className="relative z-10">
                        <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center`}>
                          <div className={`w-6 h-6 bg-white/30 rounded-md group-hover:bg-white/50 transition-colors duration-300`}></div>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-black dark:text-white transition-all duration-300 drop-shadow-sm group-hover:translate-x-1">
                          {feature.title}
                        </h3>
                        
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-base sm:text-lg transition-all duration-300 group-hover:translate-x-1">
                          {feature.description}
                        </p>
                        
                        <div className="mt-6 flex items-center space-x-1">
                          {Array.from({ length: 7 }).map((_, dotIndex) => (
                            <div 
                              key={dotIndex}
                              className={`h-1 rounded-full transition-all duration-500 ${
                                dotIndex <= index 
                                  ? `bg-gradient-to-r ${feature.gradient} w-3` 
                                  : 'bg-gray-300 dark:bg-white/20 w-1'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
