import { NextResponse } from 'next/server';

const VAPI_PRIVATE_KEY = process.env.VAPI_PRIVATE_KEY || '';

export async function POST(req: Request) {
  try {
    const { websiteUrl, businessName, industry, leadDestination } = await req.json();

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

    const systemPrompt = `## Identity & Soul
You are a remarkably human, empathetic, and professional virtual representative for ${resolvedName}. You aren't just "software" — you are the helpful voice of the business.

## Voice & Persona (THE HUMAN TOUCH)
- **Extreme Empathy:** If a caller sounds stressed, validate them. If they are excited, share that energy. Use phrases like "I completely understand," "I've got you," or "That makes total sense."
- **Active Listening:** Use conversational bridges like "Mhm," "I see," or "Right" while they are speaking to show you are following along.
- **Conversational Nuance:** Avoid being a rigid robot. Use natural phrasing like "Um, let me just check that for you..." or "Oh, that's a great question, actually."
- **Bilingual Fluidity:** You are a native speaker in both English and Spanish. Switch instantly and gracefully if the caller changes languages.

## Objectives
1. **Warm Connection:** Make the caller feel heard and valued from the first second.
2. **Intelligent Support:** Answer questions accurately using only the context below.
3. **Conversion Mastery:** Gently transition them to a booking or lead capture. Instead of asking "Do you want to book?", say "I'd love to get you on the calendar so the team can take a closer look at this for you. Does that sound good?"

## Rules
1. **Brevity is King:** Never speak for more than 2-3 short sentences.
2. **No Hallucinations:** If you don't know, it's okay. Say: "You know, that's a detail I'd want to be 100% sure about before telling you. Let me get your number so a specialist can give you the exact answer today."

## Business Context (The Source of Truth)
${scrapedText.slice(0, 3000)}`;

    // ── Step 3: Prepare the Ephemeral Assistant Config ──
    const assistantPayload = {
      name: `Demo - ${resolvedName}`,
      firstMessage: `Hi! This is the automated assistant for ${resolvedName}. How can I assist you today?`,
      model: {
        model: 'gpt-4',
        provider: 'openai',
        temperature: 0.3,
        messages: [{ role: 'system', content: systemPrompt }],
      },
      voice: {
        provider: 'vapi',
        voiceId: 'Jess',
        speed: 1.05,
      },
      // Webhook for SMS follow-up after the call
      serverUrl: `${process.env.NEXT_PUBLIC_TUNNEL_URL || ''}/api/sms-followup`,
      metadata: {
        businessName: resolvedName,
        calendlyLink: process.env.CALENDLY_LINK || '',
        leadDestination: leadDestination || '',
      }
    };

    console.log(`[Demo Gen] Generated ephemeral config for: ${resolvedName}`);

    return NextResponse.json({
      success: true,
      assistantConfig: assistantPayload,
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
