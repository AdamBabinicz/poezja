import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HelmetProvider } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import NeuralAtlas from "@/components/NeuralAtlas";
import AuthorModal from "@/components/AuthorModal";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useTranslation } from 'react-i18next';
import './lib/i18n';
import backgroundImage from '@assets/generated_images/Neural_network_background_visualization_6faa9190.png';
import authorImage from '@assets/generated_images/Abstract_author_portrait_aaf38ae2.png';

function MainApp() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    // Simulate neural network initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative">
      {/* Background neural texture */}
      <div 
        className="fixed inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Main atlas view */}
      <NeuralAtlas />
      
      {/* Author button */}
      <div className="fixed bottom-4 left-4 z-40">
        <Button
          onClick={() => setShowAuthor(true)}
          className="bg-card/80 backdrop-blur-md border border-card-border hover-elevate"
          data-testid="button-show-author"
        >
          <User className="h-4 w-4 mr-2" />
          {t('navigation.about')}
        </Button>
      </div>

      {/* Author modal */}
      <AuthorModal
        isOpen={showAuthor}
        onClose={() => setShowAuthor(false)}
        authorImage={authorImage}
      />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={MainApp} />
      <Route path="/:lang" component={MainApp} />
      <Route component={() => <div className="min-h-screen bg-background flex items-center justify-center text-foreground">404 - Page not found</div>} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
