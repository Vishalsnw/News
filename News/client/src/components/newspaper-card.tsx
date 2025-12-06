import { useState } from "react";
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavorites } from "@/lib/favorites-context";
import type { Newspaper } from "@shared/schema";

interface NewspaperCardProps {
  newspaper: Newspaper;
  showFavoriteButton?: boolean;
}

export function NewspaperCard({ newspaper, showFavoriteButton = true }: NewspaperCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(newspaper.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(newspaper.id);
  };

  return (
    <Link href={`/read/${newspaper.id}`}>
      <Card 
        className="group relative flex flex-col items-center justify-center p-4 bg-card hover-elevate active-elevate-2 cursor-pointer transition-transform duration-150 aspect-square"
        data-testid={`card-newspaper-${newspaper.id}`}
      >
        {showFavoriteButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-8 w-8 z-10"
            onClick={handleFavoriteClick}
            data-testid={`button-favorite-${newspaper.id}`}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                favorited 
                  ? "fill-red-500 text-red-500" 
                  : "text-muted-foreground"
              }`} 
            />
          </Button>
        )}
        <div className="flex-1 flex items-center justify-center w-full">
          {!imageLoaded && !imageError && (
            <Skeleton className="w-16 h-16 rounded-md" />
          )}
          {imageError ? (
            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">
                {newspaper.name.charAt(0)}
              </span>
            </div>
          ) : (
            <img
              src={newspaper.logo}
              alt={newspaper.name}
              className={`max-w-full max-h-16 object-contain transition-opacity duration-200 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </div>
        <p className="mt-2 text-xs text-center font-medium text-foreground truncate w-full" data-testid={`text-newspaper-name-${newspaper.id}`}>
          {newspaper.name}
        </p>
        <p className="text-[10px] text-muted-foreground truncate w-full text-center">
          {newspaper.region}
        </p>
      </Card>
    </Link>
  );
}

export function NewspaperCardSkeleton() {
  return (
    <Card className="flex flex-col items-center justify-center p-4 aspect-square">
      <Skeleton className="w-16 h-16 rounded-md" />
      <Skeleton className="mt-2 h-3 w-20" />
      <Skeleton className="mt-1 h-2 w-14" />
    </Card>
  );
}
