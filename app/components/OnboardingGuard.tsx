"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "loading") return; // ⏳ Wait for auth status to load

    if (!session?.user) {
      // ❌ User is NOT signed in → Redirect to root path if pathname is "/"
      if (pathname === "/") {
        router.push("/");
      }
      return;
    }

    // ✅ User is signed in → Check onboarding status
    const checkOnboardingStatus = async () => {
      try {
        const res = await fetch("/api/check-user");
        if (!res.ok) throw new Error("Failed to fetch onboarding status");

        const data = await res.json();
        setOnboardingComplete(data.onboarded);

        // If onboarding is NOT complete and not already on the onboarding page, redirect
        if (!data.onboarded && pathname !== "/onboarding") {
          router.push("/onboarding");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, [session, status, pathname, router]);

  useEffect(() => {
    if (status === "loading" || onboardingComplete === null) return;

    if (!session?.user && pathname === "/") {
      // ❌ User is NOT signed in → Redirect to root path
      router.push("/");
    }
  }, [status, onboardingComplete, session, pathname, router]);

  if (status === "loading" && onboardingComplete === null) {
    return <p>Loading...</p>; // ⏳ Prevent unwanted redirects while checking
  }

  return <>{children}</>;
};

export default OnboardingGuard;