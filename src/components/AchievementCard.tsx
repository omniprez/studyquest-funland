
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const AchievementCard = ({
  title,
  description,
  icon,
  color,
  unlocked,
  progress = 0,
  maxProgress = 100,
}: AchievementCardProps) => {
  const progressPercentage = Math.min(Math.round((progress / maxProgress) * 100), 100);
  
  return (
    <div 
      className={cn(
        "relative p-4 border rounded-xl bg-white transition-all hover:shadow",
        unlocked ? "border-green-500" : "border-gray-200"
      )}
    >
      <div className="flex items-start space-x-4">
        <div 
          className={cn(
            "flex-shrink-0 p-3 rounded-full",
            unlocked ? "animate-pulse-glow" : "opacity-50"
          )}
          style={{ 
            backgroundColor: `${color}20`,
            boxShadow: unlocked ? `0 0 10px ${color}50` : "none"
          }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          
          {!unlocked && maxProgress > 0 && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
                <span>Progress</span>
                <span>{progress}/{maxProgress}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${progressPercentage}%`,
                    backgroundColor: color
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {unlocked && (
        <div className="absolute top-2 right-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
