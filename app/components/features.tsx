"use client";

import {
  FaCreditCard,
  FaMoneyBillWave,
  FaChartPie,
  FaBriefcase,
  FaHistory,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section id="features" className="relative py-20 px-6 bg-black scroll-mt-24">
      {/* Blurred Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-600 to-indigo-900 opacity-30 blur-3xl"></div>

      {/* Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Section Title */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg max-w-36 mx-auto rounded-3xl py-2 outline-dotted outline-white mb-6 outline-1"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-lg font-semibold text-white">FEATURES</h1>
        </motion.div>

        <motion.h2
          className="text-4xl font-bold text-white mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          AI-Powered Loan Features
        </motion.h2>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaCreditCard size={40} color="#A855F7" />,
              title: "Credit Score Fetching",
              text: "Get real-time credit score updates powered by AI insights.",
            },
            {
              icon: <FaMoneyBillWave size={40} color="#3B82F6" />,
              title: "Income Tracking",
              text: "Seamlessly track income sources for better financial planning.",
            },
            {
              icon: <FaChartPie size={40} color="#10B981" />,
              title: "Debt-to-Income Ratio",
              text: "AI-driven analysis to evaluate your financial health.",
            },
            {
              icon: <FaBriefcase size={40} color="#FBBF24" />,
              title: "Employment Status",
              text: "Verify employment details for loan approvals.",
            },
            {
              icon: <FaHistory size={40} color="#EF4444" />,
              title: "Loan History Tracking",
              text: "View past loan approvals and payments in one place.",
            },
            {
              icon: <FaCheckCircle size={40} color="#14B8A6" />,
              title: "AI Loan Approval",
              text: "Smart ML models predict loan approval chances instantly.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mt-4">
                {feature.title}
              </h3>
              <p className="text-white/80 text-sm">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
