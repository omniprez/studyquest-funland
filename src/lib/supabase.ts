import { createClient } from '@supabase/supabase-js';

// This client is replaced by the one from @/integrations/supabase/client.ts
// Keeping this file for backward compatibility until all code is updated
import { supabase as clientFromIntegration } from '@/integrations/supabase/client';

export const supabase = clientFromIntegration;

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
