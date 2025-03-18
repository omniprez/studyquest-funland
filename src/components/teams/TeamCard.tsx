
import { Team } from "@/lib/types";
import TeamBadge from "@/components/TeamBadge";
import { Users, Star, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamCardProps {
  team: Team;
  userTeam: Team | null;
  selectedTeam: Team | null;
  onTeamClick: (team: Team) => void;
  onJoinTeam: () => void;
}

const TeamCard = ({ team, userTeam, selectedTeam, onTeamClick, onJoinTeam }: TeamCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => onTeamClick(team)}>
      <TeamBadge 
        name={team.name}
        logo={team.logo}
        color={team.color}
        size="md"
        selected={selectedTeam?.id === team.id || userTeam?.id === team.id}
      />
      <span className="mt-2 text-sm font-medium">
        {team.name}
      </span>
      <span className="text-xs text-gray-500">
        Rank #{team.rank}
      </span>
    </div>
  );
};

export default TeamCard;
