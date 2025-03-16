
import { ReactNode } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  type: "milestone" | "daily" | "special";
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}
