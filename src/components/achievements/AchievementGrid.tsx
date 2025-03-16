
import AchievementCard from "@/components/AchievementCard";
import { Achievement } from "@/types/achievement";

interface AchievementGridProps {
  achievements: Achievement[];
}

const AchievementGrid = ({ achievements }: AchievementGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map(achievement => (
        <AchievementCard
          key={achievement.id}
          title={achievement.title}
          description={achievement.description}
          icon={achievement.icon}
          color={achievement.color}
          unlocked={achievement.unlocked}
          progress={achievement.progress}
          maxProgress={achievement.maxProgress}
        />
      ))}
    </div>
  );
};

export default AchievementGrid;
