"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null; // Avoid flickering during session check

  return (
    <nav className="mt-10 fixed top-0 w-full z-50 backdrop-blur-lg bg-white/10 shadow-md rounded-3xl max-w-6xl left-1/2 transform -translate-x-1/2">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold tracking-wide">
          <Link href="/">
            <span className="text-purple-400">Swift</span>Loan
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="#features" className="text-white/80 hover:text-white transition">
            Features
          </Link>
          <Link href="#pricing" className="text-white/80 hover:text-white transition">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-white/80 hover:text-white transition">
            Testimonials
          </Link>
          <Link href="#faqs" className="text-white/80 hover:text-white transition">
            FAQs
          </Link>
        </div>

        {/* Authentication Buttons */}
        <div className="flex gap-4">
          {session ? (
            <>
              {/* Show Dashboard link when user is logged in */}
              <Link
                href="/dashboard"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signup"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
              >
                Sign Up
              </Link>
              <Link
                href="/auth/signin"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
