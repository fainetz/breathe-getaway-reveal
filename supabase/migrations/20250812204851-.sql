-- Create a table for waitlist feedback responses
CREATE TABLE public.waitlist_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  interested_features TEXT,
  accommodation_needs TEXT,
  desired_features TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feedback (since it's not user-specific)
CREATE POLICY "Anyone can submit waitlist feedback" 
ON public.waitlist_feedback 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to view all feedback
CREATE POLICY "Admins can view all waitlist feedback" 
ON public.waitlist_feedback 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));