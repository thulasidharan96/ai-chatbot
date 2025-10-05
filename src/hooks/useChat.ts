import { useState, useEffect, useCallback } from 'react';
import type { ChatSession, Message } from '../types';
import { streamGeminiResponse } from '../services/gemini';
import {
  loadSessions,
  saveSessions,
  createSession,
  addMessageToSession,
  updateSessionTitle,
} from '../services/chatStorage';

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>('');

  const currentSession = sessions.find(s => s.id === currentSessionId);

  useEffect(() => {
    const loaded = loadSessions();
    setSessions(loaded);
    if (loaded.length > 0) {
      setCurrentSessionId(loaded[0].id);
    }
  }, []);

  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

  const createNewSession = useCallback(() => {
    const newSession = createSession();
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    return newSession;
  }, []);

  const selectSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (currentSessionId === sessionId && filtered.length > 0) {
        setCurrentSessionId(filtered[0].id);
      } else if (filtered.length === 0) {
        setCurrentSessionId(null);
      }
      return filtered;
    });
  }, [currentSessionId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      let session = currentSession;
      if (!session) {
        session = createNewSession();
      }

      const userMessage: Omit<Message, 'id' | 'timestamp'> = {
        role: 'user',
        content: content.trim(),
      };

      const updatedSession = addMessageToSession(session, userMessage);
      setSessions(prev =>
        prev.map(s => (s.id === updatedSession.id ? updatedSession : s))
      );

      if (updatedSession.messages.length === 1) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        const renamedSession = updateSessionTitle(updatedSession, title);
        setSessions(prev =>
          prev.map(s => (s.id === renamedSession.id ? renamedSession : s))
        );
      }

      setIsLoading(true);
      setStreamingMessage('');

      try {
        const messagesForAPI = [...updatedSession.messages];

        let fullResponse = '';
        for await (const chunk of streamGeminiResponse(messagesForAPI)) {
          fullResponse = chunk.text;
          setStreamingMessage(fullResponse);

          if (chunk.isComplete) {
            const assistantMessage: Omit<Message, 'id' | 'timestamp'> = {
              role: 'assistant',
              content: fullResponse,
              model: 'gemini-1.5-flash',
            };

            setSessions(prev =>
              prev.map(s =>
                s.id === updatedSession.id
                  ? addMessageToSession(s, assistantMessage)
                  : s
              )
            );
            setStreamingMessage('');
          }
        }
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: Omit<Message, 'id' | 'timestamp'> = {
          role: 'assistant',
          content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        };

        setSessions(prev =>
          prev.map(s =>
            s.id === updatedSession.id
              ? addMessageToSession(s, errorMessage)
              : s
          )
        );
        setStreamingMessage('');
      } finally {
        setIsLoading(false);
      }
    },
    [currentSession, isLoading, createNewSession]
  );

  return {
    sessions,
    currentSession,
    isLoading,
    streamingMessage,
    createNewSession,
    selectSession,
    deleteSession,
    sendMessage,
  };
}
