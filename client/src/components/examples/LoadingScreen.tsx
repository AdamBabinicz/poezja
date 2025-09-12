import LoadingScreen from '../LoadingScreen';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function LoadingScreenExample() {
  return (
    <ThemeProvider>
      <LoadingScreen />
    </ThemeProvider>
  );
}