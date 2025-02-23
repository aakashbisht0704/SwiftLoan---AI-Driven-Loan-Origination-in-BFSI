"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChatBubble from "../components/ChatBubble";

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserData {
  name: string;
  incomeMonthly: number;
  monthlyDebt: number;
  loanPeriod: number;
  loanType: string;
  creditScore?: number;
  loanAmount: number;
  loanstatus?: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    const fetchUserData = async () => {
      try {
        if (session?.user?.email) {
          const response = await axios.get("/api/loan-status", {
            params: { email: session.user.email },
          });
          console.log("Fetched loan status data:", response.data); // Add this line for debugging
          setUserData(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  const debtToIncomeRatio = (userData.monthlyDebt / userData.incomeMonthly) * 100;
  const creditScore = userData.creditScore || 700; // Replace with actual credit score logic

  const pieData = {
    labels: ["Debt", "Income"],
    datasets: [
      {
        data: [userData.monthlyDebt, userData.incomeMonthly - userData.monthlyDebt],
        backgroundColor: ["#FF6384", "#CB97FF"],
        hoverBackgroundColor: ["#FF6384", "#CB97FF"],
      },
    ],
  };

  const creditScoreData = {
    labels: ["Credit Score"],
    datasets: [
      {
        data: [creditScore, 850 - creditScore], // Assuming 850 is the max credit score
        backgroundColor: ["#C084FC", "#1F2937"],
        hoverBackgroundColor: ["#CB97FF", "#1F2937"],
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-800 to-black text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto mt-36">
        <Card className="bg-gray-900 text-white rounded-3xl w-auto h-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Hello, {userData.name}!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 p-4 rounded-2xl">
              <p><strong>Monthly Income:</strong> ₹{userData.incomeMonthly}</p>
              <p><strong>Monthly Debt:</strong> ₹{userData.monthlyDebt}</p>
              <p><strong>Loan Period:</strong> {userData.loanPeriod} months</p>
              <p><strong>Loan Type:</strong> {userData.loanType}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 text-white rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Debt to Income Ratio: {debtToIncomeRatio}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 p-4">
              <Pie data={pieData} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 text-white rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 p-4 rounded-3xl">
              <Pie data={creditScoreData} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 text-white rounded-3xl w-auto h-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Loan Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 p-4 rounded-2xl">
              <p><strong>Loan Amount:</strong> ₹{userData.loanAmount}</p>
              <p><strong>Loan Period:</strong> {userData.loanPeriod} months</p>
              <p><strong>Loan Type:</strong> {userData.loanType}</p>
            </div>
          </CardContent>
        </Card>
        {userData.loanstatus && (
          <Card className="bg-gray-900 text-white rounded-3xl w-auto h-auto">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Loan Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800 p-4 rounded-2xl">
                <p><strong>Status:</strong> {userData.loanstatus}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <ChatBubble />
    </div>
  );
};

export default Dashboard;