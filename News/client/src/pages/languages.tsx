import { Globe, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/app-header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { languages, type Newspaper } from "@shared/schema";
import { useMemo } from "react";

export default function Languages() {
  const [, setLocation] = useLocation();

  const { data: newspapers, isLoading } = useQuery<Newspaper[]>({
    queryKey: ["/api/newspapers"],
  });

  const languageStats = useMemo(() => {
    if (!newspapers) return {};
    const stats: Record<string, number> = {};
    newspapers.forEach((np) => {
      stats[np.language] = (stats[np.language] || 0) + 1;
    });
    return stats;
  }, [newspapers]);

  const handleSelectLanguage = (languageCode: string) => {
    setLocation("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      
      <main className="flex-1 p-4 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold" data-testid="text-languages-title">
              Browse by Language
            </h2>
            <p className="text-sm text-muted-foreground">
              Select a language to see newspapers
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-20" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {languages
              .filter((lang) => lang.code !== "all")
              .map((lang) => (
                <Card
                  key={lang.code}
                  className="flex items-center justify-between p-4 hover-elevate active-elevate-2 cursor-pointer"
                  onClick={() => handleSelectLanguage(lang.code)}
                  data-testid={`card-language-${lang.code}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-medium">
                      {lang.nativeName}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {lang.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {languageStats[lang.code] || 0} papers
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              ))}
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
}
