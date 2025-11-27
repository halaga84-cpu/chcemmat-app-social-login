
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Item = Database["public"]["Tables"]["items"]["Row"];
export type ItemCreate = Database["public"]["Tables"]["items"]["Insert"];
export type ItemUpdate = Database["public"]["Tables"]["items"]["Update"];

export const itemService = {
  async getItemsByWishlist(wishlistId: string): Promise<Item[]> {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("wishlist_id", wishlistId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error);
      throw new Error(error.message);
    }
    return data || [];
  },

  async createItem(itemData: ItemCreate): Promise<Item> {
    const { data, error } = await supabase
      .from("items")
      .insert(itemData)
      .select()
      .single();

    if (error) {
      console.error("Error creating item:", error);
      throw new Error(error.message);
    }
    return data;
  },

  async updateItem(id: string, updates: ItemUpdate): Promise<Item> {
    const { data, error } = await supabase
      .from("items")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating item:", error);
      throw new Error(error.message);
    }
    return data;
  },

  async deleteItem(id: string): Promise<void> {
    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      console.error("Error deleting item:", error);
      throw new Error(error.message);
    }
  },
};
