
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { toast } from "sonner";
import { Team } from "@/lib/types";
import TeamCard from "@/components/teams/TeamCard";
import TeamDetailCard from "@/components/teams/TeamDetailCard";
import UserTeamCard from "@/components/teams/UserTeamCard";
import TeamLeaderboard from "@/components/teams/TeamLeaderboard";
import TeamBenefits from "@/components/teams/TeamBenefits";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, profile, loading: authLoading } = useAuth();

  // Fetch teams from the database
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('rank', { ascending: true });
          
        if (error) {
          console.error('Error fetching teams:', error);
          toast.error('Failed to load teams');
          return;
        }
        
        setTeams(data || []);
      } catch (error) {
        console.error('Error in teams fetch:', error);
        toast.error('Failed to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Get user's current team
  useEffect(() => {
    if (profile?.team_id && teams.length > 0) {
      const team = teams.find(t => t.id === profile.team_id);
      if (team) {
        setUserTeam(team);
      }
    }
  }, [profile, teams]);

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleJoinTeam = async () => {
    if (!selectedTeam || !user) {
      toast.error("Please select a team first or log in");
      return;
    }

    try {
      setLoading(true);
      
      // Update the user's profile with the selected team
      const { data, error } = await supabase
        .from('profiles')
        .update({ team_id: selectedTeam.id })
        .eq('id', user.id)
        .select();
        
      if (error) {
        console.error('Error joining team:', error);
        toast.error('Failed to join team');
        return;
      }
      
      setUserTeam(selectedTeam);
      toast.success(`You joined ${selectedTeam.name}!`, {
        description: "Your studies will now earn points for your team!"
      });
    } catch (error) {
      console.error('Error in join team:', error);
      toast.error('Failed to join team');
    } finally {
      setLoading(false);
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
        
        {loading ? (
          <div className="text-center py-8">Loading teams...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {teams.map((team) => (
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
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TeamLeaderboard teams={teams} userTeam={userTeam} />
        <TeamBenefits />
      </div>
    </div>
  );
};

export default TeamsPage;
