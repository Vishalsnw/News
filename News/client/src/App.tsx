import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import Home from "@/pages/home";
import Viewer from "@/pages/viewer";
import Favorites from "@/pages/favorites";
import Languages from "@/pages/languages";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/read/:id" component={Viewer} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/languages" component={Languages} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
