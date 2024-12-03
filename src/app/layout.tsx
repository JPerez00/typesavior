import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TypeSavior - Your AI JavaScript to TypeScript Converter.",
  description: "Your based JavaScript-to-TypeScript converter. Fast, reliable, and type-safe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
    lang="en"
    suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-8xl mx-auto w-full antialiased bg-zinc-950 text-white md:px-8`}
      >
        <Header />
          {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
