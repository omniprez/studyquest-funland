
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DailyStudyTip = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 mb-6">
      <h2 className="text-xl font-semibold text-blue-800 mb-2">Daily Study Tip</h2>
      <p className="text-blue-700">
        Try the "Pomodoro Technique": Study for 25 minutes, then take a 5-minute break. 
        After completing 4 cycles, take a longer 15-30 minute break. This helps maintain focus and prevent burnout.
      </p>
      <Button 
        variant="outline" 
        className="mt-4 bg-white hover:bg-blue-50" 
        onClick={() => toast.success("New tip will be available tomorrow!")}
      >
        Mark as Read
      </Button>
    </div>
  );
};

export default DailyStudyTip;
