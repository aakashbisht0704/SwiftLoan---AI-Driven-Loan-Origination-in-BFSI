"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg w-96">
        <h2 className="text-white text-2xl font-bold mb-4">Welcome, {session?.user?.name || "User"}!</h2>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
