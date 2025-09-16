import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSound } from "@/contexts/SoundContext";
import type { Poem } from "@/data/mockPoems";
import React from "react";
import { Key, User } from "lucide-react";

interface NeuralNodeProps {
  poem: Poem;
  onNodeSelect: (id: string) => void;
  onHover: (poem: Poem | null) => void;
  isHighlighted?: boolean; // optional - mamy fallback
  scale?: number; // optional - mamy fallback
}

const colors = {
  author: {
    base: "hsl(40 60% 75%)",
    hover: "hsl(40 70% 80%)",
    stroke: "hsl(40 80% 60%)",
  },
  singularity: {
    base: "hsl(38, 92%, 50%)",
    hover: "hsl(45, 100%, 60%)",
    stroke: "hsl(28, 80%, 45%)",
  },
  default: {
    base: "hsl(180 60% 70%)",
    hover: "hsl(180 70% 80%)",
    stroke: "hsl(200 80% 65%)",
  },
};

export default function NeuralNode({
  poem,
  onNodeSelect,
  onHover,
  isHighlighted = false,
  scale = 1,
}: NeuralNodeProps) {
  const { t } = useTranslation();
  const { playHoverSound } = useSound();

  // podstawowe sanity checks — natychmiast zwracamy null jeśli brakuje danych
  if (!poem || !poem.position) {
    console.debug("[NeuralNode] missing poem or position", { poem });
    return null;
  }

  const posX = Number(poem.position.x);
  const posY = Number(poem.position.y);

  if (!Number.isFinite(posX) || !Number.isFinite(posY)) {
    console.warn(
      "[NeuralNode] invalid position numbers — skipping render",
      poem.id,
      poem.position
    );
    return null;
  }

  const isAuthorNode = poem.id === "author";
  const isSingularityNode = poem.id === "singularity";
  const isSpecialNode = !!poem.isSpecial;

  const nodeSizeRaw = isSpecialNode ? 16 : 8;
  const nodeSize = Number(nodeSizeRaw);

  if (!Number.isFinite(nodeSize) || nodeSize <= 0) {
    console.warn("[NeuralNode] invalid nodeSize", { nodeSizeRaw, nodeSize });
    return null;
  }

  // debugging helper — szybko zobaczysz wartości w konsoli
  console.debug("[NeuralNode]", {
    id: poem.id,
    nodeSize,
    posX,
    posY,
    isHighlighted,
    isSpecialNode,
  });

  const titlePosition = {
    x: posX,
    y: posY - nodeSize - 8,
    anchor: "middle" as const,
  };

  const nodeColors = isAuthorNode
    ? colors.author
    : isSingularityNode
    ? colors.singularity
    : colors.default;

  const safeNumber = (v: number) => (Number.isFinite(v) ? Number(v) : 0); // dodatkowy safety fallback

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: Math.random() * 0.5 }}
      data-neural-node="true"
      onMouseEnter={() => {
        onHover(poem);
        playHoverSound();
      }}
      onMouseLeave={() => onHover(null)}
      onFocus={() => {
        onHover(poem);
        playHoverSound();
      }}
      onBlur={() => onHover(null)}
      onPointerDown={() => onNodeSelect(poem.id)}
      tabIndex={0}
      role="button"
      aria-label={t("accessibility.neuralNode", { title: t(poem.titleKey) })}
      className="focus-visible:outline-none cursor-pointer"
      data-testid={`neural-node-${poem.id}`}
    >
      {/* główny circle - zawsze ma initial r */}
      <motion.circle
        cx={posX}
        cy={posY}
        r={safeNumber(nodeSize)}
        fill={nodeColors.base}
        stroke={nodeColors.stroke}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        className="hover-elevate"
        data-node={`main-${poem.id}`}
        data-testid={`neural-node-circle-main-${poem.id}`}
        initial={{ r: safeNumber(nodeSize) }}
        animate={{
          r: safeNumber(isHighlighted ? nodeSize * 1.2 : nodeSize),
          fill: isHighlighted ? nodeColors.hover : nodeColors.base,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* pulsujący circle - tylko dla zwykłych node'ów */}
      {!isSpecialNode && (
        <motion.circle
          cx={posX}
          cy={posY}
          r={safeNumber(nodeSize)}
          fill="none"
          stroke={colors.default.base}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          style={{ pointerEvents: "none" }}
          data-node={`pulse-${poem.id}`}
          data-testid={`neural-node-circle-pulse-${poem.id}`}
          initial={{ r: safeNumber(nodeSize), opacity: 0.6 }}
          animate={{
            r: [
              safeNumber(nodeSize),
              safeNumber(nodeSize * 1.5),
              safeNumber(nodeSize),
            ],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ikona autora — opakowana w <g transform> (nie ustawiamy x/y na <svg>) */}
      {isAuthorNode && (
        <g
          transform={`translate(${posX - nodeSize / 2}, ${
            posY - nodeSize / 2
          })`}
        >
          <User
            width={nodeSize}
            height={nodeSize}
            className="text-stone-800 pointer-events-none"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      )}

      {/* singularity: ikona + efekt */}
      {isSingularityNode && (
        <>
          <g
            transform={`translate(${posX - nodeSize / 2}, ${
              posY - nodeSize / 2
            })`}
          >
            <Key
              width={nodeSize}
              height={nodeSize}
              className="text-amber-900 pointer-events-none"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          </g>

          <motion.circle
            cx={posX}
            cy={posY}
            r={safeNumber(nodeSize)}
            fill="none"
            stroke={nodeColors.base}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            style={{ pointerEvents: "none" }}
            data-node={`singularity-pulse-${poem.id}`}
            data-testid={`neural-node-circle-singularity-${poem.id}`}
            initial={{ r: safeNumber(nodeSize), opacity: 0.8 }}
            animate={{
              r: [safeNumber(nodeSize), safeNumber(nodeSize * 1.8)],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* outline circle (focus) */}
      <motion.circle
        cx={posX}
        cy={posY}
        r={safeNumber(nodeSize + 4)}
        fill="none"
        stroke="hsl(var(--ring))"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        className="opacity-0 group-focus-visible:opacity-100 transition-opacity"
        style={{ pointerEvents: "none" }}
        data-testid={`neural-node-circle-outline-${poem.id}`}
      />

      <motion.text
        x={titlePosition.x}
        y={titlePosition.y}
        textAnchor={titlePosition.anchor}
        className="font-serif fill-foreground pointer-events-none"
        style={{
          fontSize: "10px",
          transform: `scale(${1 / scale})`,
          transformOrigin: `${titlePosition.x}px ${titlePosition.y}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scale > 0.6 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {t(poem.titleKey)}
      </motion.text>
    </motion.g>
  );
}
