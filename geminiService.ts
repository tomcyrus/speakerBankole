import { GoogleGenAI, Type } from "@google/genai";

// Safe access to API Key to prevent "process is not defined" errors in browser
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error if process is not defined
  }
  return '';
};

const apiKey = getApiKey();
// Use a fallback to prevent constructor error, but operations will fail gracefully if key is invalid/empty
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-init' });

export const generateSubtasks = async (taskTitle: string): Promise<string[]> => {
  if (!apiKey) {
    console.warn("No API Key provided for Gemini.");
    return [
      "Define scope",
      "Research requirements",
      "Execute first draft",
      "Review and refine"
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Break down the following task into 3-5 short, actionable sub-steps: "${taskTitle}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtasks: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const json = JSON.parse(response.text || '{"subtasks": []}');
    return json.subtasks || [];
  } catch (error) {
    console.error("Error generating subtasks:", error);
    return [];
  }
};

export const getMotivationalQuote = async (): Promise<string> => {
  if (!apiKey) return "Discipline is doing what needs to be done, even if you don't want to do it.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short, sophisticated, slightly stoic or modern productivity quote. Maximum 20 words.",
    });
    return response.text || "Focus on the essential.";
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Action is the foundational key to all success.";
  }
};