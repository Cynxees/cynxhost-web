import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./_components/navbar";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./_assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./_assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const interFont = localFont({
  src: "./_assets/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  display: "swap",
});

const natsFont = localFont({
  src: "./_assets/fonts/NATS-Regular.ttf",
  variable: "--font-nats",
});

const monserratAlternateLightFont = localFont({
  src: "./_assets/fonts/montserrat_alternates/MontserratAlternates-Light.ttf",
  variable: "--font-montserrat-alternate-light",
});

export const metadata: Metadata = {
  title: "CynxHost",
  description: "Hosting Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${natsFont.variable} ${monserratAlternateLightFont.variable} font-inter antialiased bg-background text-content1 m-0 p-0 w-screen h-screen overflow-x-hidden`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
