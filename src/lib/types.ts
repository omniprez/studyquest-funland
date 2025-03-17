
// Profile type matches what's in lib/supabase.ts
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
