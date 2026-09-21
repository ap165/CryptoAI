import type React from 'react';
import { Menu } from 'lucide-react';

interface TopbarProps {
  onMenuToggle: () => void;
  title?: string;
  username?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuToggle, title = 'CryptoAI', username }) => {
  const getInitial = (name?: string) => (name ? name.charAt(0).toUpperCase() : 'U');

  return (
    <header className="h-16 bg-surface/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1 -ml-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {username && (
          <span className="hidden md:block text-sm font-medium text-text-secondary">
            {username}
          </span>
        )}
        <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm">
          {getInitial(username)}
        </div>
      </div>
    </header>
  );
};
