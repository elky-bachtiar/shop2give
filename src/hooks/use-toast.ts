'use client';

import { toast as sonnerToast } from 'sonner';

type Toast = {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

const toast = ({
  title,
  description,
  variant = 'default',
  duration = 5000,
  action,
}: Toast) => {
  const baseOptions = {
    duration,
    action: action ? {
      label: action.label,
      onClick: action.onClick,
    } : undefined,
  };

  switch (variant) {
    case 'success':
      return sonnerToast.success(title, { ...baseOptions, description });
    case 'error':
      return sonnerToast.error(title, { ...baseOptions, description });
    case 'warning':
      return sonnerToast.warning(title, { ...baseOptions, description });
    case 'info':
      return sonnerToast.info(title, { ...baseOptions, description });
    default:
      return sonnerToast(title, { ...baseOptions, description });
  }
};

const useToast = () => {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
};

export { useToast, toast };
