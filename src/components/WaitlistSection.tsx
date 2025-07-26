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
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
          Join the Waitlist
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
              className="flex-1"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8"
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