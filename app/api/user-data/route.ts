import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import PostData from "@/app/models/PostData";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const email = req.nextUrl.searchParams.get("email")?.toLowerCase(); // Normalize email
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const postData = await PostData.findOne({ email });
    
    if (!postData) {
      return NextResponse.json({ message: "User data not found" }, { status: 404 });
    }

    const userDetails = {
      name: postData.name,
      incomeMonthly: postData.incomeMonthly,
      monthlyDebt: postData.monthlyDebt,
      loanPeriod: postData.loanPeriod,
      loanType: postData.loanType,
      loanStatus: postData.loanstatus,
      creditScore: postData.creditScore,
      loanAmount: postData.loanAmount,
    };

    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ message: "Error fetching user data", error }, { status: 500 });
  }
}
