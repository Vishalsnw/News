import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Newspaper } from "@shared/schema";

export default function Viewer() {
  const [, params] = useRoute("/read/:id");
  const [, setLocation] = useLocation();

  const { data: newspapers, isLoading: isDataLoading } = useQuery<Newspaper[]>({
    queryKey: ["/api/newspapers"],
  });

  const newspaper = newspapers?.find((np) => np.id === params?.id);

  useEffect(() => {
    if (newspaper) {
      window.location.href = newspaper.epaperUrl;
    }
  }, [newspaper]);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground text-sm">Opening {newspaper.name}...</p>
    </div>
  );
}
