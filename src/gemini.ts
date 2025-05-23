const apikey = "AIzaSyD3g4IH6ZNEHfulnakYUEPpNY7CPJxOv_I";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: apikey });

export default async function callGmini(prompt:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  // console.log(response.text);
  return response.text;
}

