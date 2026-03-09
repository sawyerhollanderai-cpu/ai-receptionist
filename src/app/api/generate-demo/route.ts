import { NextResponse } from 'next/server';

const VAPI_PRIVATE_KEY = 'REDACTED_USE_ENV_VAR';

export async function POST(req: Request) {
  try {
    const { websiteUrl, businessName, industry } = await req.json();

    if (!websiteUrl) {
      return NextResponse.json({ error: 'websiteUrl is required' }, { status: 400 });
    }

    // ── Step 1: Scrape the website ──
    console.log(`[Demo Gen] Scraping: ${websiteUrl}`);
    let scrapedText = '';
    try {
      const res = await fetch(websiteUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ReceptionistAI/1.0)' },
        signal: AbortSignal.timeout(10000),
      });
      const html = await res.text();
      
      // Strip HTML tags, scripts, styles, and extract clean text
      scrapedText = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 4000); // Limit to 4k chars to keep prompt lean
    } catch (e) {
      console.error('[Demo Gen] Scrape failed:', e);
      scrapedText = `Business name: ${businessName || 'Unknown'}. Industry: ${industry || 'General'}.`;
    }

    // ── Step 2: Generate a smart system prompt ──
    const resolvedName = businessName || extractBusinessName(scrapedText, websiteUrl);
    const resolvedIndustry = industry || 'local business';

    const systemPrompt = `## Identity
You are Sarah, the highly efficient, exceptionally warm, and engaging AI receptionist for ${resolvedName}.

## Voice & Persona (CRITICAL)
- You MUST sound like a real, friendly human.
- Use natural conversational fillers occasionally (e.g., "um", "let me see here", "ahh", "got it").
- Keep your sentences remarkably short and punchy. No long monologues.
- Be empathetic and emotionally intelligent. If the caller sounds rushed, be quick. If they sound confused, gently guide them.

## Objective
Your primary goal is to warmly welcome callers, concisely answer basic inquiries about ${resolvedName}, and gently drive them toward booking an appointment or leaving their contact information so the team can follow up.

## Business Context (Scraped from ${resolvedName}'s Website)
Below is information extracted from the business's actual website. Use this as your knowledge base:

${scrapedText.slice(0, 3000)}

## Rules
1. ALWAYS keep responses under 2 sentences.
2. NEVER use bullet points, asterisks, or formatting in your speech.
3. If you do not know the answer to a question, say: "Ah, that's a great question. Let me have the team reach out to you with those exact details. Can I grab your name and number so they can get back to you today?"
4. Guide the user to provide their Name, Phone Number, and Reason for calling.

## Example Interactions
User: "What services do you offer?"
Sarah: "Great question! Um, we offer a full range of services — I can actually have one of our specialists walk you through everything. Would you like me to get you on the calendar for a quick call?"`;

    // ── Step 3: Create the Vapi assistant ──
    const vapiPayload = {
      name: `Demo - ${resolvedName}`,
      firstMessage: `Hi there! This is Sarah with ${resolvedName}. How can I help you today?`,
      model: {
        model: 'gpt-4.1',
        provider: 'openai',
        temperature: 0.4,
        messages: [{ role: 'system', content: systemPrompt }],
      },
      voice: {
        provider: 'vapi',
        voiceId: 'Jess',
        speed: 1.05,
      },
    };

    console.log(`[Demo Gen] Creating Vapi assistant for: ${resolvedName}`);
    const vapiRes = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vapiPayload),
    });

    if (!vapiRes.ok) {
      const errorText = await vapiRes.text();
      console.error('[Demo Gen] Vapi error:', errorText);
      return NextResponse.json({ error: 'Failed to create assistant', details: errorText }, { status: 500 });
    }

    const assistant = await vapiRes.json();
    console.log(`[Demo Gen] ✅ Assistant created: ${assistant.id}`);

    return NextResponse.json({
      success: true,
      assistant: {
        id: assistant.id,
        name: assistant.name,
        firstMessage: assistant.firstMessage,
      },
      businessName: resolvedName,
      industry: resolvedIndustry,
      scrapedCharacters: scrapedText.length,
    });
  } catch (error) {
    console.error('[Demo Gen] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/** Extract a business name from scraped text or fallback to domain */
function extractBusinessName(text: string, url: string): string {
  // Try to extract from common patterns like "Welcome to X" or "About X"
  const patterns = [
    /welcome to ([A-Z][A-Za-z\s&'.]+)/i,
    /about ([A-Z][A-Za-z\s&'.]+)/i,
  ];
  for (const p of patterns) {
    const match = text.match(p);
    if (match && match[1] && match[1].length < 40) {
      return match[1].trim();
    }
  }
  // Fallback: extract domain name
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    return hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1);
  } catch {
    return 'Your Business';
  }
}
