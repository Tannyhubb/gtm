"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

const entryPoints = [
  {
    title: "The 30-Min Growth Audit",
    price: "$0",
    description: "A brutal, no-BS teardown of why your current funnel is bleeding revenue.",
    features: [
      "Surgical funnel analysis",
      "Identify critical bottlenecks",
      "Actionable growth roadmap",
    ],
    cta: "Audit My Funnel",
    highlight: false,
  },
  {
    title: "0-1 Traction Protocol",
    price: "Custom",
    description: "A 14-day fully-embedded sprint to build, launch, and extract revenue.",
    features: [
      "ICP & Offer Engineering",
      "Scalable Outbound Deployment",
      "Live Sales Execution",
      "Guaranteed Pipeline ROI",
    ],
    cta: "Apply for Protocol",
    highlight: true,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="pricing" ref={sectionRef} className="section-padding py-section bg-bg">
      <div className="container-wide">
        <div className="text-center mb-16">
          <p className="text-sm text-accent tracking-widest uppercase mb-4">Capital Injection</p>
          <h2 className="font-heading text-display text-fg mb-4">
            <SplitText>No retainers. Just ROI.</SplitText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {entryPoints.map((plan, i) => (
            <motion.div
              key={plan.title}
              className={`p-8 md:p-10 flex flex-col border ${
                plan.highlight 
                  ? "border-accent bg-[#110D08]" 
                  : "border-border bg-[#0A0A0A]"
              }`}
              initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.2 }}
            >
              <h3 className="font-heading text-2xl text-fg mb-2">{plan.title}</h3>
              <div className="mb-4">
                <span className="font-heading text-3xl text-accent">{plan.price}</span>
              </div>
              <p className="text-muted text-sm mb-8 leading-relaxed h-[40px]">
                {plan.description}
              </p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-accent text-sm mt-0.5">✓</span>
                    <span className="text-fg/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton
                as="a"
                href="#contact"
                className={`w-full justify-center text-sm font-medium tracking-wide flex items-center gap-2 uppercase py-4 transition-colors duration-300 ${
                  plan.highlight
                    ? "bg-accent text-bg hover:bg-fg"
                    : "border border-border text-fg hover:text-accent hover:border-accent"
                }`}
              >
                {plan.cta}
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
