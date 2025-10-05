# Quick Start Guide

Get your AI Chatbot running in 5 minutes.

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Google Gemini API Key ([Get one](https://makersuite.google.com/app/apikey))

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser

Navigate to: http://localhost:5173

That's it! Start chatting with your AI assistant.

## Getting Your API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Paste in your `.env` file

## Common Issues

### "Gemini API not configured"
- Make sure `.env` file exists in project root
- Verify the API key is correct
- Restart the dev server: `Ctrl+C`, then `npm run dev`

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
Change port in `vite.config.ts`:
```typescript
server: {
  port: 3000, // Change to any available port
}
```

## Next Steps

- Read the [Complete Documentation](README.md)
- Check the [Usage Guide](USAGE_GUIDE.md)
- Explore [Deployment Options](DEPLOYMENT.md)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```
ai-chatbot/
├── src/
│   ├── components/    # UI components
│   ├── hooks/         # Custom hooks
│   ├── services/      # API integrations
│   └── types/         # TypeScript types
├── .env              # Your API keys (create this)
├── .env.example      # Example configuration
└── package.json      # Dependencies
```

## Features

- Real-time AI responses with streaming
- Full markdown and code highlighting
- Multiple chat sessions
- Dark mode support
- Mobile responsive
- Persistent chat history

## Support

- **Documentation**: See README.md
- **Issues**: Check GitHub Issues
- **Google AI**: https://ai.google.dev/docs

---

**Happy Chatting!**
