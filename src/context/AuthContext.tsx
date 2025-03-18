
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Profile } from '@/lib/types';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial session check
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        if (data.session?.user) {
          fetchProfile(data.session.user.id);
        }
      } catch (error) {
        console.error('Unexpected error during session check:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.id);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          fetchProfile(newSession.user.id);
        } else {
          setProfile(null);
        }
        
        if (event === 'SIGNED_IN') {
          navigate('/');
        } else if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        // If no profile found, create one
        if (error.code === 'PGRST116') {
          createProfile(userId);
        }
        return;
      }
      
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error in profile fetch:', error);
    }
  };

  const createProfile = async (userId: string) => {
    try {
      // Create a new profile with default values
      const newProfile = {
        id: userId,
        username: user?.user_metadata?.username || `User_${userId.substring(0, 8)}`,
        avatar_url: `https://api.dicebear.com/6.x/initials/svg?seed=${userId.substring(0, 2)}`,
        level: 1,
        xp: 0,
        max_xp: 1000,
        energy: 100,
        max_energy: 100
      };
      
      const { data, error } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select();
        
      if (error) {
        console.error('Error creating profile:', error);
        return;
      }
      
      setProfile(data[0] as Profile);
    } catch (error) {
      console.error('Error in create profile:', error);
    }
  };

  // Auth methods
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success('Welcome back!');
      // Navigation happens automatically via the auth state listener
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'An unexpected error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success('Account created successfully! Please check your email for confirmation.');
      navigate('/login');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'An unexpected error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      setUser(null);
      setProfile(null);
      setSession(null);
      toast.success('You have been logged out');
      // Navigation happens automatically via the auth state listener
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(error.message || 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        signIn,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
