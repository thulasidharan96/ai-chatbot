import type { ChatSession, Message } from '../types';

const STORAGE_KEY = 'ai-chatbot-sessions';

export function saveSessions(sessions: ChatSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

export function loadSessions(): ChatSession[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const sessions = JSON.parse(data);
    return sessions.map((session: any) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      messages: session.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch (error) {
    console.error('Error loading sessions:', error);
    return [];
  }
}

export function createSession(title: string = 'New Chat'): ChatSession {
  return {
    id: crypto.randomUUID(),
    title,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function addMessageToSession(
  session: ChatSession,
  message: Omit<Message, 'id' | 'timestamp'>
): ChatSession {
  const newMessage: Message = {
    ...message,
    id: crypto.randomUUID(),
    timestamp: new Date(),
  };

  return {
    ...session,
    messages: [...session.messages, newMessage],
    updatedAt: new Date(),
  };
}

export function updateSessionTitle(session: ChatSession, title: string): ChatSession {
  return {
    ...session,
    title,
    updatedAt: new Date(),
  };
}
