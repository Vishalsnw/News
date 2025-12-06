import { Home, Heart, Globe, User } from "lucide-react";
import { useLocation } from "wouter";

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
  testId: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/", testId: "nav-home" },
  { icon: Heart, label: "Favorites", path: "/favorites", testId: "nav-favorites" },
  { icon: Globe, label: "Languages", path: "/languages", testId: "nav-languages" },
  { icon: User, label: "Profile", path: "/profile", testId: "nav-profile" },
];

export function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-bottom md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path === "/" && location === "/");
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
              data-testid={item.testId}
            >
              <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
