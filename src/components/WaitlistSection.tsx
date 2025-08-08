import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Carousel images data
  const carouselSlides = [
    {
      id: 'sunset-palm-resort',
      title: 'Sunset Palm Resort',
      description: 'Ultimate tropical luxury with infinity pools and palm-fringed paradise',
      image: '/lovable-uploads/ec79ecde-c51a-4448-9b2d-5328f1399e1d.png',
      label: 'HOTELS',
      labelColor: 'bg-gradient-to-r from-emerald-600 to-teal-700',
      comingSoon: true
    },
    {
      id: 'azure-beach-club',
      title: 'Azure Beach Club',
      description: 'Pristine white sands meet crystal-clear waters in this exclusive retreat',
      image: '/lovable-uploads/349adef3-59ea-405e-bc62-d704ea49bf62.png',
      label: 'FLIGHTS',
      labelColor: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      comingSoon: false
    },
    {
      id: 'santorini-village',
      title: 'Santorini Village',
      description: 'Iconic whitewashed buildings and stunning sunsets over the Aegean Sea',
      image: '/lovable-uploads/01acecfb-4a5e-4651-8343-d178f52a9ff1.png',
      label: 'FLIGHTS',
      labelColor: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      comingSoon: false
    },
    {
      id: 'desert-mountain-retreat',
      title: 'Desert Mountain Retreat',
      description: 'Serene mountain sanctuary with breathtaking desert landscapes and luxury amenities',
      image: '/lovable-uploads/7db62447-03ed-4252-9041-e865fded8997.png',
      label: 'RETREATS',
      labelColor: 'bg-gradient-to-r from-amber-600 to-orange-700',
      comingSoon: true
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mjkrryrd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          _subject: 'New Waitlist Signup - Breathe & Getaway AI',
        }),
      });

      if (response.ok) {
        toast.success('You\'ve been added to the waitlist! We\'ll notify you when hotels, flights, and resorts launch.');
        setEmail('');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Waitlist submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-gray-50/60 via-slate-50/60 to-stone-50/60 dark:from-slate-950/80 dark:via-gray-950/80 dark:to-slate-900/80 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/10 to-transparent dark:via-gray-800/5"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gray-200/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-stone-200/20 dark:bg-stone-800/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Experience What's <span className="bg-gradient-to-r from-slate-700 to-gray-600 dark:from-slate-300 dark:to-gray-400 bg-clip-text text-transparent">Coming Soon</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Where intuitive AI transforms wanderlust into reality. Our intelligence curates luxury hotels, premium flights, and exclusive retreats that match your desires before you even know them.
          </p>
        </div>

        {/* Image Carousel and Waitlist Combined */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Image Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
              <div className="flex">
                {carouselSlides.map((slide) => (
                  <div key={slide.id} className="flex-none w-full relative">
                    <div className="relative h-[400px] sm:h-[500px] group">
                      {/* Background Image */}
                      <img 
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      
                      {/* Category Label - Top Right */}
                      <div className="absolute top-6 right-6 flex items-center gap-2">
                        <div className={`${slide.labelColor} backdrop-blur-sm rounded-full px-4 py-2`}>
                          <span className="text-sm font-bold text-white">{slide.label}</span>
                        </div>
                        {slide.comingSoon && (
                          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-600/30">
                            <span className="text-sm font-bold text-slate-300">COMING SOON</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:translate-y-[-4px] transition-transform duration-300">
                          {slide.title}
                        </h3>
                        <p className="text-gray-200 text-base sm:text-lg group-hover:translate-y-[-4px] transition-transform duration-300 delay-75">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 transition-all duration-300 shadow-xl"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 transition-all duration-300 shadow-xl"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Right side - Waitlist Form */}
          <div className="text-center lg:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              Join the <span className="bg-gradient-to-r from-slate-700 to-gray-600 dark:from-slate-300 dark:to-gray-400 bg-clip-text text-transparent">Waitlist</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Be among the first to experience AI that truly gets you. Early waitlist members receive grandfathered pricing on all premium features, exclusive access to beta destinations, and special discounts on our on-trip AI assistant that provides hostel reviews and local information.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-gray-400 dark:focus:border-gray-600 h-12"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-slate-700 to-gray-600 hover:from-slate-800 hover:to-gray-700 dark:from-slate-600 dark:to-gray-500 dark:hover:from-slate-700 dark:hover:to-gray-600 text-white font-semibold px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </div>
            </form>
            
            <p className="text-sm text-muted-foreground mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>

            {/* Features Preview */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-foreground mb-1">Hotels</h4>
                <p className="text-sm text-muted-foreground">Luxury accommodations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-foreground mb-1">Flights</h4>
                <p className="text-sm text-muted-foreground">Premium travel options</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-foreground mb-1">Retreats</h4>
                <p className="text-sm text-muted-foreground">Exclusive getaways</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;