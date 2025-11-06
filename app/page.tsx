import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-8xl font-bold mb-12">looms live</h1>
        <Link 
          href="/today"
          className="text-xl px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          view today&apos;s looms
        </Link>
      </div>
    </main>
  );
}
