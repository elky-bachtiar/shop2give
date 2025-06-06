import { z } from "zod";
import DOMPurify from "dompurify";

/**
 * Validation schema for campaign creation and updates
 */
export const campaignSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters")
    .regex(/^[\w\s\-.,!?&()]+$/, "Title contains invalid characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  goal_amount: z.number().positive("Goal amount must be positive").min(1, "Goal amount must be at least 1"),
  start_date: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date format"),
  end_date: z.string().refine(val => !val || !isNaN(Date.parse(val)), "Invalid date format").optional(),
});

/**
 * Validation schema for donation form
 */
export const donationSchema = z.object({
  amount: z.number().positive("Donation amount must be positive").min(1, "Minimum donation amount is 1"),
  message: z.string().max(500, "Message cannot exceed 500 characters").optional(),
  is_anonymous: z.boolean().optional(),
});

/**
 * Validation schema for authentication
 */
export const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * Sanitizes HTML content to prevent XSS attacks
 * 
 * @param content HTML content to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
};

/**
 * Validates file uploads for security and size constraints
 * 
 * @param file File object to validate
 * @param options Optional validation options
 * @returns Boolean indicating if file is valid
 */
export const validateFileUpload = (
  file: File, 
  options: { 
    maxSizeMB?: number; 
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } => {
  // Default options
  const maxSize = (options.maxSizeMB || 5) * 1024 * 1024; // Default 5MB
  const validTypes = options.allowedTypes || ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  // Check file type
  if (!validTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed: ${validTypes.join(', ')}` 
    };
  }
  
  // Check file size
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File too large. Maximum size: ${options.maxSizeMB || 5}MB` 
    };
  }
  
  return { valid: true };
};

/**
 * Validates and sanitizes form data based on provided schema
 * 
 * @param data Form data object
 * @param schema Zod schema to validate against
 * @returns Validated and sanitized data or throws error
 */
export function validateFormData<T extends z.ZodType>(data: unknown, schema: T): z.infer<T> {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    // Format validation errors for better readability
    const formattedErrors = result.error.format();
    throw new Error(JSON.stringify(formattedErrors));
  }
  
  return result.data;
}
