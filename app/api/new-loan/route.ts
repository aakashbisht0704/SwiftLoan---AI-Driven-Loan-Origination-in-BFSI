import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  await connectDB();

  if (!mongoose.connection.db) {
    console.error("Database connection is not established");
    return NextResponse.json({ error: 'Database connection is not established' }, { status: 500 });
  }

  try {
    const { email, loanAmount, loanPeriod, loanType, creditScore, monthlyDebt, incomeMonthly } = await req.json();

    const newLoan = {
      email,
      loanAmount,
      loanPeriod,
      loanType,
      creditScore,
      monthlyDebt,
      incomeMonthly,
      createdAt: new Date(),
    };

    const result = await mongoose.connection.db.collection('zeroTest').insertOne(newLoan);
    console.log("New loan created:", result); // Add this line for debugging
    return NextResponse.json({ message: 'Loan request created successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error creating new loan request:", error); // Add this line for debugging
    return NextResponse.json({ error: 'Failed to create new loan request' }, { status: 500 });
  }
}