import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
export type ProfileCreate = Database["public"]["Tables"]["profiles"]["Insert"];

export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    
    // Return first result or null if no results
    return data && data.length > 0 ? data[0] : null;
  },

  async createProfile(profileData: ProfileCreate): Promise<Profile> {
    const { data, error } = await supabase
      .from("profiles")
      .insert(profileData)
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      throw new Error(error.message);
    }
    return data;
  },

  async updateProfile(userId: string, updates: ProfileUpdate) {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select();

    if (error) {
      console.error("Error updating profile:", error);
      throw new Error(error.message);
    }
    
    // Return first result
    return data && data.length > 0 ? data[0] : null;
  },
};
