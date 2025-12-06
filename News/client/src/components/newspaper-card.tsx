import { useState } from "react";
import { useLocation } from "wouter";
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

const languageColors: Record<string, string> = {
  english: "bg-blue-600",
  hindi: "bg-red-600",
  marathi: "bg-orange-600",
  gujarati: "bg-green-600",
  tamil: "bg-purple-600",
  telugu: "bg-cyan-600",
  bengali: "bg-indigo-600",
  kannada: "bg-amber-600",
  malayalam: "bg-teal-600",
  punjabi: "bg-rose-600",
};

function getInitials(name: string): string {
  const words = name.split(" ");
  if (words.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }
  return words.slice(0, 2).map(w => w.charAt(0)).join("").toUpperCase();
}

export function NewspaperCard({ newspaper, showFavoriteButton = true }: NewspaperCardProps) {
  const [, setLocation] = useLocation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(newspaper.id);
  const bgColor = languageColors[newspaper.language] || "bg-gray-600";
  const initials = getInitials(newspaper.name);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(newspaper.id);
  };

  const handleCardClick = () => {
    setLocation(`/read/${newspaper.id}`);
  };

  const renderLogo = () => {
    if (newspaper.logo && !imageError) {
      return (
        <img
          src={newspaper.logo}
          alt={`${newspaper.name} logo`}
          className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-1"
          onError={() => setImageError(true)}
        />
      );
    }
    return (
      <div className={`w-16 h-16 ${bgColor} rounded-xl flex items-center justify-center shadow-md`}>
        <span className="text-xl font-bold text-white">
          {initials}
        </span>
      </div>
    );
  };

  return (
    <Card 
      className="group relative flex flex-col items-center justify-center p-4 bg-card hover-elevate active-elevate-2 cursor-pointer transition-transform duration-150 aspect-square"
      data-testid={`card-newspaper-${newspaper.id}`}
      onClick={handleCardClick}
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
      <div className="flex-1 flex items-center justify-center w-full relative">
        {renderLogo()}
      </div>
      <p className="mt-2 text-xs text-center font-medium text-foreground truncate w-full" data-testid={`text-newspaper-name-${newspaper.id}`}>
        {newspaper.name}
      </p>
      <p className="text-[10px] text-muted-foreground truncate w-full text-center">
        {newspaper.region}
      </p>
    </Card>
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
