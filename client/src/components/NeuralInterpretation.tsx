import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BrainCircuit, Heart, Sparkles } from "lucide-react";
import type { Poem } from "@/data/mockPoems";
import {
  generateMockInterpretation,
  type InterpretationData,
} from "@/data/mockInterpretation";
import InterpretationGraph from "./InterpretationGraph";

interface NeuralInterpretationProps {
  poem: Poem;
}

type CriticPersonality = "logic" | "empath" | "surrealist";

const personalities: {
  id: CriticPersonality;
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
}[] = [
  {
    id: "logic",
    icon: BrainCircuit,
    titleKey: "interpretation.critic_logic",
    descKey: "interpretation.critic_logic_desc",
  },
  {
    id: "empath",
    icon: Heart,
    titleKey: "interpretation.critic_empath",
    descKey: "interpretation.critic_empath_desc",
  },
  {
    id: "surrealist",
    icon: Sparkles,
    titleKey: "interpretation.critic_surrealist",
    descKey: "interpretation.critic_surrealist_desc",
  },
];

export default function NeuralInterpretation({
  poem,
}: NeuralInterpretationProps) {
  const { t } = useTranslation();
  const [selectedPersonality, setSelectedPersonality] =
    useState<CriticPersonality | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interpretationData, setInterpretationData] =
    useState<InterpretationData | null>(null);

  const handlePersonalitySelect = (personalityId: CriticPersonality) => {
    setSelectedPersonality(personalityId);
    setInterpretationData(null);
    setIsLoading(true);

    setTimeout(() => {
      const data = generateMockInterpretation(poem, personalityId, t);
      setInterpretationData(data);
      setIsLoading(false);
    }, 2500);
  };

  const SelectionView = () => (
    <motion.div
      key="selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full p-8"
    >
      <h2 className="text-2xl font-serif text-foreground mb-2">
        {t("interpretation.title")}
      </h2>
      <p className="text-muted-foreground mb-8">
        {t("interpretation.selectPersonality")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {personalities.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card/50 border border-card-border rounded-lg p-6 text-center cursor-pointer hover-elevate"
            onClick={() => handlePersonalitySelect(p.id)}
            data-testid={`personality-${p.id}`}
          >
            <p.icon className="w-10 h-10 text-neural-highlight mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t(p.titleKey)}
            </h3>
            <p className="text-sm text-muted-foreground">{t(p.descKey)}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const LoadingView = () => (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <div className="relative w-24 h-24 mx-auto mb-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-neural-node rounded-full"
            style={{
              left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 5)}%`,
              top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 5)}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <motion.div
          className="absolute w-5 h-5 bg-neural-highlight rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <h3 className="text-xl font-serif text-foreground">
        {t("interpretation.loading")}
      </h3>
    </motion.div>
  );

  return (
    <div className="w-full h-full bg-gradient-to-br from-neural-node/10 to-neural-connection/10">
      <AnimatePresence mode="wait">
        {!selectedPersonality ? (
          <SelectionView />
        ) : isLoading ? (
          <LoadingView />
        ) : interpretationData ? (
          <InterpretationGraph data={interpretationData} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
