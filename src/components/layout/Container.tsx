import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

/**
 * Reusable container component for consistent layout
 */
const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl'
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm': return 'max-w-screen-sm';
      case 'md': return 'max-w-screen-md';
      case 'lg': return 'max-w-screen-lg';
      case 'xl': return 'max-w-screen-xl';
      case '2xl': return 'max-w-screen-2xl';
      case 'full': return 'max-w-full';
      default: return 'max-w-screen-xl';
    }
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${getMaxWidthClass()} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
