import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import NeuralNode from './NeuralNode';
import NeuralConnection from './NeuralConnection';
import AtlasControls from './AtlasControls';
import PoemModal from './PoemModal';
import { poems } from '@/data/poetryData';
import type { Poem } from '@/data/mockPoems';

// TODO: Remove mock functionality - replace with real data
export default function NeuralAtlas() {
  const { t } = useTranslation();
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [hoveredPoem, setHoveredPoem] = useState<Poem | null>(null);
  const [highlightedKeyword, setHighlightedKeyword] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev / 1.2, 0.3));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setHighlightedKeyword(null);
  }, []);

  const handlePoemClick = useCallback((poemId: string) => {
    const poem = poems.find(p => p.id === poemId);
    setSelectedPoem(poem || null);
  }, []);

  const handleKeywordClick = useCallback((keyword: string) => {
    setHighlightedKeyword(keyword);
    setSelectedPoem(null);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only handle left mouse button
    if (e.button !== 0) return;

    // Don't start dragging if clicking on a neural node
    const target = e.target as Element;
    if (target.closest('[data-neural-node]') || target.hasAttribute('data-neural-node')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const getConnectedPoems = useCallback((poemId: string) => {
    const poem = poems.find(p => p.id === poemId);
    return poem ? poem.connections : [];
  }, []);

  const isConnectionActive = useCallback((from: Poem, to: Poem) => {
    return Boolean(hoveredPoem && (hoveredPoem.id === from.id || hoveredPoem.id === to.id));
  }, [hoveredPoem]);

  const isPoemHighlighted = useCallback((poem: Poem) => {
    if (highlightedKeyword) {
      return poem.keywords.includes(highlightedKeyword);
    }
    if (hoveredPoem) {
      return hoveredPoem.id === poem.id ||
             hoveredPoem.connections.includes(poem.id) ||
             poem.connections.includes(hoveredPoem.id);
    }
    return false;
  }, [highlightedKeyword, hoveredPoem]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(prev => Math.max(0.3, Math.min(3, prev * delta)));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-neural-node via-transparent to-neural-connection" />
      </div>

      {/* Main canvas */}
      <div
        ref={containerRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        data-testid="neural-atlas-canvas"
      >
        <motion.div
          animate={{
            scale,
            x: position.x,
            y: position.y
          }}
          transition={{ type: "tween", duration: 0.1 }}
          className="w-full h-full"
        >
          <svg width="100%" height="100%" viewBox="0 0 800 600" className="overflow-visible">
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" style={{ pointerEvents: 'none' }} />

            {/* Neural connections */}
            {poems.map(poem =>
              poem.connections.map(connectionId => {
                const connectedPoem = poems.find(p => p.id === connectionId);
                if (!connectedPoem) return null;

                return (
                  <NeuralConnection
                    key={`${poem.id}-${connectionId}`}
                    from={poem}
                    to={connectedPoem}
                    isActive={isConnectionActive(poem, connectedPoem)}
                    opacity={highlightedKeyword ? 0.1 : 0.3}
                  />
                );
              })
            )}

            {/* Neural nodes */}
            {poems.map(poem => (
              <NeuralNode
                key={poem.id}
                poem={poem}
                onClick={() => handlePoemClick(poem.id)}
                onHover={setHoveredPoem}
                isHighlighted={isPoemHighlighted(poem)}
                scale={scale}
                allPoems={poems}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Atlas controls */}
      <AtlasControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        scale={scale}
      />

      {/* Title overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-8 left-8 z-40"
      >
        <h1 className="text-2xl lg:text-3xl font-serif text-foreground mb-2">
          {t('atlas.title')}
        </h1>
        <p className="text-muted-foreground max-w-md">
          {t('atlas.subtitle')}
        </p>
      </motion.div>

      {/* Keyword highlight indicator */}
      {highlightedKeyword && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-8 left-8 bg-card/80 backdrop-blur-md border border-card-border rounded-lg p-4"
        >
          <p className="text-sm text-muted-foreground mb-1">Highlighting keyword:</p>
          <p className="font-semibold text-neural-highlight">{highlightedKeyword}</p>
          <button
            onClick={() => setHighlightedKeyword(null)}
            className="text-xs text-muted-foreground hover:text-foreground mt-2"
            data-testid="button-clear-highlight"
          >
            Clear highlight
          </button>
        </motion.div>
      )}

      {/* Poem modal */}
      <PoemModal
        poem={selectedPoem}
        onClose={() => setSelectedPoem(null)}
        onKeywordClick={handleKeywordClick}
      />
    </div>
  );
}