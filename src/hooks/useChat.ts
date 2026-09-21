import { useState, useCallback, useEffect } from 'react';
import { chatApi } from '../api/chat';
import { chatMemory } from '../services/chatMemory';
import type { ChatMessage, ChatSession } from '../types/chat';

const generateId = () => {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadedSessions = chatMemory.getSessions();
    setSessions(loadedSessions);
    if (loadedSessions.length > 0 && !activeSessionId) {
      setActiveSessionId(loadedSessions[0].id);
      setMessages(loadedSessions[0].messages);
    }
  }, []);

  const loadSession = useCallback((id: string) => {
    const session = chatMemory.getSession(id);
    if (session) {
      setActiveSessionId(id);
      setMessages(session.messages);
    }
  }, []);

  const createNewSession = useCallback(() => {
    setActiveSessionId(null);
    setMessages([]);
  }, []);

  const deleteSession = useCallback((id: string) => {
    chatMemory.deleteSession(id);
    const updatedSessions = chatMemory.getSessions();
    setSessions(updatedSessions);
    if (activeSessionId === id) {
      if (updatedSessions.length > 0) {
        setActiveSessionId(updatedSessions[0].id);
        setMessages(updatedSessions[0].messages);
      } else {
        setActiveSessionId(null);
        setMessages([]);
      }
    }
  }, [activeSessionId]);

  const updateSession = (newMessages: ChatMessage[], currentSessionId: string | null) => {
    let sessionId = currentSessionId;
    if (!sessionId) {
      sessionId = generateId();
      setActiveSessionId(sessionId);
    }
    
    // Create or update session
    const title = newMessages.length > 0 ? (newMessages[0].content.substring(0, 30) + '...') : 'New Chat';
    const session: ChatSession = {
      id: sessionId,
      title,
      messages: newMessages,
      updatedAt: Date.now()
    };
    
    chatMemory.saveSession(session);
    setSessions(chatMemory.getSessions());
    return sessionId;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentSessionId = updateSession(newMessages, activeSessionId);

    setIsLoading(true);
    setError(null);

    try {
      const response = await chatApi.askQuestion({ query: content });
      
      let rawData = response.data;
      
      if (typeof rawData === 'string' && ((rawData as string).startsWith('{') || (rawData as string).startsWith('['))) {
        try { rawData = JSON.parse(rawData as string); } catch (e) {}
      }

      let parsedData = rawData;
      if (rawData && typeof rawData === 'object' && (rawData as any).body && typeof (rawData as any).body === 'string') {
        try { parsedData = JSON.parse((rawData as any).body); } catch (e) {}
      }

      if (typeof parsedData === 'string' && ((parsedData as string).startsWith('{') || (parsedData as string).startsWith('['))) {
        try { parsedData = JSON.parse(parsedData as string); } catch (e) {}
      }

      let answer = '';
      
      if (Array.isArray(parsedData)) {
        if (parsedData.length > 0 && parsedData[0].text) {
          answer = parsedData.map(block => block.text).join('\n');
        } else {
          answer = JSON.stringify(parsedData);
        }
      } 
      else if (parsedData && typeof parsedData === 'object') {
        const pd = parsedData as any;
        for (const key of ['response', 'answer', 'message', 'text']) {
          if (pd[key]) {
            let val = pd[key];
            if (typeof val === 'string' && ((val as string).startsWith('{') || (val as string).startsWith('['))) {
               try { val = JSON.parse(val as string); } catch(e) {}
            }
            if (Array.isArray(val) && val.length > 0 && val[0].text) {
              answer = val.map((b: any) => b.text).join('\n');
            } else if (typeof val === 'string') {
              answer = val;
            } else {
              answer = JSON.stringify(val);
            }
            break;
          }
        }
        if (!answer) answer = JSON.stringify(parsedData);
      } 
      else if (typeof parsedData === 'string') {
        answer = parsedData;
      } 
      else {
        answer = String(parsedData);
      }
      
      if (typeof answer !== 'string') {
        try { answer = JSON.stringify(answer, null, 2); } catch (e) { answer = String(answer); }
      }

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: answer,
        timestamp: Date.now(),
        createdAt: new Date().toISOString(),
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      updateSession(finalMessages, currentSessionId);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Failed to get a response from the AI.';
      setError(errorMessage);
      
      const errorAssistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        timestamp: Date.now(),
        createdAt: new Date().toISOString(),
      };
      
      const finalMessages = [...newMessages, errorAssistantMessage];
      setMessages(finalMessages);
      updateSession(finalMessages, currentSessionId);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = useCallback(() => {
    setMessages([]);
    setActiveSessionId(null);
  }, []);

  return {
    sessions,
    activeSessionId,
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    loadSession,
    createNewSession,
    deleteSession
  };
};
