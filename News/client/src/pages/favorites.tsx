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
      
      <main className="flex-1 p-4 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
            <Heart className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold" data-testid="text-favorites-title">
              Your Favorites
            </h2>
            <p className="text-sm text-muted-foreground">
              {favorites.length} saved newspaper{favorites.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <NewspaperCardSkeleton key={i} />
            ))}
          </div>
        ) : favoriteNewspapers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2" data-testid="text-no-favorites">
              No favorites yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Tap the heart icon on any newspaper to save it here for quick access
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
