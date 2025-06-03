import React from 'react';
import { Message } from 'ai';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
          isUser ? 'bg-brand-teal text-white' : 'bg-gray-100'
        }`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-900'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;