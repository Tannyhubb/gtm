"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

const problemCards = [
  { title: "Great Product, Zero Noise", description: "You spent months building brilliant features, but the market doesn't care yet." },
  { title: "Spray and Pray", description: "Throwing spaghetti at the wall instead of executing a surgical outbound strategy." },
  { title: "Unpredictable Pipeline", description: "Relying purely on hope and random network referrals to close your next deal." },
];

const solutionDetails = [
  "Surgical Positioning & Messaging",
  "Scalable Outbound Infrastructure",
  "High-Converting Sales Funnels",
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="problem-solution" ref={sectionRef} className="section-padding py-section bg-bg">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Problem Column */}
          <div className="flex flex-col">
            <p className="text-sm text-muted tracking-widest uppercase mb-4">The Problem</p>
            <h2 className="font-heading text-heading text-fg mb-12">
              <SplitText>You&apos;re Building in the Dark</SplitText>
            </h2>
            
            <div className="flex flex-col gap-6">
              {problemCards.map((p, i) => (
                <motion.div
                  key={i}
                  className="p-6 border border-border bg-[#0F0F0F]"
                  initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                  animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                >
                  <h3 className="text-fg font-medium mb-2">{p.title}</h3>
                  <p className="text-muted text-sm">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Solution Column */}
          <div className="flex flex-col">
            <p className="text-sm text-accent tracking-widest uppercase mb-4">The Solution</p>
            <h2 className="font-heading text-heading text-accent mb-12">
              <SplitText>Predictable Revenue</SplitText>
            </h2>

            <motion.div
              className="p-8 md:p-12 border border-accent/30 bg-[#14100A]/80 backdrop-blur-xl h-full flex flex-col justify-center shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(15px)" }}
              animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
            >
              <ul className="space-y-8">
                {solutionDetails.map((s, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" />
                      </svg>
                    </div>
                    <span className="text-fg sm:text-lg font-medium tracking-wide">{s}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-12">
                <p className="text-muted text-sm mb-6">Stop hoping for virality. Let&apos;s engineer a machine that prints users.</p>
                <a href="https://calendly.com/tanmaybhardwaj4444/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-widest uppercase hover:text-fg transition-colors">
                  Deploy the Engine
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
