"use client";

import {
  getProfile,
  GetProfileResponse,
  logoutUser,
} from "@/app/_lib/services/userService";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavbarProps {
  profile: GetProfileResponse["data"];
}

const Navbar: React.FC<NavbarProps> = ({ profile: user }) => {
  const [profile, setProfile] = useState<GetProfileResponse["data"] | null>(
    user
  );
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const hideNavbarRoutes = ["/login", "/register"];

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  const handleLogout = async () => {
    try {
      // Hit the logout endpoint
      logoutUser();

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
    <nav className="bg-transparent top-0 left-0 w-full shadow-lg relative z-50">
      <div className="bg-foreground py-6 rounded-3xl">
        <div className="flex justify-between items-center w-full px-10">
          {/* Logo or brand name */}
          <Link href="/" className=" text-3xl font-extrabold">
            CynxHost
          </Link>

          {/* Navigation links */}
          <div className="space-x-4">
            <Link href="/onboarding/form/game" className="">
              Onboarding
            </Link>

            <Link href="/dashboard" className="">
              Dashboard
            </Link>

            {loading ? (
              "loading"
            ) : profile ? (
              <>
                <Link href="/login" className="">
                  {profile?.Username}
                </Link>
              </>
            ) : (
              <Link href="/login" className="">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
