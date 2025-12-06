import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get all newspapers
  app.get("/api/newspapers", async (_req, res) => {
    try {
      const newspapers = await storage.getNewspapers();
      res.json(newspapers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch newspapers" });
    }
  });

  // Get newspaper by ID
  app.get("/api/newspapers/:id", async (req, res) => {
    try {
      const newspaper = await storage.getNewspaperById(req.params.id);
      if (!newspaper) {
        return res.status(404).json({ error: "Newspaper not found" });
      }
      res.json(newspaper);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch newspaper" });
    }
  });

  // Get newspapers by language
  app.get("/api/newspapers/language/:language", async (req, res) => {
    try {
      const newspapers = await storage.getNewspapersByLanguage(req.params.language);
      res.json(newspapers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch newspapers" });
    }
  });

  return httpServer;
}
