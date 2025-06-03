import React from 'react';
import { Search } from 'lucide-react';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  autoFocus = false,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-charcoal/50" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="h-14 w-full rounded-2xl bg-brand-pink/30 pl-12 pr-4 text-brand-charcoal placeholder-brand-charcoal/50 shadow-soft transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
      />
    </div>
  );
}