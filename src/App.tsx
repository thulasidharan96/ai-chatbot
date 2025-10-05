import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    sessions,
    currentSession,
    isLoading,
    streamingMessage,
    createNewSession,
    selectSession,
    deleteSession,
    sendMessage,
  } = useChat();

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSession?.id || null}
        onNewChat={createNewSession}
        onSelectSession={selectSession}
        onDeleteSession={deleteSession}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="ml-12 lg:ml-0">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {currentSession?.title || 'AI Chatbot'}
            </h1>
            {currentSession && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentSession.messages.length} messages
              </p>
            )}
          </div>
        </header>

        <ChatArea
          messages={currentSession?.messages || []}
          streamingMessage={streamingMessage}
          isLoading={isLoading}
        />

        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
