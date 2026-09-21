import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useChat as useChatHook } from '../hooks/useChat';

const ChatContext = createContext<ReturnType<typeof useChatHook> | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const chat = useChatHook();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};

export const useGlobalChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useGlobalChat must be used within ChatProvider');
  return context;
};
