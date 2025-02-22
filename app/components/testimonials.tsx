"use client"; // Only needed if using Next.js App Router

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    review:
      "SwiftLoan made my loan approval process seamless and fast! The AI predictions were spot on.",
    location: "New York, USA",
    rating: 5,
  },
  {
    name: "Sarah Khan",
    review:
      "A fantastic tool! Helped me understand my credit score better and get expert advice.",
    location: "London, UK",
    rating: 4.5,
  },
  {
    name: "Carlos Mendes",
    review:
      "The debt-to-income analysis was a game-changer for my financial planning. Highly recommend!",
    location: "São Paulo, Brazil",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 px-6 bg-black text-white">
      {/* Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-10">What Our Users Say</h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-lg">"{testimonial.review}"</p>
              <div className="mt-4">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-white/70">{testimonial.location}</p>
                <p className="mt-2 text-yellow-400">{"★".repeat(Math.round(testimonial.rating))}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
