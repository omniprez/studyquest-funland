
import { Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface UserAvatarProps {
  avatar: string;
  name: string;
}

const UserAvatar = ({ avatar, name }: UserAvatarProps) => {
  const handleUpdateAvatar = () => {
    toast.success("Avatar updated successfully!");
  };

  return (
    <div className="relative mb-4">
      <Avatar className="h-24 w-24 border-4 border-primary">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <button 
        className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full"
        onClick={handleUpdateAvatar}
      >
        <Image className="h-4 w-4" />
      </button>
    </div>
  );
};

export default UserAvatar;
