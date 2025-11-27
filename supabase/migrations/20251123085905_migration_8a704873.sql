-- FINAL FIX: Remove ALL existing INSERT policies for reservations and create single simple policy
-- Step 1: Drop ALL existing INSERT policies (including any duplicates)
DROP POLICY IF EXISTS "Anyone can create reservations" ON reservations;
DROP POLICY IF EXISTS "Anyone can insert reservations for public wishlists" ON reservations;
DROP POLICY IF EXISTS "Enable anonymous reservations" ON reservations;
DROP POLICY IF EXISTS "Users can create reservations" ON reservations;

-- Step 2: Create ONE simple INSERT policy that allows ANYONE (including anonymous users) to create reservations
CREATE POLICY "allow_anonymous_insert_reservations" ON reservations 
  FOR INSERT 
  WITH CHECK (true);

-- Step 3: Verify the policy was created correctly by selecting from pg_policies
-- This will show us the exact policy that's now in effect
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'reservations' AND cmd = 'INSERT';