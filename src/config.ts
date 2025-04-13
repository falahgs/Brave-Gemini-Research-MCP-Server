// Configuration for the Brave Search MCP server
export const SERVER_CONFIG = {
  name: "brave-gemini-research-mcp",
  version: "0.2.0",
};

// Check for API key at startup
export const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
if (!BRAVE_API_KEY) {
  console.error("Error: BRAVE_API_KEY environment variable is required");
  process.exit(1);
}

// Check for Google API key
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("Warning: GOOGLE_API_KEY environment variable is missing. Gemini research features will be unavailable.");
}
