"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="));
    const storedUsername = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("username="));

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername.split("=")[1]);
    }
  }, []);

  return (
    <nav className="bg-blue-600 py-4 px-20">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link href="/" className="text-white">
            CynxHost
          </Link>
        </h1>
        <div className="space-x-4 flex items-center">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src="/path-to-profile-picture.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white">{username}</span>
              </div>
            </>
          ) : (
            <Link href="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
