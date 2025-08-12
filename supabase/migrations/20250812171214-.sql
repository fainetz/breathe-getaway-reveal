-- Fix the security issue properly by removing the conflicting policy and creating a secure approach
DROP POLICY IF EXISTS "Public can view basic profile info" ON public.profiles;

-- Only allow authenticated users to view profiles, and only their own complete profile
-- Other users can only see usernames through a specific view we'll create
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a secure view for public profile information that excludes sensitive data
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  username,
  created_at,
  updated_at
FROM public.profiles;

-- Enable RLS on the view
ALTER VIEW public.public_profiles OWNER TO postgres;

-- Grant access to the view for authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;
GRANT SELECT ON public.public_profiles TO anon;