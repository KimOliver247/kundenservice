import { MessageType } from '../types';

// Base OpenAI API configuration
const baseURL = "https://api.aimlapi.com/v1";
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const generateAiResponse = async (
  messageType: MessageType,
  instructions: string,
  customerMessage: string
): Promise<string> => {
  // Create a context-aware system prompt based on message type
  let systemPrompt = `
    You are a professional customer service expert. 
    Your job is to write ${messageType === 'email' ? 'professional, formal email replies' : 
                          messageType === 'review' ? 'helpful responses to customer reviews' : 
                          messageType === 'social' ? 'friendly, concise social media replies' : 
                          'professional customer service messages'}.
    Always be polite, understanding, and resolve concerns effectively while maintaining a positive tone.
  `;

  // Add any custom instructions if provided
  if (instructions.trim()) {
    systemPrompt += `\n\nAdditional instructions: ${instructions.trim()}`;
  }

  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt.trim(),
          },
          {
            role: "user",
            content: `Customer ${messageType === 'email' ? 'email' : 
                              messageType === 'review' ? 'review' : 
                              messageType === 'social' ? 'comment' : 
                              'message'}: "${customerMessage.trim()}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
};