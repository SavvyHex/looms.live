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

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
      <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-6">The Story So Far</h2>
      <div className="space-y-4">
        {sentences.map((sentence, index) => (
          <div key={sentence.id} className="flex items-start space-x-3">
            <span className="font-typewriter text-[var(--accent-coral)] font-semibold min-w-[2rem]">
              {index + 1}.
            </span>
            <p className="text-lg text-[var(--fg)] leading-relaxed flex-1">
              {sentence.text}
            </p>
          </div>
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
