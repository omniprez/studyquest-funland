
import { Team } from "@/lib/types";
import TeamBadge from "@/components/TeamBadge";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserTeamCardProps {
  team: Team;
}

const UserTeamCard = ({ team }: UserTeamCardProps) => {
  const { profile, user } = useAuth();
  const [userContribution, setUserContribution] = useState(0);
  
  useEffect(() => {
    // Fetch the user's contribution to the team
    const fetchUserContribution = async () => {
      if (!user) return;
      
      try {
        // In a real application, this would query the user's completed quests and sum up points
        // For now, we'll simulate with a random value between 100-500
        const contribution = Math.floor(Math.random() * 400) + 100;
        setUserContribution(contribution);
      } catch (error) {
        console.error('Error fetching user contribution:', error);
      }
    };
    
    fetchUserContribution();
  }, [user]);
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 border">
      <h3 className="font-semibold mb-2">Your Team</h3>
      <div className="flex items-center">
        <TeamBadge 
          name={team.name}
          logo={team.logo}
          color={team.color}
          size="sm"
          className="mr-4"
        />
        <div>
          <div className="font-medium">{team.name}</div>
          <div className="text-sm text-gray-500">
            You've contributed <span className="font-medium">{userContribution}</span> points to your team!
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTeamCard;
