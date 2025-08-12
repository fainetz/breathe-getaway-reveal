-- CRITICAL SECURITY FIX: Protect private community membership data
-- Drop the dangerous policy that exposes all memberships
DROP POLICY IF EXISTS "Community members are viewable by everyone" ON public.community_members;

-- Create secure policy that protects private community memberships
CREATE POLICY "Community members visibility by privacy settings" 
ON public.community_members 
FOR SELECT 
USING (
  -- Users can always see their own memberships
  auth.uid() = user_id
  OR
  -- Anyone can see memberships in public communities
  EXISTS (
    SELECT 1 FROM public.communities 
    WHERE id = community_id 
    AND (is_private = false OR is_private IS NULL)
  )
  OR
  -- For private communities, only members can see the membership list
  EXISTS (
    SELECT 1 FROM public.communities 
    WHERE id = community_id 
    AND is_private = true
    AND EXISTS (
      SELECT 1 FROM public.community_members cm
      WHERE cm.community_id = community_id 
      AND cm.user_id = auth.uid()
    )
  )
);