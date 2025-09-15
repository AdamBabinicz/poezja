import { motion, AnimatePresence } from "framer-motion";
import { X, Hash, Brain, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import type { Poem } from "@/data/mockPoems";
import React, { useState, useEffect, useCallback } from "react";
import PoemInterpretation from "./PoemInterpretation";
import { SEOHead } from "@/components/SEOHead";

interface Interpretation {
  title: string;
  content: string[];
}

interface PoemModalProps {
  poem: Poem | null;
  onClose: () => void;
  onKeywordClick: (keyword: string) => void;
}

export default function PoemModal({
  poem,
  onClose,
  onKeywordClick,
}: PoemModalProps) {
  const { t, i18n } = useTranslation();
  const [view, setView] = useState<
    "poem" | "loading" | "interpretation" | "error"
  >("poem");
  const [interpretation, setInterpretation] = useState<Interpretation | null>(
    null
  );

  const fetchInterpretation = useCallback(async () => {
    if (!poem) return;

    setView("loading");
    try {
      const lang = i18n.language.split("-")[0];
      const response = await fetch(
        `/locales/${lang}/interpretations/${poem.id}.json`
      );
      if (!response.ok) {
        throw new Error("Interpretation not found");
      }
      const data: Interpretation = await response.json();
      setInterpretation(data);
      setView("interpretation");
    } catch (error) {
      console.error("Failed to fetch interpretation:", error);
      setView("error");
    }
  }, [poem, i18n.language]);

  useEffect(() => {
    if (poem) {
      setView("poem");
      setInterpretation(null);
    }
  }, [poem]);

  if (!poem) return null;

  const translatedTitle = t(poem.titleKey);
  const translatedContentObject = t(poem.contentKey, {
    returnObjects: true,
  }) as Record<string, string> | string[];

  const translatedContent = Array.isArray(translatedContentObject)
    ? translatedContentObject
    : Object.values(translatedContentObject);

  const translatedKeywords = poem.keywords.map((keyword) => ({
    key: keyword,
    translation: t(`keywords.${keyword}`, keyword),
  }));

  const poemExcerpt = (
    Array.isArray(translatedContent)
      ? translatedContent.slice(0, 2).join(" ")
      : ""
  ).substring(0, 160);

  const siteUrl = "https://wizjoner.netlify.app";

  const schemaData = [
    {
      type: "Article" as const,
      data: {
        "@type": "Article",
        headline: translatedTitle,
        description: poemExcerpt,
        image: poem.imageSrc ? `${siteUrl}${poem.imageSrc}` : undefined,
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
        inLanguage: i18n.language.split("-")[0],
      },
    },
  ];

  const renderInteractiveLine = (line: string) => {
    if (!translatedKeywords.length) return line;

    const keywordTranslations = translatedKeywords.map((kw) => kw.translation);
    const regex = new RegExp(`(${keywordTranslations.join("|")})`, "gi");
    const parts = line.split(regex);

    return parts.map((part, index) => {
      const matchedKeyword = translatedKeywords.find(
        (kw) => kw.translation.toLowerCase() === part.toLowerCase()
      );
      if (matchedKeyword) {
        return (
          <span
            key={index}
            className="font-bold text-neural-highlight cursor-pointer hover:underline"
            onClick={() => onKeywordClick(matchedKeyword.key)}
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const MainContent = () => {
    switch (view) {
      case "interpretation":
        return interpretation ? (
          <PoemInterpretation interpretation={interpretation} />
        ) : null;
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-neural-highlight" />
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <AlertTriangle className="h-8 w-8 text-destructive mb-4" />
            <p className="text-foreground">
              Interpretacja dla tego wiersza nie została jeszcze dodana.
            </p>
          </div>
        );
      case "poem":
      default:
        return <PoemView />;
    }
  };

  const PoemView = () => (
    <div className="relative h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden hide-scrollbar">
      {poem.imageSrc && (
        <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-card-border shrink-0">
          <div className="h-64 lg:h-full">
            <img
              src={poem.imageSrc}
              alt={translatedTitle}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      <div className="flex-1 p-6 lg:p-8 lg:overflow-y-auto hide-scrollbar">
        <h1 className="text-3xl lg:text-4xl font-serif text-foreground mb-6">
          {translatedTitle}
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {translatedContent.map((line, index) => (
            <p
              key={index}
              className={`text-lg leading-relaxed font-serif text-foreground ${
                line === "" ? "mb-2 h-2" : "mb-4"
              }`}
            >
              {line ? renderInteractiveLine(line) : "\u00A0"}
            </p>
          ))}
        </div>
      </div>
      <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-card-border bg-card/50 backdrop-blur-sm p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              {t("poem.keywords")}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {translatedKeywords.map(({ key, translation }) => (
              <Badge
                key={key}
                variant="secondary"
                className="cursor-pointer hover-elevate text-sm"
                onClick={() => onKeywordClick(key)}
              >
                {translation}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">{t("poem.connections")}</p>
            <p className="italic">{t("poem.exploreConnections")}</p>
          </div>
        </div>
        <Button className="w-full mt-4" onClick={fetchInterpretation}>
          <Brain className="mr-2 h-4 w-4" />
          {t("poem.runInterpretation")}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <SEOHead
        titleKey={poem.titleKey}
        image={poem.imageSrc}
        schemaData={schemaData}
      />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-4 md:inset-8 lg:inset-16 mx-auto max-w-screen-xl bg-card border border-card-border rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {poem.imageSrc && view === "poem" && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${poem.imageSrc})` }}
              />
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <MainContent />
              </motion.div>
            </AnimatePresence>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="!absolute top-3 right-3 z-50 h-8 w-8 rounded-full"
              aria-label={t("poem.close")}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
