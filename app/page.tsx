import LoomBackground from './components/LoomBackground';
import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <LoomBackground />
      {/* <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-8xl font-bold mb-12 tracking-tight">
          Looms Live
        </h1>
        <Link 
          href="/today"
          className="text-xl px-12 py-5 bg-[#4285F4] text-white rounded-full hover:bg-[#2b5797] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-0.5"
        >
          View Today's Looms
        </Link>
      </div> */}
    </main>
  );
}
