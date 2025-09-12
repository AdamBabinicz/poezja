import { motion, AnimatePresence } from 'framer-motion';
import { X, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import type { Poem } from '@/data/mockPoems';

interface PoemModalProps {
  poem: Poem | null;
  onClose: () => void;
  onKeywordClick: (keyword: string) => void;
  backgroundImage?: string;
}

export default function PoemModal({ 
  poem, 
  onClose, 
  onKeywordClick,
  backgroundImage 
}: PoemModalProps) {
  const { t } = useTranslation();

  if (!poem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        data-testid="poem-modal-overlay"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-4 md:inset-8 lg:inset-16 bg-card border border-card-border rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          data-testid={`poem-modal-${poem.id}`}
        >
          {/* Background image with overlay */}
          {poem.imageSrc && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${poem.imageSrc})` }}
            />
          )}
          
          {/* Content container */}
          <div className="relative h-full flex flex-col lg:flex-row">
            {/* Close button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-card/80 backdrop-blur-sm"
              aria-label={t('poem.close')}
              data-testid="button-close-poem"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Poem image section */}
            {poem.imageSrc && (
              <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-card-border">
                <div className="h-64 lg:h-full">
                  <img 
                    src={poem.imageSrc} 
                    alt={poem.title}
                    className="w-full h-full object-cover"
                    data-testid={`poem-image-${poem.id}`}
                  />
                </div>
              </div>
            )}

            {/* Poem content */}
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-serif text-foreground mb-6">
                  {poem.title}
                </h1>

                {/* Poem text with animation */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {poem.content.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.3 + index * 0.1,
                        duration: 0.6 
                      }}
                      className={`text-lg leading-relaxed font-serif text-foreground ${
                        line === '' ? 'mb-2 h-2' : 'mb-4'
                      }`}
                    >
                      {line || '\u00A0'}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Keywords sidebar */}
            <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-card-border bg-card/50 backdrop-blur-sm p-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {t('poem.keywords')}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {poem.keywords.map((keyword, index) => (
                    <motion.div
                      key={keyword}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover-elevate text-sm"
                        onClick={() => {
                          console.log('Keyword clicked:', keyword);
                          onKeywordClick(keyword);
                        }}
                        data-testid={`keyword-${keyword}`}
                      >
                        {keyword}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">{t('poem.connections')}</p>
                  <p className="italic">
                    Click keywords to explore thematic connections
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}