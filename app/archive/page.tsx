import Navbar from '../components/Navbar';
import Link from 'next/link';

// Mock data - TODO: Replace with API call
const archivedStories = [
  {
    id: '2024-11-07',
    date: 'November 7, 2024',
    title: 'The Midnight Garden',
    sentences: 42,
    excerpt: 'In the heart of the city, there was a garden that only appeared at midnight...',
  },
  {
    id: '2024-11-06',
    date: 'November 6, 2024',
    title: 'The Last Train',
    sentences: 38,
    excerpt: 'The conductor checked his watch one final time before the last train departed...',
  },
  {
    id: '2024-11-05',
    date: 'November 5, 2024',
    title: 'Whispers in the Library',
    sentences: 45,
    excerpt: 'Between the ancient books, a secret language whispered through the shelves...',
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
              Story Archive
            </h1>
            <p className="text-lg text-[var(--fg-muted)]">
              Explore past stories woven by our community
            </p>
          </div>

          <div className="space-y-4">
            {archivedStories.map((story) => (
              <Link
                key={story.id}
                href={`/archive/${story.id}`}
                className="block bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-md hover:border-[var(--btn-primary)]/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-medium text-[var(--fg)]">
                    {story.title}
                  </h2>
                  <span className="text-sm text-[var(--fg-muted)] whitespace-nowrap ml-4">
                    {story.date}
                  </span>
                </div>
                <p className="text-[var(--fg-muted)] mb-3">
                  {story.excerpt}
                </p>
                <div className="flex items-center text-sm text-[var(--btn-primary)]">
                  <span className="font-typewriter">
                    {story.sentences} sentences
                  </span>
                  <span className="ml-4">→ Read full story</span>
                </div>
              </Link>
            ))}
          </div>

          {archivedStories.length === 0 && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-sm border border-gray-200/50 text-center">
              <p className="text-lg text-[var(--fg-muted)]">
                No archived stories yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
