Hi Windsurf AI,

I'd like your expert review on our MVP for *Shop2Give*, a crowdfunding SaaS platform that connects donation campaigns with product purchases. Below is full context on our architecture, design requirements, and implementation.

---

🔧 **Architecture**
- Built with **Next.js + Supabase**
- Roles: USER, CAMPAIGN_MANAGER, ADMIN
- Stripe integration for one-time donations and order payments
- RLS policies implemented via Supabase for secure data access
- PostgreSQL schema includes:
  - `donation_campaigns`: campaigns with images, goal, description (WYSIWYG), owner
  - `campaign_donations`: linked to campaigns, donors, messages, amounts, and payment method
  - `campaign_products`: connects campaigns to shop items with a profit % (used to boost campaign total)
  - `user_roles` for access control
- File upload support (for profile pictures & campaign galleries)
- WYSIWYG editor for rich campaign descriptions

---

🎯 **Design & UX Requirements**
- Campaign overview and detail pages (inspired by Doneeractie.nl)
- Donation form with:
  - Anonymous option
  - Custom amount
  - Optional message
  - Multiple payment methods (iDEAL, Bancontact, SEPA, etc.)
- Public product pages showing profit linked to a campaign
- Profile edit page (name, email, photo)
- Campaign management interface for CAMPAIGN_MANAGERs
- Top 3 donations and donation list visible on campaign page
- Search & filter for campaigns

---

🧪 **Request**
Please review the following:
- Technical implementation: Any architectural or security flaws?
- UX: Does it meet the outlined user flow and requirements?
- Suggestions to improve scalability, maintainability, or onboarding?
- Any best practices we’ve missed?

Happy to provide code repo or staging link if needed.

Thanks!
