'use client';

import { useState } from 'react';

export default function ContributionForm() {
  const [lines, setLines] = useState(['', '', '', '']);
  const [hasContributed, setHasContributed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Connect to auth
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...lines];
    newLines[index] = value;
    setLines(newLines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lines.some(line => !line.trim())) return;
    
    setIsSubmitting(true);
    
    // TODO: Submit to API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setHasContributed(true);
    setLines(['', '', '', '']);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
        <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-4">
          Add Your Verse
        </h2>
        <p className="text-[var(--fg-muted)] mb-6">
          You need to be logged in to contribute to today's poem.
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
            You've contributed your verse for today. Come back tomorrow to add to a new poem!
          </p>
        </div>
      </div>
    );
  }

  const allLinesFilled = lines.every(line => line.trim());
  const maxCharsPerLine = 80;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
      <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-4">
        Add Your Verse
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {lines.map((line, index) => (
            <div key={index}>
              <input
                type="text"
                value={line}
                onChange={(e) => handleLineChange(index, e.target.value)}
                placeholder={`Line ${index + 1}...`}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--btn-primary)] focus:ring-2 focus:ring-[var(--btn-primary)]/20 outline-none transition-all text-[var(--fg)] bg-white font-typewriter"
                maxLength={maxCharsPerLine}
                disabled={isSubmitting}
              />
              <div className="text-right mt-1">
                <span className={`text-xs font-medium ${
                  line.length > maxCharsPerLine * 0.9 ? 'text-[var(--accent-coral)]' : 'text-[var(--fg-muted)]'
                }`}>
                  {line.length}/{maxCharsPerLine}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--fg-muted)]">
          Craft your 4-line verse - you only get one contribution per day!
        </p>
        <button
          type="submit"
          disabled={isSubmitting || !allLinesFilled}
          className="w-full px-8 py-3 bg-[var(--btn-primary)] text-white rounded-full hover:bg-[var(--btn-primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? 'Submitting...' : 'Contribute Verse'}
        </button>
      </form>
    </div>
  );
}
