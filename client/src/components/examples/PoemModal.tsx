import PoemModal from '../PoemModal';
import { mockPoems } from '@/data/mockPoems';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PoemModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeywordClick = (keyword: string) => {
    console.log('Keyword clicked:', keyword);
    setIsOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="w-full h-96 bg-background flex items-center justify-center">
        <Button onClick={() => setIsOpen(true)} data-testid="button-open-modal">
          Open Poem Modal
        </Button>
        
        <PoemModal
          poem={isOpen ? mockPoems[0] : null}
          onClose={() => setIsOpen(false)}
          onKeywordClick={handleKeywordClick}
        />
      </div>
    </ThemeProvider>
  );
}