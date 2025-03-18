
import { Team } from "@/lib/types";
import TeamBadge from "@/components/TeamBadge";
import { useAuth } from "@/context/AuthContext";

interface UserTeamCardProps {
  team: Team;
}

const UserTeamCard = ({ team }: UserTeamCardProps) => {
  const { profile } = useAuth();
  
  // In a real application, you would fetch the user's contribution to the team
  // For now, we'll use a random value between 100-500
  const userContribution = Math.floor(Math.random() * 400) + 100;
  
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
