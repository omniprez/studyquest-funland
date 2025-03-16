
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProfileHeader from "./ProfileHeader";

interface PersonalInfoFormProps {
  user: {
    name: string;
  };
  setUser: React.Dispatch<React.SetStateAction<{
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
  }>>;
}

const PersonalInfoForm = ({ user, setUser }: PersonalInfoFormProps) => {
  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="bg-white rounded-xl border p-6 mb-6">
      <ProfileHeader title="Personal Information" />
      
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
  );
};

export default PersonalInfoForm;
