import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AudioPlayer from "@/components/AudioPlayer";
import { FloatingDock } from "@/components/ui/floating-dock";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Hasan Ali Shaikh | Senior Customer Success Manager",
  description: "Portfolio of Hasan Ali Shaikh — Healthcare Technology leader, Customer Success expert, and enterprise scale strategist based in Mumbai.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
  },
  themeColor: "#0a0a0a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hasan Ali Shaikh",
  },
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
