import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Poem } from '@/data/mockPoems';
import { calculateOptimalTitlePosition } from '@/utils/titlePositioning';

interface NeuralNodeProps {
  poem: Poem;
  onClick: () => void;
  onHover: (poem: Poem | null) => void;
  isHighlighted: boolean;
  scale: number;
  allPoems: Poem[];
}

export default function NeuralNode({ 
  poem, 
  onClick, 
  onHover, 
  isHighlighted,
  scale,
  allPoems 
}: NeuralNodeProps) {
  const { t } = useTranslation();

  const nodeSize = Math.max(8, Math.min(24, 12 * scale));
  const textOpacity = scale > 0.6 ? 1 : 0;
  
  // Calculate optimal title position to avoid overlaps
  const titlePosition = calculateOptimalTitlePosition(poem, allPoems, nodeSize);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: Math.random() * 0.5 }}
    >
      {/* Node glow effect */}
      <motion.circle
        cx={poem.position.x}
        cy={poem.position.y}
        r={nodeSize * 2}
        fill="url(#nodeGlow)"
        opacity={isHighlighted ? 0.6 : 0.3}
        animate={{
          r: isHighlighted ? nodeSize * 2.5 : nodeSize * 2,
          opacity: isHighlighted ? 0.8 : 0.3
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main node */}
      <motion.circle
        cx={poem.position.x}
        cy={poem.position.y}
        r={nodeSize}
        fill="hsl(180 60% 70%)"
        stroke="hsl(200 80% 65%)"
        strokeWidth={isHighlighted ? 2 : 1}
        className="cursor-pointer hover-elevate"
        onClick={onClick}
        onMouseEnter={() => onHover(poem)}
        onMouseLeave={() => onHover(null)}
        animate={{
          r: isHighlighted ? nodeSize * 1.2 : nodeSize,
          fill: isHighlighted ? "hsl(40 60% 75%)" : "hsl(180 60% 70%)"
        }}
        transition={{ duration: 0.3 }}
        aria-label={t('accessibility.neuralNode', { title: poem.title })}
        data-testid={`neural-node-${poem.id}`}
        data-neural-node="true"
      />
      
      {/* Pulsing animation */}
      <motion.circle
        cx={poem.position.x}
        cy={poem.position.y}
        r={nodeSize}
        fill="none"
        stroke="hsl(180 60% 70%)"
        strokeWidth={1}
        opacity={0.6}
        animate={{
          r: [nodeSize, nodeSize * 1.5, nodeSize],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Title text */}
      <motion.text
        x={titlePosition.x}
        y={titlePosition.y}
        textAnchor={titlePosition.anchor}
        className="font-serif text-xs fill-foreground pointer-events-none"
        opacity={textOpacity}
        animate={{ 
          opacity: textOpacity,
          x: titlePosition.x,
          y: titlePosition.y
        }}
        transition={{ duration: 0.3 }}
      >
        {poem.title}
      </motion.text>

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(180 60% 70%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(180 60% 70%)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.g>
  );
}