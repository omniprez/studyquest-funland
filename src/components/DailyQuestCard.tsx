
import { useState } from "react";
import { Book, Clock, CheckCircle, Award, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type QuestType = "reading" | "revision" | "homework" | "activity";

interface DailyQuestCardProps {
  type: QuestType;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  energyReward: number;
  completed: boolean;
  progress: number;
  onComplete: () => void;
  onStartTracking: () => void;
}

const DailyQuestCard = ({
  type,
  title,
  description,
  durationMinutes,
  xpReward,
  energyReward,
  completed,
  progress,
  onComplete,
  onStartTracking,
}: DailyQuestCardProps) => {
  const [isTracking, setIsTracking] = useState(false);

  const handleStartTracking = () => {
    setIsTracking(true);
    onStartTracking();
    toast.success(`Started tracking: ${title}`);
  };

  const handleComplete = () => {
    setIsTracking(false);
    onComplete();
    toast.success(`Quest completed: ${title}`, {
      description: `You earned ${xpReward} XP and ${energyReward} Energy!`,
    });
  };

  const getIcon = () => {
    switch (type) {
      case "reading":
        return <Book className="h-5 w-5" />;
      case "revision":
        return <Brain className="h-5 w-5" />;
      case "homework":
        return <Award className="h-5 w-5" />;
      case "activity":
        return <Clock className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "reading":
        return "text-blue-500";
      case "revision":
        return "text-purple-500";
      case "homework":
        return "text-orange-500";
      case "activity":
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "reading":
        return "bg-blue-50";
      case "revision":
        return "bg-purple-50";
      case "homework":
        return "bg-orange-50";
      case "activity":
        return "bg-green-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <div 
      className={cn(
        "quest-card transition-all duration-300", 
        completed && "quest-card-completed",
        "hover:translate-y-[-5px]"
      )}
    >
      <div className="flex flex-col p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div 
              className={cn(
                "p-2 rounded-full mr-3", 
                getBackgroundColor()
              )}
            >
              <div className={getIconColor()}>{getIcon()}</div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          {completed && (
            <CheckCircle className="text-green-500 h-6 w-6" />
          )}
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{durationMinutes} minutes</span>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2" 
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-3">
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-xs">
              <Star className="h-3 w-3 text-yellow-500 mr-1" />
              <span>{xpReward} XP</span>
            </div>
            <div className="flex items-center bg-green-100 px-2 py-1 rounded text-xs">
              <Zap className="h-3 w-3 text-green-500 mr-1" />
              <span>{energyReward} Energy</span>
            </div>
          </div>
          {!completed ? (
            isTracking ? (
              <Button 
                size="sm" 
                onClick={handleComplete}
                className="bg-green-500 hover:bg-green-600"
              >
                Complete
              </Button>
            ) : (
              <Button 
                size="sm" 
                onClick={handleStartTracking}
              >
                Start
              </Button>
            )
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              disabled 
              className="text-green-500 border-green-500"
            >
              Completed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Star = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className || "h-6 w-6"}
  >
    <path 
      fillRule="evenodd" 
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
      clipRule="evenodd" 
    />
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className || "h-6 w-6"}
  >
    <path 
      fillRule="evenodd" 
      d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" 
      clipRule="evenodd" 
    />
  </svg>
);

export default DailyQuestCard;
