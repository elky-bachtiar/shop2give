import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { Button } from '../ui/Button';
import { detectCategory, type Category } from '../../lib/categoryDetection';
import { useDropzone } from 'react-dropzone';

interface CreateCampaignChatProps {
  onUpdateForm: (data: any) => void;
  onCategoryDetected?: (category: Category) => void;
}

export function CreateCampaignChat({ onUpdateForm, onCategoryDetected }: CreateCampaignChatProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    onDrop: files => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  });

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error
  } = useChat({
    api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm here to help you create your Shop2Give campaign. What cause are you raising funds for?"
      }
    ]
  });

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user') {
      const suggestion = detectCategory(lastMessage.content);
      if (suggestion && onCategoryDetected) {
        onCategoryDetected(suggestion.category);
      }
    }
  }, [messages, onCategoryDetected]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !imagePreview) return;

    const userMessage = input.trim();
    if (userMessage) {
      handleSubmit(e);
    }

    // Update form based on user input
    if (messages.length === 1) {
      onUpdateForm({ title: userMessage });
    } else if (messages.length === 3) {
      onUpdateForm({ description: userMessage });
    } else if (messages.length === 5) {
      const amount = parseInt(userMessage.replace(/[^0-9]/g, ''));
      if (!isNaN(amount)) {
        onUpdateForm({ goalAmount: amount });
      }
    }
  };

  return (
    <div className="flex h-[600px] flex-col rounded-lg border border-gray-200 bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-brand-teal text-white'
                    : 'bg-gray-100 text-gray-900'
                } max-w-[80%]`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-gray-500"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>AI is typing...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleFormSubmit} className="border-t border-gray-200 p-4">
        {imagePreview && (
          <div className="mb-2 relative inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="h-20 w-20 rounded object-cover"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex space-x-2">
          <div {...getRootProps()} className="flex-shrink-0">
            <input {...getInputProps()} />
            <Button
              type="button"
              variant="secondary"
              className={isDragActive ? 'bg-brand-teal/10' : ''}
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          />
          <Button type="submit" disabled={!input.trim() && !imagePreview || isLoading}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error.message}</p>
        )}
      </form>
    </div>
  );
}