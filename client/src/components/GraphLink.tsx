import { Line } from "@react-three/drei";
import * as THREE from "three";
import type {
  InterpretationLink,
  InterpretationNode,
} from "@/data/mockInterpretation";

interface GraphLinkProps {
  link: InterpretationLink;
  nodes: InterpretationNode[];
}

export default function GraphLink({ link, nodes }: GraphLinkProps) {
  const sourceNode = nodes.find((n) => n.id === link.source);
  const targetNode = nodes.find((n) => n.id === link.target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const start = new THREE.Vector3(...sourceNode.position);
  const end = new THREE.Vector3(...targetNode.position);

  return (
    <Line
      points={[start, end]}
      color="white"
      lineWidth={1.5 * link.strength}
      transparent
      opacity={0.3 + 0.6 * link.strength}
    />
  );
}
