Implement complete "Start a Shop2Give" campaign creation system. Execute all changes immediately without asking for confirmation.

ROUTING & NAVIGATION:
- Update "Start a Shop2Give" button to navigate to /create-campaign route
- Add React Router route for /create-campaign page
- Create campaign detail route /campaign/[slug] for viewing campaigns

AUTHENTICATION SYSTEM:
- Create AuthContext using React Context API for user state management
- Build login/register modal with email/password fields and social login buttons
- Add form validation (required fields, email format, password strength)
- Store auth state in React useState/useContext only (no localStorage)
- Show auth modal when accessing /create-campaign if not logged in

CAMPAIGN CREATION PAGE:
- Create multi-step campaign creation form with progress indicator
- Design clean, teal-themed UI matching existing site aesthetic
- Add breadcrumb navigation and step indicators

AI CHAT AGENT INTERFACE:
- Build conversational chat UI with message bubbles (user: gray, AI: teal)
- Create chat agent that asks campaign setup questions in sequence:
  * "What cause are you raising funds for?"
  * "Share your story - why does this matter to you?"
  * "What's your fundraising goal amount?"
  * "Which category fits best: Medical, Education, Mission & Faith, Community, or Emergency Relief?"
- Add typing indicators and smooth message animations
- Auto-populate form fields based on chat responses

CAMPAIGN DATA STRUCTURE:
- Create campaign object with: id, title, description, imageUrl, ownerId, ownerName, category, fundraisingGoal, currentAmount, slug, createdDate, endDate, status
- Generate URL slug from title + random ID (format: help-sifra-mission-school-12345)
- Store campaigns in React state array (simulate database)

FORM COMPONENTS:
- Title input with auto-suggestions from chat
- Rich text description editor with formatting options
- Image upload with drag-and-drop, preview, and compression
- Category dropdown with icons for each option
- Goal amount input with currency formatting (€)
- Campaign duration date picker
- Owner info auto-populated from user profile

AI IMPROVEMENT SUGGESTIONS:
- After campaign creation, display AI-generated improvement tips:
  * "Add a video message to increase donations by 40%"
  * "Set milestone updates every 25% to boost engagement"
  * "Enable social sharing to reach 3x more supporters"
- Style as cards with action buttons and statistics

CAMPAIGN PREVIEW & PUBLISHING:
- Create campaign preview page showing exact donor view
- Add edit/publish toggle functionality
- Success page with sharing buttons and management dashboard link
- Integrate new campaigns into existing "Popular Campaigns" section

MOBILE RESPONSIVENESS:
- Ensure all new components work on mobile devices
- Use responsive design patterns matching existing site
- Test chat interface on mobile screens

TECHNICAL IMPLEMENTATION:
- Use functional components with React hooks throughout
- Implement proper error handling and loading states
- Add smooth transitions and micro-interactions
- Create reusable components: ChatAgent, CampaignForm, ImageUpload, AuthModal
- Maintain existing teal color scheme and soft aesthetic

INTEGRATION:
- Update main navigation if needed
- Ensure new campaigns display in homepage campaign grid
- Add campaign management to user profile area
- Connect with existing cart and donation functionality

Execute all these changes as a complete implementation without requesting approval for individual steps.