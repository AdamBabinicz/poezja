import poetryDataJson from "./poetry-data.json";
import type { Poem as FinalPoem, Author } from "./mockPoems";

// KROK 1: Zaktualizuj interfejs RawPoem, aby wiedział, że ma wczytać `position` z JSON
interface RawPoem {
  id: string;
  titleKey: string;
  contentKey: string;
  imageSrc: string;
  keywords: string[];
  connections: string[];
  position: { x: number; y: number }; // <-- KLUCZOWA ZMIANA
}

export interface PoetryData {
  poems: RawPoem[];
  author: Author;
  metadata: {
    // ... reszta bez zmian
    scrapedAt: string;
    sourceUrl: string;
    totalPoems: number;
  };
}

const rawPoetryData: PoetryData = poetryDataJson as PoetryData;

// KROK 2: Usuwamy całą listę `fixedPositions` i logikę mapowania.
// Ponieważ JSON ma już pozycje, po prostu używamy go bezpośrednio.
const poemsWithPositions: FinalPoem[] = rawPoetryData.poems;

// KROK 3: Definiujemy węzeł autora - bez zmian, jest OK.
const authorNode: FinalPoem = {
  id: "author",
  titleKey: "navigation.about",
  contentKey: "author.description",
  imageSrc: "",
  keywords: ["autor", "biografia", "o mnie"],
  position: { x: 400, y: 440 },
  connections: poemsWithPositions.map((p) => p.id),
  isSpecial: true,
};

// KROK 4: Eksportujemy poprawne dane.
export const poems: FinalPoem[] = [...poemsWithPositions, authorNode];
export const author: Author = rawPoetryData.author;
