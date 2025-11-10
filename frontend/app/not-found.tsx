import Link from 'next/link';
import Navbar from './components/Navbar';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-9xl md:text-[12rem] font-light tracking-tight text-[var(--accent-lavender)] mb-4">
            404
          </h1>
                    <h2 className="text-3xl md:text-4xl font-light text-[var(--fg)] mb-4">
            Verse Not Found
          </h2>
          <p className="text-xl text-[var(--fg-muted)] font-light mb-8">
            Oops! This poem seems to have unraveled. Let's get you back on track.
          </p>
          <Link 
            href="/"
            className="inline-block text-lg font-medium px-10 py-4 bg-[var(--btn-primary)] text-white rounded-full hover:bg-[var(--btn-primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
