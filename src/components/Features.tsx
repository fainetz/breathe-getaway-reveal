
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Features = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const slidesPerView = 3;

  const features = [
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
    <section id="features" className="py-32 px-6 relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Travel That Understands You
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Every feature designed to bridge the gap between where you are and where your soul needs to be.
          </p>
        </div>

        {/* Desktop: Horizontal Sliding Carousel */}
        <div className="hidden lg:block relative">
          <div className="overflow-hidden px-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-1/3 flex-shrink-0">
                  <div className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-10 hover:bg-white/25 transition-all duration-500 hover:scale-105 h-full relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                      <div className="relative z-10">
                        <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl mb-8 group-hover:scale-110 transition-transform duration-300`}></div>
                        <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>
                        <p className="text-gray-200 leading-relaxed text-lg">{feature.description}</p>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(features.length / slidesPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-purple-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Grid Layout */}
        <div className="lg:hidden grid md:grid-cols-2 gap-10 px-4">
          {features.map((feature, index) => (
            <div key={index} className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-10 hover:bg-white/25 transition-all duration-500 hover:scale-105 h-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl mb-8 group-hover:scale-110 transition-transform duration-300`}></div>
                  <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>
                  <p className="text-gray-200 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
