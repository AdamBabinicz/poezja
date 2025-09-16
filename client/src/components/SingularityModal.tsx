import { motion, AnimatePresence } from "framer-motion";
import { X, Key, Atom, BrainCircuit, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import singularityImage from "@assets/generated_images/witryna.avif";
import { SEOHead } from "./SEOHead";

interface SingularityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contentKeys = {
  title: "singularity.title",
  sections: [
    {
      heading: "singularity.who_is_author_heading",
      paragraph: "singularity.who_is_author_p",
    },
    {
      heading: "singularity.why_anticharm_heading",
      paragraph: "singularity.why_anticharm_p1",
      paragraph2: "singularity.why_anticharm_p2",
    },
    {
      heading: "singularity.coding_as_filter_heading",
      paragraph: "singularity.coding_as_filter_p",
    },
    {
      heading: "singularity.authors_goal_heading",
      paragraph: "singularity.authors_goal_p1",
      paragraph2: "singularity.authors_goal_p2",
      paragraph3: "singularity.authors_goal_p3",
    },
  ],
};

const MainContent = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Key className="h-6 w-6 text-neural-highlight" />
        <h2 className="text-3xl font-serif text-foreground">
          {t(contentKeys.title)}
        </h2>
      </div>
      <div className="space-y-8 max-w-3xl">
        {contentKeys.sections.map((section, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.15 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Atom className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-semibold text-neural-highlight">
                {t(section.heading)}
              </h2>
            </div>
            <p className="text-lg text-foreground/90 leading-relaxed">
              {t(section.paragraph)}
            </p>
            {section.paragraph2 && (
              <p className="text-lg text-foreground/90 leading-relaxed mt-4">
                {t(section.paragraph2)}
              </p>
            )}
            {section.paragraph3 && (
              <p className="text-lg text-foreground/90 leading-relaxed mt-4 font-bold">
                {t(section.paragraph3)}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

const LegalContent = ({
  type,
  onBack,
}: {
  type: "terms" | "privacy";
  onBack: () => void;
}) => {
  const { t } = useTranslation();
  const titleKey = type === "terms" ? "legal.termsTitle" : "legal.privacyTitle";
  const contentKey =
    type === "terms" ? "legal.termsContent" : "legal.privacyContent";
  const content = t(contentKey, { returnObjects: true }) as string[];

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <FileText className="h-6 w-6 text-neural-highlight" />
        <h2 className="text-3xl font-serif text-foreground">{t(titleKey)}</h2>
      </div>
      <div className="space-y-4 max-w-3xl text-foreground/90 leading-relaxed">
        {content.map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </>
  );
};

export default function SingularityModal({
  isOpen,
  onClose,
}: SingularityModalProps) {
  const { t } = useTranslation();
  const [legalView, setLegalView] = useState<"terms" | "privacy" | null>(null);

  const handleClose = () => {
    setLegalView(null);
    onClose();
  };

  const siteUrl = "https://antypowabne.netlify.app";
  const descriptionText = t(contentKeys.sections[0].paragraph);

  const schemaData = [
    {
      type: "Article" as const,
      data: {
        headline: t(contentKeys.title),
        description: descriptionText,
        image: `${siteUrl}${singularityImage}`,
        author: {
          "@type": "Person",
          name: "Adam Gierczak",
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: t("seo.siteName"),
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.png`,
          },
        },
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SEOHead
            titleKey={contentKeys.title}
            descriptionKey={contentKeys.sections[0].paragraph}
            image={singularityImage}
            schemaData={schemaData}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
            onClick={handleClose}
            data-testid="singularity-modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="absolute inset-4 md:inset-8 lg:inset-16 bg-card border border-card-border rounded-lg shadow-2xl overflow-y-auto lg:overflow-hidden hide-scrollbar"
              onClick={(e) => e.stopPropagation()}
              data-testid="singularity-modal-content"
            >
              <div className="flex flex-col lg:h-full lg:flex-row">
                <div className="lg:w-1/3 relative bg-gradient-to-br from-neural-node/20 to-neural-connection/20 flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-card-border">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    src={singularityImage}
                    alt="Singularity Visualization"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                </div>

                <div className="flex-1 p-6 lg:p-8 lg:overflow-y-auto hide-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={legalView || "main"}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {!legalView ? (
                        <MainContent />
                      ) : (
                        <LegalContent
                          type={legalView}
                          onBack={() => setLegalView(null)}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 pt-6 border-t border-card-border"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                      <BrainCircuit className="h-4 w-4" />
                      <span>{t("author.tagline")}</span>
                    </div>
                    <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
                      <button
                        onClick={() => setLegalView("terms")}
                        className="hover:text-foreground transition-colors"
                      >
                        {t("singularity.termsLink")}
                      </button>
                      <span>&bull;</span>
                      <button
                        onClick={() => setLegalView("privacy")}
                        className="hover:text-foreground transition-colors"
                      >
                        {t("singularity.privacyLink")}
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleClose}
                className="!absolute top-1 right-1 md:top-3 md:right-3
             z-50 h-8 w-8 rounded-full
             bg-neutral-900 text-white
             hover:bg-neutral-800 hover:scale-110 hover:shadow-lg
             active:scale-95
             transition duration-200 ease-out"
                aria-label={t("poem.close")}
                data-testid="button-close-singularity"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* <Button
                size="icon"
                variant="ghost"
                onClick={handleClose}
                className="!absolute top-1 right-1 md:top-3 md:right-3 z-50 h-8 w-8 rounded-full"
                aria-label={t("poem.close")}
                data-testid="button-close-singularity"
              >
                <X className="h-4 w-4" />
              </Button> */}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
