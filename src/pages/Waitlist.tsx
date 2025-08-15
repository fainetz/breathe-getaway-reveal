import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, ArrowLeft, Sparkles, Globe, Plane, MapPin } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const Waitlist = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [followUpData, setFollowUpData] = useState({
    interestedFeatures: '',
    desiredSections: ''
  });
  const [isSubmittingFollowUp, setIsSubmittingFollowUp] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const isMobile = useIsMobile();

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
        toast.success('You\'ve been added to the waitlist! Please share a bit more about your interests.');
        setSubmittedEmail(email);
        setEmail('');
        setShowFollowUp(true);
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

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFollowUp(true);
    
    try {
      const { error } = await supabase
        .from('waitlist_feedback')
        .insert([
          {
            email: submittedEmail,
            interested_features: followUpData.interestedFeatures,
            accommodation_needs: followUpData.desiredSections,
          }
        ]);

      if (error) {
        toast.error('Something went wrong. Please try again.');
        console.error('Follow-up submission error:', error);
      } else {
        toast.success('Thank you for your feedback! We\'ll use this to make Breathe & Getaway perfect for you.');
        setShowFollowUp(false);
        setFollowUpData({
          interestedFeatures: '',
          desiredSections: ''
        });
        setSubmittedEmail('');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Follow-up submission error:', error);
    } finally {
      setIsSubmittingFollowUp(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500/15 to-teal-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating abstract shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-white/10 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '5s' }}></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 group"
      >
        <div className="relative p-3 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105">
          <ArrowLeft className="w-6 h-6 text-white group-hover:text-white/80 transition-colors" />
          
          {/* Neomorphism effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"></div>
        </div>
      </button>

      <div className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Main Content Container with Glassmorphism */}
        <div className="relative">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Early Access</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white leading-tight">
              Join the{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Future
              </span>{' '}
              of Travel
            </h1>
            
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Be among the first to experience AI-powered spontaneous travel planning. 
              Get lifetime discounted pricing and exclusive access to revolutionary travel features.
            </p>
            
            {/* Glassmorphism Form */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl"></div>
              <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
                {/* Neomorphism inner shadow */}
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)]"></div>
                
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 px-6 text-lg bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 rounded-2xl focus:border-white/50 focus:ring-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Joining...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Plane className="w-5 h-5" />
                        Join the Waitlist
                      </div>
                    )}
                  </Button>
                </form>
                
                <div className="flex items-center justify-center gap-4 mt-6 text-white/60 text-sm">
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>No spam ever</span>
                  </div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Section with Enhanced Glassmorphism */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl blur-2xl"></div>
              
              {/* Main carousel container */}
              <div className="relative p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                  <div className="flex">
                    {carouselSlides.map((slide) => (
                      <div key={slide.id} className="flex-none w-full relative">
                        <div className="relative h-[500px] sm:h-[600px] group rounded-2xl overflow-hidden">
                          {/* Background Image */}
                          <img 
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                          
                          {/* Enhanced Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                          
                          {/* Category Labels - Enhanced Glassmorphism */}
                          <div className="absolute top-6 right-6 flex items-center gap-3">
                            <div className={`relative ${slide.labelColor} backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20 shadow-2xl`}>
                              <span className="text-sm font-bold text-white">{slide.label}</span>
                              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"></div>
                            </div>
                            {slide.comingSoon && (
                              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20 shadow-2xl">
                                <span className="text-sm font-bold text-white">COMING SOON</span>
                                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"></div>
                              </div>
                            )}
                          </div>

                          {/* Content with Enhanced Glassmorphism */}
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="relative p-6 rounded-2xl bg-black/30 backdrop-blur-2xl border border-white/20 shadow-2xl">
                              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 group-hover:translate-y-[-4px] transition-transform duration-300">
                                {slide.title}
                              </h3>
                              <p className="text-white/90 text-lg leading-relaxed group-hover:translate-y-[-4px] transition-transform duration-300 delay-75">
                                {slide.description}
                              </p>
                              
                              {/* Neomorphism inner glow */}
                              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Navigation buttons */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 group"
                >
                  <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-110 hover:bg-black/60">
                    <ChevronLeft className="w-6 h-6 text-white" />
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"></div>
                  </div>
                </button>

                <button
                  onClick={scrollNext}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 group"
                >
                  <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-110 hover:bg-black/60">
                    <ChevronRight className="w-6 h-6 text-white" />
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Follow-up Dialog */}
      <Dialog open={showFollowUp} onOpenChange={setShowFollowUp}>
        <DialogContent 
          className="sm:max-w-md w-[90vw] max-w-[450px] max-h-[85vh] overflow-y-auto bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl z-[100]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="absolute inset-0 rounded-3xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)]"></div>
          
          <DialogHeader className="pb-6 relative">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white mx-auto w-fit">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Almost There</span>
            </div>
            <DialogTitle className="text-2xl font-bold text-center text-white leading-tight">
              Help us personalize your experience
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleFollowUpSubmit} className="space-y-6 relative">
            <div className="space-y-3">
              <Label htmlFor="interestedFeatures" className="text-sm font-semibold text-white/90">
                What features interest you most?
              </Label>
              <Textarea
                id="interestedFeatures"
                placeholder="AI trip planning, local recommendations, community features..."
                value={followUpData.interestedFeatures}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, interestedFeatures: e.target.value }))}
                className="min-h-[100px] text-sm rounded-2xl border border-white/30 focus:border-white/50 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="desiredSections" className="text-sm font-semibold text-white/90">
                What travel tools would you use?
              </Label>
              <Textarea
                id="desiredSections"
                placeholder="Trip planning tools, travel forums, booking guides, local insights..."
                value={followUpData.desiredSections}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, desiredSections: e.target.value }))}
                className="min-h-[100px] text-sm rounded-2xl border border-white/30 focus:border-white/50 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0"
                disabled={isSubmittingFollowUp}
              >
                {isSubmittingFollowUp ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Complete Registration
                  </div>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Waitlist;