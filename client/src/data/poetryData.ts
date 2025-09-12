
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

export const poetryData: PoetryData = poetryDataJson as PoetryData;
export const poems: Poem[] = poetryData.poems;
