'use client';

import { useEffect, useState } from 'react';

const taglines = [
  // Creativity-focused
  "Weaving stories, one thread at a time.",
  "Every sentence counts, every voice matters.",
  "Your daily dose of collaborative creativity.",
  "Stories woven by you, for everyone.",
  "Write today, inspire tomorrow.",
  "Your sentence, our collective masterpiece.",
  
  // Beautiful chaos
  "Chaos is just creativity in its raw form.",
  "Where beautiful disorder meets storytelling.",
  "Embrace the chaos, create the unexpected.",
  "Organized chaos, unexpected brilliance.",
  "From disorder comes the most beautiful tales.",
  "Chaos weaves the most interesting threads.",
];

export default function RandomTagline() {
  const [tagline, setTagline] = useState('');

  useEffect(() => {
    // Select a random tagline on mount
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    setTagline(randomTagline);
  }, []);

  // Prevent hydration mismatch by not rendering until client-side
  if (!tagline) {
    return (
      <p className="text-xl md:text-2xl text-[var(--fg-muted)] font-light mb-12 invisible">
        Loading...
      </p>
    );
  }

  return (
    <p className="text-xl md:text-2xl text-[var(--fg-muted)] font-light mb-12">
      {tagline}
    </p>
  );
}
