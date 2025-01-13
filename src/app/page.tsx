"use client";
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
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col w-[50%] mx-auto h-screen justify-center items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CynxHost</h1>
        <button
          className="animate-bounce text-3xl font-mono bg-gray-300 hover:bg-yellow-100"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
        Homepage soon...
        <Link
          href="/login"
          className="bg-yellow-300 px-5 rounded hover:bg-yellow-200"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
