-- Create RLS policy for deleting reservations (only wishlist owner can cancel)
CREATE POLICY "Owner of wishlist can cancel reservation" 
ON reservations 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 
    FROM items
    JOIN wishlists ON items.wishlist_id = wishlists.id
    WHERE items.id = reservations.item_id
    AND wishlists.user_id = auth.uid()
  )
);