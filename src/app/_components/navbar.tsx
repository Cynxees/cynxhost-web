"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getProfile, GetProfileResponse } from "@/services/userService";
import axios from "axios";

const Navbar: React.FC = () => {
  const [profile, setProfile] = useState<GetProfileResponse["data"] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const hideNavbarRoutes = ["/login", "/register"];

  useEffect(() => {
    getProfile()
      .then((response) => {
        setProfile(response.data);
      })
      .catch(() => {
        setProfile(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  const handleLogout = async () => {
    try {
      // Hit the logout endpoint
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "coins=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setProfile(null);
      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        console.error("Logout failed:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        // Generic error handling
        console.error("Logout failed:", error.message);
      } else {
        // Unknown error type
        console.error("An unknown error occurred during logout.");
      }
    }
  };

  return (
    <nav className={"bg-blue-700 py-4 px-20"}>
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">
          <Link href="/" className="text-white">
            CynxHost
          </Link>
        </h1>

        {/* Navigation Section */}
        <div className="space-x-4 flex items-center">
          {loading ? (
            <span className="text-white">Loading...</span>
          ) : profile ? (
            <>
              {/* Logged-In User Info */}
              <div className="flex items-center space-x-4">
                <img
                  src="/path-to-profile-picture.jpg" // Replace with dynamic profile picture if available
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-white font-semibold">{profile.Username}</p>
                  <p className="text-yellow-300 text-sm">
                    {profile.Coin} Coins
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
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
