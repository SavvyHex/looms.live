import Navbar from '../components/Navbar';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-[var(--fg)] text-center mb-16">
            About Looms
          </h1>
          
          <div className="space-y-10 text-lg leading-relaxed">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
              <p className="text-[var(--fg)] mb-4">
                looms.live is a unique collaborative poetry platform where every person gets to contribute one 4-line verse per day to an ever-evolving collective poem.
              </p>
              
              <p className="text-[var(--fg-muted)]">
                Our mission is to weave together the creative voices of people from all around the world, creating poetry that transcends individual perspectives and showcases the beauty of collective expression.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
              <h2 className="text-2xl font-medium mb-6 text-[var(--btn-primary)]">How It Works</h2>
              <ul className="space-y-3 text-[var(--fg)]">
                <li className="flex items-start">
                  <span className="text-[var(--accent-coral)] mr-3 mt-1">•</span>
                  <span>Each day, you can contribute one 4-line verse to the collective poem.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-peach)] mr-3 mt-1">•</span>
                  <span>Your verse will be woven into today's poetic tapestry.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-mint)] mr-3 mt-1">•</span>
                  <span>Poems evolve organically, shaped by the creativity of our community.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-sky)] mr-3 mt-1">•</span>
                  <span>Previous contributions are preserved and viewable in the poetry archive.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
              <h2 className="text-2xl font-medium mb-6 text-[var(--btn-primary)]">Community Guidelines</h2>
              <ul className="space-y-3 text-[var(--fg)]">
                <li className="flex items-start">
                  <span className="text-[var(--accent-lavender)] mr-3 mt-1">•</span>
                  <span>Keep your contributions family-friendly and respectful.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-mint)] mr-3 mt-1">•</span>
                  <span>Each verse should be exactly 4 lines (no more, no less).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-coral)] mr-3 mt-1">•</span>
                  <span>Let your creativity flow - rhyming is optional but encouraged!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-sky)] mr-3 mt-1">•</span>
                  <span>Have fun and be creative!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}