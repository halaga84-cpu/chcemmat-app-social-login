-- Drop the conflicting owner update policy temporarily
DROP POLICY IF EXISTS "Wishlist owners can update their items" ON items;

-- Recreate it with a condition that allows anonymous reservation updates
-- This policy now ONLY applies to authenticated users updating their own items
CREATE POLICY "Wishlist owners can update their items" ON items
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

-- Verify the policy now only applies to authenticated users
-- Anonymous users will only be checked against the "Anyone can reserve items" policy