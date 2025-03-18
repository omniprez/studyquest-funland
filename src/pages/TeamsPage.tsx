
import { useState } from "react";
import { Trophy } from "lucide-react";
import { toast } from "sonner";
import { teamsData } from "@/data/teams";
import { Team } from "@/lib/types";
import TeamCard from "@/components/teams/TeamCard";
import TeamDetailCard from "@/components/teams/TeamDetailCard";
import UserTeamCard from "@/components/teams/UserTeamCard";
import TeamLeaderboard from "@/components/teams/TeamLeaderboard";
import TeamBenefits from "@/components/teams/TeamBenefits";

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
          <h2 className="text-xl font-semibold">Academic Teams</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Join an academic team to compete with other students! Complete study quests to earn points for your team.
          The team with the most points at the end of the month wins special rewards!
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {teamsData.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              userTeam={userTeam}
              selectedTeam={selectedTeam}
              onTeamClick={handleTeamClick}
              onJoinTeam={handleJoinTeam}
            />
          ))}
        </div>
        
        {selectedTeam && selectedTeam.id !== userTeam?.id && (
          <TeamDetailCard
            team={selectedTeam}
            userTeam={userTeam}
            onJoinTeam={handleJoinTeam}
          />
        )}
        
        {userTeam && (
          <UserTeamCard team={userTeam} />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TeamLeaderboard teams={teamsData} userTeam={userTeam} />
        <TeamBenefits />
      </div>
    </div>
  );
};

export default TeamsPage;
