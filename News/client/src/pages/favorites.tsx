import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { NewspaperCard, NewspaperCardSkeleton } from "@/components/newspaper-card";
import { useFavorites } from "@/lib/favorites-context";
import type { Newspaper } from "@shared/schema";

export default function Favorites() {
  const { favorites } = useFavorites();
  
  const { data: newspapers, isLoading } = useQuery<Newspaper[]>({
    queryKey: ["/api/newspapers"],
  });

  const favoriteNewspapers = useMemo(() => {
    if (!newspapers) return [];
    return newspapers.filter((np) => favorites.includes(np.id));
  }, [newspapers, favorites]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      
      <main className="flex-1 p-4 pb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            <Heart className="h-7 w-7 text-white relative z-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold" data-testid="text-favorites-title">
              Your Favorites
            </h2>
            <p className="text-sm text-muted-foreground font-medium">
              {favorites.length} saved newspaper{favorites.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <NewspaperCardSkeleton key={i} />
            ))}
          </div>
        ) : favoriteNewspapers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-3xl flex items-center justify-center mb-4 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent dark:from-white/5" />
              <Heart className="h-12 w-12 text-muted-foreground relative z-10" />
            </div>
            <h3 className="text-xl font-bold mb-2" data-testid="text-no-favorites">
              No favorites yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs font-medium">
              Tap the heart icon on any newspaper to save it here for quick access
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {favoriteNewspapers.map((newspaper) => (
              <NewspaperCard key={newspaper.id} newspaper={newspaper} />
            ))}
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
}
