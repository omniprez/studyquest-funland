
import { Settings, Bell, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ProfileHeader from "./ProfileHeader";

interface SettingsProps {
  settings: {
    notifications: boolean;
    darkMode: boolean;
    soundEffects: boolean;
  };
  setSettings: React.Dispatch<React.SetStateAction<{
    notifications: boolean;
    darkMode: boolean;
    soundEffects: boolean;
  }>>;
}

const SettingsPanel = ({ settings, setSettings }: SettingsProps) => {
  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
    
    toast.success(`${setting} ${!settings[setting] ? "enabled" : "disabled"}`);
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <ProfileHeader title="Settings" />
      
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
  );
};

export default SettingsPanel;
