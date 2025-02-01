"use client";

import { useNode } from "@/app/_lib/hooks/useNode";
import { useEffect } from "react";

type Props = {};
export default function OverviewPage({}: Props) {
  const node = useNode().state.node;

  return (
    <div>
      <h1>Overview</h1>
      <p>{node.Name}</p>
    </div>
  );
}
