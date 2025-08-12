-- Remove the problematic view and create a better solution
DROP VIEW IF EXISTS public.public_profiles;

-- Instead of a view, we'll rely on application-level filtering
-- The profiles table is now properly secured with RLS that only allows users to see their own profile
-- Any public display of usernames should be handled at the application level by selecting only the username column

-- Verify our secure policy is in place
-- Users can only view their own profile (this protects emails)
-- The policy "Users can view own profile only" is already created above