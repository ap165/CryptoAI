import type { ChatSession } from '../types/chat';
import { authStorage } from './authStorage';

const getSessionsKey = () => {
  const user = authStorage.getUser();
  return user?.username ? `cryptoai_chat_sessions_${user.username}` : 'cryptoai_chat_sessions';
};

const getLegacyKey = () => {
  const user = authStorage.getUser();
  return user?.username ? `cryptoai_chat_memory_${user.username}` : 'cryptoai_chat_memory';
};

const MAX_SESSIONS = 20;

const generateId = () => {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const chatMemory = {
  getSessions: (): ChatSession[] => {
    try {
      const stored = localStorage.getItem(getSessionsKey());
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.sort((a, b) => b.updatedAt - a.updatedAt);
        }
      }
      
      // Migrate legacy memory to a session if it exists
      const legacy = localStorage.getItem(getLegacyKey());
      if (legacy) {
        const parsedLegacy = JSON.parse(legacy);
        if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
          // Sanitize legacy messages
          const sanitized = parsedLegacy.map((msg: any) => ({
            ...msg,
            content: typeof msg.content === 'object' ? JSON.stringify(msg.content, null, 2) : String(msg.content || ''),
          }));
          
          const newSession: ChatSession = {
            id: generateId(),
            title: sanitized[0]?.content?.substring(0, 30) + '...' || 'Previous Chat',
            messages: sanitized,
            updatedAt: Date.now(),
          };
          localStorage.removeItem(getLegacyKey());
          chatMemory.saveSession(newSession);
          return [newSession];
        }
      }
      
      return [];
    } catch {
      return [];
    }
  },

  getSession: (id: string): ChatSession | undefined => {
    return chatMemory.getSessions().find(s => s.id === id);
  },

  saveSession: (session: ChatSession): void => {
    const sessions = chatMemory.getSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.unshift(session);
    }
    
    // Keep only the last MAX_SESSIONS
    const trimmed = sessions.slice(0, MAX_SESSIONS);
    localStorage.setItem(getSessionsKey(), JSON.stringify(trimmed));
  },

  deleteSession: (id: string): void => {
    const sessions = chatMemory.getSessions().filter(s => s.id !== id);
    localStorage.setItem(getSessionsKey(), JSON.stringify(sessions));
  },
  
  clearAll: (): void => {
    localStorage.removeItem(getSessionsKey());
    localStorage.removeItem(getLegacyKey());
  }
};
