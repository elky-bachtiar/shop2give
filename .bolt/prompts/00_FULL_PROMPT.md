# 📦 Shop2Give Full Stack Implementation Blueprint

## 📐 Architecture Overview

Build "Shop2Give" – Support causes by
shopping online
Hero text: "Support causes by shopping online"
Hero subtext: "Purchase goods where proceeds go directly to fundraising campaigns that you care about."
Goal: Implement a full donation system tied to product purchases and campaign fundraising using Stripe and Supabase, implement full Complete Platform Implementation for adding products to the shop and campaigns to the platform.

## Mission Shop2Give
"Shop2Give exists to empower people to make a difference — by connecting everyday purchases with life-changing causes. Rooted in Christian values, we bring communities together to support each other through transparent giving, purposeful products, and sustainable impact."

## Why Shop2Give?
**Because every purchase has power.**

When you shop through Shop2Give, you're not just buying a product — you're funding a mission, supporting someone's story, and making generosity simple. Whether it's helping a student attend Bible school, supporting a family through illness, or giving toward life-changing causes, your order becomes a gift that gives back.

**Shop intentionally. Donate effortlessly. Change lives — one purchase at a time.**

### Technologies Used:
- **Frontend:** React Nextjs 19 + TailwindCSS 4 and Shadcn UI
- **Backend:** Supabase (PostgreSQL + Edge Functions), Pica integration for ChatAI (https://www.picaos.com/), OpenAI, Pica Integration with Slack/Discord for notifications (Platform Manager Notifications, Store Manager Notifications using his own API key),
Pica Integration with OpenAI for Store Manager to Analyze products and sales, using his own API key of OpenAI.
- **Payments:** Stripe Checkout for payments and donations. RevenueCat for subscriptions for Store Manager.
- **State Management:** Zustand + Custom Cart Store + Zustand for store/cart state
- **Auth:** Supabase Auth
- **Deployment:** Netlify 
- **Local Docker for Supabase:** Supabase Local Development Setup
- **Dev Tools:** Bolt.new for prototyping, GitHub for version control
- **Multi Language:** English and Dutch, with flags icons. For each component and page, there is a separate file for each language. Each campaign / product language can be changed in the settings by user.


### Key Concepts:
- Each product purchase supports one campaign.
- Products in cart are stored using `{ product_id + campaign_id }` as a unique combo.
- Donation amount is computed based on `donationPercentage` (default 50%).
- On successful Stripe payment, donation records are written to Supabase and the campaign total is updated.

---

🔁 User Flows

1. 📱 Sign In / Sign Up

**User Story:** As a user, I can sign in or sign up to the platform.

**Steps:**
- User visits /sign-in or /sign-up.
- Use social login or email login (Google, Apple, Facebook).
- User fills out form.
- User clicks "Sign In" or "Sign Up".
- User is redirected to /. (if Campaign owner/ Store Manager, redirect to /dashboard)

2. 🛒 Add to Cart Flow

**User Story:** As a shopper, I can add a product and select a campaign to donate to.

**Steps:**
-   User visits product page.
-   Selects a campaign from dropdown.
-   Clicks "Add to Cart".
-   If product + campaign combo does not exist in cart, it's added as a new line item.
-   If it already exists, quantity is increased.

3. 💸 Checkout Flow (Stripe)

**User Story:** As a shopper, I want to complete payment and donate automatically.

**Steps:**
-   User goes to /cart.
-   Sees each product tied to campaign and donation percentage.
-   Clicks “Checkout”.
-   App creates a Stripe Checkout session.
-   Each item includes metadata: product_id, campaign_id, donationPercentage.
-   User completes payment in Stripe.
-   Redirected to /success.

4. 📊 Donation Processing Flow (Webhook)

**User Story:** As a platform, I want to track all donations made via Stripe.

**Steps:**
-   Stripe sends checkout.session.completed event.
-   Supabase Edge Function reads metadata from each line_item.
-   Calculates donation = price * quantity * percentage.
-   Inserts donation row in donations table.
-   Updates campaign total_raised.

**Supabase Edge Function reads metadata from each line_item. Calculates donation = price * quantity * percentage. Inserts donation row in donations table. Updates campaign total_raised.**

5. 💖 User Donation Flow

**User Story:** As a user, I can add a donation to a campaign.
    
**Steps:**
-   Go to /campaigns/{slug}
-   Click "Donate Now"
-   Shadcn Dialog opens
-   Fill out form
-   Choose fixed donation (25, 50, 100, 250, 500, 1000) as configured by campaign owner
-   Enter optional flexible donation amount
-   Click "Add Donation to Cart"
-   Redirected to /cart
-   See donation as line item in cart
-   Click "Checkout"
-   Stripe Checkout opens
-   Product "Donation" has campaign_id in metadata
-   Stripe holds one "Donation" product with multiple price IDs
-   Redirected to /success

6. 👤 User Profile: Donation History (future)

**User Story:** As a logged-in user, I want to see my past donations.

**Steps:**
-   Go to /profile/donations
-   View table of:
    -- Campaign
    -- Product
    -- Amount donated
    -- Date

7. 👨‍💻 Campaign and Product CRUD (Admin)

**User Story:** As a platform manager, I want to manage campaigns and products.

**Steps:**
-   Go to /admin
-   Click "Add/Edit Campaign" or "Add/Edit Product"
-   Fill out form
-   Save

8. 🍿️ Category Management

**User Story:** As a platform manager, I want to manage product categories.

**Steps:**
-   Go to /admin
-   Click "Add/Edit Category"
-   Fill out form
-   Save

9. 👥 User Management

**User Story:** As a platform manager, I want to manage users.

**Steps:**
-   Go to /admin
-   Click "Add/Edit User"
-   Fill out form
-   Save

10. 🛠️ Admin Management

**User Story:** As a platform manager, I want to manage admins.

**Steps:**
-   Go to /admin
-   Click "Add/Edit Admin"
-   Fill out form
-   Save

11. 📦 Order Management

**User Story:** As a platform manager, I want to manage orders.

**Steps:**
-   Go to /admin
-   Click "Add/Edit Order"
-   Fill out form
-   Save

12. 📣 Campaign CRUD (Campaign Owner)

**User Story:** As a campaign owner, I want to manage my campaigns.

**Steps:**
-   Go to /dashboard
-   Click "Add/Edit Campaign"
-   Fill out title, description, category, location, goal, image
-   (optional) AI review
-   Save

13. 🛒 Product CRUD (Store Manager)

**User Story:** As a store manager, I want to manage products.

**Steps:**
-   Go to /dashboard
-   Click "Add/Edit Product"
-   Upload image
-   (optional) Assign to campaign
-   Save

14. 📊 Dashboard and Analytics (Store Manager)

**User Story:** As a store manager, I want to track my product sales and donation impact.

**Features:**

- Revenue summary
- Product performance chart (Sales, Donations)
- Campaign links and donation totals
- Product availability and inventory management

15. 🤨 Admin Dashboard and Analytics (Platform Admin)

**User Story:** As a platform admin, I want a complete overview of the system.

**Features:**

- Total platform donations
- Top performing products and campaigns
- New users, signups and conversion
- Order volume and traffic
- Creator and cause verification status
- Stripe balance, pending transfers
- Export data (CSV)

**User Story:** As a platform admin, I want a complete overview of the system.

**Features:**

- Total platform donations
- Top performing products and campaigns
- New users, signups and conversion
- Order volume and traffic
- Creator and cause verification status
- Stripe balance, pending transfers
- Export data (CSV)

16. 📢 Campaign Sharing

**User Story:** As a campaign owner, I want to share a campaign on social media using a campaign slug URL.

**Steps:**

- Go to /campaigns/{slug}
- Click "Share Campaign"
- Choose platform (Facebook, Twitter, LinkedIn, WhatsApp, etc.)

**System generates sharable URL https://shop2give.store/campaigns/{slug}

**Pre-fill social media text with campaign title and short description

**Link is copied or shared via native social share tools

---
🚂 Future Enhancements – Detailed User Flows

1. 🙈 Anonymous Donations

**User Story:** As a donor, I want the option to donate anonymously.

**Steps:**

- User goes to /campaigns/{slug}
- Chooses donation amount and checks "Donate anonymously"
- Metadata on donation marks user as anonymous

**In donation history and campaign total, donor info is hidden or marked as "Anonymous"**

2. 🥛 Crypto Donations (Algorand)

**User Story:** As a donor, I want to donate using Algorand.

**Steps:**

- User selects crypto payment option at checkout
- Wallet connect modal opens for Algorand
- User transfers amount to smart contract tied to campaign_id
- Once confirmed, donation is recorded in Supabase
- Redirected to /success

3. 💼 Start Campaign via Hero CTA

**User Story:** As a user, I can launch the campaign wizard by clicking "Start a Shop2Give"

**Steps:**

- Click CTA on Hero
- Redirect to sign-in or register
- After login, launch AI Chat Wizard with preview UI (split screen)
- User answers questions (title, cause, goal, etc.)
- Campaign preview updates live

On submit, campaign is created

4. 🧠 AI Assistant for Campaign Creation

**User Story:** As a campaign manager, I want an AI to help build impactful campaigns.

**Steps:**

- Chat interface prompts campaign questions
- GPT suggests headlines, descriptions, goals, and categories
- Preview pane updates live
- On save, campaign is submitted with AI-optimized content

5. 📈 User Dashboard with Impact Tracking

**User Story:** As a user, I want to track how my purchases impact campaigns.

**Features:**

- Total donated
- Number of campaigns supported
- Donation graph over time
- Top 3 causes supported

6. 🌟 Creator Dashboard with Earnings

**User Story:** As a creator, I want to view my total earnings and donation impact.

**Features:**

- Total sales
- Tips earned
- Donations generated
- Payout status

7. 💼 Subscription Donation System

**User Story:** As a user, I want to subscribe monthly to a campaign.

**Steps:**

- Go to /campaigns/{slug}
- Choose "Subscribe Monthly"
- Select amount and duration
- Stripe creates subscription with metadata
- Donation recorded monthly

8. 📰 Campaign Updates & Social Feed

**User Story:** As a campaign manager, I want to post updates to supporters.

**Features:**

- Update text/images via /dashboard
- Support comments/likes
- Appear on campaign page timeline

9. 💎 Referral & Affiliate Link Tracking

**User Story:** As a user, I want to earn rewards via referrals.

**Steps:**

- User copies referral URL
- Others visit and buy using link
- Referral is tracked via query param
- User sees earned rewards in /profile/referrals

10. 📄 Donation Certificates via Email

**User Story:** As a donor, I receive a certificate after donating.

**Steps:**

- After /success, trigger email with certificate
- PDF shows donor name, date, amount, campaign
- Option to print/share

11. 🙏 Auto Thank-you Messages

**User Story:** As a campaign manager, I want auto thank-you emails sent to donors.

**Steps:**

- After Stripe success, Supabase triggers email
- Email includes personalized thank-you and impact info

12. 🎒 Product Bundling for Fundraising Kits

**User Story:** As a campaign owner, I want to create product bundles.

**Steps:**

- Select products
- Create bundle product with name and price
- Bundle appears in /products with custom donation config

13. ⏳ Campaign Expiration and Archive

**User Story:** As a platform, I want campaigns to auto-expire.

**Steps:**

- Campaign has end_date
- After date, status = "archived"
- Archived campaigns moved to /archive

14. 💶 Payout Tracking

**User Story:** As an admin, I track Stripe payouts for creators and causes.

**Features:**

- View payout history
- Status: pending, paid, failed
- Linked to Stripe transfer IDs

15. 🤜 Slack/Discord Bots/ Gmail/ Outlook for Real-Time Sales

**User Story:** As a team, I receive donation alerts.

**Steps:**

- Connect Slack or Discord, / Gmail/ Outlook for Real-Time Sales in /settings
- On Stripe success, webhook sends event
- Alert posted in real time to channel

16. 🔍 Live Stream Fundraising

**User Story:** As a campaign, I want to embed livestreams.

**Features:**

- Add YouTube/Twitch embed link
- Viewers can donate directly during stream
- Donation ticker shows on video overlay

17. 📏 QR Code Generator

**User Story:** As a campaign manager, I want a QR code for sharing.

**Steps:**

- Click "Generate QR Code" in /dashboard
- QR code created for https://shop2give.store/campaigns/{slug}
- Download and share in flyers/posters
---


## 🏠 Home Page
- Hero section with branding and CTA
- Scroll animation + AI onboarding prompt
- 3D animation in hero section
- Gradient transitions between sections (e.g. pink → yellow → white)
- Popular Campaigns, if clicked, go to campaign detail page 
- Featured Products sections, if clicked, go to product detail page
- Product contains "Add to Chart" button
- Global nav bar with:
    -- Home
    -- Campaigns
    -- Products
    -- About
    -- Sign In / Sign Up (Add Social Login)
    -- Shopping Cart (🛒)
- Footer with:
    -- Logo including tagline "Buy with purpose. Give with heart."
    -- Social links (Facebook, Twitter, Instagram, LinkedIn, Email icons)
    -- Language selector NL/EN with flags icons
    -- RESOURCES (How it works, Pricingm FAQ, Privacy Policy, Terms of Service)
    -- COMPANY (Links About, Careers, Contact, Blog, Partner)
    -- LEGAL (Links Privacy Policy, Terms of Service, GDPR)
    -- Shopping Cart (🛒)
---

## 🏠 Categories Page
- Title "Browse fundraisers by category"
- CTA "Start a Shop2Give"
- List of categories with icons, 6 per row, and samples (max 3 per category)
- Sample Campaigns with campagin images, Title and progress bar, 3 per row, button "See more" at bottom right of each category
- If clicked, go to campaign listing page

## 🏠 Category (slug)
- Search, filter by category
- List of campaigns in category with icons and samples, 3 per row, button "See all" at bottom of the list
- If clicked, go to campaign detail page

## 🔥 Campaign Features
- Campaign Listing Page
- Search, filter by category
- Categories shown with icons and samples (max 3 per category)
- Campaign Detail Page
    -- Title, Description, Main Image
    -- Add multiple images
    -- Campaign Manager Info
    -- Donation goal, current amount, donor count
    -- Circular Progress Bar (goal vs raised)
    -- CTA button (Donate)
    -- Share buttons  ( Dialog-> Facebook, Twitter, Instagram, LinkedIn)
    -- See who donated (Donor List, max 3), add button to see all donors
    -- Button to see top donors "Top Donors" (Dialog list of top donors, max 5), including TAB: "Newest", "Top" (current), "Most Donated"
    -- Linked Products (from Stripe)
    -- WYSIWYG Campaign Editor for owners

---

## 🛍️ Product Features
- Product Listing Page
- Products pulled from Stripe
- Search, filter by category
- Product Detail Page
- Add to Cart (with select Campaign)
- Show what % goes to donation
- Featured Products on homepage

---

## 🛒 Shopping Cart
- Unique line per product + campaign combination
- Product info includes donation split (default 50%)
- Change campaign from cart
- Checkout using Stripe
- After success → redirect to /success

---
## UI 
- Shadcn theme
- theme toggle dark/light, with icon (Moon/Sun)
- language toggle NL/EN, with icon (Globe)
global.css
```
:root {
  --radius: 0.65rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.141 0.005 285.823);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.645 0.246 16.439);
  --primary-foreground: oklch(0.969 0.015 12.422);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.645 0.246 16.439);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.141 0.005 285.823);
  --sidebar-primary: oklch(0.645 0.246 16.439);
  --sidebar-primary-foreground: oklch(0.969 0.015 12.422);
  --sidebar-accent: oklch(0.967 0.001 286.375);
  --sidebar-accent-foreground: oklch(0.21 0.006 285.885);
  --sidebar-border: oklch(0.92 0.004 286.32);
  --sidebar-ring: oklch(0.645 0.246 16.439);
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.21 0.006 285.885);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.21 0.006 285.885);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.645 0.246 16.439);
  --primary-foreground: oklch(0.969 0.015 12.422);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent: oklch(0.274 0.006 286.033);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.645 0.246 16.439);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.21 0.006 285.885);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.645 0.246 16.439);
  --sidebar-primary-foreground: oklch(0.969 0.015 12.422);
  --sidebar-accent: oklch(0.274 0.006 286.033);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.645 0.246 16.439);
}

```

---
## Branding
- Main brand background: `#FFF3F1` (light pink)
  -- Header/nav background: `#2A6D69` (dark teal)
  -- CTA button background: shadcn default
  -- CTA text color: shadcn default
  -- CTA hover: shadcn default
  -- Primary text color: shadcn default
  -- Font: @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
  -- Rounded corners: `border-radius: 12px;`

✅ GLOBAL LAYOUT
- Base page background: `#FFF3F1`
- Section padding: `padding: 2rem`
- Font sizes for H1, H2, and body as seen in image

✅ NAVIGATION BAR (shared)
- Background: `#4CBEB6`
- Font color: white or soft pink hover
- Right-aligned links: Products, Campaigns, About, Search Icon

✅ HOMEPAGE COMPONENTS
Use `pages/HomePage.css` for homepage-specific rules.

1. **Hero Section**
   - Centered text block
   - Title: dark text (brand charcoal) on pink background
   - Subtitle: same color, smaller size
   - 3D animation
   - Padding top and bottom: `5rem`
   - CTA button: Shadcn default theme important color

2. **Instructions Section**
   - Centered text block
   - Title: dark text (brand charcoal) on brand gold background
   - Padding top and bottom: `5rem`

   - Instructions: 
   Step 1 – Create your fundraiser
Click the 'Start a Shop2Give' button to begin. Our AI-powered system will guide you through setting up your fundraiser details and goals.

Step 2 – Share your fundraiser link
Share your unique fundraiser link with friends and family. Track progress and engage supporters through your Shop2Give dashboard.

Step 3 – Share your fundraiser link
Share your unique fundraiser link with friends and family. Track progress and engage supporters through your Shop2Give dashboard.

```ts
unction Step({ number, title, description, icon }: StepProps) {
  return (
    <div className="flex flex-col items-center p-8 text-center md:items-start md:text-left bg-card rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
        <div className="text-accent-foreground">
          {icon}
        </div>
      </div>
      <h3 className="mb-3 font-serif text-xl font-semibold text-foreground">
        Step {number} – {title}
      </h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
```

3. **Popular Campaigns Grid**
    - Section background: brand-softCream
    - 3 columns , 3 rows
    - Card background: white
```ts
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';
import { CircularProgress } from './ui/CircularProgress';
import { MapPin } from 'lucide-react';
import { Campaign } from '../data/campaigns';
import { calculateProgress, formatCurrency } from '../lib/utils';

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = calculateProgress(campaign.amountRaised, campaign.goal);
  const isFullyFunded = progress >= 100;

  return (
    <Link 
      to={`/campaigns/${campaign.slug}`} 
      className="group block transform transition-all duration-300 hover:-translate-y-1"
    >
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isFullyFunded && (
            <div className="absolute right-4 top-4">
              <Badge variant="success\" showIcon>Fully Funded</Badge>
            </div>
          )}
        </div>
        <div className="bg-brand-pink/30 p-6">
          <div className="flex items-center gap-1 text-sm text-brand-charcoal/70">
            <MapPin className="h-3 w-3" />
            <span>{campaign.location}</span>
          </div>
          <h3 className="line-clamp-2 font-serif text-lg font-semibold text-brand-charcoal mt-2">
            {campaign.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-brand-charcoal/80">
            {campaign.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <CircularProgress
              value={progress}
              size={40}
              category="mission"
            />
            <div className="flex-1">
              <ProgressBar value={progress} category="mission" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-brand-charcoal/70">Raised</span>
            <span className="font-bold text-brand-charcoal">
              {formatCurrency(campaign.amountRaised)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}    
```

3. **Featured Products Grid**
   - Card background: white
   - Product card wrapper background: `#FFE9E5` (slightly darker than main pink)
   - Shadow on cards: subtle drop-shadow
   - Image height fixed
   - `Add to cart` button: teal with white text

✅ PRODUCT CARDS (shared)
Use `components/ProductCard.css`
- Consistent box shadow, spacing, and hover interaction
- All prices and names aligned bottom

✅ DO NOT
- Use inline CSS or `style=` in any component
- Use Tailwind unless it pulls from a centralized theme config
- Change layout spacing defined in design
---
 ## Supabase functions
- supabase/functions/_shared/csrf.ts
```ts
/**
 * CSRF (Cross-Site Request Forgery) Protection Module for Supabase Edge Functions
 * 
 * This module provides utilities to generate and validate CSRF tokens to protect
 * against CSRF attacks. It uses an in-memory store for tokens with expiration.
 */

// In-memory token store (for Edge Functions)
// In a production environment with multiple instances, consider using a distributed cache
const csrfTokens = new Map<string, { token: string, expires: number }>();

/**
 * Generates a CSRF token for a user
 * 
 * @param userId User ID to associate with the token
 * @returns Generated CSRF token
 */
export function generateCsrfToken(userId: string): string {
  // Use crypto for secure random token generation
  const token = crypto.randomUUID();
  
  // Token valid for 1 hour
  csrfTokens.set(userId, { 
    token, 
    expires: Date.now() + 3600000 
  });
  
  return token;
}

/**
 * Validates a CSRF token for a user
 * 
 * @param userId User ID associated with the token
 * @param token Token to validate
 * @returns Boolean indicating if token is valid
 */
export function validateCsrfToken(userId: string, token: string): boolean {
  const storedToken = csrfTokens.get(userId);
  
  if (!storedToken) {
    return false;
  }
  
  // Check if token is expired
  if (Date.now() > storedToken.expires) {
    csrfTokens.delete(userId);
    return false;
  }
  
  // Compare tokens using constant-time comparison
  return timingSafeEqual(storedToken.token, token);
}

/**
 * Constant-time comparison function to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * CSRF protection middleware for Edge Functions
 * Validates CSRF tokens for mutating operations
 * 
 * @param req Request object
 * @param supabase Initialized Supabase client
 * @returns Result of CSRF validation
 */
export async function csrfProtection(req: Request, supabase: any) {
  // Only protect mutating operations
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return { valid: true };
  }
  
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return { valid: false, error: 'Unauthorized', status: 401 };
  }
  
  const csrfToken = req.headers.get('X-CSRF-Token');
  if (!csrfToken) {
    return { valid: false, error: 'Missing CSRF token', status: 403 };
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: getUserError } = await supabase.auth.getUser(token);
    
    if (getUserError || !user) {
      return { valid: false, error: 'Invalid authentication token', status: 401 };
    }
    
    const isValidToken = validateCsrfToken(user.id, csrfToken);
    return { 
      valid: isValidToken, 
      error: isValidToken ? null : 'Invalid or expired CSRF token', 
      status: isValidToken ? 200 : 403
    };
  } catch (error) {
    console.error('CSRF validation error:', error);
    return { valid: false, error: 'CSRF validation failed', status: 500 };
  }
}

```

- generate-csrf-token
```ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';
import { generateCsrfToken } from '../_shared/csrf.ts';

/**
 * Edge function to generate CSRF tokens for authenticated users
 * This protects mutating operations from CSRF attacks
 */
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'GET, OPTIONS'
      }
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { 
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: getUserError } = await supabase.auth.getUser(token);

    if (getUserError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid authentication token' }), { 
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Generate a new CSRF token for the authenticated user
    const csrfToken = generateCsrfToken(user.id);

    // Log token generation for audit purposes
    console.info(`CSRF token generated for user ${user.id}`);

    // Return the token
    return new Response(
      JSON.stringify({ token: csrfToken }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        }
      }
    );
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    
    // Return a generic error
    return new Response(JSON.stringify({ error: 'Failed to generate security token' }), { 
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
});

```

- stripe-webhook
```ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: { name: 'Shop2Give', version: '1.0.0' },
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

async function logWebhookEvent(event: any, status: 'success' | 'error', error?: string) {
  try {
    await supabase.from('webhook_logs').insert({
      event_type: event.type,
      event_id: event.id,
      status,
      error_message: error,
      timestamp: new Date().toISOString(),
    });
  } catch (logError) {
    console.error('Failed to log webhook event:', logError);
  }
}

async function processDonations(session: Stripe.Checkout.Session) {
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

  for (const item of lineItems.data) {
    const metadata = item.price?.metadata || {};
    const campaignId = metadata.campaignId;
    if (!campaignId) continue;

    const donationPercentage = Number(metadata.donationPercentage) || 50;
    const donationAmount = Math.floor((item.amount_total || 0) * (donationPercentage / 100));

    if (donationAmount > 0) {
      await supabase.from('campaign_donations').insert({
        campaignId,
        amount: donationAmount,
        paymentStatus: 'completed',
        paymentMethod: 'stripe',
        isAnonymous: false,
        donorId: session.customer,
        donorEmail: session.customer_email,
      });

      // Update campaign total
      const { data: campaign } = await supabase
        .from('campaigns')
        .select('current_amount')
        .eq('id', campaignId)
        .single();

      if (campaign) {
        await supabase
          .from('campaigns')
          .update({
            current_amount: (campaign.current_amount || 0) + donationAmount,
            updated_at: new Date().toISOString(),
          })
          .eq('id', campaignId);
      }
    }
  }
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);

    await logWebhookEvent(event, 'success');

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await processDonations(session);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    await logWebhookEvent(
      { type: 'error', id: 'processing_failed' },
      'error',
      error.message
    );
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
```

- stripe-checkout
```ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

// Add rate limiting
const RATE_LIMIT = 100; // requests per minute
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const minute = 60 * 1000;
  const userRequests = rateLimitStore.get(userId) || [];
  
  // Clean up old requests
  const recentRequests = userRequests.filter(timestamp => now - timestamp < minute);
  rateLimitStore.set(userId, recentRequests);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }
  
  recentRequests.push(now);
  return false;
}

// Add logging
async function logCheckoutAttempt(userId: string, success: boolean, error?: string) {
  try {
    await supabase.from('checkout_logs').insert({
      user_id: userId,
      success,
      error_message: error,
      timestamp: new Date().toISOString(),
    });
  } catch (logError) {
    console.error('Failed to log checkout attempt:', logError);
  }
}

function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
  };

  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return corsResponse({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: getUserError } = await supabase.auth.getUser(token);

    if (getUserError || !user) {
      return corsResponse({ error: 'Invalid authentication token' }, 401);
    }

    // Check rate limit
    if (isRateLimited(user.id)) {
      await logCheckoutAttempt(user.id, false, 'Rate limit exceeded');
      return corsResponse({ error: 'Too many requests' }, 429);
    }

    const { price_id, success_url, cancel_url, mode } = await req.json();

    const error = validateParameters(
      { price_id, success_url, cancel_url, mode },
      {
        cancel_url: 'string',
        price_id: 'string',
        success_url: 'string',
        mode: { values: ['payment', 'subscription'] },
      },
    );

    if (error) {
      await logCheckoutAttempt(user.id, false, error);
      return corsResponse({ error }, 400);
    }

    // Get or create Stripe customer
    const { data: customer, error: getCustomerError } = await supabase
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .maybeSingle();

    if (getCustomerError) {
      await logCheckoutAttempt(user.id, false, 'Failed to fetch customer information');
      return corsResponse({ error: 'Failed to fetch customer information' }, 500);
    }

    let customerId;

    if (!customer || !customer.customer_id) {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });

      const { error: createCustomerError } = await supabase.from('stripe_customers').insert({
        user_id: user.id,
        customer_id: newCustomer.id,
      });

      if (createCustomerError) {
        await logCheckoutAttempt(user.id, false, 'Failed to create customer mapping');
        try {
          await stripe.customers.del(newCustomer.id);
        } catch (deleteError) {
          console.error('Failed to clean up after customer mapping error:', deleteError);
        }
        return corsResponse({ error: 'Failed to create customer mapping' }, 500);
      }

      if (mode === 'subscription') {
        const { error: createSubscriptionError } = await supabase.from('stripe_subscriptions').insert({
          customer_id: newCustomer.id,
          status: 'not_started',
        });

        if (createSubscriptionError) {
          await logCheckoutAttempt(user.id, false, 'Failed to create subscription record');
          try {
            await stripe.customers.del(newCustomer.id);
          } catch (deleteError) {
            console.error('Failed to clean up after subscription creation error:', deleteError);
          }
          return corsResponse({ error: 'Failed to create subscription record' }, 500);
        }
      }

      customerId = newCustomer.id;
    } else {
      customerId = customer.customer_id;

      if (mode === 'subscription') {
        const { data: subscription, error: getSubscriptionError } = await supabase
          .from('stripe_subscriptions')
          .select('status')
          .eq('customer_id', customerId)
          .maybeSingle();

        if (getSubscriptionError) {
          await logCheckoutAttempt(user.id, false, 'Failed to fetch subscription information');
          return corsResponse({ error: 'Failed to fetch subscription information' }, 500);
        }

        if (!subscription) {
          const { error: createSubscriptionError } = await supabase.from('stripe_subscriptions').insert({
            customer_id: customerId,
            status: 'not_started',
          });

          if (createSubscriptionError) {
            await logCheckoutAttempt(user.id, false, 'Failed to create subscription record');
            return corsResponse({ error: 'Failed to create subscription record' }, 500);
          }
        }
      }
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode,
      success_url,
      cancel_url,
      metadata: {
        userId: user.id,
      },
    });

    await logCheckoutAttempt(user.id, true);
    return corsResponse({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error(`Checkout error: ${error.message}`);
    return corsResponse({ error: error.message }, 500);
  }
});

type ExpectedType = 'string' | { values: string[] };
type Expectations<T> = { [K in keyof T]: ExpectedType };

function validateParameters<T extends Record<string, any>>(values: T, expected: Expectations<T>): string | undefined {
  for (const parameter in values) {
    const expectation = expected[parameter];
    const value = values[parameter];

    if (expectation === 'string') {
      if (value == null) {
        return `Missing required parameter ${parameter}`;
      }
      if (typeof value !== 'string') {
        return `Expected parameter ${parameter} to be a string got ${JSON.stringify(value)}`;
      }
    } else {
      if (!expectation.values.includes(value)) {
        return `Expected parameter ${parameter} to be one of ${expectation.values.join(', ')}`;
      }
    }
  }

  return undefined;
}
```
---
## Supabase functions (seed data stripe)
- Add donation product to stripe
    - Check for each campaign if "Donation" product exist in stripe
    - Each campaign has its own donation product (metadata campaign_id)
    - Each product has multiple tariffs (fixed amount) in stripe
    - pre seed tariffs (5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 125, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000)
- Get product from stripe by campaign_id and product name
- Get all products from stripe by campaign_id
- Get all products from stripe by product name
- Get all products from stripe by product name and campaign_id
- Get product with product_name and campaign_id
- Store products in supabase (Always base on stripe products)
---

## Supabase schema

```sql
-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'campaign_manager',, 'charity_owner' 'contributor');

-- Create user profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    main_image_url TEXT,
    goal_amount INTEGER NOT NULL,
    current_amount INTEGER DEFAULT 0,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    campaign_manager_id UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create campaign images table
CREATE TABLE IF NOT EXISTS public.campaign_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaign products table
CREATE TABLE IF NOT EXISTS public.campaign_products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) NOT NULL,
    stripe_product_id TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, stripe_product_id)
);

-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    amount INTEGER NOT NULL,
    stripe_payment_intent_id TEXT,
    comment TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Campaigns are viewable by everyone" 
ON public.campaigns FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Campaign managers can create campaigns" 
ON public.campaigns FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'campaign_manager'
    )
);

CREATE POLICY "Campaign managers can update own campaigns" 
ON public.campaigns FOR UPDATE USING (
    campaign_manager_id = auth.uid() 
    AND EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'campaign_manager'
    )
);

-- Create functions
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    
    -- Assign default contributor role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'contributor');
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

/*
  # Add Security Logging Tables

  1. New Tables
    - `webhook_logs`: Logs all incoming webhook events
    - `checkout_logs`: Logs all checkout attempts
    - `edge_function_logs`: Logs all edge function calls

  2. Security
    - Enables Row Level Security (RLS) on all tables
    - Only admins can view logs
*/

-- Create webhook logs table
CREATE TABLE IF NOT EXISTS webhook_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_id TEXT NOT NULL,
    status TEXT NOT NULL,
    error_message TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checkout logs table
CREATE TABLE IF NOT EXISTS checkout_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    success BOOLEAN NOT NULL,
    error_message TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create edge function logs table
CREATE TABLE IF NOT EXISTS edge_function_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    function_name TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    status TEXT NOT NULL,
    error_message TEXT,
    request_data JSONB,
    response_data JSONB,
    ip_address TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE edge_function_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Only admins can view webhook logs"
    ON webhook_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can view checkout logs"
    ON checkout_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can view edge function logs"
    ON edge_function_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Create indexes for better query performance
CREATE INDEX webhook_logs_timestamp_idx ON webhook_logs (timestamp DESC);
CREATE INDEX checkout_logs_user_id_idx ON checkout_logs (user_id);
CREATE INDEX checkout_logs_timestamp_idx ON checkout_logs (timestamp DESC);
CREATE INDEX edge_function_logs_function_name_idx ON edge_function_logs (function_name);
CREATE INDEX edge_function_logs_user_id_idx ON edge_function_logs (user_id);
CREATE INDEX edge_function_logs_timestamp_idx ON edge_function_logs (timestamp DESC);

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create schema for auth
CREATE SCHEMA IF NOT EXISTS auth;

-- Create tables
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR NOT NULL UNIQUE,
    title VARCHAR NOT NULL,
    description TEXT,
    goal DECIMAL(12, 2) NOT NULL,
    current_amount DECIMAL(12, 2) DEFAULT 0,
    main_image_url TEXT,
    category VARCHAR,
    campaign_manager_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    image_url TEXT,
    badge VARCHAR,
    stock INTEGER DEFAULT 0,
    campaign_id UUID REFERENCES campaigns(id),
    stripe_product_id VARCHAR,
    stripe_price_id VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    slug VARCHAR NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id),
    user_id UUID,
    amount DECIMAL(12, 2) NOT NULL,
    stripe_session_id VARCHAR,
    status VARCHAR DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    total DECIMAL(12, 2) NOT NULL,
    stripe_session_id VARCHAR,
    status VARCHAR DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    campaign_id UUID REFERENCES campaigns(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon)
VALUES 
    ('Medical', 'medical', 'Support healthcare and medical needs', 'heart-pulse'),
    ('Education', 'education', 'Support educational initiatives and schools', 'graduation-cap'),
    ('Mission & Faith', 'mission-faith', 'Support faith-based missions and initiatives', 'pray'),
    ('Community', 'community', 'Support local community projects', 'users'),
    ('Emergency Relief', 'emergency-relief', 'Support disaster relief efforts', 'alert-triangle')
ON CONFLICT (slug) DO NOTHING;


-- Create RLS Policies
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create public access policies (read-only)
CREATE POLICY "Allow public read access to campaigns" 
    ON campaigns FOR SELECT USING (true);

CREATE POLICY "Allow public read access to products" 
    ON products FOR SELECT USING (true);
    
CREATE POLICY "Allow public read access to categories" 
    ON categories FOR SELECT USING (true);

-- Create authenticated user policies
CREATE POLICY "Allow authenticated users to create donations"
    ON donations FOR INSERT TO authenticated USING (true);

CREATE POLICY "Allow users to view their own donations"
    ON donations FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to create orders"
    ON orders FOR INSERT TO authenticated USING (true);

CREATE POLICY "Allow users to view their own orders"
    ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to create order items"
    ON order_items FOR INSERT TO authenticated USING (true);

CREATE POLICY "Allow users to view their own order items"
    ON order_items FOR SELECT TO authenticated 
    USING (order_id IN (SELECT id FROM orders WHERE user_id = auth.uid()));

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create functions for user management
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

---
## Implementation details

- Supabase Edge Functions stripe_checkout:
https://raw.githubusercontent.com/elky-bachtiar/shop2give/refs/heads/main/supabase/functions/stripe-checkout/index.ts
- Supabase Edge Functions stripe_webhook:
https://raw.githubusercontent.com/elky-bachtiar/shop2give/refs/heads/main/supabase/functions/stripe-webhook/index.ts
- Supabase Edge Functions generate-csrf-token:
https://raw.githubusercontent.com/elky-bachtiar/shop2give/refs/heads/main/supabase/functions/generate-csrf-token/index.ts

This is a basic implementation of a crowdfunding platform. If you miss something according to the prompt above, you need to add tables, views, policies, etc. to the database.

- stripe tables
https://github.com/elky-bachtiar/shop2give/blob/main/supabase/migrations/20250530203959_twilight_sunset.sql
- user_roles, campaigns, campaign_images, campaign_products, donations, nable Row Level Security
https://github.com/elky-bachtiar/shop2give/blob/main/supabase/migrations/20250601074857_fading_union.sql
- Logs, webhook_logs, checkout_logs, edge_function_logs, Enable RLS
https://github.com/elky-bachtiar/shop2give/blob/main/supabase/migrations/20250603104912_proud_tooth.sql
- campaigns update, products, categories, donations update, orders, order_items, categories seed data, Create RLS Policies
- user_profiles, creators, causes, update products, update orders, payment_splits
https://github.com/elky-bachtiar/shop2give/blob/main/supabase/migrations/20250604114145_sparkling_coast.sql