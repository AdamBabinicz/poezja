import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        {/* Neural network loading animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-neural-node rounded-full"
              style={{
                left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
          
          {/* Center node */}
          <motion.div
            className="absolute w-6 h-6 bg-neural-highlight rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          />
        </div>

        {/* Loading text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-serif text-foreground mb-4"
        >
          {t('atlas.loading')}
        </motion.h2>

        {/* Progress dots */}
        <div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}