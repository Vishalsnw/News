import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, RefreshCw, ExternalLink, Loader2, Heart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/favorites-context";
import type { Newspaper } from "@shared/schema";

export default function Viewer() {
  const [, params] = useRoute("/read/:id");
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { data: newspapers, isLoading: isDataLoading } = useQuery<Newspaper[]>({
    queryKey: ["/api/newspapers"],
  });

  const newspaper = newspapers?.find((np) => np.id === params?.id);
  const favorited = newspaper ? isFavorite(newspaper.id) : false;

  useEffect(() => {
    if (newspaper) {
      setIsLoading(true);
      setLoadError(false);
    }
  }, [newspaper, iframeKey]);

  const handleRefresh = () => {
    setIsLoading(true);
    setLoadError(false);
    setIframeKey(prev => prev + 1);
  };

  const handleOpenExternal = () => {
    if (newspaper) {
      window.open(newspaper.epaperUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleFavoriteClick = () => {
    if (newspaper) {
      toggleFavorite(newspaper.id);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    try {
      const iframe = iframeRef.current;
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc || iframeDoc.body.innerHTML === '') {
          setLoadError(true);
        }
      }
    } catch {
      setLoadError(true);
    }
  };

  if (isDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!newspaper) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <ExternalLink className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold mb-2">
          Newspaper not found
        </h2>
        <p className="text-muted-foreground text-sm text-center mb-4">
          The newspaper you're looking for doesn't exist
        </p>
        <Button onClick={() => setLocation("/")}>
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between px-3 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold truncate max-w-[180px]">
              {newspaper.name}
            </h1>
            <span className="text-xs text-muted-foreground capitalize">
              {newspaper.language} • {newspaper.region}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className="h-9 w-9"
          >
            <Heart 
              className={`h-5 w-5 transition-colors ${
                favorited 
                  ? "fill-red-500 text-red-500" 
                  : "text-muted-foreground"
              }`} 
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="h-9 w-9"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenExternal}
            className="h-9 w-9"
          >
            <ExternalLink className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden">
        {isLoading && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground text-sm">Loading {newspaper.name}...</p>
          </div>
        )}
        
        {loadError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background p-6">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-center">
              Unable to load in app
            </h2>
            <p className="text-muted-foreground text-sm text-center mb-6 max-w-sm">
              This newspaper's website doesn't allow embedding. You can still read it by opening in your browser.
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button onClick={handleOpenExternal} className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open {newspaper.name}
              </Button>
              <Button variant="outline" onClick={() => setLocation("/")} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            key={iframeKey}
            src={newspaper.epaperUrl}
            className="w-full h-full border-0"
            title={`${newspaper.name} E-Paper`}
            onLoad={handleIframeLoad}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </div>
  );
}
