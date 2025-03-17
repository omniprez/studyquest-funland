
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  timeLeft: string;
  xpReward: number;
}

interface ActiveQuestsSectionProps {
  quests: Quest[];
}

const ActiveQuestsSection = ({ quests }: ActiveQuestsSectionProps) => {
  const handleStartQuest = (id: string) => {
    toast.success("Quest started!", {
      description: "Timer has started for this quest."
    });
  };

  return (
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
        {quests.map(quest => (
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
  );
};

export default ActiveQuestsSection;
