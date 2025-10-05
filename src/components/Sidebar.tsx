import { Plus, MessageSquare, Trash2, Menu, X } from 'lucide-react';
import type { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  isOpen,
  onToggle,
}: SidebarProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onToggle();
            }}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chats yet</p>
            </div>
          ) : (
            sessions.map(session => (
              <div
                key={session.id}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                  session.id === currentSessionId
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => {
                  onSelectSession(session.id);
                  if (window.innerWidth < 1024) onToggle();
                }}
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="flex-1 truncate text-sm">{session.title}</span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-all"
                  aria-label="Delete chat"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p className="font-medium mb-1">Gemini AI Chatbot</p>
            <p>Powered by Google Gemini 1.5</p>
          </div>
        </div>
      </aside>
    </>
  );
}
