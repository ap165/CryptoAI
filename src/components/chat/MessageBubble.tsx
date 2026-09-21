import type React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Brain } from 'lucide-react';
import type { ChatMessage } from '../../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const formatTime = (date?: string | Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[80%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex-shrink-0 flex flex-col items-center gap-1 mt-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
            isUser ? 'bg-primary text-white' : 'bg-surface border border-border text-primary'
          }`}>
            {isUser ? <User className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
          </div>
          <span className="text-[10px] font-medium text-text-muted">{isUser ? 'You' : 'AI'}</span>
        </div>

        <div className="flex flex-col gap-1 min-w-0 max-w-full">
          <div className={`px-4 py-3 shadow-sm overflow-hidden ${
            isUser 
              ? 'bg-primary text-white rounded-2xl rounded-tr-md' 
              : 'bg-surface border border-border rounded-2xl rounded-tl-md text-text-primary'
          }`}>
            {isUser ? (
              <div className="whitespace-pre-wrap break-words text-sm md:text-base leading-relaxed">
                {message.content}
              </div>
            ) : (
              <div className="markdown-content prose prose-sm md:prose-base dark:prose-invert max-w-full break-words leading-relaxed overflow-x-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          
          {message.createdAt && (
            <span className={`text-xs text-text-muted ${isUser ? 'text-right' : 'text-left'} px-1`}>
              {formatTime(message.createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
