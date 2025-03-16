
import { useState } from "react";
import { Trophy, Star, Flame, Rocket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementProgress from "@/components/achievements/AchievementProgress";
import AchievementRewards from "@/components/achievements/AchievementRewards";
import AchievementGrid from "@/components/achievements/AchievementGrid";
import { achievementsData } from "@/data/achievements";
import { Achievement } from "@/types/achievement";

const AchievementsPage = () => {
  const [achievements] = useState<Achievement[]>(achievementsData);

  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  
  const milestoneAchievements = achievements.filter(a => a.type === "milestone");
  const dailyAchievements = achievements.filter(a => a.type === "daily");
  const specialAchievements = achievements.filter(a => a.type === "special");

  // Find the next achievement to unlock (first non-unlocked with highest progress percentage)
  const nextAchievement = achievements
    .filter(a => !a.unlocked && a.progress !== undefined && a.maxProgress !== undefined)
    .sort((a, b) => {
      const percentA = (a.progress! / a.maxProgress!) * 100;
      const percentB = (b.progress! / b.maxProgress!) * 100;
      return percentB - percentA;
    })[0]?.title || "None";

  return (
    <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      
      <AchievementProgress 
        unlockedAchievements={unlockedAchievements} 
        totalAchievements={totalAchievements} 
        nextAchievement={nextAchievement}
      />
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            All
          </TabsTrigger>
          <TabsTrigger value="milestone" className="flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex items-center">
            <Flame className="h-4 w-4 mr-2" />
            Daily Streaks
          </TabsTrigger>
          <TabsTrigger value="special" className="flex items-center">
            <Rocket className="h-4 w-4 mr-2" />
            Special
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <AchievementGrid achievements={achievements} />
        </TabsContent>
        
        <TabsContent value="milestone" className="mt-4">
          <AchievementGrid achievements={milestoneAchievements} />
        </TabsContent>
        
        <TabsContent value="daily" className="mt-4">
          <AchievementGrid achievements={dailyAchievements} />
        </TabsContent>
        
        <TabsContent value="special" className="mt-4">
          <AchievementGrid achievements={specialAchievements} />
        </TabsContent>
      </Tabs>
      
      <AchievementRewards />
    </div>
  );
};

export default AchievementsPage;
