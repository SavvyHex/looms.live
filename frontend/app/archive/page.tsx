import Navbar from '../components/Navbar';
import Link from 'next/link';

// Mock data - TODO: Replace with API call
const archivedPoems = [
  {
    id: '2024-11-07',
    date: 'November 7, 2024',
    title: 'Midnight Reflections',
    verses: 42,
    excerpt: 'The moon hangs low in twilight skies, / A silver coin in darkness cast...',
  },
  {
    id: '2024-11-06',
    date: 'November 6, 2024',
    title: 'Journey\'s End',
    verses: 38,
    excerpt: 'The final whistle calls the night, / As travelers board with weary souls...',
  },
  {
    id: '2024-11-05',
    date: 'November 5, 2024',
    title: 'Ancient Words',
    verses: 45,
    excerpt: 'Between the dusty pages old, / A thousand voices softly speak...',
  },
];

export default function ArchivePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--fg)] mb-4">
              Poetry Archive
            </h1>
            <p className="text-lg text-[var(--fg-muted)]">
              Explore past poems woven by our community
            </p>
          </div>

          <div className="space-y-4">
            {archivedPoems.map((poem) => (
              <Link
                key={poem.id}
                href={`/archive/${poem.id}`}
                className="block bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-md hover:border-[var(--btn-primary)]/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-medium text-[var(--fg)]">
                    {poem.title}
                  </h2>
                  <span className="text-sm text-[var(--fg-muted)] whitespace-nowrap ml-4">
                    {poem.date}
                  </span>
                </div>
                <p className="text-[var(--fg-muted)] mb-3 font-typewriter italic">
                  {poem.excerpt}
                </p>
                <div className="flex items-center text-sm text-[var(--btn-primary)]">
                  <span className="font-typewriter">
                    {poem.verses} verses
                  </span>
                  <span className="ml-4">→ Read full poem</span>
                </div>
              </Link>
            ))}
          </div>

          {archivedPoems.length === 0 && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-sm border border-gray-200/50 text-center">
              <p className="text-lg text-[var(--fg-muted)]">
                No archived poems yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
