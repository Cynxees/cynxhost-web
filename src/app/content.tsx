"use client";

import {
  type Container,
  type ISourceOptions
} from "@tsparticles/engine";
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from 'react';
import Hero from "./_components/hero";

export default function HomePageContent() {
  const router = useRouter();

  useEffect(() => {
    const particleInit = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then((res) => {

    })
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
  };


  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          }
        },
        modes: {
          push: {
            quantity: 1,
          },
          repulse: {
            distance: 150,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#00FFFF",
        },
        move: {
          direction: "bottom",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 20,
        },
        opacity: {
          value: 0.4,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 3, max: 6 },
        },
      },
      detectRetina: true,
    }),
    [],
  );


  return (
    <main className="flex flex-col pt-[10vh]">

      <Particles
        id="tsparticles"
        key={'particleKey'}
        particlesLoaded={particlesLoaded}
        options={options}
        className="fixed w-full h-full -z-40 max-lg:hidden"
      />
      <Hero />

    </main>
  );
}
