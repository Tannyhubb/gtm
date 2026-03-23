"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

const stats = [
  { value: "3x", label: "Avg Pipeline ROI" },
  { value: "12+", label: "Startups Scaled" },
  { value: "$5M+", label: "Pipeline Generated" },
  { value: "100%", label: "Operator Led" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="section-padding py-section">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Text */}
          <div>
            <p className="text-sm text-accent tracking-widest uppercase mb-4">The Engineer</p>
            <h2 className="font-heading text-display text-fg mb-8">
              <SplitText>We don't build pitch decks. We build revenue engines.</SplitText>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-muted leading-relaxed">
                Most growth agencies hand you a 50-page PDF and wish you luck. We embed directly into your operations, rip out the inefficiencies, and engineer outbound pipelines that actually convert.
              </p>
              <p className="text-muted leading-relaxed">
                Having scaled multiple 0-1 ventures, our approach is violently metric-driven. Lower CAC. Higher LTV. Maximum velocity to your first 100 power users.
              </p>
            </motion.div>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-8 lg:mt-20">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="border-l border-border pl-6"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: 0.3 + i * 0.1,
                }}
              >
                <p className="font-heading text-display text-accent">{stat.value}</p>
                <p className="text-sm text-muted mt-2 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
