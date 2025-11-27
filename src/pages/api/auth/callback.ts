
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res.redirect("/auth/login?error=missing_code");
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return res.redirect("/auth/login?error=authentication_failed");
    }

    if (!data.session) {
      return res.redirect("/auth/login?error=no_session");
    }

    // Set cookies for the session
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    
    res.setHeader("Set-Cookie", [
      `sb-access-token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`,
      `sb-refresh-token=${data.session.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`,
    ]);

    // Redirect to dashboard
    return res.redirect("/");
  } catch (error) {
    console.error("Unexpected error in auth callback:", error);
    return res.redirect("/auth/login?error=unexpected_error");
  }
}
