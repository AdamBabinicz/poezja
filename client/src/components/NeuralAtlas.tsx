import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import NeuralNode from "./NeuralNode";
import NeuralConnection from "./NeuralConnection";
import AtlasControls from "./AtlasControls";
import PoemModal from "./PoemModal";
import AuthorModal from "./AuthorModal";
import SingularityModal from "./SingularityModal";
import { poems } from "@/data/poetryData";
import type { Poem as FinalPoem } from "@/data/mockPoems";

interface NeuralAtlasProps {
  authorImage: string;
}

const singularityNode: FinalPoem = {
  id: "singularity",
  titleKey: "singularity.node_title",
  contentKey: "",
  keywords: [],
  connections: [],
  position: { x: 400, y: 550 },
  isSpecial: true,
};

export default function NeuralAtlas({ authorImage }: NeuralAtlasProps) {
  const { t } = useTranslation();
  const [selectedPoem, setSelectedPoem] = useState<FinalPoem | null>(null);
  const [hoveredPoem, setHoveredPoem] = useState<FinalPoem | null>(null);
  const [highlightedKeyword, setHighlightedKeyword] = useState<string | null>(
    null
  );
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isSingularityModalOpen, setIsSingularityModalOpen] = useState(false);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * 1.2, 3));
  }, []);
  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev / 1.2, 0.3));
  }, []);
  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setHighlightedKeyword(null);
  }, []);

  const handleNodeClick = useCallback((nodeId: string) => {
    if (nodeId === "author") {
      setIsAuthorModalOpen(true);
    } else if (nodeId === "singularity") {
      setIsSingularityModalOpen(true);
    } else {
      const poem = poems.find((p) => p.id === nodeId);
      setSelectedPoem(poem || null);
    }
  }, []);

  const handleKeywordClick = useCallback((keyword: string) => {
    setHighlightedKeyword(keyword);
    setSelectedPoem(null);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const target = e.target as Element;
      if (
        target.closest("[data-neural-node]") ||
        target.hasAttribute("data-neural-node")
      ) {
        return;
      }
      setIsDragging(true);
      setDragStart({
        x: e.clientX / scale - position.x,
        y: e.clientY / scale - position.y,
      });
    },
    [position, scale]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX / scale - dragStart.x,
          y: e.clientY / scale - dragStart.y,
        });
      }
    },
    [isDragging, dragStart, scale]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const isConnectionActive = useCallback(
    (from: FinalPoem, to: FinalPoem) => {
      if (!hoveredPoem) return false;
      if (hoveredPoem.id === "singularity") return false;

      if (
        hoveredPoem.id === "author" &&
        (from.id === "author" || to.id === "author")
      ) {
        return true;
      }
      return hoveredPoem.id === from.id || hoveredPoem.id === to.id;
    },
    [hoveredPoem]
  );

  const isPoemHighlighted = useCallback(
    (poem: FinalPoem) => {
      if (poem.id === "singularity") {
        return hoveredPoem?.id === "singularity";
      }
      if (highlightedKeyword) {
        return poem.keywords.includes(highlightedKeyword);
      }
      if (hoveredPoem) {
        if (hoveredPoem.id === "singularity") return false;
        if (hoveredPoem.id === poem.id) return true;
        return (
          hoveredPoem.connections.includes(poem.id) ||
          poem.connections.includes(hoveredPoem.id)
        );
      }
      return false;
    },
    [highlightedKeyword, hoveredPoem]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((prev) => Math.max(0.3, Math.min(3, prev * delta)));
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-neural-node via-transparent to-neural-connection" />
      </div>

      <div
        ref={containerRef}
        className={`w-full h-full ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        data-testid="neural-atlas-canvas"
      >
        <motion.div
          className="w-full h-full"
          style={{
            transformOrigin: "center center",
          }}
          animate={{
            scale,
            x: position.x * scale,
            y: position.y * scale,
          }}
          transition={{ type: "tween", duration: 0.1, ease: "linear" }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            className="overflow-visible"
          >
            <defs>
              <pattern
                id="grid"
                width={40}
                height={40}
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#grid)"
              style={{ pointerEvents: "none" }}
            />

            {poems.map((poem) =>
              poem.connections.map((connectionId) => {
                const connectedPoem = poems.find((p) => p.id === connectionId);
                if (!connectedPoem || poem.id > connectionId) return null;
                return (
                  <NeuralConnection
                    key={`${poem.id}-${connectionId}`}
                    from={poem}
                    to={connectedPoem}
                    isActive={isConnectionActive(poem, connectedPoem)}
                    opacity={highlightedKeyword ? 0.1 : 0.5}
                  />
                );
              })
            )}

            {poems.map((poem) => (
              <NeuralNode
                key={poem.id}
                poem={poem}
                onClick={() => handleNodeClick(poem.id)}
                onHover={setHoveredPoem}
                isHighlighted={isPoemHighlighted(poem)}
                scale={scale}
              />
            ))}

            <NeuralNode
              key={singularityNode.id}
              poem={singularityNode}
              onClick={() => handleNodeClick(singularityNode.id)}
              onHover={setHoveredPoem}
              isHighlighted={isPoemHighlighted(singularityNode)}
              scale={scale}
            />
          </svg>
        </motion.div>
      </div>

      <AtlasControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        scale={scale}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-8 left-8 z-40"
      >
        <h1 className="text-2xl lg:text-3xl font-serif text-foreground mb-2">
          {t("atlas.title")}
        </h1>
        <p className="text-muted-foreground max-w-md">{t("atlas.subtitle")}</p>
      </motion.div>

      {highlightedKeyword && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-8 left-8 bg-card/80 backdrop-blur-md border border-card-border rounded-lg p-4"
        >
          <p className="text-sm text-muted-foreground mb-1">
            {t("atlas.highlightingKeyword")}
          </p>
          <p className="font-semibold text-neural-highlight">
            {t(`keywords.${highlightedKeyword}`, highlightedKeyword)}
          </p>
          <button
            onClick={() => setHighlightedKeyword(null)}
            className="text-xs text-muted-foreground hover:text-foreground mt-2"
            data-testid="button-clear-highlight"
          >
            {t("atlas.clearHighlight")}
          </button>
        </motion.div>
      )}

      <PoemModal
        poem={selectedPoem}
        onClose={() => setSelectedPoem(null)}
        onKeywordClick={handleKeywordClick}
      />

      <AuthorModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
        authorImage={authorImage}
      />

      <SingularityModal
        isOpen={isSingularityModalOpen}
        onClose={() => setIsSingularityModalOpen(false)}
      />
    </div>
  );
}
