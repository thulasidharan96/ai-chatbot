# Project Folder Structure

Complete guide to the AI Chatbot project organization and file purposes.

## Root Directory

```
ai-chatbot/
├── dist/                      # Production build output (generated)
├── node_modules/              # NPM dependencies (generated)
├── public/                    # Static assets (if any)
├── src/                       # Application source code
├── .env                       # Environment variables (create from .env.example)
├── .env.example               # Sample environment configuration
├── .gitignore                # Git ignore rules
├── FOLDER_STRUCTURE.md       # This file
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Dependency lock file
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Complete documentation
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration (main)
├── tsconfig.app.json         # TypeScript config for app
├── tsconfig.node.json        # TypeScript config for Node
└── vite.config.ts            # Vite bundler configuration
```

---

## `/src` - Source Code Directory

Main application source code organized by responsibility.

```
src/
├── components/               # React UI components
├── hooks/                    # Custom React hooks
├── services/                 # Business logic & external APIs
├── types/                    # TypeScript type definitions
├── App.tsx                  # Root application component
├── index.css                # Global styles & Tailwind imports
├── main.tsx                 # Application entry point
└── vite-env.d.ts            # Vite environment type definitions
```

---

## `/src/components` - UI Components

React components for the user interface.

```
components/
├── ChatArea.tsx             # Main chat display area
├── ChatInput.tsx            # Message input with send button
├── MessageItem.tsx          # Individual message renderer
└── Sidebar.tsx              # Session management sidebar
```

### Component Details

#### `ChatArea.tsx`
**Purpose**: Displays chat messages and manages scrolling
- Shows welcome screen when no messages
- Renders message list with auto-scroll
- Displays streaming responses in real-time
- Shows loading indicators

**Key Features**:
- Auto-scroll to latest message
- Smooth scrolling behavior
- Welcome screen with feature highlights
- Streaming message display
- Loading states

**Dependencies**: MessageItem.tsx, lucide-react icons

---

#### `ChatInput.tsx`
**Purpose**: Text input field for user messages
- Multi-line textarea with auto-resize
- Send button with loading state
- Keyboard shortcuts (Enter/Shift+Enter)
- Disabled state during AI response

**Key Features**:
- Auto-expanding textarea
- Enter to send, Shift+Enter for newline
- Visual feedback for disabled state
- Loading spinner during processing
- Placeholder with instructions

**Dependencies**: lucide-react icons

---

#### `MessageItem.tsx`
**Purpose**: Renders individual chat messages with rich content
- Markdown rendering with GitHub Flavored Markdown
- Syntax highlighting for code blocks
- Image and video embedding
- User vs Assistant styling
- Timestamp display

**Key Features**:
- Full markdown support (headers, lists, links, etc.)
- Code syntax highlighting (150+ languages)
- Inline code with custom styling
- Image rendering with lazy loading
- Video player embedding
- External links open in new tab
- Dark mode support
- Timestamp display

**Dependencies**:
- react-markdown
- remark-gfm
- rehype-highlight
- highlight.js
- lucide-react

---

#### `Sidebar.tsx`
**Purpose**: Chat session management and navigation
- List all chat sessions
- Create new chats
- Switch between sessions
- Delete sessions
- Mobile-responsive with toggle

**Key Features**:
- Collapsible on mobile/tablet
- Session list with scroll
- New chat button
- Delete confirmation (hover)
- Active session highlighting
- Empty state message
- Branding footer
- Overlay backdrop on mobile

**Dependencies**: lucide-react icons

---

## `/src/hooks` - Custom React Hooks

Reusable logic encapsulated in custom hooks.

```
hooks/
└── useChat.ts               # Chat state and AI integration
```

### Hook Details

#### `useChat.ts`
**Purpose**: Central chat management logic
- Session state management
- Message handling
- AI integration with streaming
- LocalStorage persistence
- Loading states

**Exports**:
```typescript
{
  sessions,          // All chat sessions
  currentSession,    // Active session
  isLoading,         // AI processing state
  streamingMessage,  // Current streaming text
  createNewSession,  // Create new chat
  selectSession,     // Switch to session
  deleteSession,     // Remove session
  sendMessage,       // Send user message to AI
}
```

**Key Features**:
- Auto-save to LocalStorage
- Real-time streaming integration
- Auto-title generation from first message
- Session management (CRUD)
- Error handling
- Message history management

**Dependencies**:
- gemini.ts (AI service)
- chatStorage.ts (persistence)
- types

---

## `/src/services` - Business Logic & APIs

External integrations and business logic.

```
services/
├── chatStorage.ts           # LocalStorage persistence
├── gemini.ts                # Gemini AI integration
└── supabase.ts              # Supabase client configuration
```

### Service Details

#### `gemini.ts`
**Purpose**: Google Gemini AI integration
- API client initialization
- Streaming response handling
- Message history formatting
- Generation configuration

**Exports**:
```typescript
// Real-time streaming
streamGeminiResponse(
  messages: Message[],
  modelName?: string
): AsyncGenerator<StreamChunk>

// Complete response
generateResponse(
  messages: Message[],
  modelName?: string
): Promise<string>
```

**Configuration**:
- Model: gemini-1.5-flash (default)
- Max tokens: 8192
- Temperature: 0.9
- TopP: 0.95
- TopK: 40

**Features**:
- Environment variable validation
- Chat history conversion
- Streaming chunks
- Error handling
- Configurable parameters

---

