import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">CynxHost</h1>
        <div className="space-x-4">
          <Link href="/" className='text-white'>
            Home
          </Link>
            {/* <Link href="/about" className="text-white">
            About
            </Link> */}
            <Link href="/dashboard" className="text-white">
            Dashboard
            </Link>
            <Link href="/auth" className="text-white">
            Sign In
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;