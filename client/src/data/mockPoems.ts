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


// Generate positions with proper spacing to avoid overlaps
const generateNodePositions = (): Poem[] => {
  const totalPoems = realPoemTitles.length;
  const positions: Array<{ x: number; y: number }> = [];

  // Canvas dimensions with padding
  const canvasWidth = 800;
  const canvasHeight = 600;
  const padding = 100;
  const workingWidth = canvasWidth - (padding * 2);
  const workingHeight = canvasHeight - (padding * 2);

  // Minimum distance between nodes (including space for titles)
  const minDistance = 120; // Increased from ~60 to ensure title spacing

  // Use a spiral distribution pattern for better space utilization
  const generateSpiralPositions = () => {
    const center = { x: canvasWidth / 2, y: canvasHeight / 2 };
    const positions: Array<{ x: number; y: number }> = [];

    for (let i = 0; i < totalPoems; i++) {
      let attempts = 0;
      let position: { x: number; y: number };

      do {
        if (i === 0) {
          // First node at center
          position = { x: center.x, y: center.y };
        } else {
          // Generate position using golden angle spiral
          const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
          const radius = Math.sqrt(i) * 25; // Increased spacing multiplier
          const angle = i * goldenAngle;

          position = {
            x: center.x + radius * Math.cos(angle) + (Math.random() - 0.5) * 30,
            y: center.y + radius * Math.sin(angle) + (Math.random() - 0.5) * 30
          };

          // Ensure position is within bounds
          position.x = Math.max(padding, Math.min(canvasWidth - padding, position.x));
          position.y = Math.max(padding, Math.min(canvasHeight - padding, position.y));
        }

        // Check if this position is far enough from existing positions
        const tooClose = positions.some(existing => {
          const distance = Math.sqrt(
            Math.pow(position.x - existing.x, 2) +
            Math.pow(position.y - existing.y, 2)
          );
          return distance < minDistance;
        });

        if (!tooClose || attempts > 50) {
          break;
        }

        attempts++;
      } while (attempts <= 50);

      positions.push(position);
    }

    return positions;
  };

  const spiralPositions = generateSpiralPositions();

  return realPoemTitles.map((title, index) => {
    const position = spiralPositions[index] || { x: 400, y: 300 };

    return {
      id: `poem-${index + 1}`,
      title,
      position,
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
  description: "Autor urodził się dokładnie 100 lat później, niż Nikola Tesla. Nie tytułuje się żadnym przedrostkiem. Nie ma wyuczonego zawodu. W swoim życiu był dekoratorem, roznosicielem mleka, twarożkarzem, obserwatorem meteo, szlifierzem, krawcem, kierownikiem marketu, sprzedawcą. Jako subiekt przez witrynę sklepową obserwował przechodzących ludzi. Wtedy zauważył, że są jak „na sznurkach\". Interesuje się kosmologią. Nie posiada dorobku; w żadnej dziedzinie nie osiągnął mistrzostwa. W życiu prywatnym - rozwiedziony.",
  bio: ""
};