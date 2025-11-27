
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Wishlist = Database["public"]["Tables"]["wishlists"]["Row"];
export type WishlistCreate = Database["public"]["Tables"]["wishlists"]["Insert"];
export type WishlistUpdate = Database["public"]["Tables"]["wishlists"]["Update"];

export const wishlistService = {
  async getWishlistsByUser(userId: string): Promise<Wishlist[]> {
    const { data, error } = await supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching wishlists:", error);
      throw new Error(error.message);
    }
    return data || [];
  },

  async getWishlistBySlug(slug: string): Promise<Wishlist | null> {
    const { data, error } = await supabase
      .from("wishlists")
      .select("*")
      .eq("share_slug", slug)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116: no rows found, which is fine
      console.error("Error fetching wishlist by slug:", error);
      throw new Error(error.message);
    }
    return data;
  },

  async createWishlist(wishlistData: WishlistCreate): Promise<Wishlist> {
    const { data, error } = await supabase
      .from("wishlists")
      .insert(wishlistData)
      .select()
      .single();

    if (error) {
      console.error("Error creating wishlist:", error);
      throw new Error(error.message);
    }
    return data;
  },

  async updateWishlist(id: string, updates: WishlistUpdate): Promise<Wishlist> {
    const { data, error } = await supabase
      .from("wishlists")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating wishlist:", error);
      throw new Error(error.message);
    }
    return data;
  },

  async deleteWishlist(id: string): Promise<void> {
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting wishlist:", error);
      throw new Error(error.message);
    }
  },
};
