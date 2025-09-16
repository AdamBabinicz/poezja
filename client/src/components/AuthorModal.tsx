import { motion, AnimatePresence } from "framer-motion";
import { X, User, Brain, Github, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { author } from "@/data/mockPoems";
import { SEOHead } from "./SEOHead";

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorImage?: string;
}

const XLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 1200 1227"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    {...props}
  >
    <path
      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
      fill="currentColor"
    />
  </svg>
);

export default function AuthorModal({
  isOpen,
  onClose,
  authorImage,
}: AuthorModalProps) {
  const { t } = useTranslation();

  const bioText = t(author.bioKey);
  const siteUrl = "https://antypowabne.netlify.app";

  const schemaData = [
    {
      type: "Person" as const,
      data: {
        name: t(author.nameKey),
        description: t(author.descriptionKey),
        image: authorImage ? `${siteUrl}${authorImage}` : undefined,
        url: siteUrl,
        sameAs: [
          "https://github.com/AdamBabinicz",
          "https://x.com/AdamBabinicz",
          "https://www.facebook.com/adam.gierczak.334",
        ],
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SEOHead
            titleKey="author.title"
            descriptionKey="author.descriptionKey"
            image={authorImage}
            schemaData={schemaData}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
            onClick={onClose}
            data-testid="author-modal-overlay"
          >
            <motion.div
              id="modal-scroll-area"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="absolute inset-4 md:inset-8 lg:inset-16 bg-card border border-card-border rounded-lg shadow-2xl overflow-y-auto lg:overflow-hidden hide-scrollbar"
              onClick={(e) => e.stopPropagation()}
              data-testid="author-modal-content"
            >
              <div className="flex flex-col lg:h-full lg:flex-row">
                <div className="lg:w-1/2 relative bg-gradient-to-br from-neural-node/20 to-neural-connection/20 flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-card-border">
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

                <div className="flex-1 p-6 lg:p-8 lg:overflow-y-auto hide-scrollbar flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col flex-grow"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <User className="h-6 w-6 text-neural-highlight" />
                      <h2 className="text-3xl font-serif text-foreground">
                        {t("author.title")}
                      </h2>
                    </div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold text-neural-highlight mb-4"
                    >
                      {t(author.nameKey)}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg text-muted-foreground mb-6 leading-relaxed"
                    >
                      {t(author.descriptionKey)}
                    </motion.p>

                    <div className="space-y-4 flex-grow">
                      {bioText
                        .split("\n\n")
                        .map((paragraph: string, index: number) => (
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

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-8 pt-6 border-t border-card-border"
                    >
                      <div className="flex justify-center items-center gap-6">
                        <a
                          href="https://github.com/AdamBabinicz"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("accessibility.githubProfile")}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="h-6 w-6" />
                        </a>
                        <a
                          href="https://x.com/AdamBabinicz"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("accessibility.xProfile")}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <XLogo className="h-6 w-6" />
                        </a>
                        <a
                          href="https://www.facebook.com/adam.gierczak.334"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("accessibility.facebookProfile")}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Facebook className="h-6 w-6" />
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="!absolute top-1 right-1 md:top-3 md:right-3
             z-50 h-8 w-8 rounded-full
             bg-neutral-900 text-white
             hover:bg-neutral-800 hover:scale-110 hover:shadow-lg
             active:scale-95
             transition duration-200 ease-out"
                aria-label={t("poem.close")}
                data-testid="button-close-author"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
