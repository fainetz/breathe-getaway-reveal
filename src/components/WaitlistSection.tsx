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
        </div>

        {/* Mobile-first layout: Waitlist form first, then carousel */}
        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Waitlist Form - First on mobile */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              Join the <span className="bg-gradient-to-r from-slate-700 to-gray-600 dark:from-slate-300 dark:to-gray-400 bg-clip-text text-transparent">Waitlist</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Be the first to experience AI-powered travel that gets you. Early access to premium features and exclusive destinations.
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
          </div>

          {/* Simplified Image Carousel - Second on mobile */}
          <div className="relative order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
              <div className="flex">
                {carouselSlides.map((slide) => (
                  <div key={slide.id} className="flex-none w-full relative">
                    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] group">
                      {/* Background Image */}
                      <img 
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Minimal overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      
                      {/* Simplified category label - mobile hidden, desktop minimal */}
                      <div className="absolute top-4 right-4 hidden sm:block">
                        <div className={`${slide.labelColor} backdrop-blur-sm rounded-full px-3 py-1`}>
                          <span className="text-xs font-semibold text-white">{slide.label}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simplified navigation buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;