"use client";

import { Image } from "@heroui/react";

export default function Background({ url }: { url: string }) {
  return (
    <Image
      width={100}
      height={100}
      className="w-[100vw] h-[100vh] fixed left-0 top-0 animate-pulse-brightness object-cover"
      src={url}
      alt=""
    />
  );
}
