
import { Team } from "@/lib/types";
import TeamBadge from "@/components/TeamBadge";

interface TeamLeaderboardProps {
  teams: Team[];
  userTeam: Team | null;
}

const TeamLeaderboard = ({ teams, userTeam }: TeamLeaderboardProps) => {
  return (
    <div className="bg-white rounded-xl border p-6 col-span-2">
      <h2 className="text-xl font-semibold mb-4">Team Leaderboard</h2>
      <div className="overflow-hidden rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Members
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Points
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teams.map((team) => (
              <tr key={team.id} className={userTeam?.id === team.id ? "bg-blue-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {team.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <TeamBadge 
                      name={team.name}
                      logo={team.logo}
                      color={team.color}
                      size="sm"
                      className="mr-3"
                    />
                    <span className="text-sm font-medium">{team.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {team.members}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {team.totalPoints.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamLeaderboard;