#### `chatStorage.ts`
**Purpose**: LocalStorage persistence layer
- Save/load chat sessions
- CRUD operations
- Type-safe storage
- Date serialization/deserialization

**Exports**:
```typescript
loadSessions(): ChatSession[]
saveSessions(sessions: ChatSession[]): void
createSession(title?: string): ChatSession
addMessageToSession(session, message): ChatSession
updateSessionTitle(session, title): ChatSession
```

**Features**:
- Automatic date parsing
- Error handling with fallbacks
- UUID generation
- Immutable operations
- LocalStorage abstraction

**Storage Key**: `ai-chatbot-sessions`

---

#### `supabase.ts`
**Purpose**: Supabase client configuration
- Client initialization
- Environment validation
- Ready for cloud persistence

**Exports**:
```typescript
supabase: SupabaseClient
```

**Features**:
- Environment variable validation
- Singleton client instance
- Error handling
- Ready for auth integration

**Note**: Currently configured but not actively used. LocalStorage is primary storage.

---

## `/src/types` - Type Definitions

TypeScript interfaces and types.

```
types/
└── index.ts                 # Shared type definitions
```

### Type Details

#### `index.ts`
**Purpose**: Centralized type definitions

**Exports**:
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  email: string;
}
```

---

## Root Configuration Files

### `index.html`
**Purpose**: HTML entry point
- Root div for React
- Meta tags and title
- Module script import
- Favicon reference

---

### `package.json`
**Purpose**: Project dependencies and scripts

**Scripts**:
- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build

**Key Dependencies**:
- React 18.3
- TypeScript 5.5
- Vite 5.4
- Tailwind CSS 3.4
- @google/generative-ai 0.21
- @supabase/supabase-js 2.39
- react-markdown 9.0
- highlight.js 11.9
- lucide-react 0.344

---

### `vite.config.ts`
**Purpose**: Vite bundler configuration
- React plugin
- Development server settings
- Port: 5173
- Host: true (for network access)

---

### `tailwind.config.js`
**Purpose**: Tailwind CSS configuration
- Content paths for purging
- Custom color palette (primary blues)
- Theme extensions
- Plugin configuration

**Custom Colors**:
- Primary: Blue shades (50-900)
- Used for buttons, links, accents

---

### `tsconfig.json`
**Purpose**: Main TypeScript configuration
- Project references
- Compiler options inheritance

---

### `tsconfig.app.json`
**Purpose**: App-specific TypeScript config
- ES2020 target
- Strict mode enabled
- JSX: react-jsx
- Module: ESNext
- Includes: src/**/*

---

### `tsconfig.node.json`
**Purpose**: Node tools TypeScript config
- ES2022 target
- For Vite config and build tools
- Includes: vite.config.ts

---

### `postcss.config.js`
**Purpose**: PostCSS configuration
- Tailwind CSS processing
- Autoprefixer for browser compatibility

---

### `.gitignore`
**Purpose**: Git ignore rules
- node_modules/
- dist/
- .env (NEVER commit API keys)
- .DS_Store
- Build artifacts

---

### `.env.example`
**Purpose**: Sample environment configuration
- Template for .env file
- Documentation for variables
- Example values (non-functional)

**Usage**:
```bash
cp .env.example .env
# Then edit .env with real values
```

---

## File Naming Conventions

### React Components
- PascalCase: `ChatArea.tsx`, `MessageItem.tsx`
- One component per file
- Default export

### Services & Utilities
- camelCase: `chatStorage.ts`, `gemini.ts`
- Named exports

### Hooks
- camelCase with `use` prefix: `useChat.ts`
- Default export

### Types
- camelCase for files: `index.ts`
- PascalCase for interfaces: `Message`, `ChatSession`

---

## Import Patterns

### Absolute imports from project root:
```typescript
import { Message } from '../types'
import { useChat } from '../hooks/useChat'
```

### Component imports:
```typescript
import { ChatArea } from './components/ChatArea'
```

### Service imports:
```typescript
import { streamGeminiResponse } from '../services/gemini'
```

---

## Build Output

### `/dist` (generated by `npm run build`)

```
dist/
├── assets/
│   ├── index-[hash].css     # Bundled styles
│   └── index-[hash].js      # Bundled JavaScript
└── index.html               # Production HTML
```

**Notes**:
- Hash-based filenames for cache busting
- Minified and optimized
- Tree-shaken for smaller bundle
- Gzipped for production

---

## Development Workflow

### Creating New Components
1. Add to `src/components/`
2. Follow PascalCase naming
3. Export as default
4. Import in parent component

### Adding Services
1. Add to `src/services/`
2. Follow camelCase naming
3. Use named exports
4. Document functions

### Adding Types
1. Add to `src/types/index.ts`
2. Use PascalCase for interfaces
3. Export for global use

### Adding Hooks
1. Add to `src/hooks/`
2. Prefix with `use`
3. Return object or array
4. Document return values

---

## File Size Guidelines

Keep files maintainable:
- Components: < 300 lines
- Hooks: < 200 lines
- Services: < 250 lines
- Types: < 150 lines

When exceeding, consider splitting into multiple files.

---

## Code Organization Principles

1. **Single Responsibility**: Each file has one clear purpose
2. **Separation of Concerns**: UI, logic, and data are separated
3. **Modularity**: Components are reusable and independent
4. **Type Safety**: Full TypeScript coverage
5. **Clean Imports**: Organized and minimal dependencies

---

**This structure promotes maintainability, scalability, and developer productivity.**
