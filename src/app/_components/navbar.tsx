import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link href="/" className="text-white">
            CynxHost
          </Link>
        </h1>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-white">
            Dashboard
          </Link>
          <Link href="/login" className="text-white">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
