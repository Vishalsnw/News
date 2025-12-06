import { newspapers, type Newspaper } from "@shared/schema";

export interface IStorage {
  getNewspapers(): Promise<Newspaper[]>;
  getNewspaperById(id: string): Promise<Newspaper | undefined>;
  getNewspapersByLanguage(language: string): Promise<Newspaper[]>;
}

export class MemStorage implements IStorage {
  private newspaperData: Newspaper[];

  constructor() {
    this.newspaperData = newspapers;
  }

  async getNewspapers(): Promise<Newspaper[]> {
    return this.newspaperData;
  }

  async getNewspaperById(id: string): Promise<Newspaper | undefined> {
    return this.newspaperData.find((np) => np.id === id);
  }

  async getNewspapersByLanguage(language: string): Promise<Newspaper[]> {
    return this.newspaperData.filter((np) => np.language === language);
  }
}

export const storage = new MemStorage();
