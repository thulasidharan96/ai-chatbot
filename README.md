# AI Chatbot with Gemini AI

A modern, full-featured AI chatbot application powered by Google's Gemini AI. Built with React, TypeScript, and Tailwind CSS, featuring a clean interface, real-time streaming responses, and comprehensive chat management.

## Features

- **Advanced AI Integration**: Powered by Google Gemini 1.5 Flash with streaming responses
- **Rich Content Support**: Full markdown rendering, syntax highlighting, image/video display
- **Chat Management**: Multiple chat sessions, persistent history, easy navigation
- **Modern UI/UX**: Clean design, dark mode support, responsive layout
- **Cross-Platform**: Optimized for mobile, tablet, and desktop devices
- **Real-time Streaming**: See AI responses as they're generated
- **Secure**: Environment-based API key management
- **Persistent Storage**: LocalStorage for chat history (Supabase integration ready)

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (Gemini)
- **Database**: Supabase (configured)
- **Markdown**: react-markdown with remark-gfm
- **Code Highlighting**: rehype-highlight with highlight.js
- **Icons**: lucide-react

## Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- A Supabase account (optional, for persistent storage)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-chatbot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

See the **Environment Variables** section below for detailed information.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Environment Variables

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | [Google AI Studio](https://makersuite.google.com/app/apikey) |

### Optional Variables (Supabase)

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard > Settings > API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Supabase Dashboard > Settings > API |

### Sample .env File

```env
# Supabase Configuration (Optional - for cloud persistence)
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Gemini AI Configuration (Required)
VITE_GEMINI_API_KEY=AIzaSyD-1234567890abcdefghijklmnopqrst
```

## Project Structure

```
ai-chatbot/
├── dist/                      # Production build output
├── node_modules/              # Dependencies
├── public/                    # Static assets
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── ChatArea.tsx      # Main chat display area
│   │   ├── ChatInput.tsx     # Message input component
│   │   ├── MessageItem.tsx   # Individual message renderer
│   │   └── Sidebar.tsx       # Session management sidebar
│   ├── hooks/                 # Custom React hooks
│   │   └── useChat.ts        # Chat state and logic management
│   ├── services/              # Business logic and API services
│   │   ├── chatStorage.ts    # LocalStorage persistence
│   │   ├── gemini.ts         # Gemini AI integration
│   │   └── supabase.ts       # Supabase client configuration
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts          # Shared types and interfaces
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles and Tailwind
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite environment types
├── .env                       # Environment variables (create this)
├── .gitignore                # Git ignore rules
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # App-specific TypeScript config
├── tsconfig.node.json        # Node-specific TypeScript config
├── vite.config.ts            # Vite build configuration
└── README.md                 # This file
```

## Detailed Folder Structure

### `/src/components`
Contains all React UI components:
- **ChatArea.tsx**: Displays chat messages and handles scrolling
- **ChatInput.tsx**: Text input with send button and keyboard shortcuts
- **MessageItem.tsx**: Renders individual messages with markdown support
- **Sidebar.tsx**: Manages chat sessions and navigation

### `/src/hooks`
Custom React hooks for state management:
- **useChat.ts**: Central chat logic, session management, and AI integration

### `/src/services`
Business logic and external integrations:
- **gemini.ts**: Google Gemini AI API integration with streaming
- **chatStorage.ts**: LocalStorage CRUD operations for chat data
- **supabase.ts**: Supabase client initialization (ready for cloud sync)

### `/src/types`
TypeScript type definitions:
- **index.ts**: Shared interfaces for Message, ChatSession, User

## Usage Guide

### Starting a New Chat

1. Click the **"New Chat"** button in the sidebar
2. Type your message in the input field at the bottom
3. Press **Enter** or click the send button
4. Watch as the AI responds in real-time

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **ESC** (on mobile): Close sidebar

### Managing Chat Sessions

- **Create**: Click "New Chat" button
- **Switch**: Click on any chat in the sidebar
- **Delete**: Hover over a chat and click the trash icon
- **Auto-save**: All chats are automatically saved to LocalStorage

### Message Features

- **Markdown Support**: Use standard markdown syntax
- **Code Blocks**: Wrap code in triple backticks with language
- **Inline Code**: Use single backticks for inline code
- **Links**: Auto-converted and open in new tabs
- **Images**: Markdown image syntax renders images
- **Videos**: Video links are embedded as players

### Example Messages

**Ask for code:**
```
Write a Python function to calculate fibonacci numbers
```

**Request explanations:**
```
Explain how React hooks work with examples
```

**Creative tasks:**
```
Write a short story about AI and humanity
```

## Advanced Configuration

### Changing AI Model

Edit `src/services/gemini.ts` to use different Gemini models:

```typescript
// Default: gemini-1.5-flash (fast and efficient)
// Alternative: gemini-1.5-pro (more powerful)

export async function* streamGeminiResponse(
  messages: Message[],
  modelName: string = 'gemini-1.5-pro' // Change here
)
```

### Customizing Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize these values
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
      }
    }
  }
}
```

### Adjusting Response Parameters

In `src/services/gemini.ts`, modify generation config:

```typescript
generationConfig: {
  maxOutputTokens: 8192,    // Max response length
  temperature: 0.9,         // Creativity (0-1)
  topP: 0.95,              // Diversity
  topK: 40,                // Sampling parameter
}
```

## Database Integration (Supabase)

The application is configured to work with Supabase for persistent cloud storage.

### Setting Up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Add them to your `.env` file

### Database Schema (Future Enhancement)

The app is ready for these tables:
- **users**: User profiles and authentication
- **chat_sessions**: Chat metadata and titles
- **messages**: Individual messages with content and metadata

To enable cloud sync, the database migration is prepared and can be applied when needed.

## API Reference

### Gemini AI Service

```typescript
// Stream responses in real-time
streamGeminiResponse(messages: Message[], modelName?: string)
  : AsyncGenerator<StreamChunk>

