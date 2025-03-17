
import { Link } from "react-router-dom";
import { BookOpen, Trophy, Brain, BarChart2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const QuickActions = () => {
  return (
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
  );
};

export default QuickActions;
