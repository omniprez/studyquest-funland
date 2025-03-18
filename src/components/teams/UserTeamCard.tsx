
import { Team } from "@/lib/types";
import TeamBadge from "@/components/TeamBadge";

interface UserTeamCardProps {
  team: Team;
}

const UserTeamCard = ({ team }: UserTeamCardProps) => {
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
            You've contributed <span className="font-medium">230</span> points to your team!
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTeamCard;
