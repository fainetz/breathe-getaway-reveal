import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [followUpData, setFollowUpData] = useState({
    interestedFeatures: '',
    accommodationNeeds: '',
    desiredFeatures: ''
  });
  const [isSubmittingFollowUp, setIsSubmittingFollowUp] = useState(false);

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
          _subject: 'New Waitlist Signup - Breathe & Getaway AI (Community Page)',
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
            accommodation_needs: followUpData.accommodationNeeds,
            desired_features: followUpData.desiredFeatures,
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
          accommodationNeeds: '',
          desiredFeatures: ''
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
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-sm"
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            size="sm"
            className="text-sm"
          >
            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
          </Button>
        </div>
      </form>

      <Dialog open={showFollowUp} onOpenChange={setShowFollowUp}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center text-foreground">
              Help us personalize your experience
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleFollowUpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="interestedFeatures" className="text-sm font-medium text-foreground">
                What features are you most interested in?
              </Label>
              <Textarea
                id="interestedFeatures"
                placeholder="AI trip planning, destination recommendations, community features..."
                value={followUpData.interestedFeatures}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, interestedFeatures: e.target.value }))}
                className="min-h-[80px] text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accommodationNeeds" className="text-sm font-medium text-foreground">
                What should our website accommodate for you?
              </Label>
              <Textarea
                id="accommodationNeeds"
                placeholder="Accessibility needs, specific travel requirements, budget considerations..."
                value={followUpData.accommodationNeeds}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, accommodationNeeds: e.target.value }))}
                className="min-h-[80px] text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredFeatures" className="text-sm font-medium text-foreground">
                What other features or sections would you like to see?
              </Label>
              <Textarea
                id="desiredFeatures"
                placeholder="Travel blogs, local experiences, group planning, travel insurance..."
                value={followUpData.desiredFeatures}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, desiredFeatures: e.target.value }))}
                className="min-h-[80px] text-sm"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFollowUp(false)}
                className="flex-1"
                disabled={isSubmittingFollowUp}
              >
                Skip
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmittingFollowUp}
              >
                {isSubmittingFollowUp ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WaitlistForm;