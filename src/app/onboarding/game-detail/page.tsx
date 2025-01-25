"use client";

import { useSearchParams } from "next/navigation";
import { useOnboarding } from "../context";
import { useEffect } from "react";

export const pageMetadata = {
  title: "Game Details",
};

export default function OnboardingGameDetailPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("id");

  const { state, setState } = useOnboarding();

  useEffect(() => {
    setState({
      ...state,
      title: "Game Details",
      step: 2,
    });
  }, []);

  return (
    <div>
      <h1>Step 2</h1>
      <p>Name: {name}</p>
    </div>
  );
}
