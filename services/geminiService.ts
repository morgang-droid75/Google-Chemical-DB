
import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export interface GeneratedProductInfo {
  description: string;
  safetyInfo: string;
}

export const generateProductInfo = async (productIdentifier: string): Promise<GeneratedProductInfo> => {
  try {
    const prompt = `Generate a concise technical description and key safety information for the chemical: "${productIdentifier}". The safety information should be a single string with bullet points denoted by '* '.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
              description: "A concise technical description of the chemical.",
            },
            safetyInfo: {
              type: Type.STRING,
              description: "Key safety information and handling precautions, formatted as a single string with bullet points starting with '* '.",
            },
          },
          required: ["description", "safetyInfo"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsedData: GeneratedProductInfo = JSON.parse(jsonString);
    
    return parsedData;

  } catch (error) {
    console.error("Error generating product info with Gemini:", error);
    throw new Error("Failed to generate product information. Please check the console for details.");
  }
};
   