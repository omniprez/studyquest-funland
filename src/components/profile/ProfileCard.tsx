
import { Edit, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TeamBadge from "@/components/TeamBadge";
import UserAvatar from "./UserAvatar";
import { toast } from "sonner";

interface ProfileCardProps {
  user: {
    name: string;
    avatar: string;
    level: number;
    xp: number;
    maxXp: number;
    team: {
      name: string;
      logo: string;
      color: string;
    }
  }
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const xpPercentage = Math.round((user.xp / user.maxXp) * 100);
  
  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="bg-white rounded-xl border p-6 flex flex-col items-center text-center">
      <UserAvatar avatar={user.avatar} name={user.name} />
      
      <h2 className="text-xl font-bold">{user.name}</h2>
      <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
        <TeamBadge 
          name={user.team.name}
          logo={user.team.logo}
          color={user.team.color}
          size="sm"
          className="mr-2"
        />
        <span>{user.team.name} Fan</span>
      </div>
      
      <div className="mt-6 w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Level {user.level}</span>
          <span className="text-xs text-gray-500">{user.xp}/{user.maxXp} XP</span>
        </div>
        <Progress 
          value={xpPercentage} 
          className="h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-yellow-600" 
        />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {user.maxXp - user.xp} XP to level {user.level + 1}
        </div>
      </div>
      
      <Button variant="outline" className="mt-6 w-full flex items-center justify-center" onClick={handleUpdateProfile}>
        <Edit className="h-4 w-4 mr-2" />
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileCard;
