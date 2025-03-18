
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Book, 
  Trophy, 
  UserCircle, 
  BarChart2, 
  Puzzle, 
  Menu, 
  X,
  Gamepad
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: <Gamepad className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/quests', icon: <Book className="h-5 w-5" />, label: 'Quests' },
    { path: '/achievements', icon: <Trophy className="h-5 w-5" />, label: 'Achievements' },
    { path: '/stats', icon: <BarChart2 className="h-5 w-5" />, label: 'Stats' },
    { path: '/teams', icon: <Puzzle className="h-5 w-5" />, label: 'Teams' },
    { path: '/profile', icon: <UserCircle className="h-5 w-5" />, label: 'Profile' },
  ];

  // Toggle mobile navigation
  const toggleNav = () => setIsOpen(!isOpen);

  // Handle window resize to ensure desktop nav is visible when resizing from mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Force isOpen to true when switching to desktop to ensure sidebar is visible
        setIsOpen(true);
      }
    };

    // Set isOpen to true on initial load for desktop
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Always make the sidebar visible on desktop, regardless of navigation changes
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile navigation */}
      <div className="md:hidden sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <Gamepad className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">EduQuest</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleNav}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {isOpen && (
          <div className="p-4 bg-white border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setIsOpen(false); // Only close menu on mobile
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg",
                    isActive(item.path) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary text-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:flex flex-col fixed h-full w-64 bg-white border-r p-6 z-50">
        <div className="flex items-center gap-2 mb-10">
          <Gamepad className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl">EduQuest</span>
        </div>
        
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary text-foreground"
              )}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto">
          <div className="bg-blue-50 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-sm text-blue-700">Study Streak</h4>
            <div className="flex items-center mt-2">
              <div className="text-2xl font-bold text-blue-700">7</div>
              <div className="text-sm text-blue-600 ml-2">days</div>
            </div>
            <div className="mt-2 progress-bar">
              <div className="progress-bar-fill" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
