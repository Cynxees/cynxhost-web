"use client";

import { useAuth } from "@/app/_lib/hooks/useAuth";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";

export function DashboardTopbar() {
  const router = useRouter();
  const { profileData } = useAuth();

  return (
    <div className="w-full h-[10vh] bg-foreground flex flex-row justify-end drop-shadow-medium pe-20">
      <div className="my-auto flex flex-row gap-5">
        <div
          onClick={() => {
            router.push("/create-node/form/game");
          }}
          className="my-auto hover:bg-secondary cursor-pointer p-2"
        >
          + create
        </div>
        <div
          onClick={() => {
            router.push("/dashboard");
          }}
          className="my-auto hover:bg-secondary cursor-pointer p-2"
        >
          {profileData?.data?.Coin} Coins
        </div>
        <Avatar
          className="cursor-pointer"
          src="/images/default_avatar.png"
        ></Avatar>
      </div>
    </div>
  );
}
