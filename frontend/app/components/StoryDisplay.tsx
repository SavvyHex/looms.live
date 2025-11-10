'use client';

import { useEffect, useState } from 'react';

interface Verse {
  id: string;
  lines: string[];
  author: string;
  timestamp: string;
}

export default function StoryDisplay() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch today's poem from API
    // Mock data for now
    const mockVerses: Verse[] = [
      {
        id: '1',
        lines: [
          'The moon hangs low in twilight skies,',
          'A silver coin in darkness cast,',
          'While shadows dance and evening sighs,',
          'Of dreams we hold but cannot grasp.',
        ],
        author: 'Anonymous',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        lines: [
          'Through winding streets the whispers flow,',
          'Of stories told in ages past,',
          'Where ancient trees and gardens grow,',
          'And time moves slow, but never lasts.',
        ],
        author: 'Anonymous',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        lines: [
          'A thousand voices, soft and clear,',
          'Unite in words both old and new,',
          'Each verse a thread that we hold dear,',
          'Together weaving something true.',
        ],
        author: 'Anonymous',
        timestamp: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setVerses(mockVerses);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
        <p className="text-[var(--fg-muted)] text-center">Loading today's poem...</p>
      </div>
    );
  }

  if (verses.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
        <p className="text-[var(--fg-muted)] text-center text-lg">
          No verses yet. Be the first to start today's poem!
        </p>
      </div>
    );
  }

  const colors = [
    'bg-[var(--accent-coral)]/10',
    'bg-[var(--accent-peach)]/10',
    'bg-[var(--accent-mint)]/10',
    'bg-[var(--accent-lavender)]/10',
    'bg-[var(--accent-sky)]/10',
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
      <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-6">The Poem So Far</h2>
      <div className="space-y-6">
        {verses.map((verse, index) => (
          <div
            key={verse.id}
            className={`${colors[index % colors.length]} px-6 py-4 rounded-lg transition-colors duration-200`}
          >
            {verse.lines.map((line, lineIndex) => (
              <p key={lineIndex} className="text-lg text-[var(--fg)] leading-relaxed font-typewriter">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-[var(--fg-muted)]">
          {verses.length} {verses.length === 1 ? 'verse' : 'verses'} contributed today
        </p>
      </div>
    </div>
  );
}
