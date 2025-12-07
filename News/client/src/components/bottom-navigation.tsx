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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glossy-nav safe-area-bottom md:hidden">
      <div className="flex items-center justify-around h-[68px] px-2">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path === "/" && location === "/");
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200 animate-press ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
              data-testid={item.testId}
            >
              <div className={`relative p-2 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? "bg-primary/15 scale-110" 
                  : ""
              }`}>
                <Icon className={`h-5 w-5 transition-all ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse" />
                )}
              </div>
              <span className={`text-[10px] transition-all ${
                isActive 
                  ? "font-bold" 
                  : "font-medium"
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 nav-indicator rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
