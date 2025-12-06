import { User, Settings, Info, ExternalLink, Moon, Sun } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/lib/theme-context";

export default function Profile() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      
      <main className="flex-1 p-4 pb-20">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-3">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-semibold" data-testid="text-profile-guest">
            Guest User
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in to save your preferences
          </p>
        </div>

        <Card className="divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
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
          
          <Separator />
          
          <button 
            className="flex items-center gap-3 p-4 w-full text-left hover-elevate"
            data-testid="button-settings"
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Settings</p>
              <p className="text-sm text-muted-foreground">
                Customize your experience
              </p>
            </div>
          </button>
          
          <Separator />
          
          <button 
            className="flex items-center gap-3 p-4 w-full text-left hover-elevate"
            data-testid="button-about"
          >
            <Info className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">About</p>
              <p className="text-sm text-muted-foreground">
                Version 1.0.0
              </p>
            </div>
          </button>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Indian ePapers aggregates links to official e-paper websites.
          </p>
          <p className="text-xs text-muted-foreground">
            All content belongs to respective newspaper publishers.
          </p>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}
