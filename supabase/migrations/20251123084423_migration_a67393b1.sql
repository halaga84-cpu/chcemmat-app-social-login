-- Fix RLS policy for reservations table to allow anonymous reservations
-- Drop the old restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert reservations" ON reservations;

-- Create new policy that allows ANYONE (including anonymous users) to create reservations
CREATE POLICY "Anyone can create reservations" ON reservations 
  FOR INSERT 
  WITH CHECK (true);

-- Verify: The SELECT policy should still restrict viewing reservations to owners only
-- This ensures privacy: only wishlist owners can see who reserved items