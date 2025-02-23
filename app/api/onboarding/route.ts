import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import PostData from "@/app/models/PostData";

export async function POST(req: Request) {
  await connectDB();

  try {
    const {
      email, // To update onboarding status
      name, age, dob, gender,
      incomeMonthly, monthlyDebt, pan,
      loanAmount, employmentStatus, defaults, loanPeriod, loanType, creditScore
    } = await req.json(); // Properly parse JSON data

    // Save onboarding data
    const postData = new PostData({
      email, // Ensure email is included in the PostData
      name, age, dob, gender,
      incomeMonthly, monthlyDebt, pan,
      loanAmount, employmentStatus, defaults, loanPeriod, loanType, creditScore,
    });

    await postData.save();

    // Update user's onboarding status
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { onboardingComplete: true },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Onboarding complete" }, { status: 201 });
  } catch (error) {
    console.error("Error in onboarding:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error saving data", error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Error saving data", error: "Unknown error" }, { status: 500 });
    }
  }
}