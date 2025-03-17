
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  energy: number;
  maxEnergy: number;
  avatar: string;
  team: {
    name: string;
    color: string;
  }
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  timeLeft: string;
  xpReward: number;
}

export interface WeeklyProgress {
  studyHours: number;
  targetHours: number;
  questsCompleted: number;
  totalQuests: number;
  streak: number;
}

export const useDashboardData = () => {
  const { profile } = useAuth();
  
  // Mock data - in a real app, this would be fetched from an API
  const [recentQuests] = useState<Quest[]>([
    {
      id: "1",
      title: "Math Practice",
      description: "Complete 20 algebra problems",
      progress: 75,
      timeLeft: "2 hours",
      xpReward: 120
    },
    {
      id: "2",
      title: "History Reading",
      description: "Read chapter 5 of World History textbook",
      progress: 30,
      timeLeft: "1 day",
      xpReward: 150
    },
    {
      id: "3",
      title: "Science Lab Notes",
      description: "Document findings from yesterday's experiment",
      progress: 10,
      timeLeft: "5 hours",
      xpReward: 100
    }
  ]);

  const [weeklyProgress] = useState<WeeklyProgress>({
    studyHours: 12.5,
    targetHours: 20,
    questsCompleted: 8,
    totalQuests: 15,
    streak: 5
  });

  // Default user profile that always works even without authentication
  const userProfile: UserProfile = {
    name: profile?.username || "Guest User",
    level: profile?.level || 5,
    xp: profile?.xp || 750,
    maxXp: profile?.max_xp || 1000,
    energy: profile?.energy || 85,
    maxEnergy: profile?.max_energy || 100,
    avatar: profile?.avatar_url || "https://api.dicebear.com/6.x/initials/svg?seed=GU",
    team: {
      name: profile?.team_id ? "Your Team" : "Red Devils",
      color: "#DA291C", // Man United red
    }
  };

  return {
    userProfile,
    recentQuests,
    weeklyProgress
  };
};
