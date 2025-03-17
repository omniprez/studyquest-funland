
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

  // Convert Supabase profile to the format expected by UserProfileWidget
  const userProfile: UserProfile | null = profile ? {
    name: profile.username,
    level: profile.level,
    xp: profile.xp,
    maxXp: profile.max_xp,
    energy: profile.energy,
    maxEnergy: profile.max_energy,
    avatar: profile.avatar_url,
    team: {
      name: "Default Team", // This would come from the teams table
      color: "#DA291C",
    }
  } : null;

  return {
    userProfile,
    recentQuests,
    weeklyProgress
  };
};
