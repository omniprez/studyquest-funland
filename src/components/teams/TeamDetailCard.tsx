
import { Team } from "@/lib/types";
import TeamBadge from "@/components/TeamBadge";
import { Users, Star, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamDetailCardProps {
  team: Team;
  userTeam: Team | null;
  onJoinTeam: () => void;
}

const TeamDetailCard = ({ team, userTeam, onJoinTeam }: TeamDetailCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
      <div className="flex flex-col sm:flex-row items-center">
        <TeamBadge 
          name={team.name}
          logo={team.logo}
          color={team.color}
          size="sm"
          className="mb-4 sm:mb-0 sm:mr-4"
        />
        
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold">{team.name}</h3>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-1 text-blue-500" />
              <span>{team.members} members</span>
            </div>
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              <span>{team.totalPoints.toLocaleString()} points</span>
            </div>
            <div className="flex items-center text-sm">
              <Flag className="h-4 w-4 mr-1 text-green-500" />
              <span>Rank #{team.rank}</span>
            </div>
          </div>
        </div>
        
        {team.id !== userTeam?.id && (
          <Button 
            onClick={onJoinTeam} 
            className="mt-4 sm:mt-0"
            style={{ backgroundColor: team.color }}
          >
            Join Team
          </Button>
        )}
      </div>
    </div>
  );
};

export default TeamDetailCard;
