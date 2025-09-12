
import type { Poem } from './mockPoems';

const realPoemTitles = [
  "Moc", "Niespełnienie", "Obietnica", "Witryna", "Wiersz na czasy eschatyczne",
  "My, Wszechświat", "Apokalipsa według Adama", "Marzenie", "Kadłubek", "Uczucie",
  "Szal", "Chłopiec z basenu", "Dłoń", "Miara Wszechrzeczy", "Poeci są wśród nas",
  "Zlecenie od Pana Boga", "Droga", "Nagroda", "Piętno", "Pytanie",
  "Dziadek do orzechów", "Rozrzutność", "Przyszłość", "Nagroda i kara", "Światy",
  "Wiersz nostalgiczny", "Pamięć", "Głos", "Dylemat", "Tajemnica",
  "Spacer", "Dobrze, że jesteś", "Zdziwienie"
];

// Generate keywords for each poem
const generateKeywordsForPoem = (title: string): string[] => {
  const baseKeywords = ['poezja', 'wiersz', 'literatura'];
  const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 2);
  return [...titleWords, ...baseKeywords].slice(0, 5);
};

// Generate connections between poems
const generateConnections = (index: number, total: number): string[] => {
  const connections = [];
  // Connect to 2-3 other poems
  if (index > 0) connections.push(`poem-${index}`);
  if (index < total - 1) connections.push(`poem-${index + 2}`);
  if (index > 2) connections.push(`poem-${index - 1}`);
  return connections.slice(0, 3);
};

// Fixed positions with proper spacing - no randomization
const fixedPositions = [
  { x: 400, y: 300 }, // Center
  { x: 300, y: 200 }, { x: 500, y: 200 }, { x: 200, y: 300 }, { x: 600, y: 300 },
  { x: 300, y: 400 }, { x: 500, y: 400 }, { x: 150, y: 150 }, { x: 650, y: 150 },
  { x: 150, y: 450 }, { x: 650, y: 450 }, { x: 250, y: 100 }, { x: 550, y: 100 },
  { x: 100, y: 250 }, { x: 700, y: 250 }, { x: 250, y: 500 }, { x: 550, y: 500 },
  { x: 350, y: 150 }, { x: 450, y: 150 }, { x: 350, y: 450 }, { x: 450, y: 450 },
  { x: 200, y: 200 }, { x: 600, y: 200 }, { x: 200, y: 400 }, { x: 600, y: 400 },
  { x: 125, y: 350 }, { x: 675, y: 350 }, { x: 325, y: 250 }, { x: 475, y: 250 },
  { x: 325, y: 350 }, { x: 475, y: 350 }, { x: 400, y: 175 }, { x: 400, y: 425 }
];

export const poems: Poem[] = realPoemTitles.map((title, index) => {
  // Use fixed positions or fallback to calculated position
  const position = fixedPositions[index] || { 
    x: 150 + (index % 6) * 120, 
    y: 120 + Math.floor(index / 6) * 90 
  };

  return {
    id: `poem-${index + 1}`,
    title,
    position,
    content: [`This is the full text of the poem "${title}". It explores themes of human consciousness, neural connections, and the intersection of mind and poetry.`],
    imageSrc: '/images/moc.jpg',
    keywords: generateKeywordsForPoem(title),
    connections: generateConnections(index, realPoemTitles.length),
    createdAt: new Date().toISOString()
  };
});
