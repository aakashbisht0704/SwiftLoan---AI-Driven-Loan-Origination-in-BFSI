import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import User, { IUser } from "@/app/models/User"; // Import IUser type

export async function GET() {
  try {
    await connectDB(); // Ensure DB is connected

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ onboarded: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).lean() as IUser | null; // Explicitly define IUser type

    if (!user) {
      return NextResponse.json({ onboarded: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ onboarded: Boolean(user.onboardingComplete) }); // Ensure it returns a boolean
  } catch (error) {
    console.error("Error fetching onboarding status:", error);
    return NextResponse.json({ onboarded: false, error: "Internal Server Error" }, { status: 500 });
  }
}
