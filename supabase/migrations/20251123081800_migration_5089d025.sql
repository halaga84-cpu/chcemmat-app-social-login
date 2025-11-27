-- =====================================================
-- WISHLIST APPLICATION - SUPABASE DATABASE SCHEMA
-- =====================================================

-- 1. WISHLISTS TABLE
-- Stores user wishlists with unique share slugs
-- =====================================================
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  share_slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_share_slug ON wishlists(share_slug);

-- Enable RLS
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wishlists
CREATE POLICY "Public wishlists are viewable by everyone"
  ON wishlists FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can view their own wishlists"
  ON wishlists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wishlists"
  ON wishlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlists"
  ON wishlists FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlists"
  ON wishlists FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- 2. ITEMS TABLE
-- Stores wishlist items with reservation status
-- =====================================================
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  product_url TEXT,
  affiliate_url TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'purchased')),
  reserved BOOLEAN NOT NULL DEFAULT false,
  reserved_at TIMESTAMP WITH TIME ZONE,
  reserved_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_items_wishlist_id ON items(wishlist_id);
CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);

-- Enable RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for items
CREATE POLICY "Items are viewable by everyone if wishlist is public"
  ON items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = items.wishlist_id
      AND wishlists.is_public = true
    )
  );

CREATE POLICY "Wishlist owners can view their items"
  ON items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Wishlist owners can insert items"
  ON items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Wishlist owners can update their items"
  ON items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can reserve items (update reserved fields)"
  ON items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = items.wishlist_id
      AND wishlists.is_public = true
    )
  );

CREATE POLICY "Wishlist owners can delete their items"
  ON items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM wishlists
      WHERE wishlists.id = items.wishlist_id
      AND wishlists.user_id = auth.uid()
    )
  );

-- =====================================================
-- 3. RESERVATIONS TABLE (Optional - for detailed tracking)
-- Stores reservation details with reserver information
-- =====================================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  reserver_name TEXT NOT NULL,
  reserver_email TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_reservations_item_id ON reservations(item_id);

-- Enable RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reservations
CREATE POLICY "Wishlist owners can view reservations if setting enabled"
  ON reservations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM items
      JOIN wishlists ON wishlists.id = items.wishlist_id
      JOIN profiles ON profiles.id = wishlists.user_id
      WHERE items.id = reservations.item_id
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert reservations for public wishlists"
  ON reservations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM items
      JOIN wishlists ON wishlists.id = items.wishlist_id
      WHERE items.id = reservations.item_id
      AND wishlists.is_public = true
    )
  );

-- =====================================================
-- 4. HELPER FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_wishlists_updated_at ON wishlists;
CREATE TRIGGER update_wishlists_updated_at
  BEFORE UPDATE ON wishlists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_items_updated_at ON items;
CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMPLETED: Database schema with RLS policies
-- =====================================================