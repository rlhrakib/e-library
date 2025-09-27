import { Link as RouterLink } from 'react-router';
import { isSPAMode } from '@/utils/navigation';
import { ReactNode } from 'react';

interface MPALinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const MPALink = ({ to, children, className }: MPALinkProps) => {
  const handleMPAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Show loading indicator
    const loader = document.createElement('div');
    loader.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    loader.innerHTML = `
      <div class="bg-white p-6 rounded-lg flex items-center gap-3">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span>Loading MPA page...</span>
      </div>
    `;
    document.body.appendChild(loader);
    
    // Navigate after showing loader
    setTimeout(() => {
      window.location.href = to;
    }, 100);
  };

  if (isSPAMode()) {
    return (
      <RouterLink to={to} className={className}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a 
      href={to} 
      className={className}
      onClick={handleMPAClick}
    >
      {children}
    </a>
  );
};
