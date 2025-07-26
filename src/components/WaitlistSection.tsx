import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store in localStorage for now
      const waitlist = JSON.parse(localStorage.getItem('aicm-waitlist') || '[]');
      waitlist.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('aicm-waitlist', JSON.stringify(waitlist));
      
      toast.success('You\'ve been added to the waitlist! We\'ll notify you when hotels, flights, and resorts launch.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-cyan-50/80 dark:from-slate-900/40 dark:via-slate-800/40 dark:to-blue-900/40 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent dark:via-blue-800/10"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-200/30 dark:bg-blue-700/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-teal-200/30 dark:bg-teal-700/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
          Join the <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Waitlist</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Be the first to know when our revolutionary platform launches with hotels, flights, and luxury resorts. 
          Get early access to exclusive deals and premium experiences.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background/80 backdrop-blur-sm border-blue-200/50 dark:border-blue-700/50 focus:border-blue-400 dark:focus:border-blue-600"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </div>
        </form>
        
        <p className="text-sm text-muted-foreground mt-4">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default WaitlistSection;