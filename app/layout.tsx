import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Links-Stream Magic Tree 🎄",
  description: "Create your own Christmas magic with Links-Stream",

  openGraph: {
    title: "Links-Stream Magic Tree 🎄",
    description: "Create your own Christmas magic with Links-Stream",
    url: "https://links-stream-tree.vercel.app/", 
    siteName: "Links-Stream",
    locale: "en",
    type: "website",
    images: [
      {
        url: "/start-the-magic.png", 
        width: 1200,
        height: 630,
        alt: "Links-Stream Christmas Tree Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Links-Stream Magic Tree 🎄",
    description: "Create your own Christmas magic with Links-Stream",
    images: ["/start-the-magic.png"], 
  },
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
        {children}
      </body>
    </html>
  );
}
