import AtlasControls from '../AtlasControls';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function AtlasControlsExample() {
  const handleZoomIn = () => console.log('Zoom in triggered');
  const handleZoomOut = () => console.log('Zoom out triggered');
  const handleReset = () => console.log('Reset view triggered');

  return (
    <ThemeProvider>
      <div className="w-full h-96 bg-background relative">
        <AtlasControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          scale={1}
        />
      </div>
    </ThemeProvider>
  );
}