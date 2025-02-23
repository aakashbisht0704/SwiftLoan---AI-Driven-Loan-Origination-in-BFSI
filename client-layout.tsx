"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@app/globals.css";
import { Navbar } from "./app/components/navbar";
import SessionProvider from "./app/components/SessionProvider";
import OnboardingGuard from "./app/components/OnboardingGuard"; // Import new client component
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <OnboardingGuard> {/* Onboarding check logic moved here */}
            {!isDashboard && <Navbar />}
            {children}
          </OnboardingGuard>
        </SessionProvider>
      </body>
    </html>
  );
}