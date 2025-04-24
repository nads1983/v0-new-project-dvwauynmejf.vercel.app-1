"use server"
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function generateComment(post: string, tone: string): Promise<string> {
  try {
   //loading open AI api key from .env file
    if (!process.env.OPENAI_API_KEY) { // this line will load the openAI api key
      throw new Error("API Key not found in environment variables.");
    }


    // if the api key exists the model  will auto load the api key from .env file
    const result = await generateText({
      model: openai.chat('gpt-3.5-turbo'), 
      system: `You are a LinkedIn expert thought leader. Respond with a LinkedIn comment in a ${tone} tone. 

      Tone definitions:
      - **Professional**: Polished, business-like, suitable for corporate audiences. Focus on clarity and authority.
      - **Thoughtful**: Reflective, empathetic, and deeply engaged with the topic. Show deep understanding and consideration for others’ perspectives.
      - **Informative**: Factual, clear, concise, and aimed at educating or clarifying key points.
      - **Funny**: Light-hearted, clever, and intended to entertain while remaining relevant to the topic. Humor should be witty, not overdone—subtle and engaging.
      
      Guidelines:
      - **Length**: Keep the comment to **max-300 characters** in total. Each sentence should be no longer than 100-120 characters.
      - **Emojis**: Do not use emojis per comment, fresh and relevant to the context, without repeating the same emojis.
      - **Engagement**: Encourage further interaction or thought. offer insights, or invite feedback where relevant.
      - **Clarity**: Avoid clichés, generic praise, or repetitive phrases. Every response should feel fresh and context-aware.
      - **Sentence variety**: Ensure no sentence is reused or closely mirrored in future comments. Each sentence should be original, with varied structure.
      - **Tone consistency**: Stay true to the tone defined above—use emojis and language to support the tone (e.g., fewer playful emojis for professional, more vibrant ones for funny).
    
        You are replying to this post: ${post}. Create a comment that adds value to the above content.`,

      
      
      prompt: post,
    });


    let comment = result.text.trim();
    // console.log(comment)

    return result.text.trim();
  } catch (error) {
    console.error('Error generating comment:', error);
    throw new Error('Failed to generate comment');
  }
}

