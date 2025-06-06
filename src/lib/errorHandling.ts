/**
 * Error category types for better error classification and handling
 */
export type ErrorCategory = 
  | 'auth'       // Authentication errors
  | 'validation' // Form validation errors
  | 'server'     // Server-side errors
  | 'network'    // Network connectivity issues
  | 'storage'    // File storage errors
  | 'payment'    // Payment processing errors
  | 'unknown';   // Unclassified errors

/**
 * Structured error details interface
 */
export interface ErrorDetails {
  message: string;    // User-friendly message
  category: ErrorCategory;
  technical?: string; // Technical details for logging (not for UI)
  code?: string;      // Optional error code for categorization
}

/**
 * Handles errors by converting them to structured format,
 * logging appropriately, and providing user-friendly messages
 * 
 * @param error The raw error to handle
 * @returns Structured error details
 */
export function handleError(error: unknown): ErrorDetails {
  // Log the raw error for debugging (not exposed to user)
  console.error('[ERROR]', error);
  
  // Default error response (generic, safe for user display)
  let details: ErrorDetails = {
    message: "An unexpected error occurred. Please try again.",
    category: 'unknown'
  };
  
  // Handle Error objects
  if (error instanceof Error) {
    // Store original message for logging only
    details.technical = error.message;
    
    // Map specific error types to user-friendly messages
    // Auth errors
    if (error.message.includes('auth/invalid-email') || 
        error.message.includes('auth/invalid-login-credentials')) {
      details.message = "Please enter a valid email address";
      details.category = 'auth';
      details.code = 'invalid_email';
    } 
    else if (error.message.includes('auth/wrong-password') || 
             error.message.includes('auth/user-not-found')) {
      details.message = "Incorrect email or password";
      details.category = 'auth';
      details.code = 'auth_failed';
    }
    // Network errors
    else if (error.message.includes('network') || 
             error.message.includes('connection') ||
             error.message.includes('offline')) {
      details.message = "Network connection issue. Please check your connection.";
      details.category = 'network';
      details.code = 'network_error';
    }
    // Validation errors
    else if (error.message.includes('validation')) {
      try {
        // Try to parse validation error JSON if available
        const validationErrors = JSON.parse(error.message);
        details.message = "Please check the form for errors";
        details.category = 'validation';
        details.technical = JSON.stringify(validationErrors);
        details.code = 'validation_error';
      } catch {
        details.message = "Invalid data provided";
        details.category = 'validation';
      }
    }
    // Payment processing errors
    else if (error.message.includes('stripe') || 
             error.message.includes('payment')) {
      details.message = "Payment processing failed. Please try again or use a different payment method.";
      details.category = 'payment';
      details.code = 'payment_failed';
    }
    // Storage errors
    else if (error.message.includes('storage') || 
             error.message.includes('upload') || 
             error.message.includes('file')) {
      details.message = "File upload failed. Please try again with a smaller file or different format.";
      details.category = 'storage';
      details.code = 'storage_error';
    }
  }
  
  // Provide more details in development environment only
  if (import.meta.env.DEV) {
    details.technical = details.technical || String(error);
  }
  
  // Report to monitoring service if available (not implemented here)
  // reportErrorToMonitoring(details);
  
  return details;
}

/**
 * Formats multiple validation errors into a user-friendly message
 * 
 * @param errors Validation error object
 * @returns Formatted error message
 */
export function formatValidationErrors(errors: Record<string, any>): string {
  try {
    const errorMessages: string[] = [];
    
    // Extract error messages from nested structure
    Object.entries(errors).forEach(([field, fieldErrors]) => {
      if (field === '_errors' && Array.isArray(fieldErrors)) {
        errorMessages.push(...fieldErrors);
      } else if (typeof fieldErrors === 'object' && fieldErrors !== null) {
        if (fieldErrors._errors && Array.isArray(fieldErrors._errors)) {
          errorMessages.push(`${field}: ${fieldErrors._errors.join(', ')}`);
        }
      }
    });
    
    return errorMessages.length > 0 
      ? errorMessages.join('\n') 
      : "Form contains errors";
      
  } catch (e) {
    console.error("Error formatting validation errors:", e);
    return "Form validation failed";
  }
}