// Get complete response
generateResponse(messages: Message[], modelName?: string)
  : Promise<string>
```

### Chat Storage Service

```typescript
// Load all sessions
loadSessions(): ChatSession[]

// Save sessions to storage
saveSessions(sessions: ChatSession[]): void

// Create new session
createSession(title?: string): ChatSession

// Add message to session
addMessageToSession(session: ChatSession, message: Message): ChatSession

// Update session title
updateSessionTitle(session: ChatSession, title: string): ChatSession
```

## Troubleshooting

### "Gemini API not configured" Error

**Problem**: API key is missing or invalid

**Solution**:
1. Ensure `.env` file exists in project root
2. Add valid `VITE_GEMINI_API_KEY`
3. Restart development server

### Messages Not Persisting

**Problem**: Chat history lost on refresh

**Solution**:
- Check browser's LocalStorage is enabled
- For cloud persistence, configure Supabase

### Build Errors

**Problem**: TypeScript or build errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist .vite
npm run build
```

### Styling Issues

**Problem**: Tailwind classes not working

**Solution**:
```bash
# Rebuild CSS
npm run build
```

## Performance Optimization

### Tips for Better Performance

1. **Limit Chat History**: Keep sessions under 50 messages
2. **Clear Old Chats**: Delete unused conversations
3. **Use Flash Model**: Faster responses than Pro model
4. **Optimize Images**: Use compressed images in messages

## Security Best Practices

1. **API Keys**: Never commit `.env` file to version control
2. **Environment Variables**: Use `VITE_` prefix for client-side variables
3. **Validation**: Always validate user input
4. **Rate Limiting**: Implement rate limits for API calls (in production)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Scripts Reference

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Maintenance
npm install          # Install dependencies
npm update           # Update dependencies
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android

## Known Limitations

1. **LocalStorage Limit**: ~5-10MB per domain (use Supabase for more)
2. **Token Limits**: Gemini has input/output token limits
3. **Rate Limits**: Google AI API has rate limits (check their docs)

## Future Enhancements

- [ ] User authentication with Supabase Auth
- [ ] Cloud synchronization across devices
- [ ] Voice input/output
- [ ] Image generation integration
- [ ] Export chat history (PDF, Markdown)
- [ ] Custom AI personalities
- [ ] Multi-language support
- [ ] Search within chats
- [ ] Chat templates

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review Gemini AI documentation

## Acknowledgments

- Google Gemini AI for the powerful language model
- Supabase for the backend infrastructure
- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework

## Resources

- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Built with care using modern web technologies. Happy chatting!**
