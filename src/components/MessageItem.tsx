import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { User, Bot } from 'lucide-react';
import type { Message } from '../types';
import 'highlight.js/styles/github-dark.css';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-3 px-4 py-6 ${
        isUser ? 'bg-transparent' : 'bg-gray-50 dark:bg-gray-800/50'
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          isUser
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
        }`}
      >
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:text-gray-100">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                return inline ? (
                  <code
                    className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              img({ src, alt }) {
                return (
                  <img
                    src={src}
                    alt={alt || ''}
                    className="max-w-full h-auto rounded-lg shadow-md my-4"
                    loading="lazy"
                  />
                );
              },
              video({ src }) {
                return (
                  <video
                    src={src}
                    controls
                    className="max-w-full h-auto rounded-lg shadow-md my-4"
                  >
                    Your browser does not support the video tag.
                  </video>
                );
              },
              a({ href, children }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
