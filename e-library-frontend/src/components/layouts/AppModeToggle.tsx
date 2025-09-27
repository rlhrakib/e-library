import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Layers, Loader2 } from 'lucide-react';

export function AppModeToggle() {
  const [isSPA, setIsSPA] = useState(() => {
    // Default to SPA mode
    const mode = localStorage.getItem('appMode');
    return mode !== 'MPA';
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    const newMode = !isSPA;
    setIsSPA(newMode);
    localStorage.setItem('appMode', newMode ? 'SPA' : 'MPA');
    
    // Only reload when switching TO MPA mode
    if (!newMode) {
      setIsLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSPA ? (
        <Layers className="h-4 w-4" />
      ) : (
        <Globe className="h-4 w-4" />
      )}
      {isLoading ? 'Switching...' : isSPA ? 'SPA' : 'MPA'}
    </Button>
  );
}
