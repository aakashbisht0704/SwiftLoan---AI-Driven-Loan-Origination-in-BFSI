"use client";

import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 px-6 bg-black scroll-mt-24">
      {/* Blurred Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-indigo-900 to-blue-500 opacity-30 blur-3xl"></div>

      {/* Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Section Title */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg max-w-36 mx-auto rounded-3xl py-2 outline-dotted outline-white mb-6 outline-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-lg font-semibold text-white">PRICING</h1>
        </motion.div>

        <motion.h2
          className="text-4xl font-bold text-white mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Plan
        </motion.h2>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <motion.div
            className="p-8 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white">Free Tier</h3>
            <p className="text-white/70 mt-2">Best for basic users</p>
            <p className="text-3xl font-bold text-purple-400 mt-4">$0</p>

            <ul className="mt-6 space-y-3 text-white/80">
              <li>✅ Can see Credit Score</li>
              <li>✅ Can see if Loan Approved or not</li>
            </ul>

            <button className="mt-6 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
              Get Started
            </button>
          </motion.div>

          {/* Premium Tier */}
          <motion.div
            className="p-8 rounded-xl shadow-lg backdrop-blur-lg bg-white/20 border border-white/30 transition-transform hover:scale-105 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white">Premium Tier</h3>
            <p className="text-white/70 mt-2">For professionals & businesses</p>
            <p className="text-3xl font-bold text-yellow-400 mt-4">$19.99/mo</p>

            <ul className="mt-6 space-y-3 text-white/80">
              <li>✅ All features of Free Tier</li>
              <li>✅ Detailed Loan & Credit Score Analysis</li>
              <li>✅ Expert Consultations</li>
              <li>✅ Debt-To-Income Ratio Insights</li>
            </ul>

            <button className="mt-6 w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition">
              Upgrade Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
