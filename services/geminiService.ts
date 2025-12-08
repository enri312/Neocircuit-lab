import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLogoImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
        }
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini.");
    }

    const content = response.candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("No content parts returned.");
    }

    // Iterate through parts to find the image
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        const base64EncodeString = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${base64EncodeString}`;
      }
    }

    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Error generating logo:", error);
    throw error;
  }
};

export const generateDiagnosis = async (problemDescription: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Act as a senior computer technician. 
      Analyze the following problem reported by a customer: "${problemDescription}".
      Provide a concise list of 3 potential causes and a recommended diagnostic step.
      Format as a short text suitable for a "preliminary diagnosis" field in a repair system.`,
    });

    return response.text || "No se pudo generar el diagnóstico.";
  } catch (error) {
    console.error("Error generating diagnosis:", error);
    return "Error al conectar con el servicio de IA.";
  }
};