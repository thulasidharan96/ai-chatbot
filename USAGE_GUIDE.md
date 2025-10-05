# Complete Usage Guide - AI Chatbot

Comprehensive guide for using, configuring, and customizing your AI Chatbot application.

## Table of Contents

1. [Quick Start](#quick-start)
2. [First-Time Setup](#first-time-setup)
3. [Basic Usage](#basic-usage)
4. [Advanced Features](#advanced-features)
5. [Customization](#customization)
6. [Tips & Tricks](#tips--tricks)
7. [Common Use Cases](#common-use-cases)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### For Users (Non-Technical)

1. **Get Your API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with Google
   - Click "Get API Key"
   - Copy the key

2. **Configure the App**
   - Open `.env` file in the project folder
   - Replace `your_gemini_api_key_here` with your actual key
   - Save the file

3. **Start Chatting**
   - Open terminal in project folder
   - Run: `npm run dev`
   - Open browser to: http://localhost:5173
   - Start typing!

### For Developers

```bash
# Clone and install
git clone <repo-url>
cd ai-chatbot
npm install

# Configure
cp .env.example .env
# Edit .env with your API key

# Run
npm run dev
```

---

## First-Time Setup

### Step 1: Get Google Gemini API Key

#### Option A: Google AI Studio
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Choose "Create API key in new project" or use existing
5. Copy the generated key (starts with `AIza...`)

#### Option B: Google Cloud Console
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable "Generative Language API"
4. Go to "Credentials"
5. Create API Key
6. Restrict key to Generative Language API (recommended)

### Step 2: Configure Environment

Create `.env` file in project root:

```bash
# Copy example file
cp .env.example .env
```

Edit `.env`:
```env
VITE_GEMINI_API_KEY=AIzaSyD-your-actual-key-here
```

### Step 3: Install Dependencies

```bash
npm install
```

Wait for installation to complete (2-3 minutes).

### Step 4: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.4.20  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.x:5173/
```

### Step 5: Open in Browser

Navigate to `http://localhost:5173`

---

## Basic Usage

### Creating Your First Chat

1. **Start New Chat**
   - Click "New Chat" button in sidebar (or it auto-creates)
   - Input field appears at bottom

2. **Send a Message**
   - Type your message
   - Press `Enter` or click send button
   - Wait for AI response (appears in real-time)

3. **Continue Conversation**
   - AI remembers conversation context
   - Ask follow-up questions
   - Reference previous messages

### Interface Overview

```
┌─────────────┬────────────────────────────────┐
│             │ Chat Title           [Info]    │
│  Sidebar    ├────────────────────────────────┤
│             │                                │
│ [New Chat]  │                                │
│             │      Chat Messages             │
│ Chat 1      │      (scrollable area)         │
│ Chat 2      │                                │
│ Chat 3      │                                │
│             │                                │
│             ├────────────────────────────────┤
│             │ [Type message...] [Send]       │
└─────────────┴────────────────────────────────┘
```

### Keyboard Shortcuts

| Action | Shortcut | Description |
|--------|----------|-------------|
| Send message | `Enter` | Submit current message |
| New line | `Shift + Enter` | Add line break in message |
| Focus input | `Ctrl/Cmd + K` | Jump to message input |

### Message Types

#### 1. Plain Text
Simply type and send:
```
Hello! How are you today?
```

#### 2. Code Requests
Ask for code in any language:
```
Write a Python function to reverse a string
```

Response includes syntax-highlighted code:
```python
def reverse_string(text):
    return text[::-1]
```

#### 3. Explanations
Request detailed explanations:
```
Explain how async/await works in JavaScript
```

#### 4. Multi-part Questions
Ask complex, multi-part questions:
```
Can you:
1. Explain what React hooks are
2. Show an example of useState
3. Explain when to use useEffect
```

---

## Advanced Features

### 1. Markdown Support

The chatbot understands and renders markdown:

#### Headers
```markdown
# Main Title
## Subtitle
### Section
```

#### Lists
```markdown
- Bullet point 1
- Bullet point 2

1. Numbered item
2. Another item
```

#### Emphasis
```markdown
**bold text**
*italic text*
~~strikethrough~~
```

#### Links
```markdown
[Visit Google](https://google.com)
```

#### Code Blocks
````markdown
```javascript
function hello() {
  console.log("Hello World");
}
```
````

#### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

### 2. Code Syntax Highlighting

Supported languages (150+):
- JavaScript/TypeScript
- Python
- Java
- C/C++/C#
- Go
- Rust
- Ruby
- PHP
- Swift
- Kotlin
- And many more...

Usage:
````markdown
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
````

### 3. Real-time Streaming

Watch responses appear word-by-word as AI generates them:
- Immediate feedback
- Cancel anytime (if needed)
- Natural conversation flow

### 4. Chat Session Management

#### Creating Sessions
- Automatic: First message creates session
- Manual: Click "New Chat" button
- Auto-naming: Title from first message

#### Switching Sessions
- Click any chat in sidebar
- All messages preserved
- Instant loading

#### Deleting Sessions
- Hover over chat in sidebar
- Click trash icon
- Confirmation: Just click (no undo)

### 5. Persistent Storage

All chats automatically saved:
- LocalStorage: Up to 5-10MB
- Survives browser restart
- Per-domain storage
- Instant loading

---

## Customization

### 1. Changing AI Model

Edit `src/services/gemini.ts`:

```typescript
// Fast and efficient (default)
modelName: string = 'gemini-1.5-flash'

// More powerful, slower
modelName: string = 'gemini-1.5-pro'

// Experimental (check Google AI docs)
modelName: string = 'gemini-1.5-pro-latest'
```

**Model Comparison:**

| Model | Speed | Quality | Cost |
|-------|-------|---------|------|
| gemini-1.5-flash | Fast | Good | Low |
| gemini-1.5-pro | Slower | Excellent | Higher |

### 2. Adjusting Response Creativity

In `src/services/gemini.ts`:

```typescript
generationConfig: {
  temperature: 0.9,  // 0.0 = deterministic, 1.0 = creative
  topP: 0.95,        // Nucleus sampling
  topK: 40,          // Top-k sampling
  maxOutputTokens: 8192,  // Max response length
}
```

**Temperature Guide:**
- `0.0 - 0.3`: Factual, consistent, deterministic
- `0.4 - 0.6`: Balanced
- `0.7 - 0.9`: Creative, varied
- `0.9 - 1.0`: Very creative, unpredictable

### 3. Custom Color Theme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Change these to your brand colors
        50: '#f0f9ff',
        500: '#0ea5e9',  // Main color
        600: '#0284c7',  // Hover state
        700: '#0369a1',  // Active state
      }
    }
  }
}
```

**Color Palette Generators:**
- https://coolors.co
- https://paletton.com
- https://mycolor.space

### 4. Font Customization

Edit `src/index.css`:

```css
body {
  font-family: 'Your Font', -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;
}
```

**Popular Font Choices:**
- Inter: Modern, clean
- Roboto: Neutral, readable
- Poppins: Friendly, geometric
- Source Sans Pro: Professional

### 5. Message Display

In `src/components/MessageItem.tsx`, customize:

```typescript
// User message background
className="bg-primary-600 text-white"

// Assistant message background
className="bg-gray-200 dark:bg-gray-700"

// Icon sizes
<User size={18} />  // Change size here

// Timestamp format
message.timestamp.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',  // Add seconds
})
```

---

## Tips & Tricks

### 1. Better Prompts

#### Be Specific
❌ Bad: "Write code"
✅ Good: "Write a JavaScript function that sorts an array of objects by date"

#### Provide Context
❌ Bad: "Fix this"
✅ Good: "This Python function throws IndexError. Here's the code: [paste code]"

#### Use Examples
❌ Bad: "Format data"
✅ Good: "Convert this: {name: 'John', age: 30} to this: John is 30 years old"

### 2. Organizing Chats

- **Topic-based**: One chat per project/topic
- **Date-based**: Daily or weekly chats
- **Purpose-based**: Learning, coding, writing, etc.

### 3. Code Review Workflow

```
1. Paste your code with context
2. Ask: "Review this code for bugs and improvements"
3. Discuss suggestions
4. Implement changes
5. Verify with AI
```

### 4. Learning with AI

```
1. Ask: "Explain [concept] like I'm 10"
2. Request examples
3. Ask follow-up questions
4. Request exercises/quizzes
5. Verify your understanding
```

### 5. Debugging Help

```
1. Describe the problem
2. Share error message
3. Provide relevant code
4. Mention what you've tried
5. Ask for step-by-step guidance
```

---

## Common Use Cases

### 1. Code Generation

**Prompt:**
```
Create a React component that displays a user profile card with:
- Avatar image
- Name and email
- Bio text
- Edit button
Use TypeScript and Tailwind CSS
```

**Result:** Complete component with types and styling

---

### 2. Code Explanation

**Prompt:**
```
Explain this code line by line:
[paste code here]
```

**Result:** Detailed breakdown of each line

---

### 3. Debugging

**Prompt:**
```
I'm getting this error:
TypeError: Cannot read property 'map' of undefined

In this code:
[paste code]

What's wrong and how do I fix it?
```

**Result:** Error explanation and solution

---

### 4. Refactoring

**Prompt:**
```
Refactor this code to be more efficient and readable:
[paste code]
```

**Result:** Improved version with explanations

---

### 5. Learning New Technologies

**Prompt:**
```
I want to learn GraphQL. Can you:
1. Explain what it is
2. Show basic syntax
3. Provide a simple example
4. Explain when to use it vs REST
```

**Result:** Comprehensive tutorial

---

### 6. Algorithm Help

**Prompt:**
```
I need to sort a large array efficiently. What algorithm should I use and why? Show implementation.
```

**Result:** Algorithm recommendation with code

---

### 7. Documentation Writing

**Prompt:**
```
Write documentation for this function:
[paste function]

Include: description, parameters, return value, examples
```

**Result:** Professional documentation

---

### 8. Code Review

**Prompt:**
```
Review this code for:
- Bugs
- Performance issues
- Best practices
- Security concerns

[paste code]
```

**Result:** Detailed review with suggestions

---

### 9. API Design

**Prompt:**
```
Design a RESTful API for a blog platform with:
- Posts (CRUD)
- Comments
- User authentication
- Categories/tags

Show endpoints, methods, and data structures
```

**Result:** Complete API specification

---

### 10. Testing

**Prompt:**
```
Write unit tests for this function using Jest:
[paste function]
```

**Result:** Comprehensive test suite

---

## Troubleshooting

### Problem: "Gemini API not configured"

**Symptoms:**
- Error message on sending message
- Red error text in chat

**Solutions:**
1. Check `.env` file exists
2. Verify `VITE_GEMINI_API_KEY` is set
3. Ensure key starts with `AIza`
4. Restart dev server: `Ctrl+C`, then `npm run dev`
5. Clear browser cache

---

### Problem: No Response from AI

**Symptoms:**
- Loading spinner forever
- No error message

**Solutions:**
1. Check internet connection
2. Verify API key is valid (test at Google AI Studio)
3. Check browser console for errors (F12)
4. Ensure API quota not exceeded
5. Try different message

---

### Problem: Chat History Lost

**Symptoms:**
- Chats disappear on refresh
- Empty sidebar

**Solutions:**
1. Check browser's LocalStorage is enabled
2. Don't use incognito/private mode
3. Check browser storage settings
4. Export important chats (copy text)

---

### Problem: Slow Performance

**Symptoms:**
- Laggy UI
- Slow message rendering

**Solutions:**
1. Clear old chat sessions (delete unused)
2. Reduce message history (keep < 50 messages per chat)
3. Use Chrome/Edge (better performance)
4. Close other browser tabs
5. Update browser to latest version

---

### Problem: Code Not Highlighting

**Symptoms:**
- Code blocks plain text
- No colors in code

**Solutions:**
1. Specify language in code block:
   ````
   ```javascript
   // Your code
   ```
   ````
2. Rebuild: `npm run build`
3. Clear browser cache
4. Check highlight.js loaded (Network tab)

---

### Problem: Markdown Not Rendering

**Symptoms:**
- Raw markdown text visible
- No formatting

**Solutions:**
1. Ensure react-markdown installed: `npm install`
2. Check console for errors (F12)
3. Verify message content is string
4. Restart dev server

---

### Problem: Build Errors

**Symptoms:**
- `npm run build` fails
- TypeScript errors

**Solutions:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear cache
rm -rf dist .vite

# Rebuild
npm run build
```

---

### Problem: Cannot Send Long Messages

**Symptoms:**
- Error on long prompts
- Token limit exceeded

**Solutions:**
1. Split message into parts
2. Increase `maxOutputTokens` in config
3. Start new chat session
4. Summarize previous context

---

### Problem: API Rate Limits

**Symptoms:**
- "Quota exceeded" error
- "Too many requests"

**Solutions:**
1. Wait a few minutes
2. Check Google AI Studio quotas
3. Upgrade to paid tier
4. Reduce request frequency
5. Use caching for repeated questions

---

## Best Practices

### 1. Security
- ✅ Never commit `.env` to git
- ✅ Use environment variables
- ✅ Keep API keys secret
- ✅ Regularly rotate keys
- ❌ Don't share keys publicly

### 2. Performance
- ✅ Delete old/unused chats
- ✅ Keep messages under 50 per session
- ✅ Use gemini-1.5-flash for speed
- ❌ Don't load 100+ messages at once

### 3. Organization
- ✅ Use descriptive chat titles
- ✅ One topic per chat
- ✅ Archive completed conversations
- ✅ Export important chats

### 4. Effective Communication
- ✅ Be specific in prompts
- ✅ Provide context
- ✅ Use examples
- ✅ Ask follow-up questions
- ❌ Don't assume AI remembers outside context

---

## Getting Help

### Resources
- **Documentation**: README.md (this repo)
- **Google Gemini Docs**: https://ai.google.dev/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs

### Community
- GitHub Issues (this repo)
- Stack Overflow: [google-gemini] tag
- Reddit: r/reactjs, r/webdev

### Reporting Bugs
1. Check existing issues
2. Provide error messages
3. Include browser/OS info
4. Share reproduction steps
5. Screenshot if relevant

---

**Happy chatting! Your AI assistant is ready to help with any task.**
