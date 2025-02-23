"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Onboarding = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "", // Add email field
    name: "",
    age: "",
    dob: "",
    gender: "",
    incomeMonthly: "",
    monthlyDebt: "",
    pan: "",
    loanAmount: "",
    employmentStatus: "",
    defaults: "",
    loanPeriod: "",
    loanType: "",
    creditScore: "", // Add credit score field
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      alert("Please fill all required fields before proceeding.");
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const errorData = await res.json();
      alert(`Failed to submit onboarding data: ${errorData.message}`);
    }
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1)
      return (
        formData.email &&
        formData.name &&
        formData.age &&
        formData.dob &&
        formData.gender
      );
    if (currentStep === 2)
      return formData.incomeMonthly && formData.monthlyDebt && formData.pan;
    if (currentStep === 3)
      return (
        formData.loanAmount &&
        formData.employmentStatus &&
        formData.defaults &&
        formData.loanPeriod &&
        formData.loanType
      );
    if (currentStep === 4) return formData.creditScore; // Validate credit score in step 4
    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-black">
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-purple-500 mb-4">
          Step {step} of 5
        </h2>

        {step === 1 && (
          <>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="dob"
              type="date"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <select
              name="gender"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <button
              onClick={handleNext}
              className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              name="incomeMonthly"
              type="number"
              placeholder="Income Monthly"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="monthlyDebt"
              type="number"
              placeholder="Monthly Debt"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="pan"
              placeholder="PAN"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="w-1/3 p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="w-1/3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <input
              name="loanAmount"
              type="number"
              placeholder="Loan Amount"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="employmentStatus"
              placeholder="Employment Status"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="defaults"
              type="number"
              min="0"
              max="5"
              placeholder="Defaults (0-5)"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="loanPeriod"
              type="number"
              placeholder="Loan Period"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <input
              name="loanType"
              placeholder="Loan Type"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="w-1/3 p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="w-1/3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <input
              name="creditScore"
              type="number"
              placeholder="Credit Score"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="w-1/3 p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="w-1/3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h3 className="mb-2 text-center text-xl font-bold text-purple-500">
              Review Your Details
            </h3>
            <div className="bg-gray-800 p-4 rounded-lg mb-4 text-white">
              {[
                { label: "Email", value: formData.email },
                { label: "Name", value: formData.name },
                { label: "Age", value: formData.age },
                { label: "Date of Birth", value: formData.dob },
                { label: "Gender", value: formData.gender },
                {
                  label: "Monthly Income",
                  value: `₹${formData.incomeMonthly}`,
                },
                { label: "Monthly Debt", value: `₹${formData.monthlyDebt}` },
                { label: "PAN", value: formData.pan },
                { label: "Loan Amount", value: `₹${formData.loanAmount}` },
                {
                  label: "Employment Status",
                  value: formData.employmentStatus,
                },
                { label: "Defaults", value: formData.defaults },
                {
                  label: "Loan Period",
                  value: `${formData.loanPeriod} months`,
                },
                { label: "Loan Type", value: formData.loanType },
                { label: "Credit Score", value: formData.creditScore },
              ].map((item, index) => (
                <p key={index} className="mb-2">
                  <strong>{item.label}:</strong> {item.value}
                </p>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="w-1/3 p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
