"use client";

import { useRouter } from "next/navigation";

export default function createNode() {
  const router = useRouter();

  router.push("/create-node/form/game");

  return <div>Redirecting to game</div>;
}
