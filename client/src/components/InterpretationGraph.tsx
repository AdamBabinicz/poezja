import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import GraphNode from "./GraphNode";
import GraphLink from "./GraphLink";
import type {
  InterpretationData,
  InterpretationNode as NodeType,
} from "@/data/mockInterpretation";

interface InterpretationGraphProps {
  data: InterpretationData;
}

function GraphScene({
  data,
  setSelectedNode,
}: {
  data: InterpretationData;
  setSelectedNode: (node: NodeType | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Environment preset="night" />

      {data.links.map((link) => (
        <GraphLink
          key={`${link.source}-${link.target}`}
          link={link}
          nodes={data.nodes}
        />
      ))}

      {data.nodes.map((node) => (
        <GraphNode key={node.id} node={node} onNodeClick={setSelectedNode} />
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={5}
        maxDistance={30}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export default function InterpretationGraph({
  data,
}: InterpretationGraphProps) {
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);

  return (
    <div className="w-full h-full relative">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
        <Suspense fallback={null}>
          <GraphScene data={data} setSelectedNode={setSelectedNode} />
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-4 right-4 bg-card/80 backdrop-blur-md border border-card-border rounded-lg p-4 w-64 max-w-xs z-10 shadow-lg"
            data-testid="node-details-panel"
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-2 right-2 p-1 rounded-full hover-elevate"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-neural-highlight mb-2">
              {selectedNode.label}
            </h3>
            <p className="text-sm text-foreground">
              {selectedNode.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
