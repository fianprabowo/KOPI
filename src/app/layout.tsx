import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getAppProject } from "@/lib/app-project";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  if (getAppProject() === "splashpoint") {
    return {
      title: "SplashPoint — Self-Service Tumbler Cleaning",
      description:
        "Scan, pay, and wash your tumbler in minutes. Hygienic UV/steam sanitation at stations, cafés, and malls across Indonesia.",
    };
  }
  return {
    title: "Simkopdes — Kopdes Copilot",
    description: "Sistem Informasi Koperasi Desa dengan AI Copilot",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isSplash = getAppProject() === "splashpoint";

  return (
    <html lang={isSplash ? "en" : "id"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          isSplash ? "min-h-dvh overflow-auto" : "h-dvh overflow-hidden"
        }`}
      >
        {children}
      </body>
    </html>
  );
}
