
import { supabase } from "@/integrations/supabase/client";
import { Quest } from "@/lib/types";
import { User } from "@supabase/supabase-js";

export const fetchUserQuests = async (user: User | null): Promise<Quest[]> => {
  if (!user) return [];
  
  try {
    const { data, error } = await supabase
      .from('quests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching quests:', error);
      return [];
    }
    
    return data as Quest[];
  } catch (error) {
    console.error('Error in quests fetch:', error);
    return [];
  }
};

export const createQuest = async (user: User | null, quest: Omit<Quest, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'progress' | 'completed'>): Promise<Quest | null> => {
  if (!user) return null;
  
  try {
    const newQuest = {
      ...quest,
      user_id: user.id,
      progress: 0,
      completed: false
    };
    
    const { data, error } = await supabase
      .from('quests')
      .insert(newQuest)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating quest:', error);
      return null;
    }
    
    return data as Quest;
  } catch (error) {
    console.error('Error in quest creation:', error);
    return null;
  }
};

export const updateQuestProgress = async (questId: string, progress: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('quests')
      .update({ progress })
      .eq('id', questId);
      
    if (error) {
      console.error('Error updating quest progress:', error);
    }
  } catch (error) {
    console.error('Error in quest progress update:', error);
  }
};

export const completeQuest = async (questId: string, userId: string): Promise<boolean> => {
  try {
    // First, get the quest to find out its rewards
    const { data: quest, error: fetchError } = await supabase
      .from('quests')
      .select('*')
      .eq('id', questId)
      .single();
      
    if (fetchError || !quest) {
      console.error('Error fetching quest for completion:', fetchError);
      return false;
    }
    
    // Update the quest to be completed with 100% progress
    const { error: updateError } = await supabase
      .from('quests')
      .update({ 
        completed: true, 
        progress: 100,
        updated_at: new Date().toISOString()
      })
      .eq('id', questId);
      
    if (updateError) {
      console.error('Error completing quest:', updateError);
      return false;
    }
    
    // Update the user's profile with the rewards (XP and energy)
    const { data: profile, error: profileFetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (profileFetchError || !profile) {
      console.error('Error fetching user profile:', profileFetchError);
      return false;
    }
    
    // Calculate new XP and energy
    const newXp = profile.xp + quest.xp_reward;
    const newEnergy = Math.min(profile.energy + quest.energy_reward, profile.max_energy);
    
    // Check if user should level up
    let newLevel = profile.level;
    let newMaxXp = profile.max_xp;
    
    if (newXp >= profile.max_xp) {
      newLevel += 1;
      newMaxXp = Math.round(profile.max_xp * 1.5); // Increase max XP by 50% per level
    }
    
    // Update the user's profile
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({
        xp: newXp,
        level: newLevel,
        max_xp: newMaxXp,
        energy: newEnergy
      })
      .eq('id', userId);
      
    if (profileUpdateError) {
      console.error('Error updating user profile after quest completion:', profileUpdateError);
      return false;
    }
    
    // If the user is part of a team, add points to the team
    if (profile.team_id) {
      const { data: team, error: teamFetchError } = await supabase
        .from('teams')
        .select('total_points')
        .eq('id', profile.team_id)
        .single();
        
      if (!teamFetchError && team) {
        const newTeamPoints = team.total_points + quest.xp_reward;
        
        const { error: teamUpdateError } = await supabase
          .from('teams')
          .update({ total_points: newTeamPoints })
          .eq('id', profile.team_id);
          
        if (teamUpdateError) {
          console.error('Error updating team points:', teamUpdateError);
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error in quest completion process:', error);
    return false;
  }
};
