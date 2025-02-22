"use client"; // Only needed if using Next.js App Router

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How does AI determine my loan approval chances?",
    answer:
      "Our AI model analyzes your credit score, income, employment status, and loan history to predict your approval chances.",
  },
  {
    question: "Is my financial data secure on SwiftLoan?",
    answer:
      "Yes, we use end-to-end encryption and comply with banking security standards to protect your financial data.",
  },
  {
    question: "What’s the difference between the Free and Premium plans?",
    answer:
      "The Free plan allows you to check your credit score and loan approval chances. The Premium plan offers detailed financial analysis, expert consultations, and debt-to-income ratio insights.",
  },
  {
    question: "Can I improve my loan approval chances?",
    answer:
      "Yes! Maintaining a good credit score, reducing debt, and having a stable income can significantly improve your approval chances.",
  },
  {
    question: "Does SwiftLoan provide loans directly?",
    answer:
      "No, SwiftLoan helps assess your eligibility and connects you with trusted financial institutions for loan processing.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="relative py-20 px-6 bg-black text-white">
      {/* Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-10">Frequently Asked Questions</h2>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="glass-card p-5 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 text-left cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <FaChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Expandable Answer */}
              {openIndex === index && (
                <motion.p
                  className="text-white/80 text-sm mt-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
