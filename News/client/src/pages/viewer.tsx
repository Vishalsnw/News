import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Newspaper } from "@shared/schema";

export default function Viewer() {
  const [, params] = useRoute("/read/:id");
  const [, setLocation] = useLocation();

  const { data: newspapers, isLoading } = useQuery<Newspaper[]>({
    queryKey: ["/api/newspapers"],
  });

  const newspaper = newspapers?.find((np) => np.id === params?.id);

  useEffect(() => {
    if (newspaper) {
      window.open(newspaper.epaperUrl, "_blank", "noopener,noreferrer");
    }
  }, [newspaper]);

  const handleOpenExternal = () => {
    if (newspaper) {
      window.open(newspaper.epaperUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (isLoading) {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ExternalLink className="h-10 w-10 text-primary" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">
          {newspaper.name}
        </h2>
        
        <p className="text-muted-foreground text-sm mb-6">
          E-paper opened in a new tab. If it didn't open automatically, click the button below.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button onClick={handleOpenExternal} className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open {newspaper.name} E-Paper
          </Button>
          
          <Button variant="outline" onClick={() => setLocation("/")} className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-6">
          E-papers open in a new tab for the best reading experience
        </p>
      </div>
    </div>
  );
}
