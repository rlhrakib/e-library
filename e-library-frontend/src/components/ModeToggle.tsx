import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export const ModeToggle = () => {
  const [isSPA, setIsSPA] = useState(() => {
    return localStorage.getItem('appMode') !== 'MPA';
  });

  useEffect(() => {
    localStorage.setItem('appMode', isSPA ? 'SPA' : 'MPA');
    window.dispatchEvent(new CustomEvent('modeChange', { detail: { isSPA } }));
  }, [isSPA]);

  return (
    <Button 
      variant="outline" 
      onClick={() => setIsSPA(!isSPA)}
      className="ml-4"
    >
      {isSPA ? 'SPA Mode' : 'MPA Mode'}
    </Button>
  );
};
