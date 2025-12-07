import { useState } from "react";
import { Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavorites } from "@/lib/favorites-context";
import type { Newspaper } from "@shared/schema";

interface NewspaperCardProps {
  newspaper: Newspaper;
  showFavoriteButton?: boolean;
}

const languageGradients: Record<string, string> = {
  english: "from-blue-500 to-blue-700",
  hindi: "from-red-500 to-red-700",
  marathi: "from-orange-500 to-orange-700",
  gujarati: "from-green-500 to-green-700",
  tamil: "from-purple-500 to-purple-700",
  telugu: "from-cyan-500 to-cyan-700",
  bengali: "from-indigo-500 to-indigo-700",
  kannada: "from-amber-500 to-amber-700",
  malayalam: "from-teal-500 to-teal-700",
  punjabi: "from-rose-500 to-rose-700",
};

function getInitials(name: string): string {
  const words = name.split(" ");
  if (words.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }
  return words.slice(0, 2).map(w => w.charAt(0)).join("").toUpperCase();
}

export function NewspaperCard({ newspaper, showFavoriteButton = true }: NewspaperCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(newspaper.id);
  const gradientColor = languageGradients[newspaper.language] || "from-gray-500 to-gray-700";
  const initials = getInitials(newspaper.name);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(newspaper.id);
  };

  const handleCardClick = () => {
    // Navigate directly to the ePaper URL within the same window
    // This works with WebView apps to keep navigation internal
    window.location.href = newspaper.epaperUrl;
  };

  const renderLogo = () => {
    if (newspaper.logo && !imageError) {
      return (
        <div className="logo-container w-[72px] h-[72px] p-2 flex items-center justify-center">
          <img
            src={newspaper.logo}
            alt={`${newspaper.name} logo`}
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }
    return (
      <div className={`w-[72px] h-[72px] bg-gradient-to-br ${gradientColor} rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
        <span className="text-xl font-bold text-white drop-shadow-sm relative z-10">
          {initials}
        </span>
      </div>
    );
  };

  return (
    <div 
      className="newspaper-card-glossy flex flex-col items-center justify-center p-4 cursor-pointer aspect-square animate-press"
      data-testid={`card-newspaper-${newspaper.id}`}
      onClick={handleCardClick}
    >
      {showFavoriteButton && (
        <button
          className="favorite-button absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center z-10 animate-press"
          onClick={handleFavoriteClick}
          data-testid={`button-favorite-${newspaper.id}`}
        >
          <Heart 
            className={`h-4 w-4 transition-all duration-200 ${
              favorited 
                ? "fill-red-500 text-red-500 scale-110" 
                : "text-gray-400"
            }`} 
          />
        </button>
      )}
      <div className="flex-1 flex items-center justify-center w-full relative">
        {renderLogo()}
      </div>
      <p className="mt-3 text-sm text-center font-semibold text-foreground truncate w-full leading-tight" data-testid={`text-newspaper-name-${newspaper.id}`}>
        {newspaper.name}
      </p>
      <p className="text-xs text-muted-foreground truncate w-full text-center mt-0.5 font-medium">
        {newspaper.region}
      </p>
    </div>
  );
}

export function NewspaperCardSkeleton() {
  return (
    <div className="newspaper-card-glossy flex flex-col items-center justify-center p-4 aspect-square">
      <Skeleton className="w-[72px] h-[72px] rounded-2xl" />
      <Skeleton className="mt-3 h-4 w-20 rounded-lg" />
      <Skeleton className="mt-1.5 h-3 w-14 rounded-lg" />
    </div>
  );
}
