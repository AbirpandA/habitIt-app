import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

/**
 * Supabase Client Configuration
 *
 * This module initializes and exports a Supabase client instance
 * for use throughout the application. It reads configuration from
 * environment variables that should be defined in .env.local
 */

const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl ||
  process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase configuration. Please ensure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are set in your environment.",
  );
}

/**
 * Create and export the Supabase client instance
 * This client is used to interact with the Supabase backend
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
