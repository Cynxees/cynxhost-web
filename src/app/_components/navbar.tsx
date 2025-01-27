"use client";

import { GetProfileResponse } from "@/types/model/response";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getProfile } from "../_lib/services/userService";

const Navbar: React.FC = ({}) => {
  const [profile, setProfile] = useState<GetProfileResponse["data"] | null>(
    null
  );

  useEffect(() => {
    // Fetch profile
    getProfile().then((response) => {
      setProfile(response.data);
    });
  }, []);

  const pathname = usePathname();
  const router = useRouter();

  const hideNavbarRoutes = ["/login", "/register"];

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

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

            {profile ? (
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
