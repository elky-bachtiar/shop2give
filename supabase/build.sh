#!/bin/bash

# Simple build script to generate JavaScript files from TypeScript files
echo "Building JavaScript files..."

# Find all TypeScript files except declaration files
find ./functions -name "*.ts" ! -name "*.d.ts" | while read -r tsfile; do
  # Define the output JavaScript file
  jsfile="${tsfile%.ts}.js"
  echo "Transpiling: $tsfile -> $jsfile"
  
  # Create a temporary wrapper script
  cat > /tmp/transpile_temp.js <<EOF
// A simple file transpiler that reads TypeScript and outputs JavaScript
import { join, dirname } from "https://deno.land/std/path/mod.ts";

const tsFile = "$tsfile";
const jsFile = "$jsfile";

try {
  // Read the TypeScript file
  const tsContent = await Deno.readTextFile(tsFile);
  
  // Convert to JavaScript (minimal transform, just syntax)
  // This keeps imports intact which is important for Deno's runtime
  const jsContent = tsContent
    // Remove type annotations
    .replace(/:\s*[A-Za-z\[\]\|\{\}<>]+(?=(\s*[,=)]|\s*$))/g, '')
    // Remove interface declarations
    .replace(/interface\s+[^{]+\{[^}]*\}/g, '')
    // Remove type declarations
    .replace(/type\s+[^=]+=\s*[^;]+;/g, '')
    // Remove import type statements
    .replace(/import\s+type\s+[^;]+;/g, '');
  
  // Write the JavaScript output
  await Deno.writeTextFile(jsFile, jsContent);
  console.log("\u2705 Successfully transpiled: ", jsFile);
} catch (error) {
  console.error("\u274C Error transpiling file: ", tsFile, error);
}
EOF

  # Run the transpiler script
  deno run --allow-read --allow-write /tmp/transpile_temp.js
done

echo "Build complete!"
# Clean up temp file
rm -f /tmp/transpile_temp.js
