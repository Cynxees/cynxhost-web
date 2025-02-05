"use client";

import { useNode } from "@/app/_lib/hooks/useNode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NodePage() {
  const router = useRouter();
  const node = useNode().state.node;

  useEffect(() => {
    router.push(`/dashboard/nodes/${node.Id}/overview`);
  }, [router]);

  return null;
}
