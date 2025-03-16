
import { useState } from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import RecentAchievements from "@/components/profile/RecentAchievements";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import SettingsPanel from "@/components/profile/SettingsPanel";

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

  return (
    <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard user={user} />
          <RecentAchievements achievements={recentAchievements} />
        </div>
        
        <div className="lg:col-span-2">
          <PersonalInfoForm user={user} setUser={setUser} />
          <SettingsPanel settings={settings} setSettings={setSettings} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
