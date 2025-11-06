import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-[#4285F4]">l</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">m</span>
              <span className="text-[#34A853]">s</span>
              <span className="text-[#EA4335]">.live</span>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-[#4285F4] hover:text-[#2b5797] font-medium">
              Home
            </Link>
            <Link href="/about" className="text-[#34A853] hover:text-[#1e7e34] font-medium">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;