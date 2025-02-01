"use client";

import { GetProfileResponse } from "@/types/model/response";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getProfile } from "../_lib/services/userService";
import { useAuth } from "../_lib/hooks/useAuth";
import { Avatar } from "@heroui/react";

const Navbar: React.FC = ({}) => {
  const { profileData, isLoading } = useAuth();
  const [profile, setProfile] = useState<GetProfileResponse["data"] | null>(
    null
  );

  useEffect(() => {
    // Fetch profile
    setProfile(profileData?.data);
  }, [profileData]);

  const pathname = usePathname();
  const router = useRouter();

  const hideNavbarRoutes = ["/login", "/register"];

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="bg-foreground h-[10vh] w-screen z-50 flex flex-col drop-shadow-2xl">
      <div className="h-4/5 flex px-20 justify-between">
        <img
          onClick={() => {
            router.push("/");
          }}
          src="/cynx.png"
          className="h-2/4 w-auto mt-7 cursor-pointer hover:opacity-60"
        />

        <div className="my-auto flex flex-row gap-5">
          <div className="my-auto hover:bg-secondary cursor-pointer p-2">
            + create
          </div>
          <div className="my-auto hover:bg-secondary cursor-pointer p-2">
            dashboard
          </div>
          <Avatar className="cursor-pointer" src="/profile.png"></Avatar>
        </div>
      </div>
      <div className="h-1/5 bg-black text-[min(1.2vh,2vh)] text-center text-white font-extrabold flex items-center justify-center">
        🎉 GRAND OPENING! 100% DISCOUNT ON ALL PURCHASES 🎉
      </div>
    </nav>
  );
};

export default Navbar;
