import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  title: "ColdDraft — AI Cold Email Writer",
  description:
    "Generate high-converting cold emails in seconds. Three personalized variants — casual, professional, and direct — powered by AI. Free to start.",
  keywords: [
    "cold email",
    "email writer",
    "AI email generator",
    "sales email",
    "outreach email",
    "cold outreach",
    "email templates",
  ],
  openGraph: {
    title: "ColdDraft — AI Cold Email Writer",
    description:
      "Generate high-converting cold emails in seconds. Three personalized variants powered by AI.",
    type: "website",
    siteName: "ColdDraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColdDraft — AI Cold Email Writer",
    description:
      "Generate high-converting cold emails in seconds. Three personalized variants powered by AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
