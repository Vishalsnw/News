import { User, Settings, Info, Moon, Sun, ChevronRight } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/theme-context";

export default function Profile() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      
      <main className="flex-1 p-4 pb-24">
        <div className="flex flex-col items-center mb-8 pt-4">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/80 to-primary rounded-3xl flex items-center justify-center mb-4 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            <User className="h-12 w-12 text-white relative z-10" />
          </div>
          <h2 className="text-2xl font-bold" data-testid="text-profile-guest">
            Guest User
          </h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Sign in to save your preferences
          </p>
        </div>

        <div className="newspaper-card-glossy divide-y divide-border/50 overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                theme === "dark" 
                  ? "bg-gradient-to-br from-indigo-400 to-indigo-600" 
                  : "bg-gradient-to-br from-amber-400 to-amber-600"
              }`}>
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 text-white" />
                ) : (
                  <Sun className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold">Dark Mode</p>
                <p className="text-sm text-muted-foreground font-medium">
                  {theme === "dark" ? "On" : "Off"}
                </p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              data-testid="switch-dark-mode"
            />
          </div>
          
          <button 
            className="flex items-center gap-4 p-4 w-full text-left transition-colors hover:bg-muted/30 animate-press"
            data-testid="button-settings"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center shadow-sm">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Settings</p>
              <p className="text-sm text-muted-foreground font-medium">
                Customize your experience
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <button 
            className="flex items-center gap-4 p-4 w-full text-left transition-colors hover:bg-muted/30 animate-press"
            data-testid="button-about"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <Info className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">About</p>
              <p className="text-sm text-muted-foreground font-medium">
                Version 1.0.0
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-medium mb-1">
            Indian ePapers aggregates links to official e-paper websites.
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            All content belongs to respective newspaper publishers.
          </p>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}
