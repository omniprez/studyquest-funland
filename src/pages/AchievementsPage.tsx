
import { useState } from "react";
import { 
  Trophy, 
  Star, 
  Book, 
  Fire, 
  Calendar, 
  Clock, 
  Lightbulb, 
  Brain,
  Award,
  Target,
  Puzzle,
  Rocket,
  Zap,
  Medal
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import AchievementCard from "@/components/AchievementCard";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  type: "milestone" | "daily" | "special";
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    // Milestone achievements
    {
      id: "m1",
      title: "Reading Enthusiast",
      description: "Complete 10 reading quests",
      icon: <Book className="h-5 w-5" />,
      color: "#3B82F6",
      type: "milestone",
      unlocked: true,
      progress: 10,
      maxProgress: 10,
    },
    {
      id: "m2",
      title: "Study Marathon",
      description: "Study for a total of 24 hours",
      icon: <Clock className="h-5 w-5" />,
      color: "#8B5CF6",
      type: "milestone",
      unlocked: false,
      progress: 18,
      maxProgress: 24,
    },
    {
      id: "m3",
      title: "Knowledge Seeker",
      description: "Complete 20 revision quests",
      icon: <Brain className="h-5 w-5" />,
      color: "#EC4899",
      type: "milestone",
      unlocked: false,
      progress: 12,
      maxProgress: 20,
    },
    {
      id: "m4",
      title: "Homework Hero",
      description: "Complete 15 homework assignments on time",
      icon: <Award className="h-5 w-5" />,
      color: "#F97316",
      type: "milestone",
      unlocked: false,
      progress: 9,
      maxProgress: 15,
    },
    
    // Daily streak achievements
    {
      id: "d1",
      title: "First Steps",
      description: "Complete daily quests for 3 days in a row",
      icon: <Target className="h-5 w-5" />,
      color: "#22C55E",
      type: "daily",
      unlocked: true,
      progress: 3,
      maxProgress: 3,
    },
    {
      id: "d2",
      title: "Committed Learner",
      description: "Complete daily quests for 7 days in a row",
      icon: <Fire className="h-5 w-5" />,
      color: "#EF4444",
      type: "daily",
      unlocked: true,
      progress: 7,
      maxProgress: 7,
    },
    {
      id: "d3",
      title: "Consistent Scholar",
      description: "Complete daily quests for 14 days in a row",
      icon: <Calendar className="h-5 w-5" />,
      color: "#06B6D4",
      type: "daily",
      unlocked: false,
      progress: 7,
      maxProgress: 14,
    },
    {
      id: "d4",
      title: "Study Master",
      description: "Complete daily quests for 30 days in a row",
      icon: <Trophy className="h-5 w-5" />,
      color: "#F59E0B",
      type: "daily",
      unlocked: false,
      progress: 7,
      maxProgress: 30,
    },
    
    // Special achievements
    {
      id: "s1",
      title: "Team Player",
      description: "Join a team and contribute 500 points",
      icon: <Medal className="h-5 w-5" />,
      color: "#0EA5E9",
      type: "special",
      unlocked: false,
      progress: 230,
      maxProgress: 500,
    },
    {
      id: "s2",
      title: "Quick Learner",
      description: "Complete 3 quests in a single day",
      icon: <Zap className="h-5 w-5" />,
      color: "#8B5CF6",
      type: "special",
      unlocked: true,
      progress: 3,
      maxProgress: 3,
    },
    {
      id: "s3",
      title: "Problem Solver",
      description: "Complete 5 difficult homework quests",
      icon: <Puzzle className="h-5 w-5" />,
      color: "#EC4899",
      type: "special",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: "s4",
      title: "Genius Insight",
      description: "Earn perfect scores on 3 consecutive tests",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "#F59E0B",
      type: "special",
      unlocked: false,
      progress: 1,
      maxProgress: 3,
    },
  ]);

  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const achievementPercentage = Math.round((unlockedAchievements / totalAchievements) * 100);

  const milestoneAchievements = achievements.filter(a => a.type === "milestone");
  const dailyAchievements = achievements.filter(a => a.type === "daily");
  const specialAchievements = achievements.filter(a => a.type === "special");

  return (
    <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      
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
              <span className="font-medium">Study Marathon</span>
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
            <Fire className="h-4 w-4 mr-2" />
            Daily Streaks
          </TabsTrigger>
          <TabsTrigger value="special" className="flex items-center">
            <Rocket className="h-4 w-4 mr-2" />
            Special
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                color={achievement.color}
                unlocked={achievement.unlocked}
                progress={achievement.progress}
                maxProgress={achievement.maxProgress}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="milestone" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestoneAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                color={achievement.color}
                unlocked={achievement.unlocked}
                progress={achievement.progress}
                maxProgress={achievement.maxProgress}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="daily" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                color={achievement.color}
                unlocked={achievement.unlocked}
                progress={achievement.progress}
                maxProgress={achievement.maxProgress}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="special" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                color={achievement.color}
                unlocked={achievement.unlocked}
                progress={achievement.progress}
                maxProgress={achievement.maxProgress}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Achievement Rewards</h2>
            <p className="opacity-80 mt-1">
              Each achievement unlocks special rewards and bonuses!
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                <Star className="h-5 w-5 text-yellow-800" />
              </div>
              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center">
                <Zap className="h-5 w-5 text-green-800" />
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-purple-800" />
              </div>
            </div>
            <span className="text-sm mt-2">Unlock more to reveal</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-yellow-400 p-2 rounded-full mr-3">
                <Star className="h-4 w-4 text-yellow-800" />
              </div>
              <span className="font-medium">XP Boosters</span>
            </div>
            <p className="mt-2 text-sm opacity-80">
              Earn up to 2x XP for completing quests after unlocking milestones
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-green-400 p-2 rounded-full mr-3">
                <Zap className="h-4 w-4 text-green-800" />
              </div>
              <span className="font-medium">Energy Refills</span>
            </div>
            <p className="mt-2 text-sm opacity-80">
              Get bonus energy points to complete more quests without waiting
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-purple-400 p-2 rounded-full mr-3">
                <Trophy className="h-4 w-4 text-purple-800" />
              </div>
              <span className="font-medium">Custom Badges</span>
            </div>
            <p className="mt-2 text-sm opacity-80">
              Unlock exclusive profile badges to show off your accomplishments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
