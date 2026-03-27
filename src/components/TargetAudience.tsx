"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

export default function TargetAudience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="audience" ref={sectionRef} className="section-padding py-section bg-bg">
      <div className="container-wide">
        <div className="text-center mb-16">
          <p className="text-sm text-accent tracking-widest uppercase mb-4">Qualification</p>
          <h2 className="font-heading text-display text-fg mb-4">
            <SplitText>Are we a fit?</SplitText>
          </h2>
          <p className="text-muted max-w-[600px] mx-auto">
            We don&apos;t take everyone. We optimize for founders who execute fast and have a product that actually works in reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {/* Who It's For */}
          <motion.div
            className="border border-accent/20 bg-accent/5 p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl text-fg mb-8">The Ideal Partner</h3>
            <ul className="space-y-6 w-full text-left">
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1">✦</span>
                <span className="text-fg/90">Pre-seed / Seed founders ready to pour gasoline on the fire</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1">✦</span>
                <span className="text-fg/90">Teams with a live product that solves a real, painful problem</span>
              </li>
            </ul>
          </motion.div>

          {/* Who It's Not For */}
          <motion.div
            className="border border-border bg-bg p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h3 className="font-heading text-2xl text-fg mb-8">The Disqualified</h3>
            <ul className="space-y-6 w-full text-left opacity-60">
              <li className="flex items-start gap-4">
                <span className="text-red-500/70 mt-1">✕</span>
                <span className="text-fg/90">Corporate teams looking for 6-month consulting decks</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-red-500/70 mt-1">✕</span>
                <span className="text-fg/90">Drop-shippers & wantrepreneurs with zero execution</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-red-500/70 mt-1">✕</span>
                <span className="text-fg/90">Founders looking to &quot;just run some Facebook ads&quot;</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
