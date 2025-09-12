import NeuralAtlas from '../NeuralAtlas';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function NeuralAtlasExample() {
  return (
    <ThemeProvider>
      <div className="w-full h-screen">
        <NeuralAtlas />
      </div>
    </ThemeProvider>
  );
}