import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Message } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  console.warn('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to .env file');
}

let genAI: GoogleGenerativeAI | null = null;

if (apiKey && apiKey !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(apiKey);
}

export interface StreamChunk {
  text: string;
  isComplete: boolean;
}

export async function* streamGeminiResponse(
  messages: Message[],
  modelName: string = 'gemini-1.5-flash'
): AsyncGenerator<StreamChunk> {
  if (!genAI) {
    throw new Error('Gemini API not configured. Please add your API key to .env file');
  }

  const model = genAI.getGenerativeModel({ model: modelName });

  const chat = model.startChat({
    history: messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.9,
      topP: 0.95,
      topK: 40,
    },
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessageStream(lastMessage.content);

  let fullText = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    fullText += chunkText;
    yield {
      text: fullText,
      isComplete: false,
    };
  }

  yield {
    text: fullText,
    isComplete: true,
  };
}

export async function generateResponse(
  messages: Message[],
  modelName: string = 'gemini-1.5-flash'
): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API not configured. Please add your API key to .env file');
  }

  const model = genAI.getGenerativeModel({ model: modelName });

  const chat = model.startChat({
    history: messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}
