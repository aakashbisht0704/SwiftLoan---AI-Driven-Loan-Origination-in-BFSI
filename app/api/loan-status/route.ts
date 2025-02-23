import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  await connectDB();

  if (!mongoose.connection.db) {
    console.error("Database connection is not established");
    return NextResponse.json({ error: 'Database connection is not established' }, { status: 500 });
  }

  const email = req.nextUrl.searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  try {
    const data = await mongoose.connection.db.collection('zeroTest').findOne({ email });
    console.log("Fetched data:", data); // Add this line for debugging
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error); // Add this line for debugging
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
}