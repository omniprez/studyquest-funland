
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

interface WeeklyProgressProps {
  studyHours: number;
  targetHours: number;
  questsCompleted: number;
  totalQuests: number;
  streak: number;
  userXp?: number;
  userMaxXp?: number;
}

const WeeklyProgressSummary = ({
  studyHours,
  targetHours,
  questsCompleted,
  totalQuests,
  streak,
  userXp = 0,
  userMaxXp = 0
}: WeeklyProgressProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Study Time</CardTitle>
          <CardDescription>Weekly hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {studyHours} 
            <span className="text-gray-400 text-sm font-normal ml-1">
              / {targetHours}h
            </span>
          </div>
          <Progress 
            value={(studyHours / targetHours) * 100} 
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
            {questsCompleted}
            <span className="text-gray-400 text-sm font-normal ml-1">
              / {totalQuests}
            </span>
          </div>
          <Progress 
            value={(questsCompleted / totalQuests) * 100} 
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
            {streak}
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
            {userMaxXp - userXp} XP
          </div>
          <Progress 
            value={(userXp / userMaxXp) * 100} 
            className="h-2 mt-2 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-yellow-600" 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyProgressSummary;
