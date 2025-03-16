
import { Progress } from "@/components/ui/progress";

interface AchievementProgressProps {
  unlockedAchievements: number;
  totalAchievements: number;
  nextAchievement: string;
}

const AchievementProgress = ({
  unlockedAchievements,
  totalAchievements,
  nextAchievement,
}: AchievementProgressProps) => {
  const achievementPercentage = Math.round((unlockedAchievements / totalAchievements) * 100);

  return (
    <div className="bg-white rounded-xl border p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Your Achievement Progress</h2>
          <p className="text-gray-500 mt-1">
            You've unlocked {unlockedAchievements} out of {totalAchievements} achievements
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
            <span className="text-xl font-bold">{achievementPercentage}%</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Next achievement:</span>
            <span className="font-medium">{nextAchievement}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span>Overall Progress</span>
          <span>{unlockedAchievements}/{totalAchievements}</span>
        </div>
        <Progress value={achievementPercentage} className="h-2" />
      </div>
    </div>
  );
};

export default AchievementProgress;
