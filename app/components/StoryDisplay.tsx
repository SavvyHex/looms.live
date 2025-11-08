'use client';

import { useEffect, useState } from 'react';

interface Sentence {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export default function StoryDisplay() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch today's story from API
    // Mock data for now
    const mockSentences: Sentence[] = [
      {
        id: '1',
        text: 'The old lighthouse keeper had seen many storms, but none quite like this.',
        author: 'Anonymous',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        text: 'As the waves crashed against the rocky shore, a peculiar green light began to pulse from within the lighthouse.',
        author: 'Anonymous',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        text: 'He climbed the spiraling stairs, each step echoing with memories of a thousand nights alone.',
        author: 'Anonymous',
        timestamp: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setSentences(mockSentences);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
        <p className="text-[var(--fg-muted)] text-center">Loading today's story...</p>
      </div>
    );
  }

  if (sentences.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
        <p className="text-[var(--fg-muted)] text-center text-lg">
          No sentences yet. Be the first to start today's story!
        </p>
      </div>
    );
  }

  const colors = [
    'bg-[var(--accent-coral)]/10 hover:bg-[var(--accent-coral)]/20',
    'bg-[var(--accent-peach)]/10 hover:bg-[var(--accent-peach)]/20',
    'bg-[var(--accent-mint)]/10 hover:bg-[var(--accent-mint)]/20',
    'bg-[var(--accent-lavender)]/10 hover:bg-[var(--accent-lavender)]/20',
    'bg-[var(--accent-sky)]/10 hover:bg-[var(--accent-sky)]/20',
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
      <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-6">The Story So Far</h2>
      <div className="text-lg text-[var(--fg)] leading-relaxed">
        {sentences.map((sentence, index) => (
          <span
            key={sentence.id}
            className={`${colors[index % colors.length]} px-2 py-1 rounded transition-colors duration-200 inline`}
          >
            {sentence.text}{' '}
          </span>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-[var(--fg-muted)]">
          {sentences.length} {sentences.length === 1 ? 'sentence' : 'sentences'} contributed today
        </p>
      </div>
    </div>
  );
}
