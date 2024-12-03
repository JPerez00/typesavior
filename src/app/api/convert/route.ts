// src/app/api/convert/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const config = {
  runtime: 'nodejs',
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { code, model } = await request.json();

    if (!code) {
      console.error('No code provided.');
      return NextResponse.json({ error: 'No code provided.' }, { status: 400 });
    }

    const validModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o', 'gpt-4o-mini'];
    const selectedModel = validModels.includes(model) ? model : 'gpt-3.5-turbo';

    const prompt = `
Convert the following JavaScript code to TypeScript.

Provide the TypeScript code first, then a concise summary explaining the changes and types used, tailored for a JavaScript developer learning TypeScript.

**Please format your summary using Markdown, with clear paragraphs and bullet points where appropriate.**

Please format your response exactly as follows, and do not include any additional text or explanations outside of these tags:

<TypeScriptCode>
[TypeScript code here]
</TypeScriptCode>

<Summary>
[Summary here]
</Summary>

JavaScript Code:
${code}
`;

    // Removed debugging logs
    // console.log('Sending request to OpenAI API...');

    const completion = await openai.chat.completions.create({
      model: selectedModel,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    });

    // console.log('Received response from OpenAI API.');

    let responseText = completion.choices[0].message?.content || '';

    // Removed response text logging
    // console.log('Response text:', responseText);

    // Remove any text before the first <TypeScriptCode> tag
    const startIndex = responseText.indexOf('<TypeScriptCode>');
    if (startIndex !== -1) {
      responseText = responseText.slice(startIndex);
    } else {
      console.error('TypeScriptCode tag not found in response.');
      return NextResponse.json(
        {
          error: 'Failed to find <TypeScriptCode> tag in OpenAI response.',
          // details: responseText, // Optional: include for debugging
        },
        { status: 500 }
      );
    }

    // Extract TypeScript code and summary using regex
    const tsCodeMatch = responseText.match(
      /<TypeScriptCode>\s*([\s\S]*?)\s*<\/TypeScriptCode>/i
    );
    const summaryMatch = responseText.match(
      /<Summary>\s*([\s\S]*?)\s*<\/Summary>/i
    );

    if (!tsCodeMatch) {
      console.error('Failed to extract TypeScript code.');
      return NextResponse.json(
        {
          error: 'Failed to extract TypeScript code from OpenAI response.',
          // details: responseText, // Optional: include for debugging
        },
        { status: 500 }
      );
    }

    if (!summaryMatch) {
      console.error('Failed to extract summary.');
      return NextResponse.json(
        {
          error: 'Failed to extract summary from OpenAI response.',
          // details: responseText, // Optional: include for debugging
        },
        { status: 500 }
      );
    }

    const tsCode = tsCodeMatch[1].trim();
    const summary = summaryMatch[1].trim();

    // Removed extracted content logs
    // console.log('Extracted TypeScript code:', tsCode);
    // console.log('Extracted summary:', summary);

    return NextResponse.json({ tsCode, summary });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in API route:', error.message);

      return NextResponse.json(
        { error: 'Internal server error', details: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unknown error:', error);

      return NextResponse.json(
        { error: 'Internal server error', details: 'An unexpected error occurred.' },
        { status: 500 }
      );
    }
  }
}
