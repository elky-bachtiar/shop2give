// TypeScript declarations for extending Deno environment
// Only add what's not already in the built-in Deno types

// Augment ImportMeta interface for Deno's import.meta features
interface ImportMeta {
  url: string;
  main: boolean;
}
