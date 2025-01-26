"use client";
import { HeroUIProvider } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [buttonText, setButtonText] = useState("Click Me");

  const buttonBank = [
    "andrew is my cutie",
    "andrew is my pookie",
    "andrew is my cookie",
    "andrew is my wookie",
    "andrew is my bookie",
    "andrew is my rookie",
    "andrew is my nookie",
  ];

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const randomIndex = Math.floor(Math.random() * buttonBank.length);
    setButtonText(buttonBank[randomIndex]);
  };

  return (
    <HeroUIProvider>
      <main className="">
        <div>
          <div>
            <div>
              <Link href="/login">Sign In</Link>
              <Link href="/onboarding/form/game">Onboarding</Link>
            </div>
          </div>
        </div>
      </main>
    </HeroUIProvider>
  );
}
