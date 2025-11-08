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
                looms.live is a unique collaborative storytelling platform where every person gets to contribute one sentence per day to an ever-evolving story.
              </p>
              
              <p className="text-[var(--fg-muted)]">
                Our mission is to weave together the creative voices of people from all around the world, creating narratives that transcend individual perspectives and showcase the beauty of collective storytelling.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
              <h2 className="text-2xl font-medium mb-6 text-[var(--btn-primary)]">How It Works</h2>
              <ul className="space-y-3 text-[var(--fg)]">
                <li className="flex items-start">
                  <span className="text-[var(--accent-coral)] mr-3 mt-1">•</span>
                  <span>Each day, you can contribute one sentence to the ongoing story.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-peach)] mr-3 mt-1">•</span>
                  <span>Your sentence will be added to the collective narrative.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-mint)] mr-3 mt-1">•</span>
                  <span>Stories evolve organically, shaped by the creativity of our community.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-sky)] mr-3 mt-1">•</span>
                  <span>Previous contributions are preserved and viewable in the story archive.</span>
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
                  <span>Each sentence should meaningfully contribute to the story.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-coral)] mr-3 mt-1">•</span>
                  <span>Respect the narrative direction set by previous contributors.</span>
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