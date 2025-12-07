import { Search, X, Newspaper } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

interface AppHeaderProps {
  onSearch?: (query: string) => void;
}

export function AppHeader({ onSearch }: AppHeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-40 glossy-header">
      <div className="flex items-center justify-between gap-3 h-16 px-4">
        {showSearch ? (
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search newspapers..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                className="search-input w-full h-10 pl-10 pr-4 rounded-xl text-sm font-medium outline-none"
                data-testid="input-search"
              />
            </div>
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
                onSearch?.("");
              }}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors animate-press"
              data-testid="button-close-search"
            >
              <span className="sr-only">Close search</span>
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                <Newspaper className="h-5 w-5 text-white relative z-10" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight" data-testid="text-app-title">
                  Indian ePapers
                </h1>
                <p className="text-[10px] text-white/70 font-medium -mt-0.5">
                  All newspapers in one place
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(true)}
                className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors animate-press"
                data-testid="button-search"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
              <ThemeToggle />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
