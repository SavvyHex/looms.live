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
                <div className="text-[var(--fg)] mb-1 font-typewriter">
                  <p>The moonlight cast strange shadows there,</p>
                  <p>Across the carnival of dreams,</p>
                  <p>Where echoes dance through midnight air,</p>
                  <p>And nothing's quite the way it seems.</p>
                </div>
                <p className="text-sm text-[var(--fg-muted)]">
                  November 7, 2024 - Midnight Reflections
                </p>
              </div>
              <div className="border-l-4 border-[var(--accent-mint)] pl-4 py-2">
                <div className="text-[var(--fg)] mb-1 font-typewriter">
                  <p>She opened letters sealed with care,</p>
                  <p>Her trembling hands already knew,</p>
                  <p>The words that waited for her there,</p>
                  <p>Would change the world she thought she knew.</p>
                </div>
                <p className="text-sm text-[var(--fg-muted)]">
                  November 6, 2024 - Journey's End
                </p>
              </div>
              <div className="border-l-4 border-[var(--accent-lavender)] pl-4 py-2">
                <div className="text-[var(--fg)] mb-1 font-typewriter">
                  <p>In silence deep the tower stands,</p>
                  <p>Its ancient clock begins to chime,</p>
                  <p>Backwards flow the grains of sands,</p>
                  <p>Unraveling the threads of time.</p>
                </div>
                <p className="text-sm text-[var(--fg-muted)]">
                  November 5, 2024 - Ancient Words
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
