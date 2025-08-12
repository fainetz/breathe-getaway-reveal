-- Fix the security issue by creating a proper secure setup
-- First drop all existing policies to start clean
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create the secure policy that only allows users to view their own profile
CREATE POLICY "Users can view own profile only" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a secure view for public profile information that excludes email
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  username,
  created_at,
  updated_at
FROM public.profiles;

-- Grant access to the view for all users (this is safe since it excludes email)
GRANT SELECT ON public.public_profiles TO authenticated;
GRANT SELECT ON public.public_profiles TO anon;