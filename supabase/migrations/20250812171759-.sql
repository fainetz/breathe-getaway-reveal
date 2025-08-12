-- CRITICAL SECURITY FIX: Remove the dangerous public policy that exposes user emails
DROP POLICY IF EXISTS "Public can view basic profile info" ON public.profiles;

-- Verify that only the secure policy remains: "Users can view own profile only"
-- This policy ensures users can only access their own profile data, protecting emails from public exposure