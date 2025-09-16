import { Switch, Route, Redirect, useRoute } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import { useState, useEffect, Suspense, useCallback } from "react";
import NeuralAtlas from "@/components/NeuralAtlas";
import LoadingScreen from "@/components/LoadingScreen";
import { SoundProvider } from "@/contexts/SoundContext";
import "./lib/i18n";
import { useTranslation } from "react-i18next";
import backgroundImage from "@assets/generated_images/Neural_network_background_visualization_6faa9190.avif";
import authorImage from "@assets/generated_images/Abstract_author_portrait_aaf38ae2.avif";
import { SEOHead } from "./components/SEOHead";
import PoemModal from "./components/PoemModal";
import AuthorModal from "./components/AuthorModal";
import SingularityModal from "./components/SingularityModal";
import type { Poem as FinalPoem } from "@/data/mockPoems";

function MainApp() {
  const [isLoading, setIsLoading] = useState(true);
  const { i18n, t } = useTranslation();
  const [, params] = useRoute("/:lang");
  const lang = params?.lang || "pl";

  const [selectedPoem, setSelectedPoem] = useState<FinalPoem | null>(null);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isSingularityModalOpen, setIsSingularityModalOpen] = useState(false);
  const [highlightedKeyword, setHighlightedKeyword] = useState<string | null>(
    null
  );

  const handleKeywordClick = useCallback((keyword: string) => {
    setHighlightedKeyword(keyword);
    setSelectedPoem(null);
  }, []);

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [lang, i18n]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const siteUrl = "https://antypowabne.netlify.app";

  const schemaData = [
    {
      type: "Organization" as const,
      data: {
        name: t("seo.siteName"),
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
        description: t("seo.defaultDescription"),
      },
    },
    {
      type: "Person" as const,
      data: {
        name: "Adam Gierczak",
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
    <>
      <SEOHead
        isHomePage={true}
        titleKey="seo.homeTitle"
        descriptionKey="seo.defaultDescription"
        schemaData={schemaData}
      />
      <div className="relative">
        <div
          className="fixed inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <NeuralAtlas
          authorImage={authorImage}
          onSelectPoem={setSelectedPoem}
          onOpenAuthorModal={() => setIsAuthorModalOpen(true)}
          onOpenSingularityModal={() => setIsSingularityModalOpen(true)}
          highlightedKeyword={highlightedKeyword}
          onClearHighlight={() => setHighlightedKeyword(null)}
        />
      </div>

      <PoemModal
        poem={selectedPoem}
        onClose={() => setSelectedPoem(null)}
        onKeywordClick={handleKeywordClick}
      />

      <AuthorModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
        authorImage={authorImage}
      />

      <SingularityModal
        isOpen={isSingularityModalOpen}
        onClose={() => setIsSingularityModalOpen(false)}
      />
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/pl" />
      </Route>
      <Route path="/:lang">
        <Suspense fallback={<LoadingScreen />}>
          <MainApp />
        </Suspense>
      </Route>
      <Route
        component={() => (
          <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
            404 - Page not found
          </div>
        )}
      />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SoundProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </SoundProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
