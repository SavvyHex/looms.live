import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory cache (resets on server restart; fine for serverless)
const cache: Map<string, { title: string; expiry: number }> = new Map();

// Helper: seconds until next UTC midnight
function secondsUntilNextMidnight(): number {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0));
  return Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
}

// Fallback deterministic title generator (same as DailyTitle.tsx)
function deterministicTitle(dateStr: string): string {
  function hashString(str: string) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function seededRng(seed: number) {
    let s = seed >>> 0;
    return () => {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  const seed = hashString(dateStr + '|looms.title.v1');
  const rand = seededRng(seed);

  const adjectives = ['Silent', 'Silver', 'Hidden', 'Lonely', 'Golden', 'Wandering', 'Broken', 'Electric', 'Velvet', 'Fickle'];
  const nouns = ['Lantern', 'Harbor', 'Garden', 'Clock', 'Letter', 'River', 'Carousel', 'Shadow', 'Tide', 'Thread'];
  const places = ['the Night', 'the Quiet', 'the Sea', 'an Empty Room', 'the Margin', 'the Edge', 'the Dawn', 'the Archive', 'the Roof', 'the Attic'];
  const verbs = ['Whispers', 'Sleeps', 'Burns', 'Remembers', 'Fades', 'Wakes', 'Trembles', 'Breathes', 'Unfolds', 'Returns'];

  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

  const a = pick(adjectives);
  const n = pick(nouns);
  const p = pick(places);

  const formats = [
    `${a} ${n}`,
    `The ${a} ${n}`,
    `${n} of ${p}`,
  ];

  return formats[Math.floor(rand() * formats.length)];
}

// Call Google Gemini API
async function callGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not set; using fallback generator.');
    return null;
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 100,
          candidateCount: 1,
        },
        systemInstruction: {
          parts: [{
            text: "You are a concise poetry title generator. Output ONLY the title, nothing else."
          }]
        },
      }),
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Gemini API error: ${res.status} ${res.statusText}`, errorText);
      return null;
    }

    const data = await res.json();
    console.log('Gemini response:', JSON.stringify(data, null, 2));
    
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      const title = data.candidates[0].content.parts[0].text.trim();
      // Remove quotes if present
      const cleanTitle = title.replace(/^["']|["']$/g, '');
      console.log(`✓ Generated title via Gemini: "${cleanTitle}"`);
      return cleanTitle;
    }

    console.warn('Gemini returned no usable content. Full response:', data);
    return null;
  } catch (err) {
    console.error('Gemini API call failed:', err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
    const cacheKey = `daily-title:${today}`;

    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return NextResponse.json({ title: cached.title, source: 'cache' });
    }

    // Try AI generation
    const prompt = `You are a poet. Generate ONLY a short, evocative poem title (4-7 words). Examples: "Silent Harbor", "The Silver Thread", "Echoes of Tomorrow". Generate a new unique title now:`;
    const aiTitle = await callGemini(prompt);

    const ttl = secondsUntilNextMidnight();
    const expiry = Date.now() + ttl * 1000;

    if (aiTitle) {
      cache.set(cacheKey, { title: aiTitle, expiry });
      return NextResponse.json({ title: aiTitle, source: 'gemini' });
    }

    // Fallback to deterministic generator
    const fallbackTitle = deterministicTitle(today);
    cache.set(cacheKey, { title: fallbackTitle, expiry });
    return NextResponse.json({ title: fallbackTitle, source: 'fallback' });
  } catch (err) {
    console.error('API route error:', err);
    const today = new Date().toISOString().slice(0, 10);
    const fallbackTitle = deterministicTitle(today);
    return NextResponse.json({ title: fallbackTitle, source: 'error-fallback' }, { status: 500 });
  }
}
