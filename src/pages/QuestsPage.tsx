import { useState, useEffect } from "react";
import { 
  Book, 
  Brain, 
  Award, 
  Clock, 
  Calendar, 
  Filter,
  Plus,
  Loader2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DailyQuestCard from "@/components/DailyQuestCard";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Quest } from "@/lib/types";
import { fetchUserQuests, createQuest, updateQuestProgress, completeQuest } from "@/services/questService";

type QuestFilter = "all" | Quest["type"];

const QuestsPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<QuestFilter>("all");
  const [loading, setLoading] = useState(true);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    type: "reading" as Quest["type"],
    duration_minutes: 30,
    xp_reward: 100,
    energy_reward: 20
  });
  
  useEffect(() => {
    const loadQuests = async () => {
      setLoading(true);
      const userQuests = await fetchUserQuests(user);
      setQuests(userQuests);
      setLoading(false);
    };
    
    loadQuests();
  }, [user]);
  
  const handleCreateQuest = async () => {
    if (!newQuest.title) {
      toast.error("Please provide a title for your quest");
      return;
    }
    
    try {
      const createdQuest = await createQuest(user, newQuest);
      
      if (createdQuest) {
        setQuests(prev => [createdQuest, ...prev]);
        setNewQuest({
          title: "",
          description: "",
          type: "reading",
          duration_minutes: 30,
          xp_reward: 100,
          energy_reward: 20
        });
        setIsDialogOpen(false);
        toast.success("Quest created successfully!");
      } else {
        toast.error("Failed to create quest. Please try again.");
      }
    } catch (error) {
      console.error("Error creating quest:", error);
      toast.error("An error occurred while creating your quest");
    }
  };

  const handleStartTracking = async (questId: string) => {
    toast.info("Tracking started!", {
      description: "Your progress will update automatically as you study."
    });
    
    const questToUpdate = quests.find(q => q.id === questId);
    if (questToUpdate) {
      const newProgress = Math.min(questToUpdate.progress + 30, 99);
      await updateQuestProgress(questId, newProgress);
      
      setQuests(quests.map(quest => 
        quest.id === questId ? { ...quest, progress: newProgress } : quest
      ));
    }
  };

  const handleCompleteQuest = async (questId: string) => {
    if (!user) return;
    
    try {
      const success = await completeQuest(questId, user.id);
      
      if (success) {
        setQuests(quests.map(quest => 
          quest.id === questId ? { ...quest, completed: true, progress: 100 } : quest
        ));
        
        toast.success("Quest completed!", {
          description: "You've earned rewards for completing this quest."
        });
      } else {
        toast.error("Failed to complete quest. Please try again.");
      }
    } catch (error) {
      console.error("Error completing quest:", error);
      toast.error("An error occurred while completing your quest");
    }
  };

  const dailyQuests = quests.filter(quest => 
    !quest.due_date && (filter === "all" || quest.type === filter)
  );
  
  const weeklyQuests = quests.filter(quest => 
    quest.due_date && (filter === "all" || quest.type === filter)
  );

  return (
    <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Your Quests</h1>
        
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter: {filter === "all" ? "All Types" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("reading")}>
                Reading
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("revision")}>
                Revision
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("homework")}>
                Homework
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("activity")}>
                Activity
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Quest
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Quest</DialogTitle>
                <DialogDescription>
                  Add a new study quest to track your learning progress.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Quest Title</Label>
                  <Input 
                    id="title" 
                    value={newQuest.title}
                    onChange={(e) => setNewQuest({...newQuest, title: e.target.value})}
                    placeholder="e.g., Complete Math Chapter 5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newQuest.description}
                    onChange={(e) => setNewQuest({...newQuest, description: e.target.value})}
                    placeholder="Describe what you need to do"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Quest Type</Label>
                  <Select 
                    value={newQuest.type} 
                    onValueChange={(value) => setNewQuest({...newQuest, type: value as Quest["type"]})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a quest type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reading">Reading</SelectItem>
                      <SelectItem value="revision">Revision</SelectItem>
                      <SelectItem value="homework">Homework</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration" 
                    type="number"
                    min="5"
                    value={newQuest.duration_minutes}
                    onChange={(e) => setNewQuest({...newQuest, duration_minutes: parseInt(e.target.value) || 30})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)} variant="outline">Cancel</Button>
                <Button onClick={handleCreateQuest}>Create Quest</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading quests...</span>
        </div>
      ) : (
        <Tabs defaultValue="daily" className="mb-6">
          <TabsList>
            <TabsTrigger value="daily" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Daily Quests
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Weekly Quests
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dailyQuests.length > 0 ? (
                dailyQuests.map(quest => (
                  <DailyQuestCard
                    key={quest.id}
                    type={quest.type}
                    title={quest.title}
                    description={quest.description}
                    durationMinutes={quest.duration_minutes}
                    xpReward={quest.xp_reward}
                    energyReward={quest.energy_reward}
                    completed={quest.completed}
                    progress={quest.progress}
                    onStartTracking={() => handleStartTracking(quest.id)}
                    onComplete={() => handleCompleteQuest(quest.id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center p-10 border rounded-xl bg-gray-50">
                  <p className="text-lg text-gray-500">No daily quests found. Create your first quest!</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                    Create Quest
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weeklyQuests.length > 0 ? (
                weeklyQuests.map(quest => (
                  <DailyQuestCard
                    key={quest.id}
                    type={quest.type}
                    title={quest.title}
                    description={quest.description}
                    durationMinutes={quest.duration_minutes}
                    xpReward={quest.xp_reward}
                    energyReward={quest.energy_reward}
                    completed={quest.completed}
                    progress={quest.progress}
                    onStartTracking={() => handleStartTracking(quest.id)}
                    onComplete={() => handleCompleteQuest(quest.id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center p-10 border rounded-xl bg-gray-50">
                  <p className="text-lg text-gray-500">No weekly quests found. Create your first weekly quest!</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                    Create Quest
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Quest Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Book className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Reading Quests</h3>
              <p className="text-sm text-gray-600">
                Read books, articles, or educational content for at least 60 minutes daily. 
                Track your progress and earn XP for every page you complete.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <Brain className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Revision Quests</h3>
              <p className="text-sm text-gray-600">
                Review and practice what you've learned to reinforce knowledge.
                Daily revision quests help you retain information better.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <Award className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Homework Quests</h3>
              <p className="text-sm text-gray-600">
                Complete assignments from school or self-study materials.
                Earn bonus XP for submitting homework before deadlines.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Clock className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Activity Quests</h3>
              <p className="text-sm text-gray-600">
                Engage in educational activities like solving puzzles, practicing languages,
                or working on creative projects to earn additional rewards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
