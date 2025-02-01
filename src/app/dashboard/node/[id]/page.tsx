"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNode } from "@/app/_lib/hooks/useNode";

export default function NodePage() {
  const router = useRouter();
  const node = useNode().state.node;

  useEffect(() => {
    router.push(`/dashboard/node/${node.Id}/overview`);
  }, [router]);

  return null;
}
