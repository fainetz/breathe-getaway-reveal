import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plane, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Waitlist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    interestedFeatures: '',
    desiredSections: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit to Formspree
      const formspreeResponse = await fetch('https://formspree.io/f/mjkrryrd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          _subject: 'New Waitlist Signup - Breathe & Getaway AI',
        }),
      });

      // Submit to Supabase if we have additional data
      if (formData.interestedFeatures || formData.desiredSections) {
        const { error } = await supabase
          .from('waitlist_feedback')
          .insert([
            {
              email: formData.email,
              phone: formData.phone,
              interested_features: formData.interestedFeatures,
              accommodation_needs: formData.desiredSections,
            }
          ]);

        if (error) {
          console.error('Supabase submission error:', error);
        }
      }

      if (formspreeResponse.ok) {
        toast.success('Thank you! You\'ve been added to the waitlist.');
        setFormData({
          email: '',
          phone: '',
          interestedFeatures: '',
          desiredSections: ''
        });
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
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 group"
      >
        <div className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105">
          <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
        </div>
      </button>

      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Icon */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-6">
              <Plane className="w-8 h-8 text-gray-700" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Be Part of the Future of Travel
            </h1>
            <p className="text-gray-600">
              We're in beta, adding new users weekly. Join the waitlist to be among the first to experience Tripsby.ai.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                *Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(201) 555-0123"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {/* Interested Features */}
            <div className="space-y-2">
              <Label htmlFor="interestedFeatures" className="text-sm font-medium text-gray-700">
                What features interest you most?
              </Label>
              <Textarea
                id="interestedFeatures"
                placeholder="AI trip planning, local recommendations, community features..."
                value={formData.interestedFeatures}
                onChange={(e) => handleInputChange('interestedFeatures', e.target.value)}
                className="min-h-[100px] rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500 resize-none"
              />
            </div>

            {/* Travel Tools */}
            <div className="space-y-2">
              <Label htmlFor="desiredSections" className="text-sm font-medium text-gray-700">
                What travel tools would you use?
              </Label>
              <Textarea
                id="desiredSections"
                placeholder="Trip planning tools, travel forums, booking guides, local insights..."
                value={formData.desiredSections}
                onChange={(e) => handleInputChange('desiredSections', e.target.value)}
                className="min-h-[100px] rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                  Joining...
                </div>
              ) : (
                'Join the Waitlist'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;