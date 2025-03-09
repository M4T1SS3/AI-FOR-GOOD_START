import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI for Good - Organ Donation System",
  description: "Using AI to improve organ donation matching and logistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white border-b p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-lg">AI for Good</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
