
import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { Message, MessageRole } from '../types';
import { startChat } from '../services/geminiService';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChat(startChat());
    setMessages([
      {
        id: 'initial-message',
        role: MessageRole.MODEL,
        content: "Hello! I'm the Wealth Whisperer. How can I help you with your finances today? Feel free to ask about budgeting, investments, or debt management.",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (userInput: string) => {
    if (isLoading || !userInput.trim() || !chat) return;

    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), role: MessageRole.USER, content: userInput };
    const botMessageId = (Date.now() + 1).toString();
    const botMessagePlaceholder: Message = { id: botMessageId, role: MessageRole.MODEL, content: '' };
    
    setMessages(prev => [...prev, userMessage, botMessagePlaceholder]);
    
    try {
      const stream = await chat.sendMessageStream({ message: userInput });
      let fullResponse = '';

      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, content: fullResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      const errorMessage: Message = {
        id: botMessageId,
        role: MessageRole.ERROR,
        content: 'Sorry, something went wrong. Please try again.',
      };
      setMessages(prev =>
        prev.map(msg => (msg.id === botMessageId ? errorMessage : msg))
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} isLoading={isLoading && message.id.endsWith('1') && message.content === ''} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
