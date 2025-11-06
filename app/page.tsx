import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-8xl font-bold mb-12 tracking-tight">
          <span className="text-[#4285F4]">l</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">m</span>
          <span className="text-[#34A853]">s</span>
          <span className="text-[#EA4335] ml-4">live</span>
        </h1>
        <Link 
          href="/today"
          className="text-xl px-12 py-5 bg-[#4285F4] text-white rounded-full hover:bg-[#2b5797] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          view today&apos;s looms
        </Link>
      </div>
    </main>
  );
}
