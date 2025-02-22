"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import KYCUpload from "./KYCUpload";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {session ? (
        <div>
          <p className="mb-4">Welcome, {session.user?.name || "User"}!</p>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-3">KYC Verification</h2>
            <KYCUpload />
          </div>
        </div>
      ) : (
        <p>You must be signed in to access this page.</p>
      )}
    </div>
  );
}
