
import { UserCircle } from "lucide-react";

interface ProfileHeaderProps {
  title: string;
}

const ProfileHeader = ({ title }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center mb-6">
      <UserCircle className="h-5 w-5 text-primary mr-2" />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default ProfileHeader;
