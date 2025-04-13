# Brave-Gemini Research MCP Server
[![smithery badge](https://smithery.ai/badge/@falahgs/brave-gemini-research-mcp-server)](https://smithery.ai/server/@falahgs/brave-gemini-research-mcp-server)

A modern MCP (Model Context Protocol) server implementation that provides AI assistants with web search capabilities via the Brave Search API and advanced research paper analysis with Google's Gemini model.

## Overview

This project enables AI assistants like Claude to perform web searches and analyze research papers directly through a standardized API interface. The MCP server exposes three main tools:

1. **Web Search** - For general internet searches and information retrieval
2. **Local Search** - For finding businesses, locations, and places of interest
3. **Research Paper Analysis** - For in-depth analysis of academic papers using Google's Gemini model

## Features

- 🔍 **Web Search API** - Find information across the web
- 🏢 **Local Search API** - Discover businesses and places
- 📑 **Research Paper Analysis** - Analyze academic papers with Gemini AI
- 🤖 **Claude Integration** - Seamless connection with Claude Desktop
- 🛠️ **Extensible Design** - Easy to add new tools and capabilities

## Setup and Installation

### Installing via Smithery

To install brave-gemini-research-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@falahgs/brave-gemini-research-mcp-server):

```bash
npx -y @smithery/cli install @falahgs/brave-gemini-research-mcp-server --client claude
```

### Prerequisites

- Node.js v18+ recommended
- Brave Search API key ([Get one here](https://brave.com/search/api/))
- Google API key for Gemini integration (required for research paper analysis)
- Claude Desktop for AI assistant integration (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/falahgs/brave-gemini-research-mcp.git
   cd brave-gemini-research-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API keys:
   ```
   BRAVE_API_KEY=your_brave_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

### Building

Compile the TypeScript code to JavaScript:

```bash
npm run build
# or manually
npx tsc
```

### Running the Server

Set environment variables and start the server:

**PowerShell:**
```powershell
$env:BRAVE_API_KEY="your_brave_api_key"
$env:GOOGLE_API_KEY="your_google_api_key"
node dist/index.js
```

**Command Prompt:**
```
SET BRAVE_API_KEY=your_brave_api_key
SET GOOGLE_API_KEY=your_google_api_key
node dist/index.js
```

**Bash/Linux/macOS:**
```bash
BRAVE_API_KEY=your_brave_api_key GOOGLE_API_KEY=your_google_api_key node dist/index.js
```

## Claude Desktop Integration

Follow these steps to integrate the MCP server with Claude Desktop:

1. Ensure you have Claude Desktop installed ([Download here](https://claude.ai/desktop))

2. Locate your Claude Desktop configuration file:
   - Windows: `C:\Users\<username>\AppData\Roaming\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

3. Add the Brave-Gemini Research MCP configuration:

```json
{
  "mcpServers": {
    "Brave-Gemini Research": {
      "command": "node",
      "args": ["G:\\path\\to\\your\\brave-gemini-research-mcp\\dist\\index.js"],
      "cwd": "G:\\path\\to\\your\\brave-gemini-research-mcp",
      "timeoutMs": 120000,
      "env": {
        "BRAVE_API_KEY": "your_brave_api_key",
        "GOOGLE_API_KEY": "your_google_api_key",
        "NODE_ENV": "production",
        "DEBUG": "mcp:*"
      }
    }
  }
}
```

4. Important notes:
   - Use **absolute paths** with double backslashes (Windows) in the `args` and `cwd` fields
   - Replace `G:\\path\\to\\your\\brave-gemini-research-mcp` with the actual path to your project
   - Replace `your_brave_api_key` and `your_google_api_key` with your actual API keys
   - The `timeoutMs` setting helps prevent timeout issues during initialization

5. Save the file and restart Claude Desktop

### Using with Claude

After configuration, you can ask Claude to search the web or analyze research papers with prompts like:

- "Search the web for the latest AI research papers"
- "Find coffee shops in San Francisco"
- "Analyze this research paper on quantum computing: [paper content]"

Claude will use the MCP server to perform these searches and analyses, returning the results directly in your conversation.

## Tool Capabilities

### Web Search Tool

The web search tool enables general internet searches:

- **Function**: `brave_web_search`
- **Parameters**:
  - `query` (required): Search query (max 400 chars)
  - `count` (optional): Number of results (1-20, default 10)
  - `offset` (optional): Pagination offset (max 9, default 0)

### Local Search Tool

The local search tool finds businesses and locations:

- **Function**: `brave_local_search`
- **Parameters**:
  - `query` (required): Local search query (e.g., "pizza near Central Park")
  - `count` (optional): Number of results (1-20, default 5)

### Research Paper Analysis Tool

The research paper analysis tool provides in-depth analysis of academic papers using Google's Gemini model:

- **Function**: `gemini_research_paper_analysis`
- **Parameters**:
  - `paperContent` (required): The full text of the research paper to analyze
  - `analysisType` (optional): Type of analysis to perform
    - Options: "summary", "critique", "literature review", "key findings", "comprehensive" (default)
  - `additionalContext` (optional): Specific questions or context to guide the analysis

**Analysis Types:**
- **Summary**: Comprehensive overview including research question, methodology, key findings, and conclusions
- **Critique**: Critical evaluation of methodology, validity, limitations, and suggestions for improvement
- **Literature Review**: Analysis of how the paper fits within the broader research landscape
- **Key Findings**: Extraction and explanation of the most significant findings and implications
- **Comprehensive**: Complete analysis covering all aspects (default)

### Example Analysis Result

When using the Research Paper Analysis tool with Gemini, you'll receive a structured, comprehensive analysis depending on the analysis type selected. For example, with a "comprehensive" analysis, you might get:

```
## Research Paper Analysis: Comprehensive

### Overview
[Summary of paper's main topic and research objectives]

### Methodology Assessment
[Evaluation of the research methods and design]

### Key Findings
[Breakdown of the most significant discoveries and results]

### Limitations
[Analysis of constraints and weaknesses in the research]

### Significance & Implications
[Discussion of the paper's importance to the field]

### Recommendations
[Suggestions for future research or applications]
```

The Gemini model provides expert-level analysis that helps researchers, students, and professionals quickly understand and evaluate complex academic content.

## Troubleshooting

### Common Issues

1. **Module Not Found Errors**:
   - Ensure all imports include `.js` extensions in TypeScript files
   - Run `npx tsc` to recompile after fixing imports
   - Check the generated `dist` directory structure

2. **Timeout Errors**:
   - Increase the `timeoutMs` in Claude Desktop configuration (120000 ms recommended)
   - Check that environment variables are properly set

3. **API Key Issues**:
   - Verify your API keys are correctly set in the environment
   - Check for rate limiting or usage restrictions

4. **Gemini Model Issues**:
   - Ensure your Google API key has access to Gemini models
   - Check if the paper content exceeds token limits (try shorter excerpts)
   - Verify the analysis type is one of the supported options

5. **Windows-Specific Issues**:
   - Use PowerShell for more reliable environment variable handling
   - For Windows paths in JSON config, use double backslashes (e.g., `G:\\path\\to\\file`)
   - Consider using absolute paths if relative paths aren't working

### Debugging

For detailed debugging output:

```bash
# Set environment variables
DEBUG=mcp:* NODE_ENV=development node dist/index.js
```

## Testing Your Setup

To verify your MCP server is working correctly:

1. **Manual Test**:
   - Run the server using the command line instructions above
   - Check the console output for "Brave-Gemini Research MCP Server running on stdio"
   - No error messages should appear

2. **Claude Desktop Test**:
   - After configuring Claude Desktop, open a new conversation
   - Ask Claude to "Search for latest developments in AI"
   - Claude should respond with search results from Brave Search
   - Ask Claude to analyze a research paper
   - Claude should respond with a detailed analysis from Gemini

## Technical Details

### MCP Protocol

The Model Context Protocol allows AI models to access external tools through a standardized interface. Key components include:

- **Tools**: Functions with defined schemas
- **Transports**: Communication channels between clients and servers
- **Handlers**: Logic to process requests and return responses

### Project Structure

```
├── dist/               # Compiled JavaScript files
├── src/
│   ├── config.ts       # Server configuration
│   ├── server.ts       # MCP server implementation
│   ├── tools/          # Tool definitions and handlers
│   └── utils/          # Utility functions and API clients
├── index.ts            # Server entry point
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Citation

If you use this tool in your research or project, please cite it as:

```
Salieh, F. G. (2025). Brave-Gemini Research MCP Server: A tool for AI assistants to search the web and analyze research papers. 
https://github.com/yourusername/brave-gemini-research-mcp
```

## License

MIT

## Copyright

© 2025 Falah G. Salieh, Baghdad, Iraq. All rights reserved.

---

Made with ❤️ for enhancing AI capabilities
