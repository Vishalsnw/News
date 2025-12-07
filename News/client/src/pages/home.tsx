import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/app-header";
import { LanguageFilter } from "@/components/language-filter";
import { NewspaperCard, NewspaperCardSkeleton } from "@/components/newspaper-card";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Newspaper as NewspaperIcon, AlertCircle, Sparkles } from "lucide-react";
import type { Newspaper } from "@shared/schema";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: newspapers, isLoading, error } = useQuery<Newspaper[]>({
    queryKey: ["/api/newspapers"],
  });

  const filteredNewspapers = useMemo(() => {
    if (!newspapers) return [];
    
    let filtered = newspapers;
    
    if (selectedLanguage !== "all") {
      filtered = filtered.filter((np) => np.language === selectedLanguage);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (np) =>
          np.name.toLowerCase().includes(query) ||
          np.language.toLowerCase().includes(query) ||
          np.region.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [newspapers, selectedLanguage, searchQuery]);

  const featuredNewspapers = useMemo(() => {
    return newspapers?.filter((np) => np.featured) || [];
  }, [newspapers]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader onSearch={setSearchQuery} />
      
      <LanguageFilter
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
      
      <ScrollArea className="flex-1 pb-24 md:pb-4">
        <main className="px-4 pb-4">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <NewspaperCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-destructive/10 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
                <AlertCircle className="h-10 w-10 text-destructive" />
              </div>
              <h2 className="text-lg font-bold mb-2" data-testid="text-error-title">
                Failed to load newspapers
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs">
                Please check your connection and try again
              </p>
            </div>
          ) : filteredNewspapers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mb-4 shadow-lg">
                <NewspaperIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-bold mb-2" data-testid="text-empty-title">
                No newspapers found
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs">
                {searchQuery ? "Try a different search term" : "No newspapers available for this language"}
              </p>
            </div>
          ) : (
            <>
              {selectedLanguage === "all" && !searchQuery && featuredNewspapers.length > 0 && (
                <section className="mb-6 mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h2 className="section-title" data-testid="text-section-featured">
                      Featured
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {featuredNewspapers.map((newspaper) => (
                      <NewspaperCard key={newspaper.id} newspaper={newspaper} />
                    ))}
                  </div>
                </section>
              )}
              
              <section className={selectedLanguage === "all" && !searchQuery && featuredNewspapers.length > 0 ? "" : "mt-4"}>
                <div className="flex items-center gap-2 mb-4">
                  <NewspaperIcon className="h-4 w-4 text-primary" />
                  <h2 className="section-title" data-testid="text-section-all">
                    {selectedLanguage === "all" 
                      ? "All Newspapers" 
                      : `${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Newspapers`}
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredNewspapers
                    .filter((np) => selectedLanguage !== "all" || !np.featured || searchQuery)
                    .map((newspaper) => (
                      <NewspaperCard key={newspaper.id} newspaper={newspaper} />
                    ))}
                </div>
              </section>
            </>
          )}
        </main>
      </ScrollArea>
      
      <BottomNavigation />
    </div>
  );
}
