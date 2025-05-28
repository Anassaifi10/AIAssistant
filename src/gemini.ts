const apikey = "AIzaSyD3g4IH6ZNEHfulnakYUEPpNY7CPJxOv_I";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: apikey });

export default async function Gemini(prompt:string) {
  
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Answer briefly in 10 to 15 words. ${prompt}`,
    config:{
      responseMimeType:"text/plain",
      temperature:1,
      topP:0.95,
      topK:40
    }
  });
  // console.log(response.text);
  return response.text;
}

