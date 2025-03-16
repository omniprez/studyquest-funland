
import { Star, Zap, Trophy } from "lucide-react";

const AchievementRewards = () => {
  return (
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
  );
};

export default AchievementRewards;
