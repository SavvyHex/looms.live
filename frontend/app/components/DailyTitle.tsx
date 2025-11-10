'use client';

import { useEffect, useState } from 'react';

export default function DailyTitle() {
  const [title, setTitle] = useState<string>('');
  const [source, setSource] = useState<string>('loading');

  useEffect(() => {
    async function fetchTitle() {
      try {
        const res = await fetch('/api/daily-title');
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setTitle(data.title);
        setSource(data.source);
      } catch (err) {
        console.error('Failed to fetch title:', err);
        setTitle('The Poem Unfolds');
        setSource('error');
      }
    }

    fetchTitle();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] mb-1">
        {title || 'Loading...'}
      </h2>
      <p className="text-sm text-[var(--fg-muted)]">
        {source === 'gemini' ? 'AI-generated poem title' : source === 'cache' ? 'Today\'s poem title' : 'Poem title'}
      </p>
    </div>
  );
}
