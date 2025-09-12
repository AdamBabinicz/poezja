import type { Poem } from '@/data/mockPoems';

interface TitlePosition {
  x: number;
  y: number;
  anchor: 'middle' | 'start' | 'end';
}

interface TitleBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

function estimateTextWidth(text: string, fontSize: number = 12): number {
  // Rough estimation: each character is about 0.6 * fontSize wide
  return text.length * fontSize * 0.6;
}

function getTitleBounds(poem: Poem, position: TitlePosition, nodeSize: number): TitleBounds {
  const textWidth = estimateTextWidth(poem.title);
  const textHeight = 16; // Approximate height for font-size: 12px

  let x = position.x;
  if (position.anchor === 'middle') {
    x = position.x - textWidth / 2;
  } else if (position.anchor === 'end') {
    x = position.x - textWidth;
  }

  return {
    x,
    y: position.y - textHeight,
    width: textWidth,
    height: textHeight
  };
}

function boundsOverlap(bounds1: TitleBounds, bounds2: TitleBounds): boolean {
  const padding = 4; // Add some padding between titles
  return !(
    bounds1.x + bounds1.width + padding < bounds2.x ||
    bounds2.x + bounds2.width + padding < bounds1.x ||
    bounds1.y + bounds1.height + padding < bounds2.y ||
    bounds2.y + bounds2.height + padding < bounds1.y
  );
}

export function calculateOptimalTitlePosition(
  currentPoem: Poem,
  allPoems: Poem[] = [],
  nodeSize: number
): TitlePosition {
  const baseX = currentPoem.position.x;
  const baseY = currentPoem.position.y;

  // Try different positions around the node
  const candidatePositions: TitlePosition[] = [
    // Above (default)
    { x: baseX, y: baseY - nodeSize - 8, anchor: 'middle' },
    // Below
    { x: baseX, y: baseY + nodeSize + 20, anchor: 'middle' },
    // Left
    { x: baseX - nodeSize - 8, y: baseY - 4, anchor: 'end' },
    // Right
    { x: baseX + nodeSize + 8, y: baseY - 4, anchor: 'start' },
    // Above-left
    { x: baseX - nodeSize * 0.7, y: baseY - nodeSize - 8, anchor: 'middle' },
    // Above-right
    { x: baseX + nodeSize * 0.7, y: baseY - nodeSize - 8, anchor: 'middle' },
  ];

  // Get bounds for other poems' titles (assuming they use default positioning)
  const otherTitleBounds = allPoems
    .filter(poem => poem.id !== currentPoem.id)
    .map(poem => {
      const defaultPos = { 
        x: poem.position.x, 
        y: poem.position.y - nodeSize - 8, 
        anchor: 'middle' as const 
      };
      return getTitleBounds(poem, defaultPos, nodeSize);
    });

  // Find the position with the least overlaps
  let bestPosition = candidatePositions[0];
  let minOverlaps = Infinity;

  for (const candidate of candidatePositions) {
    const candidateBounds = getTitleBounds(currentPoem, candidate, nodeSize);
    
    const overlapCount = otherTitleBounds.reduce((count, otherBounds) => {
      return count + (boundsOverlap(candidateBounds, otherBounds) ? 1 : 0);
    }, 0);

    if (overlapCount < minOverlaps) {
      minOverlaps = overlapCount;
      bestPosition = candidate;
      
      // If we found a position with no overlaps, use it
      if (overlapCount === 0) break;
    }
  }

  return bestPosition;
}