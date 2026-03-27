"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

const stats = [
  { value: "2X", label: "Avg Pipeline ROI" },
  { value: "8+", label: "Startups Scaled" },
  { value: "Growing", label: "Early-Stage Pipeline" },
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
            <p className="text-base md:text-lg text-accent tracking-widest uppercase mb-4 font-semibold">A Letter from the Founder</p>
            <h2 className="font-heading text-4xl md:text-6xl text-fg mb-8 leading-tight">
              <SplitText>Why I started buildyour.company.</SplitText>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-fg leading-relaxed font-medium text-lg">
                Hey. I&apos;m Tanmay.
              </p>
              <p className="text-muted leading-relaxed">
                I built this company out of sheer frustration. I was tired of watching ambitious founders hand over $10,000 to growth agencies, only to receive a 50-page PDF of &quot;strategy&quot; that never saw the light of day.
              </p>
              <p className="text-muted leading-relaxed">
                Founders don&apos;t need more advice. They need execution.
              </p>
              <p className="text-muted leading-relaxed">
                When you partner with me, I don&apos;t act like a traditional agency. I embed directly into your startup. I find the exact bottlenecks starving your revenue, and I build the actual outbound systems required to scale your product to its next 10,000 users.
              </p>
              <p className="text-muted leading-relaxed">
                If you are looking for generic ads or corporate consulting decks, I am not your guy. But if you want a growth operator who acts like a co-founder and is obsessed with your pipeline, let&apos;s talk.
              </p>
              <div className="pt-6 mt-6 border-t border-border/30">
                <p className="text-fg font-heading text-2xl">— Tanmay Bhardwaj</p>
              </div>
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
