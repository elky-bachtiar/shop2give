# Shop2Give Implementation Command

## Overview
You are tasked with implementing the Shop2Give platform according to the detailed specifications in the initial prompt and the comprehensive acceptance criteria in our implementation checklist. This is a full-stack e-commerce and donation platform where purchases support fundraising campaigns, rooted in Christian values and a mission of community and impact.

## Mission & Objective
"Empower generosity through everyday shopping."

Shop2Give links each product purchase to a campaign, making giving automatic, transparent, and impactful. The platform enables intentional shopping that powers direct giving, with the goal of implementing a full donation system tied to product purchases and campaign fundraising.

## Current Status
Significant progress has been made on the platform:
- Complete homepage implementation with hero section, instructions animation, popular campaigns, and featured products
- Mission section added to the main page
- Reusable FloatingIconsAnimation component created and integrated
- Authentication pages started (sign-in page UI completed)
- Supabase integration with database schema, migrations, and seed data for users and campaigns
- Stripe integration started for payment processing
- Footer with application branding

## Technology Stack
- **Frontend:** Vite with React, TailwindCSS 3 and Shadcn UI
- **Backend:** Supabase (PostgreSQL + Edge Functions)
- **Payments:** Stripe Checkout for payments and donations, RevenueCat for subscriptions
- **State Management:** Zustand for store/cart state
- **Auth:** Supabase Auth
- **Deployment:** Netlify
- **Local Development:** Docker for Supabase local setup
- **Integrations:** 
  - Pica for ChatAI, notifications, and AI features
  - OpenAI/Claude through Pica
  - Gmail/Outlook/Slack/Discord through Pica
  - Algorand for crypto donations
  - RevenueCat for store manager subscriptions
- **Multi-Language:** English and Dutch with flag icons

## Implementation Tasks
For this implementation phase, focus on building the following key components, ensuring each meets the acceptance criteria outlined in the checklist:

1. **Supabase Database Schema & Backend**
   - Set up local Supabase with Docker using the provided configuration files
   - Create all required tables with proper relationships
   - Configure Row Level Security (RLS) for different user roles
   - Implement triggers for donation tracking
   - Set up Edge Functions for Stripe integration, webhooks, and other integrations

   **Progress:**
   - ✓ Initial database schema implemented
   - ✓ Migrations created
   - ✓ Seed data for users and campaigns added

2. **Authentication System**
   - Implement Supabase Auth with social login integration (Google, Apple, Facebook)
   - Create sign-in and sign-up pages with proper validation
   - Set up user profiles and authorization roles
   - Implement role-based redirects (Campaign owner/Store Manager to /dashboard)

   **Progress:**
   - ✓ Sign-in page UI implemented

3. **Campaign & Product Management**
   - Create campaign listing and detail pages
   - Build campaign creation and editing forms with multi-language support
   - Implement product management interfaces with inventory tracking
   - Set up category system with proper filtering
   - Add campaign verification workflow
   - Implement donation tier configuration for campaigns

4. **Shopping & Donation Flow**
   - Implement cart with Zustand using product_id + campaign_id as unique combo
   - Create checkout flow with Stripe integration
   - Add donation processing with webhook handling
   - Implement direct donation options on campaigns with fixed tiers
   - Ensure proper metadata handling for donations
   - Calculate donation amounts based on donationPercentage (default 50%)

5. **Integrations**
   - Set up RevenueCat for store manager subscriptions (free, basic, premium)
   - Implement Pica integration for ChatAI and notifications
   - Connect with Gmail, Outlook, Slack, and Discord through Pica
   - Implement OpenAI/Claude integration through Pica for product/campaign analysis
   - Set up Algorand for crypto donations
   - Configure domain entry integration

## Implementation Requirements

1. **Code Quality**
   - Use TypeScript throughout the application
   - Implement proper error handling
   - Follow best practices
   - Include comprehensive comments
   - Use consistent code style

2. **UI/UX Standards**
   - Create responsive designs that work on all devices
   - Implement multilingual support (EN/NL) with flag icons
   - Use Shadcn UI components with brand theming based on provided color scheme
   - Ensure accessibility compliance
   - Create intuitive user flows for all user roles

3. **Testing & Documentation**
   - Write unit tests using mocha for critical functions
   - Create E2E tests with Playwright
   - Document API endpoints
   - Add user guides for each role

## Supabase Edge Functions Implementation Prompts

### User Seeding Edge Function
```
Create a Supabase Edge Function named 'seed-example-users' that:
1. Reads user data from JSON files in the 'supabase/functions/seed-example-users/data' directory
2. Adds users to Supabase Auth using the Admin API with proper role assignment
3. Creates corresponding entries in the 'user_profiles' table with all metadata
4. Implements idempotency to avoid duplicate users
5. Handles errors gracefully with detailed logging
6. Returns success/failure status with counts of added users
7. Uses TypeScript with proper typing for all data structures
8. Adds a seed tag to all created entries for easy identification
9. Secures the function with proper authentication checks
```

