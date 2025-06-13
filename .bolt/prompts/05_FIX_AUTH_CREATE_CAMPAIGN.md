Fix authentication and loading issues in Shop2Give campaign creation system:

AUTHENTICATION REDIRECT ISSUE:
- Remove or fix the auth?redirect=/create-campaign parameter that's causing infinite loading
- Update AuthContext to handle authentication state properly without external redirects
- Simplify authentication flow to work entirely within the React app
- Remove any dependency on external authentication services that might be causing the redirect loop
- Create a simple mock authentication system that works immediately without external APIs

LOADING STATE FIXES:
- Remove any async operations that are causing infinite loading in the auth flow
- Set default authentication state to allow immediate access to campaign creation (for hackathon demo purposes)
- Add proper loading state management with clear start/stop conditions
- Implement timeout fallbacks for any loading states
- Ensure all loading spinners have defined end conditions

CHAT AGENT IMPLEMENTATION:
- Create a mock AI chat agent that responds immediately without external API calls
- Use predefined responses based on user input patterns
- Implement local chat logic that simulates AI responses instantly
- Add realistic typing delays (1-2 seconds) to make it feel natural
- Create responses for campaign creation questions:
  * When user mentions "medical" → "That's wonderful! Medical campaigns often resonate strongly with supporters. What specific medical need are you raising funds for?"
  * When user mentions "education" → "Education is such a powerful investment! Tell me more about the educational opportunity you're supporting."
  * When user mentions "mission" or "faith" → "What a beautiful calling! Mission work touches hearts. Can you share more about this mission opportunity?"
- No external API required - all responses generated locally

SIMPLIFIED AUTHENTICATION:
- Remove external auth dependencies
- Create simple email/password form that works immediately
- Store user data in React state only (no external services)
- Allow users to proceed immediately after "registration"
- Mock successful authentication for demo purposes

REMOVE EXTERNAL DEPENDENCIES:
- Eliminate any API calls that might be causing loading issues
- Make the entire flow work offline/locally
- Use mock data and responses throughout
- Ensure instant user experience without network dependencies

SPECIFIC FIXES NEEDED:
1. Update AuthContext to not rely on external authentication services
2. Replace any async auth operations with immediate mock responses
3. Create local chat response logic instead of external AI API
4. Remove redirect parameters that cause infinite loading
5. Add proper error boundaries to catch and display any remaining issues
6. Test the complete flow from "Start a Shop2Give" button to campaign creation completion

TESTING REQUIREMENTS:
- User should be able to click "Start a Shop2Give" and immediately access campaign creation
- Authentication should work without external services
- Chat agent should respond instantly with relevant suggestions
- Campaign creation should complete and show success message
- No infinite loading states anywhere in the flow

Make all these changes to create a fully functional demo that works immediately without external dependencies or loading issues.