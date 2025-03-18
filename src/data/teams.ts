
import { Team } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

// This is the static fallback data, but the app should now use
// the real data from Supabase in the TeamsPage component
export const teamsData: Team[] = [
  {
    id: "1",
    name: "Quantum Minds",
    logo: "https://api.dicebear.com/6.x/shapes/svg?seed=QM",
    color: "#DA291C",
    members: 1243,
    rank: 1,
    totalPoints: 15780
  },
  {
    id: "2",
    name: "Logic Lions",
    logo: "https://api.dicebear.com/6.x/shapes/svg?seed=LL",
    color: "#C8102E",
    members: 1124,
    rank: 2,
    totalPoints: 14980
  },
  {
    id: "3",
    name: "Cosmic Scholars",
    logo: "https://api.dicebear.com/6.x/shapes/svg?seed=CS",
    color: "#034694",
    members: 1056,
    rank: 3,
    totalPoints: 14230
  },
  {
    id: "4",
    name: "Digital Wizards",
    logo: "https://api.dicebear.com/6.x/shapes/svg?seed=DW",
    color: "#EF0107",
    members: 987,
    rank: 4,
    totalPoints: 13650
  },
  {
    id: "5",
    name: "Nova Explorers",
    logo: "https://api.dicebear.com/6.x/shapes/svg?seed=NE",
    color: "#6CABDD",
    members: 967,
    rank: 5,
    totalPoints: 13420
  },
  {
    id: "6",
    name: "Phoenix Academy",
    logo: "https://api.dicebear.com/6.x/shapes/svg?seed=PA",
    color: "#132257",
    members: 912,
    rank: 6,
    totalPoints: 12870
  }
];

// Function to fetch teams from Supabase
export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('rank', { ascending: true });
      
    if (error) {
      console.error('Error fetching teams:', error);
      return teamsData; // Fallback to static data
    }
    
    return data as Team[] || teamsData;
  } catch (error) {
    console.error('Error in teams fetch:', error);
    return teamsData; // Fallback to static data
  }
};
