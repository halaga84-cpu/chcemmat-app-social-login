import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { itemService } from "./itemService";

export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

/**
 * Reservation Insert Payload
 * CRITICAL: Must match EXACT structure of reservations table
 * Table columns: id, item_id, reserver_name, reserver_email, message, created_at
 */
interface ReservationInsertPayload {
  item_id: string;
  reserver_name: string;
  reserver_email: string | null;
  message: string | null;
}

/**
 * Reservation Service
 * Handles reservation creation for anonymous and authenticated users
 * RLS Policy: allow_anonymous_insert_reservations (public can INSERT with check: true)
 */
export const reservationService = {
  /**
   * Create a new reservation for an item
   * Works for ANONYMOUS users (no auth.uid() required)
   * 
   * @param reservationData - Reservation data with optional fields
   * @returns Created reservation object
   * @throws Error if reservation creation fails or item update fails
   */
  async createReservation(reservationData: {
    item_id: string;
    reserver_name?: string;
    reserver_email?: string;
    message?: string;
  }): Promise<Reservation> {
    // STEP 1: Construct payload with safe defaults for undefined values
    // This prevents Supabase from rejecting rows with misleading RLS errors
    const insertPayload: ReservationInsertPayload = {
      item_id: reservationData.item_id,
      reserver_name: reservationData.reserver_name || "Guest",
      reserver_email: reservationData.reserver_email || null,
      message: reservationData.message || null,
    };

    // STEP 2: Insert reservation using ARRAY SYNTAX (required for proper error handling)
    const { data, error } = await supabase
      .from("reservations")
      .insert([insertPayload])
      .select()
      .single();

    if (error) {
      console.error("Error creating reservation:", error);
      
      // Handle duplicate reservation attempt
      if (error.code === "23505") {
        throw new Error("This item is already reserved.");
      }
      
      // Handle RLS policy violations
      if (error.code === "42501") {
        throw new Error("You do not have permission to reserve this item.");
      }
      
      throw new Error(`Failed to create reservation: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned after creating reservation.");
    }

    // STEP 3: Update item status to 'reserved' with rollback on failure
    try {
      await itemService.updateItem(reservationData.item_id, { status: "reserved" });
    } catch (updateError) {
      console.error("Failed to update item status. Rolling back reservation...", updateError);
      
      // ROLLBACK: Delete the reservation if item status update fails
      try {
        await supabase.from("reservations").delete().eq("id", data.id);
        console.log(`Rollback successful: Deleted reservation ${data.id}`);
      } catch (rollbackError) {
        console.error("Rollback failed! Manual cleanup required:", rollbackError);
      }
      
      throw new Error("Could not complete reservation. The item status could not be updated.");
    }

    // STEP 4: Return the successfully created reservation
    return data;
  },

  /**
   * Get reservation details for a specific item
   *
   * @param itemId - ID of the item
   * @returns Reservation object or null if not found
   */
  async getReservationByItem(itemId: string): Promise<Reservation | null> {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("item_id", itemId)
      .single();

    // PGRST116: "exact one row expected, but 0 rows were found" -> this is not an error for us, just means no reservation exists.
    if (error && error.code !== "PGRST116") {
      console.error("Error fetching reservation by item:", error);
      throw new Error(`Failed to fetch reservation: ${error.message}`);
    }

    return data;
  },

  /**
   * Cancel a reservation (delete from database)
   * RLS Policy: Only wishlist owner can delete reservations
   * 
   * @param reservationId - ID of the reservation to cancel
   * @throws Error if cancellation fails or user lacks permission
   */
  async cancelReservation(reservationId: string): Promise<void> {
    const { error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", reservationId);

    if (error) {
      console.error("Error canceling reservation:", error);
      
      // Handle RLS policy violations (user is not wishlist owner)
      if (error.code === "42501") {
        throw new Error("You do not have permission to cancel this reservation.");
      }
      
      throw new Error(`Failed to cancel reservation: ${error.message}`);
    }
  },
};
