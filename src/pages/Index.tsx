
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Trophy, 
  Zap, 
  Clock, 
  ArrowRight,
  Brain,
  BarChart2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import UserProfileWidget from "@/components/UserProfileWidget";
import UserMenuDropdown from "@/components/UserMenuDropdown";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { profile } = useAuth();
  
  const [recentQuests] = useState([
    {
      id: "1",
      title: "Math Practice",
      description: "Complete 20 algebra problems",
      progress: 75,
      timeLeft: "2 hours",
      xpReward: 120
    },
    {
      id: "2",
      title: "History Reading",
      description: "Read chapter 5 of World History textbook",
      progress: 30,
      timeLeft: "1 day",
      xpReward: 150
    },
    {
      id: "3",
      title: "Science Lab Notes",
      description: "Document findings from yesterday's experiment",
      progress: 10,
      timeLeft: "5 hours",
      xpReward: 100
    }
  ]);

  const [weeklyProgress] = useState({
    studyHours: 12.5,
    targetHours: 20,
    questsCompleted: 8,
    totalQuests: 15,
    streak: 5
  });

  const handleStartQuest = (id: string) => {
    toast.success("Quest started!", {
      description: "Timer has started for this quest."
    });
  };

  // Convert Supabase profile to the format expected by UserProfileWidget
  const userProfile = profile ? {
    name: profile.username,
    level: profile.level,
    xp: profile.xp,
    maxXp: profile.max_xp,
    energy: profile.energy,
    maxEnergy: profile.max_energy,
    avatar: profile.avatar_url,
    team: {
      name: "Default Team", // This would come from the teams table
      color: "#DA291C",
    }
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <UserMenuDropdown />
        </div>
        
        {/* User Profile */}
        {userProfile && (
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
        )}
        
        {/* Weekly Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Time</CardTitle>
              <CardDescription>Weekly hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {weeklyProgress.studyHours} 
                <span className="text-gray-400 text-sm font-normal ml-1">
                  / {weeklyProgress.targetHours}h
                </span>
              </div>
              <Progress 
                value={(weeklyProgress.studyHours / weeklyProgress.targetHours) * 100} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quests</CardTitle>
              <CardDescription>Completed this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {weeklyProgress.questsCompleted}
                <span className="text-gray-400 text-sm font-normal ml-1">
                  / {weeklyProgress.totalQuests}
                </span>
              </div>
              <Progress 
                value={(weeklyProgress.questsCompleted / weeklyProgress.totalQuests) * 100} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Streak</CardTitle>
              <CardDescription>Consecutive days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {weeklyProgress.streak}
                <Zap className="h-5 w-5 ml-1 text-yellow-500" />
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Keep it up! 2 more days to unlock a reward!
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Next Level</CardTitle>
              <CardDescription>XP required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userProfile ? userProfile.maxXp - userProfile.xp : 0} XP
              </div>
              <Progress 
                value={userProfile ? (userProfile.xp / userProfile.maxXp) * 100 : 0} 
                className="h-2 mt-2 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-yellow-600" 
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Active Quests */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Quests</h2>
            <Link to="/quests">
              <Button variant="ghost" className="text-sm">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentQuests.map(quest => (
              <Card key={quest.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{quest.title}</CardTitle>
                    <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      +{quest.xpReward} XP
                    </div>
                  </div>
                  <CardDescription>{quest.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{quest.progress}%</span>
                  </div>
                  <Progress value={quest.progress} className="h-2" />
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{quest.timeLeft} remaining</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    size="sm" 
                    className="w-full" 
                    variant={quest.progress > 0 ? "outline" : "default"}
                    onClick={() => handleStartQuest(quest.id)}
                  >
                    {quest.progress > 0 ? "Continue Quest" : "Start Quest"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/quests">
              <Card className="hover:bg-primary/5 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="font-medium text-center">Start Study Session</h3>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    Begin tracking your study time
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/achievements">
              <Card className="hover:bg-primary/5 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                  <h3 className="font-medium text-center">View Achievements</h3>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    Check your progress and badges
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/quests">
              <Card className="hover:bg-primary/5 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Brain className="h-8 w-8 text-purple-500 mb-2" />
                  <h3 className="font-medium text-center">Create New Quest</h3>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    Add a custom study challenge
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/stats">
              <Card className="hover:bg-primary/5 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <BarChart2 className="h-8 w-8 text-green-500 mb-2" />
                  <h3 className="font-medium text-center">View Statistics</h3>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    Analyze your study patterns
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        
        {/* Study Tip Card */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Daily Study Tip</h2>
          <p className="text-blue-700">
            Try the "Pomodoro Technique": Study for 25 minutes, then take a 5-minute break. 
            After completing 4 cycles, take a longer 15-30 minute break. This helps maintain focus and prevent burnout.
          </p>
          <Button variant="outline" className="mt-4 bg-white hover:bg-blue-50" onClick={() => toast.success("New tip will be available tomorrow!")}>
            Mark as Read
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
