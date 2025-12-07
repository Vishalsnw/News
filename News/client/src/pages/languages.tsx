import { Globe, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/app-header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { languages, type Newspaper } from "@shared/schema";
import { useMemo } from "react";

const languageGradients: Record<string, string> = {
  english: "from-blue-400 to-blue-600",
  hindi: "from-red-400 to-red-600",
  marathi: "from-orange-400 to-orange-600",
  gujarati: "from-green-400 to-green-600",
  tamil: "from-purple-400 to-purple-600",
  telugu: "from-cyan-400 to-cyan-600",
  bengali: "from-indigo-400 to-indigo-600",
  kannada: "from-amber-400 to-amber-600",
  malayalam: "from-teal-400 to-teal-600",
  punjabi: "from-rose-400 to-rose-600",
};

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
      
      <main className="flex-1 p-4 pb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-primary/80 to-primary rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            <Globe className="h-7 w-7 text-white relative z-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold" data-testid="text-languages-title">
              Browse by Language
            </h2>
            <p className="text-sm text-muted-foreground font-medium">
              Select a language to see newspapers
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="newspaper-card-glossy flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div>
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {languages
              .filter((lang) => lang.code !== "all")
              .map((lang) => {
                const gradient = languageGradients[lang.code] || "from-gray-400 to-gray-600";
                const count = languageStats[lang.code] || 0;
                
                return (
                  <div
                    key={lang.code}
                    className="newspaper-card-glossy flex items-center justify-between p-4 cursor-pointer animate-press"
                    onClick={() => handleSelectLanguage(lang.code)}
                    data-testid={`card-language-${lang.code}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                        <span className="text-lg font-bold text-white relative z-10">
                          {lang.nativeName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">
                          {lang.nativeName}
                        </p>
                        <p className="text-sm text-muted-foreground font-medium">
                          {lang.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                        {count} papers
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
}
