
import { useState } from "react";
import { 
  Trophy,
  Users,
  Star,
  Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamBadge from "@/components/TeamBadge";
import { toast } from "sonner";

interface Team {
  id: number;
  name: string;
  logo: string;
  color: string;
  members: number;
  rank: number;
  totalPoints: number;
}

const teamsData: Team[] = [
  {
    id: 1,
    name: "Manchester United",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    color: "#DA291C",
    members: 1243,
    rank: 1,
    totalPoints: 15780
  },
  {
    id: 2,
    name: "Liverpool",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    color: "#C8102E",
    members: 1124,
    rank: 2,
    totalPoints: 14980
  },
  {
    id: 3,
    name: "Chelsea",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    color: "#034694",
    members: 1056,
    rank: 3,
    totalPoints: 14230
  },
  {
    id: 4,
    name: "Arsenal",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    color: "#EF0107",
    members: 987,
    rank: 4,
    totalPoints: 13650
  },
  {
    id: 5,
    name: "Manchester City",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    color: "#6CABDD",
    members: 967,
    rank: 5,
    totalPoints: 13420
  },
  {
    id: 6,
    name: "Tottenham Hotspur",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
    color: "#132257",
    members: 912,
    rank: 6,
    totalPoints: 12870
  }
];

const TeamsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [userTeam, setUserTeam] = useState<Team | null>(null);

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleJoinTeam = () => {
    if (selectedTeam) {
      setUserTeam(selectedTeam);
      toast.success(`You joined ${selectedTeam.name}!`, {
        description: "Your studies will now earn points for your team!"
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
      <h1 className="text-3xl font-bold mb-6">Teams Competition</h1>
      
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex items-center mb-4">
          <Trophy className="h-6 w-6 text-exp-point mr-2" />
          <h2 className="text-xl font-semibold">Football Club Teams</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Join a football club team to compete with other students! Complete study quests to earn points for your team.
          The team with the most points at the end of the month wins special rewards!
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {teamsData.map((team) => (
            <div 
              key={team.id} 
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleTeamClick(team)}
            >
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
          ))}
        </div>
        
        {selectedTeam && selectedTeam.id !== userTeam?.id && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
            <div className="flex flex-col sm:flex-row items-center">
              <TeamBadge 
                name={selectedTeam.name}
                logo={selectedTeam.logo}
                color={selectedTeam.color}
                size="sm"
                className="mb-4 sm:mb-0 sm:mr-4"
              />
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold">{selectedTeam.name}</h3>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{selectedTeam.members} members</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>{selectedTeam.totalPoints.toLocaleString()} points</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Flag className="h-4 w-4 mr-1 text-green-500" />
                    <span>Rank #{selectedTeam.rank}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleJoinTeam} 
                className="mt-4 sm:mt-0"
                style={{ backgroundColor: selectedTeam.color }}
              >
                Join Team
              </Button>
            </div>
          </div>
        )}
        
        {userTeam && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold mb-2">Your Team</h3>
            <div className="flex items-center">
              <TeamBadge 
                name={userTeam.name}
                logo={userTeam.logo}
                color={userTeam.color}
                size="sm"
                className="mr-4"
              />
              <div>
                <div className="font-medium">{userTeam.name}</div>
                <div className="text-sm text-gray-500">
                  You've contributed <span className="font-medium">230</span> points to your team!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {teamsData.map((team) => (
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
        
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Team Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                <Trophy className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-sm">
                <span className="font-medium">Compete together</span>
                <p className="text-gray-500">Work with your teammates to reach the top of the leaderboard</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                <Star className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-sm">
                <span className="font-medium">Bonus rewards</span>
                <p className="text-gray-500">Members of the top teams receive special badges and bonuses</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5">
                <Users className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-sm">
                <span className="font-medium">Study buddies</span>
                <p className="text-gray-500">Connect with other students who support your team</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
