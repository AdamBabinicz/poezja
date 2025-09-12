import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { authorInfo } from '@/data/mockPoems';

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorImage?: string;
}

export default function AuthorModal({ isOpen, onClose, authorImage }: AuthorModalProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
          onClick={onClose}
          data-testid="author-modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-4 md:inset-8 lg:inset-16 bg-card border border-card-border rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            data-testid="author-modal-content"
          >
            {/* Close button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-card/80 backdrop-blur-sm"
              aria-label={t('poem.close')}
              data-testid="button-close-author"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="h-full flex flex-col lg:flex-row">
              {/* Author image section */}
              <div className="lg:w-1/2 relative bg-gradient-to-br from-neural-node/20 to-neural-connection/20 flex items-center justify-center p-8">
                {authorImage ? (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    src={authorImage}
                    alt="Author portrait"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-48 h-48 bg-neural-node/20 rounded-full flex items-center justify-center"
                  >
                    <Brain className="w-24 h-24 text-neural-node" />
                  </motion.div>
                )}
              </div>

              {/* Author info section */}
              <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <User className="h-6 w-6 text-neural-highlight" />
                    <h1 className="text-3xl font-serif text-foreground">
                      {t('author.title')}
                    </h1>
                  </div>

                  {/* Author name */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-neural-highlight mb-4"
                  >
                    {authorInfo.name}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-muted-foreground mb-6 leading-relaxed"
                  >
                    {authorInfo.description}
                  </motion.p>

                  {/* Bio fragments with animated reveal */}
                  <div className="space-y-4">
                    {authorInfo.bio.split('\n\n').map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="text-foreground leading-relaxed"
                      >
                        {paragraph.trim()}
                      </motion.p>
                    ))}
                  </div>

                  {/* Neural pattern decoration */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 pt-6 border-t border-card-border"
                  >
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Brain className="h-4 w-4" />
                      <span>Exploring consciousness through poetry</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}