import { Search, Menu, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
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
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between gap-2 h-14 px-4">
        {showSearch ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search newspapers..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              className="flex-1"
              data-testid="input-search"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
                onSearch?.("");
              }}
              data-testid="button-close-search"
            >
              <span className="sr-only">Close search</span>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-semibold" data-testid="text-app-title">
                Indian ePapers
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(true)}
                data-testid="button-search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
