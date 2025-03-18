
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

// Team type for the application
export type Team = {
  id: string;
  name: string;
  logo: string;
  color: string;
  description?: string;
  members?: number;
  rank?: number;
  totalPoints?: number;
  created_at?: string;
  updated_at?: string;
};

// Quest type definition
export type Quest = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  type: 'reading' | 'revision' | 'homework' | 'activity';
  duration_minutes: number;
  xp_reward: number;
  energy_reward: number;
  progress: number;
  completed: boolean;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
};
