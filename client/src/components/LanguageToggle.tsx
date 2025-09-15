import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

// Zdefiniuj wspierane języki
const supportedLanguages = [
  { code: "pl", name: "Polski" },
  { code: "en", name: "English" },
  { code: "is", name: "Íslenska" },
];

export function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();

  // Funkcja do zmiany języka i aktualizacji URL
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    navigate(`/${langCode}`);
  };

  const currentLanguageCode = i18n.language.split("-")[0]; // Użyj 'pl' zamiast 'pl-PL'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("accessibility.languageToggle")}
          data-testid="button-language-toggle"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            // Wyłącz przycisk dla aktualnie wybranego języka
            disabled={currentLanguageCode === lang.code}
            className="cursor-pointer"
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
