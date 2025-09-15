import poetryDataJson from "./poetry-data.json";

export interface Poem {
  id: string;
  titleKey: string;
  contentKey: string;
  imageSrc?: string;
  keywords: string[];
  position: { x: number; y: number };
  connections: string[];
  isSpecial?: boolean;
}

export interface Author {
  nameKey: string;
  descriptionKey: string;
  bioKey: string;
}

interface RawPoem {
  id: string;
  titleKey: string;
  contentKey: string;
  imageSrc?: string;
  keywords: string[];
  connections: string[];
}

interface RawPoetryData {
  poems: RawPoem[];
  author: Author;
  metadata: {
    scrapedAt: string;
    sourceUrl: string;
    totalPoems: number;
  };
}

const rawPoetryData: RawPoetryData = poetryDataJson as RawPoetryData;

const fixedPositions = [
  { x: 100, y: 100 }, // witryna
  { x: 700, y: 80 }, // rozrzutnosc
  { x: 250, y: 450 }, // glos
  { x: 50, y: 250 }, // dziadek-do-orzechow
  { x: 180, y: 150 }, // dylemat
  { x: 120, y: 320 }, // zdziwienie
  { x: 350, y: 500 }, // kadlubek
  { x: 250, y: 200 }, // niespelnienie
  { x: 350, y: 250 }, // moc
  { x: 750, y: 200 }, // marzenie
  { x: 450, y: 300 }, // miara-wszechrzeczy
  { x: 150, y: 50 }, // nagroda-i-kara
  { x: 250, y: 50 }, // nagroda
  { x: 350, y: 80 }, // obietnica
  { x: 30, y: 350 }, // chlopiec-z-basenu
  { x: 450, y: 120 }, // pamiec
  { x: 650, y: 480 }, // zlecenie-od-pana-boga
  { x: 50, y: 180 }, // pietno
  { x: 550, y: 350 }, // poeci-sa-wsrod-nas
  { x: 650, y: 150 }, // przyszlosc
  { x: 580, y: 530 }, // pytanie
  { x: 100, y: 500 }, // uczucie
  { x: 600, y: 50 }, // spacer
  { x: 780, y: 130 }, // swiaty
  { x: 480, y: 200 }, // tajemnica
  { x: 200, y: 280 }, // apokalipsa-wedlug-adama
  { x: 550, y: 100 }, // wiersz-nostalgiczny
  { x: 220, y: 350 }, // wiersz-na-czasy-eschatyczne
  { x: 680, y: 250 }, // droga
  { x: 100, y: 400 }, // dlon
  { x: 200, y: 520 }, // dobrze-ze-jestes
  { x: 50, y: 450 }, // szal
  { x: 600, y: 400 }, // <-- TO JEST POZYCJA DLA "My, Wszechświat"
];

export const poems: Poem[] = rawPoetryData.poems.map((jsonPoem, index) => {
  const position = fixedPositions[index] || {
    x: 150 + (index % 6) * 120,
    y: 120 + Math.floor(index / 6) * 90,
  };

  return {
    ...jsonPoem,
    position,
  };
});

export const author: Author = rawPoetryData.author;
