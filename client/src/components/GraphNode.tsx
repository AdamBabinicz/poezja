import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import type { InterpretationNode } from "@/data/mockInterpretation";

interface GraphNodeProps {
  node: InterpretationNode;
  onNodeClick: (node: InterpretationNode) => void;
}

const nodeColors = {
  theme: new THREE.Color("#63a4ff"), // A light blue
  emotion: new THREE.Color("#ff6b6b"), // A soft red
  imagery: new THREE.Color("#48dbfb"), // A cyan blue
};

export default function GraphNode({ node, onNodeClick }: GraphNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const targetColor = nodeColors[node.type];
  const initialColor = targetColor.clone().multiplyScalar(0.7);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered || isActive ? 1.5 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      const colorToApply = isHovered || isActive ? targetColor : initialColor;
      (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(
        colorToApply,
        0.1
      );
    }
  });

  const handleClick = () => {
    setIsActive(!isActive);
    onNodeClick(node);
  };

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        castShadow
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={initialColor}
          emissive={initialColor}
          emissiveIntensity={isHovered || isActive ? 0.5 : 0.2}
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Text
        position={[0, 1, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {node.label}
      </Text>
    </group>
  );
}
