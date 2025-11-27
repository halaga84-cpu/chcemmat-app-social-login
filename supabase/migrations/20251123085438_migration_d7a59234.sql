-- Fix RLS policies for reservations table
-- Drop ALL existing INSERT policies to start fresh
DROP POLICY IF EXISTS "Anyone can create reservations" ON reservations;
DROP POLICY IF EXISTS "Anyone can insert reservations for public wishlists" ON reservations;
DROP POLICY IF EXISTS "Users can create reservations" ON reservations;

-- Create single, simple INSERT policy that allows anonymous reservations
CREATE POLICY "Enable anonymous reservations" ON reservations 
  FOR INSERT 
  WITH CHECK (true);