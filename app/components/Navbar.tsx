import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-gray-100 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Looms
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-white rounded-full hover:text-[#cfe0ff] font-medium bg-[var(--g-red)] px-5 py-2">
                Home
              </Link>
              <Link href="/about" className="text-white rounded-full hover:text-[#bff7cf] font-medium bg-[var(--g-green)] px-5 py-2">
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