import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// ✅ CORRECT: Use environment variables from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check .env.local file."
  );
}

// ✅ CRITICAL: This client ONLY uses the ANON key for all operations
// It will authenticate users via auth.signInWithPassword() and similar methods
// The anon key respects RLS policies and allows anonymous operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
