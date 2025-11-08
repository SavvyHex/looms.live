import Navbar from '../components/Navbar';

export default function ProfilePage() {
  // TODO: Get user data from auth/API
  const user = {
    name: 'Story Weaver',
    joinDate: 'October 2024',
    totalContributions: 23,
    currentStreak: 7,
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--accent-coral)] to-[var(--accent-lavender)] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-light">
              {user.name.charAt(0)}
            </div>
            <h1 className="text-4xl font-light tracking-tight text-[var(--fg)] mb-2">
              {user.name}
            </h1>
            <p className="text-[var(--fg-muted)]">
              Member since {user.joinDate}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50 text-center">
              <div className="text-4xl font-light text-[var(--accent-coral)] mb-2">
                {user.totalContributions}
              </div>
              <p className="text-[var(--fg-muted)]">Total Contributions</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50 text-center">
              <div className="text-4xl font-light text-[var(--accent-mint)] mb-2">
                {user.currentStreak} 🔥
              </div>
              <p className="text-[var(--fg-muted)]">Day Streak</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
            <h2 className="text-2xl font-medium text-[var(--btn-primary)] mb-6">
              Recent Contributions
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[var(--accent-coral)] pl-4 py-2">
                <p className="text-[var(--fg)] mb-1">
                  "The moonlight cast strange shadows across the abandoned carnival."
                </p>
                <p className="text-sm text-[var(--fg-muted)]">
                  November 7, 2024 - The Midnight Garden
                </p>
              </div>
              <div className="border-l-4 border-[var(--accent-mint)] pl-4 py-2">
                <p className="text-[var(--fg)] mb-1">
                  "She opened the letter with trembling hands, already knowing what it would say."
                </p>
                <p className="text-sm text-[var(--fg-muted)]">
                  November 6, 2024 - The Last Train
                </p>
              </div>
              <div className="border-l-4 border-[var(--accent-lavender)] pl-4 py-2">
                <p className="text-[var(--fg)] mb-1">
                  "In the silence, the old clock tower began to chime backwards."
                </p>
                <p className="text-sm text-[var(--fg-muted)]">
                  November 5, 2024 - Whispers in the Library
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
