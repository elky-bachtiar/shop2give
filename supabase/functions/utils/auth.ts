import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from '@supabase/supabase-js';
import { USER_ROLES } from '../types/api.ts';

// Initialize Supabase client for authentication
const supabaseAuth = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
  {
    auth: {
      persistSession: false,
    }
  }
);

export interface AuthUser {
  id: string;
  email: string;
  role: USER_ROLES;
  roles?: USER_ROLES[]; // For backward compatibility with JS version
  user_metadata?: Record<string, any>;
}

/**
 * Authentication utilities for Supabase Edge Functions
 */
export class Auth {
  /**
   * Get user from authorization header
   */
  /**
   * Get user from authorization header
   */
  static async getUserFromHeader(authHeader: string | null): Promise<AuthUser | null> {
    if (!authHeader) {
      return null;
    }
    
    const token = authHeader.replace('Bearer ', '');
    const { data, error } = await supabaseAuth.auth.getUser(token);
    
    if (error || !data.user) {
      return null;
    }
    
    const role = data.user.user_metadata?.role || USER_ROLES.USER;
    
    return {
      id: data.user.id,
      email: data.user.email || '',
      role: role as USER_ROLES,
      user_metadata: data.user.user_metadata
    };
  }
  
  /**
   * Check if a user has required roles
   */
  static hasRole(user: AuthUser | null, roles: USER_ROLES[] | USER_ROLES): boolean {
    if (!user) {
      return false;
    }
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles || (user.roles ? user.roles.includes(roles) : false);
  }
  
  /**
   * Check if a user is an admin
   */
  static isAdmin(user: AuthUser | null): boolean {
    return this.hasRole(user, USER_ROLES.ADMIN);
  }
  
  /**
   * Check if a user is a campaign owner
   */
  static isCampaignOwner(user: AuthUser | null): boolean {
    return this.hasRole(user, USER_ROLES.CAMPAIGN_OWNER);
  }
  
  /**
   * Check if a user has permission to modify a campaign
   */
  static async canModifyCampaign(
    userId: string, 
    campaignId: string
  ): Promise<boolean> {
    try {
      // First get the user's role
      const { data: userData, error: userError } = await supabaseAuth
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (userError || !userData) {
        return false;
      }
      
      // Admin can modify any campaign
      if (userData.role === USER_ROLES.ADMIN) {
        return true;
      }
      
      // Campaign owners can only modify their campaigns
      if (userData.role === USER_ROLES.CAMPAIGN_OWNER) {
        const { data: campaign, error: campaignError } = await supabaseAuth
          .from('campaigns')
          .select('ownerId')
          .eq('id', campaignId)
          .single();
          
        if (campaignError || !campaign) {
          return false;
        }
        
        return campaign.ownerId === userId;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking campaign modification permission:', error);
      return false;
    }
  }
  
  /**
   * Check if a request is authorized based on the auth header
   * @returns User if authorized, null if not
   */
  static async authorizeRequest(req: Request): Promise<AuthUser | null> {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return null;
    }
    
    return await Auth.getUserFromHeader(authHeader);
  }
  
  /**
   * Create an unauthorized response
   */
  static unauthorizedResponse(message = 'Unauthorized'): Response {
    return new Response(
      JSON.stringify({
        success: false,
        error: message
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
  
  /**
   * Create a forbidden response
   */
  static forbiddenResponse(message = 'Insufficient permissions'): Response {
    return new Response(
      JSON.stringify({
        success: false,
        error: message
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
