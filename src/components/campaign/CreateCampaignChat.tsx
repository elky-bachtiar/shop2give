import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useDropzone } from 'react-dropzone';
import ChatMessage from '../ChatMessage';
import LoadingDots from '../LoadingDots';

interface CreateCampaignChatProps {
  onUpdateForm: (data: any) => void;
  onCategoryDetected?: (category: string) => void;
}

export function CreateCampaignChat({ onUpdateForm, onCategoryDetected }: CreateCampaignChatProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    onResponse: (response) => {
      // Extract campaign data from AI response and update form
      const campaignData = extractCampaignData(response);
      if (campaignData) {
        onUpdateForm(campaignData);
      }

      // Detect category if available
      if (campaignData?.category && onCategoryDetected) {
        onCategoryDetected(campaignData.category);
      }
    },
  });

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !imagePreview) return;
    handleSubmit(e);
  };

  return (
    <div className="flex h-[600px] flex-col rounded-lg border border-gray-200 bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-gray-100 px-4 py-2">
              <LoadingDots />
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
            Error: {error.message}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="border-t border-gray-200 p-4">
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
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          />
          
          <Button 
            type="submit" 
            disabled={!input.trim() && !imagePreview || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}

function extractCampaignData(response: string): any {
  try {
    // Look for JSON-like structures in the response
    const match = response.match(/\{[\s\S]*\}/);
    if (match) {
      const data = JSON.parse(match[0]);
      return {
        title: data.title,
        description: data.description,
        goalAmount: data.goalAmount,
        category: data.category,
      };
    }
    return null;
  } catch (error) {
    console.error('Error extracting campaign data:', error);
    return null;
  }
}