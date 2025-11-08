import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-semibold text-[var(--fg)] tracking-tight">
              Looms
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-3">
              <Link 
                href="/" 
                className="text-[var(--fg)] hover:text-[var(--btn-primary)] font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-[var(--fg)] hover:text-[var(--btn-primary)] font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
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