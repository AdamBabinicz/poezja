import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Poem } from '@/data/mockPoems';

interface NeuralConnectionProps {
  from: Poem;
  to: Poem;
  isActive: boolean;
  opacity?: number;
}

export default function NeuralConnection({ 
  from, 
  to, 
  isActive, 
  opacity = 0.3 
}: NeuralConnectionProps) {
  const { t } = useTranslation();

  const controlPoint1X = from.position.x + (to.position.x - from.position.x) * 0.3;
  const controlPoint1Y = from.position.y - 50;
  const controlPoint2X = from.position.x + (to.position.x - from.position.x) * 0.7;
  const controlPoint2Y = to.position.y - 50;

  const path = `M ${from.position.x} ${from.position.y} 
                C ${controlPoint1X} ${controlPoint1Y}, 
                  ${controlPoint2X} ${controlPoint2Y}, 
                  ${to.position.x} ${to.position.y}`;

  return (
    <motion.g
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ 
        opacity: isActive ? 0.8 : opacity,
        pathLength: 1 
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Connection path */}
      <motion.path
        d={path}
        fill="none"
        stroke="hsl(200 80% 65%)"
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray="2,2"
        className="filter drop-shadow-sm"
        style={{ pointerEvents: 'none' }}
        animate={{
          strokeWidth: isActive ? 3 : 1,
          stroke: isActive ? "hsl(40 60% 75%)" : "hsl(200 80% 65%)"
        }}
        transition={{ duration: 0.3 }}
        aria-label={t('accessibility.connection')}
      />
      
      {/* Flowing particle effect */}
      {isActive && (
        <circle
          r="2"
          fill="hsl(180 60% 70%)"
          opacity="0.8"
          style={{ pointerEvents: 'none' }}
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      )}

      {/* Gradient glow */}
      <defs>
        <linearGradient id="connectionGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(180 60% 70%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(200 80% 65%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(180 60% 70%)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.g>
  );
}