### Campaign Seeding Edge Function
```
Create a Supabase Edge Function named 'seed-example-campaigns' that:
1. Reads campaign data from JSON files in the 'supabase/functions/seed-example-campaigns/data' directory
2. Associates campaigns with users created by the seed-example-users function
3. Adds campaigns to the 'campaigns' table with proper owner_id linking
4. Handles category mapping and validation
5. Creates necessary metadata and related records
6. Implements idempotency to avoid duplicate campaigns
7. Returns success/failure status with counts of added campaigns
8. Uses TypeScript with proper typing for all data structures
9. Adds a seed tag to all created entries for easy identification
10. Secures the function with proper authentication checks
```

### Product Seeding Edge Function
```
Create a Supabase Edge Function named 'seed-example-products' that:
1. Reads product data from JSON files in the 'supabase/functions/seed-example-products/data' directory
2. Creates products in Stripe using the Stripe API with proper product attributes
3. Stores product metadata in Supabase with Stripe IDs for reference
4. Sets up prices, SKUs, and inventory information
5. Associates products with relevant campaigns where applicable
6. Handles product images and descriptions properly
7. Implements idempotency to avoid duplicate products
8. Returns success/failure status with counts of added products
9. Uses TypeScript with proper typing for all data structures
10. Adds a seed tag to all created entries for easy identification
11. Secures the function with proper authentication checks
```

### CSRF Token Generation Enhancement
```
Improve the 'generate-csrf-token' Supabase Edge Function to:
1. Generate secure, cryptographically strong CSRF tokens
2. Store tokens in the database with user association and expiration
3. Add rate limiting to prevent token generation abuse
4. Implement proper token validation in a reusable utility
5. Add detailed logging for security auditing
6. Return tokens with proper secure headers
7. Handle token rotation and cleanup of expired tokens
8. Use TypeScript with proper typing for all data structures
9. Add comprehensive error handling
10. Update documentation with usage examples
```

### Stripe Products Function Enhancement
```
Improve the 'stripe-products' Supabase Edge Function to:
1. Implement full CRUD operations for products in both Stripe and Supabase
2. Add support for product variants, attributes, and options
3. Handle product image upload and management
4. Implement inventory tracking and low stock notifications
5. Add product search and filtering capabilities
6. Support product categorization and tagging
7. Implement webhooks for product updates from Stripe
8. Add batch operations for product updates
9. Implement caching for frequently accessed products
10. Use TypeScript with proper typing for all data structures
11. Add comprehensive error handling and logging
12. Secure endpoints with proper authentication and authorization
```
   - Include setup instructions

## Key Files to Update/Create

1. **Database Schema & Local Setup**
   - Add migration files in `/supabase/migrations/`
   - Implement Docker configuration for local Supabase
   - Create SQL scripts for initial data
   - Set up proper RLS policies

2. **API Layer**
   - Implement API routes in `/app/api/`
   - Create Supabase Edge Functions in `/supabase/functions/`
   - Set up service layer in `/lib/services/`
   - Implement data models in `/lib/models/`

3. **Frontend Components**
   - Create auth components in `/components/auth/`
   - Add campaign components in `/components/campaigns/`
   - Build product management in `/components/products/`
   - Implement cart and checkout in `/components/checkout/`
   - Create multi-language components with separate files for each language

   **Progress:**
   - ✓ Main page components completed (HeroSection, Instructions, PopularCampaigns, FeaturedProducts)
   - ✓ Reusable FloatingIconsAnimation component created

4. **State Management & Cart**
   - Create Zustand stores in `/store/`
   - Implement cart state management with product_id + campaign_id as unique combo
   - Set up auth context with role-based access
   - Add campaign state management

## Key Concepts
- Each product purchase supports one campaign
- Products in cart are stored using `{ product_id + campaign_id }` as a unique combo
- Donation amount is computed based on `donationPercentage` (default 50%)
- On successful Stripe payment, donation records are written to Supabase and the campaign total is updated
- Each campaign has its own donation product with fixed tiers in Stripe

## Critical User Flows to Implement
1. Sign In / Sign Up flow with role-based redirects
2. Add to Cart flow with campaign selection
3. Checkout flow with Stripe integration
4. Donation processing flow with webhook handling
5. User donation flow with fixed donation tiers
6. User profile and donation history
7. Campaign and product CRUD operations
8. Category management
9. User management
10. Store manager and platform manager dashboards

## Deliverables
Provide fully functioning code that implements all features, meeting all acceptance criteria outlined in the implementation checklist. Focus on creating a robust, maintainable codebase that follows best practices and includes all integrations specified in the initial prompt.

## Next Implementation Priorities
Based on current progress, the following areas should be prioritized:
1. Complete Supabase authentication integration
2. Finish product and category data seeding
3. Complete the shopping cart and checkout flow with Stripe
4. Implement campaign and donation management features

## Testing Instructions
After implementation, demonstrate each feature working correctly by:
1. Creating test users with different roles (shopper, campaign owner, store manager, platform manager)
2. Adding test campaigns and products with multi-language support
3. Completing test donations and purchases with various donation percentages
4. Verifying database records are created correctly with proper relationships
5. Showing webhook processing works properly for all integrated services
6. Testing all integrations (Stripe, Supabase, Pica, RevenueCat, Algorand)
7. Verifying multi-language support for all content
