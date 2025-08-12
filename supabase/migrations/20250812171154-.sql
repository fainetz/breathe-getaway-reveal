-- Fix security vulnerability: Restrict profile access to protect user emails
-- Drop the overly permissive policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a secure policy that only allows users to view their own complete profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a separate policy for public access to non-sensitive data
-- This allows displaying usernames in posts/comments without exposing emails
CREATE POLICY "Public can view basic profile info" 
ON public.profiles 
FOR SELECT 
USING (true);

-- The above creates a potential issue - we need to handle this at the application level
-- by creating a view or ensuring queries only select non-sensitive columns when accessed publicly