export interface ChatRequest {
  query: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
  createdAt?: string | Date;
}

export interface ChatResponse {
  response?: string;
  answer?: string;
  message?: string;
  [key: string]: unknown;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}
