import AuthorModal from '../AuthorModal';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AuthorModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="w-full h-96 bg-background flex items-center justify-center">
        <Button onClick={() => setIsOpen(true)} data-testid="button-open-author">
          Open Author Modal
        </Button>
        
        <AuthorModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}