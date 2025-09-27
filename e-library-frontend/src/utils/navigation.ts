export const isSPAMode = () => {
  // Default to SPA mode if no preference is set
  const mode = localStorage.getItem('appMode');
  return mode !== 'MPA';
};

export const navigateTo = (path: string) => {
  if (isSPAMode()) {
    // SPA navigation using React Router
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  } else {
    // MPA navigation with full page reload
    window.location.href = path;
  }
};

export const handleLinkClick = (e: React.MouseEvent, path: string) => {
  if (!isSPAMode()) {
    e.preventDefault();
    window.location.href = path;
  }
};
