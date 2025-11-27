
import { supabase } from "@/integrations/supabase/client";
import { profileService, ProfileCreate } from "./profileService";
import type { Session, User as AuthUser } from "@supabase/supabase-js";

export const authService = {
  async getCurrentUser() {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error getting session:", sessionError);
      return null;
    }
    if (!session) return null;

    const { user } = session;
    let profile = await profileService.getProfile(user.id);

    // If profile doesn't exist, create it automatically
    if (!profile) {
      console.log(`Profile not found for user ${user.id}. Creating profile...`);
      try {
        const newProfileData: ProfileCreate = {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email || '',
          default_language: 'sk',
          show_reservation_name: false,
        };
        profile = await profileService.createProfile(newProfileData);
      } catch (error) {
        console.error(`Failed to create profile for user ${user.id}:`, error);
        // Return partial user object as fallback
        return {
          ...user,
          updated_at: null,
          full_name: user.email || '',
          avatar_url: null,
          default_language: 'sk',
          show_reservation_name: false,
        };
      }
    }

    return {
      ...user,
      ...profile,
    };
  },

  async getCurrentSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session:", error);
      return null;
    }
    return data.session;
  },
  
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });
    
    if (error) throw error;
    // The profile is created by a trigger in Supabase, so we don't need to create it here.
    return { user: data.user, session: data.session };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { user: data.user, session: data.session };
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // Log warning but don't throw - session might be expired
        console.warn("Sign out error (will clear session anyway):", error);
      }
    } catch (error) {
      // Catch any exceptions (like AuthSessionMissingError)
      console.warn("Sign out exception (will clear session anyway):", error);
    }
    // Always succeed from the app's perspective - session will be cleared locally
  },
  
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return data;
  },

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return subscription;
  },

  getRedirectUrl() {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel
      'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    url = `${url}auth/callback`;
    return url;
  }
};

export type User = Awaited<ReturnType<typeof authService.getCurrentUser>>;
