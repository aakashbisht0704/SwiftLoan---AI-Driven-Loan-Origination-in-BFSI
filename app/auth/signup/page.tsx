"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    // Register the user
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.status === 201) {
      // Sign in user automatically
      const result = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Automatic login failed. Please sign in manually.");
        return;
      }

      // Redirect logic after sign-in
      const sessionRes = await fetch("/api/auth/session"); // Get session data
      const session = await sessionRes.json();

      if (session?.user?.onboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <input
        type="text"
        placeholder="Name"
        className="mb-2 px-3 py-2 bg-gray-800 rounded-lg"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-2 px-3 py-2 bg-gray-800 rounded-lg"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-2 px-3 py-2 bg-gray-800 rounded-lg"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSignup}
        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition"
      >
        Sign Up
      </button>
    </div>
  );
}
