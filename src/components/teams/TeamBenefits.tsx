
import { Trophy, Star, Users } from "lucide-react";

const TeamBenefits = () => {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="text-xl font-semibold mb-4">Team Benefits</h2>
      <ul className="space-y-3">
        <li className="flex items-start">
          <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
            <Trophy className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-sm">
            <span className="font-medium">Compete together</span>
            <p className="text-gray-500">Work with your teammates to reach the top of the leaderboard</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
            <Star className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-sm">
            <span className="font-medium">Bonus rewards</span>
            <p className="text-gray-500">Members of the top teams receive special badges and bonuses</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5">
            <Users className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-sm">
            <span className="font-medium">Study buddies</span>
            <p className="text-gray-500">Connect with other students who support your team</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TeamBenefits;
