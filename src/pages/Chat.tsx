import type React from 'react';
import { useRef, useEffect } from 'react';
import { Plus, Brain } from 'lucide-react';
import { useGlobalChat } from '../context/ChatContext';
import { MessageBubble } from '../components/chat/MessageBubble';
import { ChatComposer } from '../components/chat/ChatComposer';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { EmptyChat } from '../components/chat/EmptyChat';

export const Chat: React.FC = () => {
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    createNewSession, 
  } = useGlobalChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleNewChat = () => {
    createNewSession();
  };

  const handleSend = async (content: string) => {
    if (content.trim()) {
      await sendMessage(content);
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="flex h-full w-full bg-background relative overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex flex-col h-full flex-1 relative overflow-hidden">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-surface/80 backdrop-blur-md z-20 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-6 h-6">
              <Brain className="w-5 h-5 text-positive" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-positive border-2 border-surface rounded-full"></span>
            </div>
            <span className="font-medium text-sm text-text-primary hidden sm:inline-block">CryptoAI Online</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-light transition-colors text-sm font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline-block">New Chat</span>
            </button>
          </div>
        </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scroll-smooth">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 min-h-full">
          {messages.length === 0 ? (
            <EmptyChat onSelectPrompt={handleSelectPrompt} />
          ) : (
            <div className="flex flex-col gap-6 pb-2">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} className="h-1 w-full" />
            </div>
          )}
        </div>
      </div>

      <ChatComposer 
        onSend={handleSend} 
        isLoading={isLoading} 
      />
      </div>
    </div>
  );
};
