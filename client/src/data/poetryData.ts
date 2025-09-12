
import poetryDataJson from './poetry-data.json';
import type { Poem } from './mockPoems';

export interface PoetryData {
  poems: Poem[];
  author: {
    name: string;
    description: string;
    bio: string;
  };
  metadata: {
    scrapedAt: string;
    sourceUrl: string;
    totalPoems: number;
  };
}

const rawPoetryData: PoetryData = poetryDataJson as PoetryData;

// Fixed positions with proper spacing to avoid clustering and title overlaps
const fixedPositions = [
  { x: 400, y: 300 }, // Center - "Moc"
  { x: 200, y: 180 }, { x: 600, y: 180 }, { x: 150, y: 300 }, { x: 650, y: 300 },
  { x: 200, y: 420 }, { x: 600, y: 420 }, { x: 120, y: 150 }, { x: 680, y: 150 },
  { x: 120, y: 450 }, { x: 680, y: 450 }, { x: 280, y: 100 }, { x: 520, y: 100 },
  { x: 80, y: 250 }, { x: 720, y: 250 }, { x: 280, y: 520 }, { x: 520, y: 520 },
  { x: 320, y: 140 }, { x: 480, y: 140 }, { x: 320, y: 460 }, { x: 480, y: 460 },
  { x: 160, y: 200 }, { x: 640, y: 200 }, { x: 160, y: 400 }, { x: 640, y: 400 },
  { x: 100, y: 350 }, { x: 700, y: 350 }, { x: 360, y: 240 }, { x: 440, y: 240 },
  { x: 360, y: 360 }, { x: 440, y: 360 }, { x: 400, y: 160 }, { x: 400, y: 440 }
];

// Create poems array with proper positioning and real content from JSON
export const poems: Poem[] = rawPoetryData.poems.map((jsonPoem, index) => {
  // Use fixed positions or fallback to calculated position
  const position = fixedPositions[index] || { 
    x: 150 + (index % 6) * 120, 
    y: 120 + Math.floor(index / 6) * 90 
  };

  return {
    ...jsonPoem,
    position // Override position while keeping all other data from JSON
  };
});

export const poetryData: PoetryData = {
  ...rawPoetryData,
  poems
};
