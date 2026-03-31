import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "UPICON Command Platform",
    template: "%s | UPICON",
  },
  description:
    "UPICON Agentic Intelligence Platform — Unified command center for Banking, Consultancy, and Training operations.",
  keywords: ["UPICON", "BC Network", "DPR", "Training", "Command Center"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
