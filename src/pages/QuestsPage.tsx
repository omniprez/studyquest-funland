
import { useState } from "react";
import { 
  Book, 
  Brain, 
  Award, 
  Clock, 
  Calendar, 
  Filter,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DailyQuestCard from "@/components/DailyQuestCard";
import { toast } from "sonner";

type QuestType = "reading" | "revision" | "homework" | "activity";
type QuestFilter = "all" | QuestType;

interface Quest {
  id: string;
  type: QuestType;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  energyReward: number;
  completed: boolean;
  progress: number;
}

const QuestsPage = () => {
  const [filter, setFilter] = useState<QuestFilter>("all");
  const [dailyQuests, setDailyQuests] = useState<Quest[]>([
    {
      id: "1",
      type: "reading",
      title: "Daily Reading",
      description: "Read a book for at least 60 minutes",
      durationMinutes: 60,
      xpReward: 100,
      energyReward: 20,
      completed: false,
      progress: 0,
    },
    {
      id: "2",
      type: "revision",
      title: "Math Revision",
      description: "Review this week's math lessons",
      durationMinutes: 45,
      xpReward: 80,
      energyReward: 15,
      completed: false,
      progress: 0,
    },
    {
      id: "3",
      type: "homework",
      title: "Science Homework",
      description: "Complete today's science assignments",
      durationMinutes: 30,
      xpReward: 60,
      energyReward: 10,
      completed: false,
      progress: 25,
    },
    {
      id: "4",
      type: "activity",
      title: "Language Practice",
      description: "Practice new vocabulary words",
      durationMinutes: 20,
      xpReward: 40,
      energyReward: 5,
      completed: false,
      progress: 0,
    },
  ]);
  
  const [weeklyQuests, setWeeklyQuests] = useState<Quest[]>([
    {
      id: "5",
      type: "reading",
      title: "Book Challenge",
      description: "Finish reading one book this week",
      durationMinutes: 240,
      xpReward: 300,
      energyReward: 50,
      completed: false,
      progress: 30,
    },
    {
      id: "6",
      type: "homework",
      title: "Project Completion",
      description: "Finish your history project by Friday",
      durationMinutes: 180,
      xpReward: 250,
      energyReward: 40,
      completed: false,
      progress: 45,
    },
    {
      id: "7",
      type: "revision",
      title: "Test Preparation",
      description: "Prepare for next week's math test",
      durationMinutes: 120,
      xpReward: 200,
      energyReward: 30,
      completed: false,
      progress: 10,
    },
  ]);

  const handleStartTracking = (questId: string, questList: "daily" | "weekly") => {
    // In a real app, this would start a timer or tracking mechanism
    toast.info("Tracking started!", {
      description: "Your progress will update automatically as you study."
    });
    
    // For demo purposes, we'll just update progress to show some activity
    if (questList === "daily") {
      setDailyQuests(dailyQuests.map(quest => 
        quest.id === questId ? { ...quest, progress: 30 } : quest
      ));
    } else {
      setWeeklyQuests(weeklyQuests.map(quest => 
        quest.id === questId ? { ...quest, progress: Math.min(quest.progress + 20, 100) } : quest
      ));
    }
  };

  const handleCompleteQuest = (questId: string, questList: "daily" | "weekly") => {
    if (questList === "daily") {
      setDailyQuests(dailyQuests.map(quest => 
        quest.id === questId ? { ...quest, completed: true, progress: 100 } : quest
      ));
    } else {
      setWeeklyQuests(weeklyQuests.map(quest => 
        quest.id === questId ? { ...quest, completed: true, progress: 100 } : quest
      ));
    }
  };

  const filteredDailyQuests = filter === "all" 
    ? dailyQuests 
    : dailyQuests.filter(quest => quest.type === filter);
    
  const filteredWeeklyQuests = filter === "all"
    ? weeklyQuests
    : weeklyQuests.filter(quest => quest.type === filter);

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
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Quest
          </Button>
        </div>
      </div>
      
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
            {filteredDailyQuests.length > 0 ? (
              filteredDailyQuests.map(quest => (
                <DailyQuestCard
                  key={quest.id}
                  type={quest.type}
                  title={quest.title}
                  description={quest.description}
                  durationMinutes={quest.durationMinutes}
                  xpReward={quest.xpReward}
                  energyReward={quest.energyReward}
                  completed={quest.completed}
                  progress={quest.progress}
                  onStartTracking={() => handleStartTracking(quest.id, "daily")}
                  onComplete={() => handleCompleteQuest(quest.id, "daily")}
                />
              ))
            ) : (
              <div className="col-span-2 text-center p-10 border rounded-xl bg-gray-50">
                <p className="text-lg text-gray-500">No quests found with the selected filter.</p>
                <Button variant="outline" className="mt-4" onClick={() => setFilter("all")}>
                  Show All Quests
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWeeklyQuests.length > 0 ? (
              filteredWeeklyQuests.map(quest => (
                <DailyQuestCard
                  key={quest.id}
                  type={quest.type}
                  title={quest.title}
                  description={quest.description}
                  durationMinutes={quest.durationMinutes}
                  xpReward={quest.xpReward}
                  energyReward={quest.energyReward}
                  completed={quest.completed}
                  progress={quest.progress}
                  onStartTracking={() => handleStartTracking(quest.id, "weekly")}
                  onComplete={() => handleCompleteQuest(quest.id, "weekly")}
                />
              ))
            ) : (
              <div className="col-span-2 text-center p-10 border rounded-xl bg-gray-50">
                <p className="text-lg text-gray-500">No quests found with the selected filter.</p>
                <Button variant="outline" className="mt-4" onClick={() => setFilter("all")}>
                  Show All Quests
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
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
