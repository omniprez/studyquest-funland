
import { useEffect, useState } from "react";
import { 
  BarChart2, 
  Clock, 
  Book, 
  Brain, 
  Award, 
  Activity, 
  ArrowUp, 
  CalendarDays 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Week statistics data
const weeklyData = [
  { name: "Mon", reading: 45, revision: 30, homework: 60, activity: 20 },
  { name: "Tue", reading: 60, revision: 40, homework: 30, activity: 35 },
  { name: "Wed", reading: 35, revision: 45, homework: 55, activity: 40 },
  { name: "Thu", reading: 50, revision: 35, homework: 20, activity: 30 },
  { name: "Fri", reading: 75, revision: 60, homework: 40, activity: 25 },
  { name: "Sat", reading: 90, revision: 75, homework: 65, activity: 55 },
  { name: "Sun", reading: 65, revision: 50, homework: 35, activity: 45 },
];

// Month statistics data
const monthlyData = [
  { name: "Week 1", reading: 250, revision: 180, homework: 200, activity: 150 },
  { name: "Week 2", reading: 300, revision: 210, homework: 180, activity: 165 },
  { name: "Week 3", reading: 280, revision: 250, homework: 230, activity: 180 },
  { name: "Week 4", reading: 340, revision: 290, homework: 250, activity: 210 },
];

// Distribution data
const distributionData = [
  { name: "Reading", value: 35, color: "#3B82F6" },
  { name: "Revision", value: 25, color: "#A855F7" },
  { name: "Homework", value: 30, color: "#F97316" },
  { name: "Activity", value: 10, color: "#22C55E" },
];

const COLORS = ["#3B82F6", "#A855F7", "#F97316", "#22C55E"];

interface StatsCardProps {
  title: string;
  value: string;
  subValue?: string;
  change?: number;
  icon: React.ReactNode;
  iconColor: string;
}

const StatsCard = ({ title, value, subValue, change, icon, iconColor }: StatsCardProps) => (
  <div className="bg-white rounded-xl border p-4 flex justify-between">
    <div>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      {subValue && <div className="text-sm text-gray-500 mt-1">{subValue}</div>}
      {change !== undefined && (
        <div className={`flex items-center mt-2 text-xs ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
          {change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : "↓"}
          <span>{Math.abs(change)}% from last week</span>
        </div>
      )}
    </div>
    <div 
      className="flex items-center justify-center p-3 rounded-full"
      style={{ backgroundColor: `${iconColor}20` }}
    >
      <div style={{ color: iconColor }}>{icon}</div>
    </div>
  </div>
);

const StatsPage = () => {
  const [selectedTab, setSelectedTab] = useState("weekly");
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  useEffect(() => {
    // Calculate total study time from weekly data
    const total = weeklyData.reduce((sum, day) => {
      return sum + day.reading + day.revision + day.homework + day.activity;
    }, 0);
    setTotalStudyTime(total);
  }, []);

  const averageDailyStudyTime = Math.round(totalStudyTime / weeklyData.length);
  const readingPercentage = Math.round(
    (weeklyData.reduce((sum, day) => sum + day.reading, 0) / totalStudyTime) * 100
  );

  return (
    <div className="container mx-auto py-6 px-4 md:px-0 md:ml-64">
      <h1 className="text-3xl font-bold mb-6">Study Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Study Time" 
          value={`${totalStudyTime} min`}
          subValue="This week"
          change={12}
          icon={<Clock className="h-5 w-5" />}
          iconColor="#3B82F6"
        />
        <StatsCard 
          title="Daily Average" 
          value={`${averageDailyStudyTime} min`}
          subValue="Per day"
          change={5}
          icon={<CalendarDays className="h-5 w-5" />}
          iconColor="#A855F7"
        />
        <StatsCard 
          title="Reading Time" 
          value={`${readingPercentage}%`}
          subValue="Of total time"
          change={-3}
          icon={<Book className="h-5 w-5" />}
          iconColor="#F97316"
        />
        <StatsCard 
          title="Streak" 
          value="7 days"
          subValue="Current"
          change={100}
          icon={<Activity className="h-5 w-5" />}
          iconColor="#22C55E"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl border p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Study Time</h2>
            </div>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={selectedTab === "weekly" ? weeklyData : monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="reading" name="Reading" fill="#3B82F6" />
                <Bar dataKey="revision" name="Revision" fill="#A855F7" />
                <Bar dataKey="homework" name="Homework" fill="#F97316" />
                <Bar dataKey="activity" name="Activity" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center mb-6">
            <Brain className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-xl font-semibold">Study Distribution</h2>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            {distributionData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-4">Study Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Book className="h-4 w-4 text-blue-500 mr-2" />
              <h3 className="font-medium">Reading</h3>
            </div>
            <p className="text-sm text-gray-600">
              You're spending a good amount of time on reading. 
              Keep it up to improve your comprehension skills!
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Brain className="h-4 w-4 text-purple-500 mr-2" />
              <h3 className="font-medium">Revision</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your revision time has increased by 15% this week.
              This will help solidify your knowledge!
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Award className="h-4 w-4 text-orange-500 mr-2" />
              <h3 className="font-medium">Improvement</h3>
            </div>
            <p className="text-sm text-gray-600">
              Try to maintain a balanced study schedule across all activities
              for the best learning outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
