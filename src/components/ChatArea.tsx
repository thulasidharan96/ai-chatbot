import { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import { MessageItem } from './MessageItem';
import type { Message } from '../types';

interface ChatAreaProps {
  messages: Message[];
  streamingMessage?: string;
  isLoading?: boolean;
}

export function ChatArea({ messages, streamingMessage, isLoading }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  if (messages.length === 0 && !streamingMessage) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white mb-6 shadow-lg">
            <Bot size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Welcome to Gemini AI Chat
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start a conversation with advanced AI. Ask questions, get help with code, or
            discuss any topic.
          </p>
          <div className="grid gap-3 text-left">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Code Help:</span> Get assistance with
                programming
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Explanations:</span> Learn complex concepts
                simply
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Creative Writing:</span> Generate ideas and
                content
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}

        {streamingMessage && (
          <div className="flex gap-3 px-4 py-6 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <Bot size={18} />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{streamingMessage}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading && !streamingMessage && (
          <div className="flex gap-3 px-4 py-6 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <Bot size={18} className="animate-pulse" />
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce delay-200" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
