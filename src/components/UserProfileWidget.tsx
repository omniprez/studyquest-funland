
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Star, Zap } from "lucide-react";

interface UserProfileWidgetProps {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  energy: number;
  maxEnergy: number;
  avatar: string;
  team: {
    name: string;
    color: string;
  };
}

const UserProfileWidget = ({
  name,
  level,
  xp,
  maxXp,
  energy,
  maxEnergy,
  avatar,
  team,
}: UserProfileWidgetProps) => {
  const xpPercentage = Math.round((xp / maxXp) * 100);
  const energyPercentage = Math.round((energy / maxEnergy) * 100);

  return (
    <div className="bg-white rounded-xl border p-4 flex flex-col md:flex-row md:items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <Avatar className="h-16 w-16 border-2 animate-pulse-glow" style={{ borderColor: team.color }}>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="font-bold text-lg">{name}</h2>
          <div className="flex items-center text-sm text-gray-500">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: team.color }}
            ></div>
            {team.name} Fan
          </div>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-exp-point mr-1" />
              <span className="text-sm font-medium">Level {level}</span>
            </div>
            <span className="text-xs text-gray-500">{xp}/{maxXp} XP</span>
          </div>
          <Progress 
            value={xpPercentage} 
            className="h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-yellow-600" 
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Zap className="h-4 w-4 text-energy mr-1" />
              <span className="text-sm font-medium">Energy</span>
            </div>
            <span className="text-xs text-gray-500">{energy}/{maxEnergy}</span>
          </div>
          <Progress 
            value={energyPercentage} 
            className="h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-green-600" 
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileWidget;
