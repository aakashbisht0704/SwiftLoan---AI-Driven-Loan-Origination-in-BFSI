import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import SessionProvider from "./components/SessionProvider";
import OnboardingGuard from "./components/OnboardingGuard"; // Import new client component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwiftLoan",
  description: "AI-driven loan origination platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <OnboardingGuard> {/* Onboarding check logic moved here */}
            <Navbar />
            {children}
          </OnboardingGuard>
        </SessionProvider>
      </body>
    </html>
  );
}