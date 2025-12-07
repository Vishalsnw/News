import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { languages } from "@shared/schema";

interface LanguageFilterProps {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

export function LanguageFilter({ selectedLanguage, onSelectLanguage }: LanguageFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap bg-background/50 backdrop-blur-sm">
      <div className="flex gap-2 px-4 py-3">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <button
              key={lang.code}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold shrink-0 transition-all duration-200 animate-press ${
                isSelected 
                  ? "glossy-chip-active text-white shadow-lg" 
                  : "glossy-chip text-foreground"
              }`}
              onClick={() => onSelectLanguage(lang.code)}
              data-testid={`filter-language-${lang.code}`}
            >
              <span className="relative z-10">{lang.nativeName}</span>
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
}
