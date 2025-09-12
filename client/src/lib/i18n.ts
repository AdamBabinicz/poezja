import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navigation: {
        home: "Atlas",
        about: "About Author",
        language: "Language",
        theme: "Theme"
      },
      atlas: {
        title: "Neurological Atlas of a Poet's Mind",
        subtitle: "Explore interconnected thoughts through neural pathways",
        loading: "Initializing neural network...",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        reset: "Reset view",
        explore: "Explore the mind"
      },
      poem: {
        close: "Close",
        keywords: "Keywords",
        connections: "Thematic connections",
        readMore: "Read more"
      },
      author: {
        title: "About the Author",
        description: "A controversial poet exploring the depths of human consciousness"
      },
      accessibility: {
        neuralNode: "Neural node representing poem: {{title}}",
        connection: "Thematic connection between poems",
        zoomControl: "Zoom control",
        themeToggle: "Toggle dark/light theme",
        languageToggle: "Change language"
      }
    }
  },
  pl: {
    translation: {
      navigation: {
        home: "Atlas",
        about: "O Autorze",
        language: "Język",
        theme: "Motyw"
      },
      atlas: {
        title: "Neurologiczny Atlas Umysłu Poety",
        subtitle: "Odkrywaj połączone myśli poprzez ścieżki neuronowe",
        loading: "Inicjalizacja sieci neuronowej...",
        zoomIn: "Powiększ",
        zoomOut: "Pomniejsz",
        reset: "Resetuj widok",
        explore: "Eksploruj umysł"
      },
      poem: {
        close: "Zamknij",
        keywords: "Słowa kluczowe",
        connections: "Powiązania tematyczne",
        readMore: "Czytaj więcej"
      },
      author: {
        title: "O Autorze",
        description: "Kontrowersyjny poeta eksplorujący głębiny ludzkiej świadomości"
      },
      accessibility: {
        neuralNode: "Węzeł neuronowy reprezentujący wiersz: {{title}}",
        connection: "Tematyczne połączenie między wierszami",
        zoomControl: "Kontrola powiększenia",
        themeToggle: "Przełącz tryb ciemny/jasny",
        languageToggle: "Zmień język"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl', // Default to Polish
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;