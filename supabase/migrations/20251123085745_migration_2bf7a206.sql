-- Fix RLS policy for items table to allow anonymous users to view items for public wishlists
-- This is required for reservation functionality to work

-- Drop the restrictive policy that requires auth
DROP POLICY IF EXISTS "Wishlist owners can view their items" ON items;

-- Create a new policy that allows viewing items for public wishlists
CREATE POLICY "Anyone can view items for public wishlists" ON items 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM wishlists 
      WHERE wishlists.id = items.wishlist_id 
      AND wishlists.is_public = true
    )
  );

-- Keep the owner policy for authenticated users
CREATE POLICY "Wishlist owners can view their own items" ON items 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM wishlists 
      WHERE wishlists.id = items.wishlist_id 
      AND wishlists.user_id = auth.uid()
    )
  );