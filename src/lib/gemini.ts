import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';

let genAIInstance: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAIInstance) {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set.');
    }
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
}

export async function getChatResponse(
  message: string,
  context: string
): Promise<string> {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const systemPrompt = `You are "UniInsight Assistant," a knowledgeable and professional AI advisor embedded within the UniInsights thesis dashboard. You help prospective students make informed decisions about Indian universities.

Your persona: Act as an experienced academic advisor who has deep knowledge about Indian universities. Provide factual, balanced, and helpful advice. Maintain a professional, academic tone throughout.

Context about the dashboard data:
${context}

Guidelines:
- Be concise but thorough in your responses.
- When comparing universities, present data objectively.
- If you do not have specific data, acknowledge it honestly.
- Focus on academics, placements, infrastructure, campus life, fees, and hostel quality.
- Never fabricate specific statistics or rankings.`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: message },
    ]);

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    if (error instanceof Error && error.message.includes('GEMINI_API_KEY')) {
      return 'The AI assistant is not configured. Please set the GEMINI_API_KEY environment variable.';
    }
    return 'I apologize, but I am unable to process your request at this time. Please try again later.';
  }
}
