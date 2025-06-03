import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { CategorySuggestion as CategorySuggestionType } from '../../lib/categoryDetection';
import { categoryInfo } from '../../lib/categoryDetection';

interface CategorySuggestionProps {
  suggestion: CategorySuggestionType | null;
  onAccept: (category: string) => void;
}

export function CategorySuggestion({ suggestion, onAccept }: CategorySuggestionProps) {
  if (!suggestion) return null;

  const info = categoryInfo[suggestion.category];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`mt-4 rounded-lg ${info.bgColor} ${info.borderColor} border p-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{info.icon}</span>
            <div>
              <h3 className={`font-medium ${info.color}`}>
                Suggested Category: {suggestion.category.charAt(0).toUpperCase() + suggestion.category.slice(1)}
              </h3>
              <p className="text-sm text-gray-600">
                Confidence: {Math.round(suggestion.confidence)}%
              </p>
            </div>
          </div>
          <button
            onClick={() => onAccept(suggestion.category)}
            className={`rounded-md ${info.bgColor.replace('bg-', 'bg-opacity-50 hover:bg-')} px-4 py-2 text-sm font-medium ${info.color} transition-colors`}
          >
            Accept Suggestion
          </button>
        </div>
        
        <div className="mt-3 flex items-start gap-2">
          <Info className="h-4 w-4 text-gray-400" />
          <p className="text-sm text-gray-600">
            {info.description} Matched keywords: {suggestion.keywords.join(', ')}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}