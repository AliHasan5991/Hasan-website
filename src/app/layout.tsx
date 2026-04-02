import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
import AudioPlayer from "@/components/AudioPlayer";
import { FloatingDock } from "@/components/ui/floating-dock";

export const metadata: Metadata = {
  title: "Creative Portfolio | ScrollyCanvas",
  description: "Modern, dark, creative personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <div className="noise-overlay" />
        <AudioPlayer />
        <FloatingDock />
        {children}
      </body>
    </html>
  );
}
