import { ZoomIn, ZoomOut, RotateCcw, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

interface AtlasControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  scale: number;
}

export default function AtlasControls({ 
  onZoomIn, 
  onZoomOut, 
  onReset, 
  scale 
}: AtlasControlsProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {/* Zoom controls */}
      <div className="bg-card/80 backdrop-blur-md border border-card-border rounded-lg p-2 flex flex-col gap-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={onZoomIn}
          disabled={scale >= 3}
          aria-label={t('atlas.zoomIn')}
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
          aria-label={t('atlas.zoomOut')}
          data-testid="button-zoom-out"
          className="h-8 w-8"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={onReset}
          aria-label={t('atlas.reset')}
          data-testid="button-reset-view"
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Theme and language controls */}
      <div className="bg-card/80 backdrop-blur-md border border-card-border rounded-lg p-2 flex flex-col gap-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleTheme}
          aria-label={t('accessibility.themeToggle')}
          data-testid="button-theme-toggle"
          className="h-8 w-8"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleLanguage}
          aria-label={t('accessibility.languageToggle')}
          data-testid="button-language-toggle"
          className="h-8 w-8"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </div>

      {/* Scale indicator */}
      <div className="bg-card/80 backdrop-blur-md border border-card-border rounded-lg px-3 py-1">
        <span className="text-xs text-muted-foreground">
          {Math.round(scale * 100)}%
        </span>
      </div>
    </div>
  );
}