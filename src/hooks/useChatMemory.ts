import { useState, useCallback } from 'react';
import { chatMemory } from '../services/chatMemory';
import type { ChatSession } from '../types/chat';

export const useChatMemory = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => chatMemory.getSessions());

  const refreshSessions = useCallback(() => {
    setSessions(chatMemory.getSessions());
  }, []);

  const saveSession = useCallback((session: ChatSession) => {
    chatMemory.saveSession(session);
    setSessions(chatMemory.getSessions());
  }, []);

  const clearAll = useCallback(() => {
    chatMemory.clearAll();
    setSessions([]);
  }, []);

  return {
    sessions,
    saveSession,
    clearAll,
    refreshSessions,
  };
};
