"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

const steps = [
  {
    number: "01",
    title: "Deconstruct",
    description: "We rip apart your current positioning and ruthlessly define your true ICP.",
  },
  {
    number: "02",
    title: "Weaponize",
    description: "We engineer a high-leverage offer so good they feel stupid saying no.",
  },
  {
    number: "03",
    title: "Deploy",
    description: "We launch surgical outbound across channels. Pure volume + relevance.",
  },
  {
    number: "04",
    title: "Extract",
    description: "We embed as your fractional growth team to close your first wave of users.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="process" ref={sectionRef} className="section-padding py-section bg-bg">
      <div className="container-wide">
        <div className="text-center mb-20">
          <p className="text-sm text-accent tracking-widest uppercase mb-4">How it works</p>
          <h2 className="font-heading text-display text-fg md:max-w-[700px] mx-auto">
            <SplitText>Four steps from idea to traction.</SplitText>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-px bg-border z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex flex-col md:text-center items-start md:items-center relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.15 + 0.2 }}
              >
                <div className="w-24 h-24 rounded-full bg-bg border border-border flex items-center justify-center font-heading text-3xl text-accent mb-8 shadow-[0_0_30px_rgba(232,160,69,0.05)]">
                  {step.number}
                </div>
                <h3 className="font-heading text-2xl text-fg mb-4">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-[250px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
