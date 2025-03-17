
import { createClient } from '@supabase/supabase-js';

// Supabase client setup with fallbacks to prevent crashes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Only create a real client if we have valid credentials
const isValidConfig = 
  supabaseUrl !== 'https://placeholder-url.supabase.co' && 
  supabaseAnonKey !== 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock profile type
export type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  level: number;
  xp: number;
  max_xp: number;
  energy: number;
  max_energy: number;
  team_id: string | null;
  created_at?: string;
  updated_at?: string;
};
