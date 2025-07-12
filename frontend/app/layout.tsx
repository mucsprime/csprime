import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainWrapper from "@/components/MainWrapper";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSPrime - Your Educational Compass for Computer Science",
  description:
    "Explore, connect, and master computer science modules with CSPrime. Interactive learning platform for Maynooth University CS students.",
  keywords:
    "computer science, modules, Maynooth University, CS education, learning platform",
  authors: [{ name: "CSPrime Team" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "CSPrime - Your Educational Compass for Computer Science",
    description:
      "Explore, connect, and master computer science modules with CSPrime.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <MainWrapper>{children}</MainWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
