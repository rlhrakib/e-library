import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const MPALoadingIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (localStorage.getItem('appMode') === 'MPA') {
        setIsLoading(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg flex items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Loading MPA page...</span>
      </div>
    </div>
  );
};
