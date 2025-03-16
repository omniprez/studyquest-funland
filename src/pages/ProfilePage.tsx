
import { useState } from "react";
import { 
  UserCircle, 
  Settings, 
  Trophy, 
  Edit, 
  Image,
  Bell,
  Moon,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import TeamBadge from "@/components/TeamBadge";
import { toast } from "sonner";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=12",
    level: 7,
    xp: 1450,
    maxXp: 2000,
    team: {
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
      color: "#DA291C",
    }
  });
  
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEffects: true,
  });

  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleUpdateAvatar = () => {
    toast.success("Avatar updated successfully!");
  };

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
    
    toast.success(`${setting} ${!settings[setting] ? "enabled" : "disabled"}`);
  };

  const recentAchievements = [
    {
      id: "1",
      title: "Reading Enthusiast",
      date: "2 days ago",
    },
    {
      id: "2",
      title: "Quick Learner",
      date: "5 days ago",
    },
    {
      id: "3",
      title: "First Steps",
      date: "1 week ago",
    },
  ];

  const xpPercentage = Math.round((user.xp / user.maxXp) * 100);

  return (
    <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <button 
                className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full"
                onClick={handleUpdateAvatar}
              >
                <Image className="h-4 w-4" />
              </button>
            </div>
            
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
                className="h-2" 
                indicatorClassName="bg-gradient-to-r from-yellow-400 to-yellow-600" 
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
          
          <div className="bg-white rounded-xl border p-6 mt-6">
            <div className="flex items-center mb-4">
              <Trophy className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Recent Achievements</h2>
            </div>
            
            <div className="space-y-4">
              {recentAchievements.map(achievement => (
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
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border p-6 mb-6">
            <div className="flex items-center mb-6">
              <UserCircle className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border rounded-md"
                    value="alex.johnson@example.com"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter your school name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
            
            <Button className="mt-6" onClick={handleUpdateProfile}>
              Save Changes
            </Button>
          </div>
          
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center mb-6">
              <Settings className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium">Notifications</div>
                    <div className="text-xs text-gray-500">Receive quest reminders and updates</div>
                  </div>
                </div>
                <Switch 
                  checked={settings.notifications} 
                  onCheckedChange={() => handleSettingChange("notifications")} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium">Dark Mode</div>
                    <div className="text-xs text-gray-500">Enable dark theme for the app</div>
                  </div>
                </div>
                <Switch 
                  checked={settings.darkMode} 
                  onCheckedChange={() => handleSettingChange("darkMode")} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-gray-500 mr-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12H18M6 8H18M6 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Sound Effects</div>
                    <div className="text-xs text-gray-500">Play sounds for achievements and activities</div>
                  </div>
                </div>
                <Switch 
                  checked={settings.soundEffects}
                  onCheckedChange={() => handleSettingChange("soundEffects")} 
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="text-destructive border-destructive flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
