import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Share2, ExternalLink, RefreshCw, AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavorites } from "@/lib/favorites-context";
import type { Newspaper } from "@shared/schema";

export default function Viewer() {
  const [, params] = useRoute("/read/:id");
  const [, setLocation] = useLocation();
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: newspapers } = useQuery<Newspaper[]>({
    queryKey: ["/api/newspapers"],
  });

  const newspaper = newspapers?.find((np) => np.id === params?.id);
  const favorited = newspaper ? isFavorite(newspaper.id) : false;

  const handleShare = async () => {
    if (newspaper && navigator.share) {
      try {
        await navigator.share({
          title: `${newspaper.name} - Indian ePapers`,
          text: `Read ${newspaper.name} e-paper`,
          url: newspaper.epaperUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else if (newspaper) {
      await navigator.clipboard.writeText(newspaper.epaperUrl);
    }
  };

  const handleOpenExternal = () => {
    if (newspaper) {
      window.open(newspaper.epaperUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleRefresh = () => {
    setIframeLoading(true);
    setIframeError(false);
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleFavorite = () => {
    if (newspaper) {
      toggleFavorite(newspaper.id);
    }
  };

  if (!newspaper) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold mb-2" data-testid="text-not-found">
          Newspaper not found
        </h2>
        <p className="text-muted-foreground text-sm text-center mb-4">
          The newspaper you're looking for doesn't exist
        </p>
        <Button onClick={() => setLocation("/")} data-testid="button-go-home">
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-background overflow-hidden">
      {/* Floating controls */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setLocation("/")}
          className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleFavorite}
          className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
          data-testid="button-viewer-favorite"
        >
          <Heart className={`h-5 w-5 ${favorited ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleRefresh}
          className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
          data-testid="button-refresh"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleOpenExternal}
          className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
          data-testid="button-external"
        >
          <ExternalLink className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleShare}
          className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
          data-testid="button-share"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Loading state */}
      {iframeLoading && !iframeError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-40">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-20 h-20">
              <Skeleton className="w-full h-full rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground">
                  {newspaper.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium" data-testid="text-loading-name">{newspaper.name}</p>
              <p className="text-sm text-muted-foreground">Loading e-paper...</p>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {iframeError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-40 p-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-lg font-semibold mb-2" data-testid="text-iframe-error">
            Unable to load e-paper
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-4 max-w-xs">
            Some newspapers don't allow embedding. Try opening in a new tab.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setLocation("/")} data-testid="button-go-back">
              Go Back
            </Button>
            <Button onClick={handleOpenExternal} data-testid="button-open-new-tab">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={newspaper.epaperUrl}
        title={`${newspaper.name} e-paper`}
        className="w-full h-full border-0"
        onLoad={() => setIframeLoading(false)}
        onError={() => {
          setIframeLoading(false);
          setIframeError(true);
        }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
        data-testid="iframe-epaper"
      />
    </div>
  );
}
