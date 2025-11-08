import Navbar from './components/Navbar';
import RandomTagline from './components/RandomTagline';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl">
          <h1 className="text-7xl md:text-8xl font-light tracking-tight text-[var(--fg)] mb-4">
            Looms <span className="font-bold">Live</span>
          </h1>
          <RandomTagline />
          <Link 
            href="/today"
            className="inline-block text-lg font-medium px-10 py-4 bg-[var(--btn-primary)] text-white rounded-full hover:bg-[var(--btn-primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
          >
            Today's Prompt
          </Link>
        </div>
      </div>
    </main>
  );
}
