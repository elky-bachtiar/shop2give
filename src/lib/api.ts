import { supabase } from './supabase';
import { handleError } from './errorHandling';

/**
 * Retrieves a CSRF token for the current authenticated user session
 * Caches token in sessionStorage to avoid unnecessary requests
 * 
 * @returns Promise resolving to CSRF token string
 */
export async function getCsrfToken(): Promise<string> {
  try {
    // Check if we have a stored token
    const storedToken = sessionStorage.getItem('csrf-token');
    
    // If token exists and isn't expired, return it
    if (storedToken) {
      const expiry = sessionStorage.getItem('csrf-token-expiry');
      if (expiry && parseInt(expiry, 10) > Date.now()) {
        return storedToken;
      }
    }
    
    // Request a new token from the server
    const { data, error } = await supabase.functions.invoke('generate-csrf-token');
    
    if (error) throw new Error(`Failed to get CSRF token: ${error.message}`);
    if (!data || !data.token) throw new Error('Invalid CSRF token response');
    
    const newToken = data.token;
    
    // Store token with 1-hour expiry
    sessionStorage.setItem('csrf-token', newToken);
    sessionStorage.setItem('csrf-token-expiry', (Date.now() + 3600000).toString());
    
    return newToken;
  } catch (error) {
    console.error('Failed to retrieve CSRF token:', error);
    throw error;
  }
}

/**
 * Clears CSRF token from storage (useful for logouts)
 */
export function clearCsrfToken(): void {
  sessionStorage.removeItem('csrf-token');
  sessionStorage.removeItem('csrf-token-expiry');
}

/**
 * Typed API request function with automatic CSRF token handling
 * and standardized error handling
 * 
 * @param endpoint API endpoint to call
 * @param method HTTP method
 * @param data Optional request body data
 * @returns Promise resolving to response data
 */
export async function apiRequest<T = any>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  data?: unknown
): Promise<T> {
  try {
    // Get auth token
    const session = supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');
    
    // Add CSRF token to mutating requests
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Only add CSRF token for mutating requests
    if (method !== 'GET') {
      const csrfToken = await getCsrfToken();
      headers['X-CSRF-Token'] = csrfToken;
    }
    
    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
    };
    
    // Add request body for non-GET requests
    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
    }
    
    // Make the request
    const response = await fetch(endpoint, options);
    
    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    // Parse and return response data
    return await response.json() as T;
  } catch (error) {
    // Use our standardized error handler
    const errorDetails = handleError(error);
    throw new Error(errorDetails.message);
  }
}

/**
 * Wrapper for Supabase function invocation with CSRF protection
 * 
 * @param functionName Name of the Supabase Edge Function
 * @param payload Request payload
 * @returns Promise resolving to function response
 */
export async function invokeSafeFunction<T = any>(
  functionName: string, 
  payload?: unknown
): Promise<T> {
  try {
    // For mutating operations, ensure CSRF token is included
    let invokeOptions = {};
    
    if (payload) {
      // Get CSRF token
      const csrfToken = await getCsrfToken();
      
      // Add CSRF token to headers
      invokeOptions = {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      };
    }
    
    // Invoke the Supabase function
    const { data, error } = await supabase.functions.invoke(
      functionName,
      {
        body: payload ? JSON.stringify(payload) : undefined,
        ...invokeOptions
      }
    );
    
    if (error) throw error;
    return data as T;
  } catch (error) {
    // Use our standardized error handler
    const errorDetails = handleError(error);
    throw new Error(errorDetails.message);
  }
}
