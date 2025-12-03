import { GoogleGenAI } from "@google/genai";
import { GeneratedHook } from "../types";

const API_KEY = process.env.API_KEY || '';

// Safely initialize the AI client only when needed to handle potential missing keys gracefully in UI
const getAIClient = () => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing. Live AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const generateMarketingHook = async (topic: string, audience: string): Promise<GeneratedHook | null> => {
  const ai = getAIClient();
  if (!ai) return null;

  try {
    const prompt = `
      You are a world-class digital marketer specializing in viral hooks.
      
      Task: Create a single, high-impact social media hook (Twitter/LinkedIn style) for the following topic and audience.
      Topic: ${topic}
      Audience: ${audience}

      Return the response in JSON format with two keys:
      1. "hook": The actual text of the hook.
      2. "rationale": A one-sentence technical explanation of why this hook works psychologically.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as GeneratedHook;

  } catch (error) {
    console.error("Error generating marketing hook:", error);
    throw error;
  }
};