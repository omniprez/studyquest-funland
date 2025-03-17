
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import UserProfileWidget from "@/components/UserProfileWidget";
import UserMenuDropdown from "@/components/UserMenuDropdown";
import WeeklyProgressSummary from "@/components/dashboard/WeeklyProgressSummary";
import ActiveQuestsSection from "@/components/dashboard/ActiveQuestsSection";
import QuickActions from "@/components/dashboard/QuickActions";
import DailyStudyTip from "@/components/dashboard/DailyStudyTip";
import { useDashboardData } from "@/hooks/useDashboardData";

const Index = () => {
  const { userProfile, recentQuests, weeklyProgress } = useDashboardData();
  
  if (!userProfile || !weeklyProgress || !recentQuests) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <UserMenuDropdown />
        </div>
        
        {/* User Profile */}
        <UserProfileWidget 
          name={userProfile.name}
          level={userProfile.level}
          xp={userProfile.xp}
          maxXp={userProfile.maxXp}
          energy={userProfile.energy}
          maxEnergy={userProfile.maxEnergy}
          avatar={userProfile.avatar}
          team={userProfile.team}
        />
        
        {/* Weekly Progress Summary */}
        <WeeklyProgressSummary 
          studyHours={weeklyProgress.studyHours}
          targetHours={weeklyProgress.targetHours}
          questsCompleted={weeklyProgress.questsCompleted}
          totalQuests={weeklyProgress.totalQuests}
          streak={weeklyProgress.streak}
          userXp={userProfile.xp}
          userMaxXp={userProfile.maxXp}
        />
        
        {/* Active Quests */}
        <ActiveQuestsSection quests={recentQuests} />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Study Tip Card */}
        <DailyStudyTip />
      </div>
    </div>
  );
};

export default Index;
