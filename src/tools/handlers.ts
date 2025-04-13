import { performWebSearch, performLocalSearch } from "../utils/braveApi.js";
import { analyzePaperWithGemini } from "../utils/googleAi.js";
import { isBraveWebSearchArgs, isBraveLocalSearchArgs, isGeminiResearchPaperAnalysisArgs } from "./definitions.js";

// Web search handler
export async function webSearchHandler(args: unknown) {
  if (!isBraveWebSearchArgs(args)) {
    throw new Error("Invalid arguments for brave_web_search");
  }

  const { query, count = 10, offset = 0 } = args;
  const results = await performWebSearch(query, count, offset);

  return {
    content: [{ type: "text", text: results }],
    isError: false,
  };
}

// Local search handler
export async function localSearchHandler(args: unknown) {
  if (!isBraveLocalSearchArgs(args)) {
    throw new Error("Invalid arguments for brave_local_search");
  }

  const { query, count = 5 } = args;
  const results = await performLocalSearch(query, count);

  return {
    content: [{ type: "text", text: results }],
    isError: false,
  };
}

// Research paper analysis handler
export async function researchPaperAnalysisHandler(args: unknown) {
  if (!isGeminiResearchPaperAnalysisArgs(args)) {
    throw new Error("Invalid arguments for gemini_research_paper_analysis");
  }

  const { paperContent, analysisType = "comprehensive", additionalContext } = args;
  
  // Check if paper content is too short
  if (paperContent.length < 100) {
    return {
      content: [{ 
        type: "text", 
        text: "The provided paper content is too short for meaningful analysis. Please provide more comprehensive text." 
      }],
      isError: true,
    };
  }

  try {
    console.error(`Analyzing research paper with Gemini (${analysisType} analysis)...`);
    const analysis = await analyzePaperWithGemini(paperContent, analysisType, additionalContext);
    
    return {
      content: [{ type: "text", text: analysis }],
      isError: false,
    };
  } catch (error) {
    console.error("Research paper analysis error:", error);
    return {
      content: [{ 
        type: "text", 
        text: `Error analyzing research paper: ${error instanceof Error ? error.message : String(error)}` 
      }],
      isError: true,
    };
  }
}
