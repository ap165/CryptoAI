import type React from 'react';
import { Brain } from 'lucide-react';

interface EmptyChatProps {
  onSelectPrompt: (prompt: string) => void;
}

export const EmptyChat: React.FC<EmptyChatProps> = ({ onSelectPrompt }) => {
  const suggestedPrompts = [
    "What is the company's remote work policy?",
    "How do I request paid time off?",
    "What are the core company values?",
    "Explain the employee benefits package"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-3xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-auto mt-12 md:mt-24">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative group">
        <Brain className="w-10 h-10 text-primary relative z-10" />
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 text-center">
        How can CryptoAI help you today?
      </h2>
      <p className="text-text-secondary text-center mb-10 max-w-md text-sm md:text-base">
        Ask me anything about company policies, procedures, and internal documentation
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {suggestedPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="bg-surface border border-border rounded-xl p-4 text-left hover:border-primary/50 hover:bg-surface-light cursor-pointer transition-all text-sm font-medium text-text-secondary hover:text-text-primary shadow-sm hover:shadow-md"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
