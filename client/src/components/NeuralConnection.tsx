import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Poem } from "@/data/mockPoems";

interface NeuralConnectionProps {
  from: Poem;
  to: Poem;
  isActive: boolean;
  opacity?: number;
}

const activeColor = "hsl(var(--neural-highlight))";
const inactiveColor = "hsl(var(--neural-connection))";

export default function NeuralConnection({
  from,
  to,
  isActive,
  opacity = 0.5,
}: NeuralConnectionProps) {
  const { t } = useTranslation();

  const pathId = `path-${from.id}-${to.id}`;

  const controlPoint1X =
    from.position.x + (to.position.x - from.position.x) * 0.3;
  const controlPoint1Y = from.position.y - 50;
  const controlPoint2X =
    from.position.x + (to.position.x - from.position.x) * 0.7;
  const controlPoint2Y = to.position.y - 50;

  const path = `M ${from.position.x} ${from.position.y}
                C ${controlPoint1X} ${controlPoint1Y},
                  ${controlPoint2X} ${controlPoint2Y},
                  ${to.position.x} ${to.position.y}`;

  return (
    <g aria-hidden="true">
      <motion.path
        id={pathId}
        d={path}
        fill="none"
        stroke={inactiveColor}
        strokeDasharray="2,2"
        className="filter drop-shadow-sm"
        style={{ pointerEvents: "none" }}
        initial={{ pathLength: 0, opacity: 0, strokeWidth: 1.5 }}
        animate={{
          pathLength: 1,
          opacity: isActive ? 0.9 : opacity,
          strokeWidth: isActive ? 2.5 : 1.5,
          stroke: isActive ? activeColor : inactiveColor,
        }}
        transition={{
          pathLength: { duration: 1.5, ease: "easeInOut" },
          default: { duration: 0.3 },
        }}
      />

      <motion.circle
        r={2}
        fill={activeColor}
        style={{ pointerEvents: "none" }}
        initial={{ opacity: 0, r: 2 }}
        animate={{ opacity: isActive ? 0.9 : 0, r: 2 }}
        transition={{ duration: 0.3 }}
      >
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </motion.circle>
    </g>
  );
}
