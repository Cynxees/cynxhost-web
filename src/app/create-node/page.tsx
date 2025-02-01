"use client";

import { useRouter } from "next/navigation";

export default function createNode() {
  const router = useRouter();

  router.push("/create-node/form");

  return <div>Redirecting to form</div>;
}
