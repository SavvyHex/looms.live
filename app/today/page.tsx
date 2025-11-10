'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import DailyTitle from '../components/DailyTitle';

export default function TodayPage() {
  const [lines, setLines] = useState(['', '', '', '']);
  const [hasContributed, setHasContributed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...lines];
    newLines[index] = value;
    setLines(newLines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all lines have content
    if (lines.some(line => !line.trim())) {
      alert('Please fill in all 4 lines of your verse');
      return;
    }
    
    setIsSubmitting(true);
    
    // TODO: Submit to API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setHasContributed(true);
    setLines(['', '', '', '']);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--fg)] mb-4">
              Today's Poem
            </h1>
            <p className="text-lg text-[var(--fg-muted)]">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <DailyTitle />
          </div>

          {hasContributed ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-sm border border-gray-200/50">
              <div className="text-center">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-2">
                  Thank You!
                </h2>
                <p className="text-[var(--fg-muted)]">
                  You've contributed your verse for today. Come back tomorrow to add to a new poem!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
              <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-2">
                Add Your Verse
              </h2>
              <p className="text-[var(--fg-muted)] mb-6">
                Contribute your 4-line verse to today's collaborative poem
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:border-[var(--btn-primary)] focus-within:ring-2 focus-within:ring-[var(--btn-primary)]/20 transition-all bg-white">
                  {lines.map((line, index) => (
                    <input
                      key={index}
                      type="text"
                      value={line}
                      onChange={(e) => handleLineChange(index, e.target.value)}
                      placeholder={`Line ${index + 1}...`}
                      className={`w-full px-4 py-3 text-[var(--fg)] bg-white font-typewriter outline-none ${
                        index < 3 ? 'border-b border-gray-200' : ''
                      }`}
                      maxLength={80}
                      disabled={isSubmitting}
                      required
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-[var(--fg-muted)]">
                  <span>All 4 lines required</span>
                  <span>{lines.filter(l => l.trim()).length}/4 lines filled</span>
                </div>
                <p className="text-sm text-[var(--fg-muted)]">
                  All 4 lines are required - you only get one contribution per day!
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || lines.some(line => !line.trim())}
                  className="w-full px-8 py-3 bg-[var(--btn-primary)] text-white rounded-full hover:bg-[var(--btn-primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? 'Submitting...' : 'Contribute Verse'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
