import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { languages } from "@shared/schema";

interface LanguageFilterProps {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

export function LanguageFilter({ selectedLanguage, onSelectLanguage }: LanguageFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 px-4 py-3">
        {languages.map((lang) => (
          <Badge
            key={lang.code}
            variant={selectedLanguage === lang.code ? "default" : "secondary"}
            className={`cursor-pointer px-4 py-2 text-sm font-medium shrink-0 transition-colors ${
              selectedLanguage === lang.code 
                ? "bg-primary text-primary-foreground" 
                : ""
            }`}
            onClick={() => onSelectLanguage(lang.code)}
            data-testid={`filter-language-${lang.code}`}
          >
            {lang.nativeName}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
