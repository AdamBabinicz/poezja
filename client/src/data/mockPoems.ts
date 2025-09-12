// TODO: Replace with real data from poetry.netlify.app scraping
export interface Poem {
  id: string;
  title: string;
  content: string[];
  imageSrc: string;
  keywords: string[];
  position: { x: number; y: number };
  connections: string[];
}

const realPoemTitles = [
  "Moc", "Niespełnienie", "Obietnica", "Witryna", "Wiersz na czasy eschatyczne",
  "My, Wszechświat", "Apokalipsa według Adama", "Marzenie", "Kadłubek", "Uczucie",
  "Szal", "Chłopiec z basenu", "Dłoń", "Miara Wszechrzeczy", "Poeci są wśród nas",
  "Zlecenie od Pana Boga", "Droga", "Nagroda", "Piętno", "Pytanie",
  "Dziadek do orzechów", "Rozrzutność", "Przyszłość", "Nagroda i kara", "Światy",
  "Wiersz nostalgiczny", "Pamięć", "Głos", "Dylemat", "Tajemnica",
  "Spacer", "Dobrze, że jesteś", "Zdziwienie"
];

// Helper function to generate keywords (assuming this exists elsewhere or needs to be defined)
const generateKeywordsForPoem = (title: string): string[] => {
  // Placeholder for keyword generation logic
  return title.toLowerCase().split(' ').slice(0, 3).concat(['poezja']);
};

// Helper function to generate connections (assuming this exists elsewhere or needs to be defined)
const generateConnections = (index: number, total: number): string[] => {
  // Placeholder for connection generation logic
  const connections = [];
  if (index > 0) connections.push(`poem-${index}`);
  if (index < total - 1) connections.push(`poem-${index + 2}`);
  return connections.slice(0, 2);
};


// Generate positions spread evenly across the screen
const generateNodePositions = (): Poem[] => {
  return realPoemTitles.map((title, index) => {
    // Create a more spread out grid-like pattern with organic variation
    const cols = Math.ceil(Math.sqrt(realPoemTitles.length * 1.2)); // Slightly wider grid
    const rows = Math.ceil(realPoemTitles.length / cols);

    const col = index % cols;
    const row = Math.floor(index / cols);

    // Base grid positions
    const baseX = 100 + (col * (600 / (cols - 1 || 1)));
    const baseY = 80 + (row * (440 / (rows - 1 || 1)));

    // Add organic variation
    const variation = 40;
    const x = baseX + (Math.random() * variation - variation/2);
    const y = baseY + (Math.random() * variation - variation/2);

    return {
      id: `poem-${index + 1}`,
      title,
      position: { 
        x: Math.max(80, Math.min(720, x)), // Keep within bounds with padding
        y: Math.max(60, Math.min(540, y))
      },
      content: `This is the full text of the poem "${title}". It explores themes of...`,
      keywords: generateKeywordsForPoem(title),
      connections: generateConnections(index, realPoemTitles.length),
      createdAt: new Date().toISOString()
    };
  });
};

export const mockPoems: Poem[] = generateNodePositions();


export const authorInfo = {
  name: "Neuralny Poeta",
  description: "Kontrowersyjny autor eksplorujący granice między świadomością a podświadomością, między słowem a myślą. Jego poezja to mapa neuronowych połączeń, gdzie każdy wiersz to węzeł w sieci znaczeń.",
  bio: `Twórca poezji neurologicznej, badacz granic ludzkiej percepcji. 
  Jego utwory powstają na przecięciu nauki i sztuki, 
  tworząc nowy język opisywania ludzkiego doświadczenia.

  Kontrowersyjny z natury, prowokujący do myślenia,
  poszukujący prawdy w najmroczniejszych zakątkach umysłu.`
};