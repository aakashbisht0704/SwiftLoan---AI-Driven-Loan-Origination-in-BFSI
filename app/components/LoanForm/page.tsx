"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const LoanForm = ({ onLoanCreated }: { onLoanCreated: () => void }) => {
  const { data: session } = useSession();
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [loanType, setLoanType] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [monthlyDebt, setMonthlyDebt] = useState("");
  const [incomeMonthly, setIncomeMonthly] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = session?.user?.email;
      if (!email) throw new Error("User email not found");

      await axios.post("/api/new-loan", {
        email,
        loanAmount,
        loanPeriod,
        loanType,
        creditScore,
        monthlyDebt,
        incomeMonthly,
      });

      onLoanCreated();
    } catch (error) {
      console.error("Error creating new loan request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-purple-500 mb-4">Request New Loan</h2>
      <input
        type="number"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
        required
      />
      <input
        type="number"
        placeholder="Loan Period (months)"
        value={loanPeriod}
        onChange={(e) => setLoanPeriod(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
        required
      />
      <input
        type="text"
        placeholder="Loan Type"
        value={loanType}
        onChange={(e) => setLoanType(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
        required
      />
      <input
        type="number"
        placeholder="Credit Score"
        value={creditScore}
        onChange={(e) => setCreditScore(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
        required
      />
      <input
        type="number"
        placeholder="Monthly Debt"
        value={monthlyDebt}
        onChange={(e) => setMonthlyDebt(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
        required
      />
      <input
        type="number"
        placeholder="Monthly Income"
        value={incomeMonthly}
        onChange={(e) => setIncomeMonthly(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
        required
      />
      <button
        type="submit"
        className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default LoanForm;