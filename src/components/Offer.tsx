"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";
import MagneticCard from "./MagneticCard";

const includedItems = [
  "Deep-dive ICP profiling & market positioning",
  "Cold email/LinkedIn infrastructure setup (bypassing spam filters)",
  "High-converting outreach scripts that command replies",
  "Landing page aesthetic and conversion rate overhaul",
  "Systematic execution support to close your first major deals",
];

export default function Offer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="offer" ref={sectionRef} className="section-padding py-section bg-bg">
      <div className="container-wide">
        <div className="max-w-[800px] mx-auto text-center mb-16">
          <p className="text-sm text-accent tracking-widest uppercase mb-4">The Arsenal</p>
          <h2 className="font-heading text-display text-fg mb-6">
            <SplitText>The 0-1 Traction Sprint</SplitText>
          </h2>
          <p className="text-muted text-lg md:text-xl">
            A hyper-focused 14-day intensive protocol to weaponize your brand and unlock your first batch of power users. Pure execution.
          </p>
        </div>

        <MagneticCard className="max-w-[900px] mx-auto relative z-10 w-full">
          <motion.div 
            className="w-full border border-border bg-bg/80 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        >
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-accent/30 blur-xl"></div>
          
          <h3 className="text-xl font-medium text-fg mb-8">System deliverables:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
            {includedItems.map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <span className="text-fg/90">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center border-t border-border pt-10">
            <MagneticButton
              as="a"
              href="https://calendly.com/tanmaybhardwaj4444/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent text-bg text-sm font-medium px-10 py-4 tracking-wide uppercase hover:bg-fg transition-colors duration-300"
            >
              Initiate Sprint
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </div>
          </motion.div>
        </MagneticCard>
      </div>
    </section>
  );
}
