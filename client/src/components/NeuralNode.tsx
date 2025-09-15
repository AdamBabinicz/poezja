import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSound } from "@/contexts/SoundContext";
import type { Poem } from "@/data/mockPoems";
import React from "react";
import { Key, User } from "lucide-react";

interface NeuralNodeProps {
  poem: Poem;
  onClick: () => void;
  onHover: (poem: Poem | null) => void;
  isHighlighted: boolean;
  scale: number;
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
  onClick,
  onHover,
  isHighlighted,
  scale,
}: NeuralNodeProps) {
  const { t } = useTranslation();
  const { playHoverSound } = useSound();

  const handleMouseEnter = () => {
    onHover(poem);
    playHoverSound();
  };

  const handleFocus = () => {
    onHover(poem);
    playHoverSound();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  const isAuthorNode = poem.id === "author";
  const isSingularityNode = poem.id === "singularity";
  const isSpecialNode = poem.isSpecial;

  const baseSize = isSpecialNode ? 16 : 8;
  const nodeSize = Math.max(8, Math.min(24, (baseSize * 1.5) / scale));
  const textOpacity = scale > 0.6 ? 1 : 0;

  const titlePosition = {
    x: poem.position.x,
    y: poem.position.y - nodeSize - 8,
    anchor: "middle" as const,
  };

  const nodeColors = isAuthorNode
    ? colors.author
    : isSingularityNode
    ? colors.singularity
    : colors.default;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: Math.random() * 0.5 }}
      data-neural-node="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => onHover(null)}
      onFocus={handleFocus}
      onBlur={() => onHover(null)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="focus-visible:outline-none"
    >
      <motion.circle
        cx={poem.position.x}
        cy={poem.position.y}
        r={nodeSize}
        fill={nodeColors.base}
        stroke={nodeColors.stroke}
        strokeWidth={isHighlighted ? 2 : 1}
        className="cursor-pointer hover-elevate"
        onClick={onClick}
        initial={{ r: nodeSize }}
        animate={{
          r: isHighlighted ? nodeSize * 1.2 : nodeSize,
          fill: isHighlighted ? nodeColors.hover : nodeColors.base,
        }}
        transition={{ duration: 0.3 }}
        aria-label={t("accessibility.neuralNode", { title: t(poem.titleKey) })}
        data-testid={`neural-node-${poem.id}`}
      />

      {!isSpecialNode && (
        <motion.circle
          cx={poem.position.x}
          cy={poem.position.y}
          r={nodeSize}
          fill="none"
          stroke={colors.default.base}
          strokeWidth={1}
          style={{ pointerEvents: "none" }}
          initial={{ r: nodeSize, opacity: 0.6 }}
          animate={{
            r: [nodeSize, nodeSize * 1.5, nodeSize],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {isAuthorNode && (
        <User
          x={poem.position.x - nodeSize / 2}
          y={poem.position.y - nodeSize / 2}
          width={nodeSize}
          height={nodeSize}
          className="text-stone-800 pointer-events-none"
          strokeWidth={1.5}
        />
      )}

      {isSingularityNode && (
        <>
          <Key
            x={poem.position.x - nodeSize / 2}
            y={poem.position.y - nodeSize / 2}
            width={nodeSize}
            height={nodeSize}
            className="text-amber-900 pointer-events-none"
            strokeWidth={1.5}
          />
          <motion.circle
            cx={poem.position.x}
            cy={poem.position.y}
            r={nodeSize}
            fill="none"
            stroke={nodeColors.base}
            strokeWidth={1.5}
            style={{ pointerEvents: "none" }}
            initial={{ r: nodeSize, opacity: 0.8 }}
            animate={{
              r: [nodeSize, nodeSize * 1.8],
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

      <motion.circle
        cx={poem.position.x}
        cy={poem.position.y}
        r={nodeSize + 4 / scale}
        fill="none"
        stroke="hsl(var(--ring))"
        strokeWidth={2 / scale}
        className="opacity-0 group-focus-visible:opacity-100 transition-opacity"
        style={{ pointerEvents: "none" }}
      />

      <motion.text
        x={titlePosition.x}
        y={titlePosition.y}
        textAnchor={titlePosition.anchor}
        className="font-serif text-xs fill-foreground pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: textOpacity }}
        transition={{ duration: 0.3 }}
      >
        {t(poem.titleKey)}
      </motion.text>
    </motion.g>
  );
}
