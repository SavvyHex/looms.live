'use client';

import { useState } from 'react';

export default function ContributionForm() {
  const [sentence, setSentence] = useState('');
  const [hasContributed, setHasContributed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Connect to auth
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sentence.trim()) return;
    
    setIsSubmitting(true);
    
    // TODO: Submit to API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setHasContributed(true);
    setSentence('');
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
        <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-4">
          Add Your Sentence
        </h2>
        <p className="text-[var(--fg-muted)] mb-6">
          You need to be logged in to contribute to today's story.
        </p>
        <button
          onClick={() => setIsLoggedIn(true)} // TODO: Connect to actual auth
          className="px-8 py-3 bg-[var(--btn-primary)] text-white rounded-full hover:bg-[var(--btn-primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform font-medium"
        >
          Log In / Sign Up
        </button>
      </div>
    );
  }

  if (hasContributed) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
        <div className="text-center">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-2">
            Thank You!
          </h2>
          <p className="text-[var(--fg-muted)]">
            You've contributed your sentence for today. Come back tomorrow to add to a new story!
          </p>
        </div>
      </div>
    );
  }

  const charCount = sentence.length;
  const maxChars = 280; // Tweet-like limit

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
      <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-4">
        Add Your Sentence
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Continue the story with your sentence..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--btn-primary)] focus:ring-2 focus:ring-[var(--btn-primary)]/20 outline-none transition-all resize-none text-[var(--fg)] bg-white"
            rows={3}
            maxLength={maxChars}
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-[var(--fg-muted)]">
              Make it count - you only get one sentence per day!
            </p>
            <span className={`text-sm font-medium ${
              charCount > maxChars * 0.9 ? 'text-[var(--accent-coral)]' : 'text-[var(--fg-muted)]'
            }`}>
              {charCount}/{maxChars}
            </span>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !sentence.trim()}
          className="w-full px-8 py-3 bg-[var(--btn-primary)] text-white rounded-full hover:bg-[var(--btn-primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? 'Submitting...' : 'Contribute Sentence'}
        </button>
      </form>
    </div>
  );
}
