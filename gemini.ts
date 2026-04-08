import { GoogleGenAI, Type } from "@google/genai";
import { Fancam } from "../types";

const apiKey = process.env.GEMINI_API_KEY;

export async function getAIRecommendations(query: string): Promise<{ reason: string; fancams: Fancam[] }> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Recommend 4 legendary K-pop idol fancams or stage performances based on this request: "${query}". 
    For each, provide:
    - title (e.g., "Hype Boy" Stage)
    - idolName (e.g., Hanni)
    - groupName (e.g., NewJeans)
    - youtubeId (A valid YouTube video ID if known, or a placeholder if not)
    - date (e.g., 2023-01-01)
    - description (Why it's legendary)
    - tags (e.g., ["powerful", "dance", "visual"])
    
    Also provide a brief "reason" for this overall recommendation set.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reason: { type: Type.STRING },
          fancams: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                idolName: { type: Type.STRING },
                groupName: { type: Type.STRING },
                youtubeId: { type: Type.STRING },
                date: { type: Type.STRING },
                description: { type: Type.STRING },
                tags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["title", "idolName", "groupName", "youtubeId", "date", "description", "tags"]
            }
          }
        },
        required: ["reason", "fancams"]
      }
    }
  });

  const result = JSON.parse(response.text || "{}");
  
  // Map to Fancam type and add thumbnails
  const fancams = (result.fancams || []).map((f: any, index: number) => ({
    ...f,
    id: `ai-${index}-${Date.now()}`,
    thumbnailUrl: `https://img.youtube.com/vi/${f.youtubeId}/maxresdefault.jpg`
  }));

  return {
    reason: result.reason || "AI recommended these stages for you.",
    fancams
  };
}
