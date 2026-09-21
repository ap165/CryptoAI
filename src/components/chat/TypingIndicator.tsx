import type React from 'react';
import { Brain } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full justify-start animate-in fade-in duration-300 py-1">
      <div className="flex gap-3 max-w-[80%] md:max-w-[70%] flex-row">
        <div className="flex-shrink-0 flex flex-col items-center gap-1 mt-1">
          <div className="w-8 h-8 rounded-full bg-surface border border-border text-primary flex items-center justify-center shadow-sm">
            <Brain className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium text-text-muted">AI</span>
        </div>
        
        <div className="px-4 py-3 bg-surface border border-border rounded-2xl rounded-tl-md flex items-center gap-3 shadow-sm h-12">
          <span className="text-sm font-medium text-text-secondary">CryptoAI is thinking</span>
          <div className="flex items-center gap-1.5 h-full pt-1">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
