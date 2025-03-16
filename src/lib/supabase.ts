
import { createClient } from '@supabase/supabase-js';

// Supabase client setup
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

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
