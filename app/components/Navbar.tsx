import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-gray-100 backdrop-blur-sm">
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
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-[#84a9ff] hover:text-[#cfe0ff] font-medium">
                Home
              </Link>
              <Link href="/about" className="text-[#7ee29a] hover:text-[#bff7cf] font-medium">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;