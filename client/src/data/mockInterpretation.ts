import type { TFunction } from "i18next";
import type { Poem } from "@/data/mockPoems";

// --- Data Structures for AI Analysis ---

export interface InterpretationNode {
  id: string; // e.g., "theme_mortality" or "emotion_sadness"
  label: string; // The display name, translated
  type: "theme" | "emotion" | "imagery";
  description: string; // AI-generated explanation for this node, translated
  position: [number, number, number]; // Position in 3D space [x, y, z]
}

export interface InterpretationLink {
  source: string; // ID of the source node
  target: string; // ID of the target node
  strength: number; // A value from 0 to 1 indicating connection strength
}

export interface InterpretationData {
  nodes: InterpretationNode[];
  links: InterpretationLink[];
}

type CriticPersonality = "logic" | "empath" | "surrealist";

// --- Mock Data Generation ---

const generateRandomPosition = (
  radius: number,
  index: number,
  total: number
): [number, number, number] => {
  const angle = (index / total) * Math.PI * 2;
  const x = radius * Math.cos(angle) + (Math.random() - 0.5) * 2;
  const z = radius * Math.sin(angle) + (Math.random() - 0.5) * 2;
  const y = (Math.random() - 0.5) * radius * 0.8;
  return [x, y, z];
};

/**
 * Simulates an AI backend generating an interpretation for a given poem.
 * Now it requires the `t` function to provide translations.
 */
export const generateMockInterpretation = (
  poem: Poem,
  personality: CriticPersonality,
  t: TFunction
): InterpretationData => {
  const baseNodeDefs: { id: string; type: "theme" | "emotion" | "imagery" }[] =
    [
      { id: "theme_mortality", type: "theme" },
      { id: "theme_existence", type: "theme" },
      { id: "emotion_sadness", type: "emotion" },
      { id: "emotion_longing", type: "emotion" },
      { id: "imagery_body", type: "imagery" },
      { id: "imagery_time", type: "imagery" },
    ];

  // Generate translated labels and descriptions using the t function
  const baseNodes = baseNodeDefs.map((nodeDef) => {
    const label = t(`interpretation.nodes.${nodeDef.id}`);
    return {
      ...nodeDef,
      label,
      description: t(
        `interpretation.descriptions.${personality}.${nodeDef.type}`,
        { label } // Pass the translated label for interpolation
      ),
    };
  });

  let nodes: InterpretationNode[] = [];
  let links: InterpretationLink[] = [];

  switch (personality) {
    case "logic":
      nodes = baseNodes.map((node, i) => ({
        ...node,
        position: generateRandomPosition(8, i, baseNodes.length),
      }));
      links = [
        { source: "theme_existence", target: "theme_mortality", strength: 0.9 },
        { source: "imagery_time", target: "theme_mortality", strength: 0.8 },
        { source: "imagery_body", target: "theme_existence", strength: 0.6 },
      ];
      break;

    case "empath":
      nodes = baseNodes.map((node, i) => ({
        ...node,
        position: generateRandomPosition(10, i, baseNodes.length),
      }));
      links = [
        { source: "emotion_sadness", target: "theme_mortality", strength: 1.0 },
        { source: "emotion_longing", target: "theme_existence", strength: 0.9 },
        { source: "emotion_sadness", target: "emotion_longing", strength: 0.8 },
        { source: "imagery_body", target: "emotion_sadness", strength: 0.5 },
      ];
      break;

    case "surrealist":
      nodes = baseNodes.map((node, i) => ({
        ...node,
        position: generateRandomPosition(6, i, baseNodes.length),
      }));
      links = [
        { source: "imagery_time", target: "theme_existence", strength: 0.9 },
        { source: "imagery_body", target: "theme_mortality", strength: 0.9 },
        { source: "emotion_longing", target: "imagery_time", strength: 0.7 },
        { source: "theme_mortality", target: "emotion_longing", strength: 0.6 },
        {
          source: "theme_existence",
          target: "emotion_sadness",
          strength: 0.4,
        },
      ];
      break;
  }

  return { nodes, links };
};
