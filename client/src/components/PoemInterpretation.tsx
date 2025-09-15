import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Interpretation {
  title: string;
  content: string[];
}

interface PoemInterpretationProps {
  interpretation: Interpretation;
}

export default function PoemInterpretation({
  interpretation,
}: PoemInterpretationProps) {
  const { t } = useTranslation();

  // --- NOWA LOGIKA ---
  // Dzielimy akapity na dwie kolumny, zapewniając, że lewa jest zawsze równa lub dłuższa.
  const midpoint = Math.ceil(interpretation.content.length / 2);
  const leftColumnContent = interpretation.content.slice(0, midpoint);
  const rightColumnContent = interpretation.content.slice(midpoint);

  return (
    <div className="flex flex-col h-full p-6 lg:p-8 lg:px-12 xl:px-16 overflow-y-auto hide-scrollbar bg-card/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Brain className="h-6 w-6 text-neural-highlight" />
          <h2 className="text-2xl font-serif text-foreground">
            {t("interpretation.title")}
          </h2>
        </div>

        <h3 className="text-xl font-bold text-neural-highlight mb-4">
          {interpretation.title}
        </h3>

        {/* Używamy siatki (Grid) dla pełnej kontroli nad układem kolumn na desktopie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
          {/* Lewa kolumna */}
          <div className="space-y-4">
            {leftColumnContent.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.15 }}
                className="text-foreground leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Prawa kolumna */}
          <div className="space-y-4">
            {rightColumnContent.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                // Kontynuujemy opóźnienie animacji, aby była płynna
                transition={{
                  delay: 0.4 + (leftColumnContent.length + index) * 0.15,
                }}
                className="text-foreground leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
