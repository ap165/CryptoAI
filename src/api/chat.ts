import apiClient from './client';
import type { ChatRequest, ChatResponse } from '../types/chat';

export const chatApi = {
  askQuestion: (data: ChatRequest) => 
    apiClient.post<ChatResponse>('/api/v1/chat/ask', data)
};
