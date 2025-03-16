
import { cn } from "@/lib/utils";

interface TeamBadgeProps {
  name: string;
  logo: string;
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

const TeamBadge = ({
  name,
  logo,
  color,
  size = "md",
  className,
  selected = false,
  onClick,
}: TeamBadgeProps) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  return (
    <div 
      className={cn(
        "relative rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
        sizeClasses[size],
        selected && "animate-pulse-glow ring-2 ring-offset-2",
        onClick && "hover:scale-110",
        className
      )}
      style={{ 
        backgroundColor: color,
        boxShadow: selected ? `0 0 10px ${color}80` : "none",
        ringColor: color
      }}
      onClick={onClick}
    >
      <img 
        src={logo} 
        alt={name} 
        className="w-3/4 h-3/4 object-contain"
      />
    </div>
  );
};

export default TeamBadge;
