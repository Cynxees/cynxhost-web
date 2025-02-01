"use client";

import { useNode } from "@/app/_lib/hooks/useNode";

type Props = {};
export default function OverviewPage({}: Props) {
  const node = useNode().state.node;
}
