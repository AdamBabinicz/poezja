import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Moon,
  Sun,
  Globe,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { useSound } from "@/contexts/SoundContext";
import { useLocation } from "wouter";

interface AtlasControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  scale: number;
}

const supportedLanguages = [
  { code: "pl", name: "Polski" },
  { code: "en", name: "English" },
  { code: "is", name: "Íslenska" },
];

export default function AtlasControls({
  onZoomIn,
  onZoomOut,
  onReset,
  scale,
}: AtlasControlsProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();
  const [, navigate] = useLocation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    navigate(`/${langCode}`);
  };

  const currentLanguageCode = i18n.language.split("-")[0];

  return (
    <div className="fixed z-50 flex gap-2 bottom-4 left-1/2 -translate-x-1/2 md:top-4 md:right-4 md:left-auto md:transform-none md:flex-col">
      <div className="bg-card/80 backdrop-blur-md border border-card-border rounded-lg p-2 flex flex-row gap-1 md:flex-col">
        <Button
          size="icon"
          variant="ghost"
          onClick={onZoomIn}
          disabled={scale >= 3}
          aria-label={t("atlas.zoomIn")}
          data-testid="button-zoom-in"
          className="h-8 w-8"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={onZoomOut}
          disabled={scale <= 0.3}
          aria-label={t("atlas.zoomOut")}
          data-testid="button-zoom-out"
          className="h-8 w-8"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={onReset}
          aria-label={t("atlas.reset")}
          data-testid="button-reset-view"
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-card/80 backdrop-blur-md border border-card-border rounded-lg p-2 flex flex-row gap-1 md:flex-col">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleTheme}
          aria-label={t("accessibility.themeToggle")}
          data-testid="button-theme-toggle"
          className="h-8 w-8"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={toggleSound}
          aria-label="Toggle sound"
          data-testid="button-sound-toggle"
          className="h-8 w-8"
        >
          {isSoundEnabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              aria-label={t("accessibility.languageToggle")}
              data-testid="button-language-toggle"
              className="h-8 w-8"
            >
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {supportedLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                disabled={currentLanguageCode === lang.code}
                className="cursor-pointer"
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className="bg-card/80 backdrop-blur-md border border-card-border rounded-lg px-3 py-1
         flex items-center justify-center md:block"
      >
        <span className="text-xs text-muted-foreground">
          {Math.round(scale * 100)}%
        </span>
      </div>
    </div>
  );
}
