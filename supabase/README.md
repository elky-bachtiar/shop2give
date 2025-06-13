# Shop2Give Supabase Edge Functions

This repository contains the Supabase Edge Functions for the Shop2Give application.

## Project Structure

The project is organized as follows:

- `/functions` - Contains all Edge Functions
  - `/generate-csrf-token` - Function for generating CSRF tokens for secure operations
  - `/seed-example-campaigns` - Function to seed example campaigns
  - `/stripe-checkout` - Function for handling Stripe checkout
  - `/stripe-products` - Function for managing Stripe products
  - `/stripe-seed-example-products` - Function to seed example Stripe products
  - `/stripe-webhook` - Function to handle Stripe webhooks
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions shared across Edge Functions

## Prerequisites

- [Deno](https://deno.land/) (v1.45.0 or higher)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (v2.23.0 or higher)
- Node.js and npm (for development dependencies)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shop2give.git
   cd shop2give
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Building and Running

#### Building

This project now compiles TypeScript to JavaScript as part of the build process. While Deno can run TypeScript files directly, generating JavaScript files is useful for deployment and compatibility purposes.

To build the project (type check and generate JavaScript files):

```bash
cd supabase
deno task build
```

The build process:
1. Performs TypeScript type checking on all `.ts` files
2. Uses a custom script (`build.sh`) to transform TypeScript files to JavaScript
3. Preserves Deno-specific features like URL imports with `.ts` extensions

#### Running Locally

To start the Supabase Edge Functions server locally:

```bash
cd supabase
deno task serve
```

This will start the server at `http://localhost:54321/functions/v1/`

This will identify any TypeScript errors before you serve or deploy the functions, which helps catch issues early.

#### Handling Type Errors

When running `deno task build`, you might encounter TypeScript errors. Here's how to address common issues:

1. **Import Path Issues**: Ensure all TypeScript files are imported with `.ts` extensions, not `.js`.
   ```typescript
   // Change this
   import { Auth } from "../utils/auth.js";
   // To this
   import { Auth } from "../utils/auth.ts";
   ```

2. **Type Safety Issues**: Address any `undefined` or `any` type warnings:
   - Add null checks: `if (user.role) { ... }`
   - Add type annotations: `function process(data: SomeType) { ... }`
   - Add non-null assertions when you're sure: `user.role!.charAt(0)`

3. **Stripe API Version Issues**: Update the Stripe API version in your code to match the version used by your Stripe SDK:
   ```typescript
   // Change this
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
     apiVersion: '2022-11-15',
   });
   // To this (check your actual Stripe package version)
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
     apiVersion: '2025-05-28.basil',
   });
   ```

4. **Temporary Workaround**: If you need to proceed without fixing all type errors, you can use the `--no-check` flag:
   ```bash
   deno task serve --no-check
   ```

### Running Locally

To start the Supabase local development server:

```bash
cd shop2give
supabase start
```

To serve the Edge Functions locally:

```bash
cd supabase
deno task serve
```

The functions will be available at:
```
http://127.0.0.1:54321/functions/v1/<function-name>
```

### Testing

You can test the functions locally using tools like curl or Postman:

```bash
# Example: Test the generate-csrf-token function
curl -i http://localhost:54321/functions/v1/generate-csrf-token \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Deployment

### Deployment Prerequisites

1. Log in to the Supabase CLI:
   ```bash
   supabase login
   ```

2. Link your project (if not already linked):
   ```bash
   supabase link --project-ref <project-ref>
   ```

### Deploying Functions

**Important:** Before deploying, run the build script to generate JavaScript files from TypeScript:

```bash
cd supabase
deno task build
```

This ensures that all JavaScript files are generated and up-to-date with your TypeScript source code.

To deploy all functions:

```bash
cd shop2give
supabase functions deploy
```

To deploy a specific function:

```bash
cd shop2give
supabase functions deploy <function-name>
```

#### About the Build Process

The build process (`deno task build`) has been enhanced to:

1. Type-check all TypeScript files to catch errors before deployment
2. Convert TypeScript files to JavaScript while preserving:
   - URL imports with `.ts` extensions
   - Deno namespace references
   - Other Deno-specific features

The generated JavaScript files are compatible with Supabase Edge Functions runtime environment.

### Environment Variables

For local development, environment variables are handled by the Supabase local development server. For production deployment, you need to set these environment variables using the Supabase CLI:

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
```

Required environment variables:

- `SUPABASE_URL`: URL of your Supabase project
- `SUPABASE_ANON_KEY`: Anon key for your Supabase project
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for your Supabase project
- `STRIPE_SECRET_KEY`: Stripe secret API key

## Development Notes

### TypeScript Configuration

The project uses TypeScript with a configuration optimized for Deno, but with enhancements to generate JavaScript files. Key settings in `tsconfig.json` include:

- `noEmit`: Now set to `false` to enable JavaScript file generation
- `outDir`: Set to output JavaScript files alongside TypeScript files
- `preserveSymlinks`: Ensures proper resolution of symlinked packages

Additionally, the build process uses a custom script (`build.sh`) that:
- Preserves URL imports with `.ts` extensions in the generated JavaScript
- Maintains compatibility with the Deno runtime environment
- Strips type annotations while preserving Deno-specific code

### Import Maps

Import maps are used to handle dependencies. The main import map is in `import_map.json` at the root of the supabase directory. It specifies:

- `@supabase/supabase-js`: Version 2.50.0
- `stripe`: Version 18.2.1
- Other utility imports

### Function Structure

Each function follows the standard Supabase Edge Function structure with a `Deno.serve()` handler. Functions that require authentication typically extract the JWT token from the Authorization header.

### Best Practices

1. Always reference TypeScript files with `.ts` extension when importing
2. Use the consolidated type definitions from `/functions/types/api.ts`
3. Use the shared utility functions from `/functions/utils/`
4. Test functions locally before deployment

## Troubleshooting

### Common Issues

1. **TypeScript Import Errors**:
   - Ensure imports use `.ts` extension
   - Check that import paths are correct
   - Verify that import maps are properly configured

2. **Authorization Issues**:
   - Ensure proper JWT token is provided in the Authorization header
   - Check if the user has the required role

3. **Supabase Local Development Issues**:
   - Try restarting the Supabase server: `supabase stop && supabase start`
   - Check the logs for more detailed error information

### Debug Mode

To run the Supabase local development server in debug mode:

```bash
supabase start --debug
```

To run the functions in debug mode:

```bash
cd supabase
deno task serve --debug
```
