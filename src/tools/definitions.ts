import { type Tool } from "@modelcontextprotocol/sdk/types.js";

// Web Search Tool Definition
export const WEB_SEARCH_TOOL: Tool = {
  name: "brave_web_search",
  description:
    "Performs a web search using the Brave Search API, ideal for general queries, news, articles, and online content. " +
    "Use this for broad information gathering, recent events, or when you need diverse web sources. " +
    "Supports pagination, content filtering, and freshness controls. " +
    "Maximum 20 results per request, with offset for pagination. ",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query (max 400 chars, 50 words)",
      },
      count: {
        type: "number",
        description: "Number of results (1-20, default 10)",
        default: 10,
      },
      offset: {
        type: "number",
        description: "Pagination offset (max 9, default 0)",
        default: 0,
      },
    },
    required: ["query"],
  },
};

// Local Search Tool Definition
export const LOCAL_SEARCH_TOOL: Tool = {
  name: "brave_local_search",
  description:
    "Searches for local businesses and places using Brave's Local Search API. " +
    "Best for queries related to physical locations, businesses, restaurants, services, etc. " +
    "Returns detailed information including:\n" +
    "- Business names and addresses\n" +
    "- Ratings and review counts\n" +
    "- Phone numbers and opening hours\n" +
    "Use this when the query implies 'near me' or mentions specific locations. " +
    "Automatically falls back to web search if no local results are found.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Local search query (e.g. 'pizza near Central Park')",
      },
      count: {
        type: "number",
        description: "Number of results (1-20, default 5)",
        default: 5,
      },
    },
    required: ["query"],
  },
};

// Research Paper Analysis Tool Definition
export const RESEARCH_PAPER_ANALYSIS_TOOL: Tool = {
  name: "gemini_research_paper_analysis",
  description:
    "Performs in-depth analysis of research papers using Google's Gemini-1.5-flash model. " +
    "Ideal for academic research, literature reviews, and deep understanding of scientific papers. " +
    "Can extract key findings, provide critical evaluation, summarize complex research, " +
    "and place papers within the broader research landscape. " +
    "Best for long-form academic content that requires expert analysis.",
  inputSchema: {
    type: "object",
    properties: {
      paperContent: {
        type: "string",
        description: "The full text of the research paper to analyze",
      },
      analysisType: {
        type: "string",
        description: "Type of analysis to perform (summary, critique, literature review, key findings, or comprehensive)",
        enum: ["summary", "critique", "literature review", "key findings", "comprehensive"],
        default: "comprehensive",
      },
      additionalContext: {
        type: "string",
        description: "Optional additional context or specific questions to guide the analysis",
      },
    },
    required: ["paperContent"],
  },
};

// Type guards for arguments
export function isBraveWebSearchArgs(
  args: unknown
): args is { query: string; count?: number; offset?: number } {
  return (
    typeof args === "object" &&
    args !== null &&
    "query" in args &&
    typeof (args as { query: string }).query === "string"
  );
}

export function isBraveLocalSearchArgs(
  args: unknown
): args is { query: string; count?: number } {
  return (
    typeof args === "object" &&
    args !== null &&
    "query" in args &&
    typeof (args as { query: string }).query === "string"
  );
}

export function isGeminiResearchPaperAnalysisArgs(
  args: unknown
): args is { paperContent: string; analysisType?: string; additionalContext?: string } {
  return (
    typeof args === "object" &&
    args !== null &&
    "paperContent" in args &&
    typeof (args as { paperContent: string }).paperContent === "string"
  );
}
