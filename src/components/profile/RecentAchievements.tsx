
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Achievement {
  id: string;
  title: string;
  date: string;
}

interface RecentAchievementsProps {
  achievements: Achievement[];
}

const RecentAchievements = ({ achievements }: RecentAchievementsProps) => {
  return (
    <div className="bg-white rounded-xl border p-6 mt-6">
      <div className="flex items-center mb-4">
        <Trophy className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Recent Achievements</h2>
      </div>
      
      <div className="space-y-4">
        {achievements.map(achievement => (
          <div key={achievement.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-1 rounded-full">
                <Trophy className="h-4 w-4 text-yellow-600" />
              </div>
              <span className="ml-3 text-sm font-medium">{achievement.title}</span>
            </div>
            <span className="text-xs text-gray-500">{achievement.date}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="link" className="text-sm">
          View All Achievements
        </Button>
      </div>
    </div>
  );
};

export default RecentAchievements;
