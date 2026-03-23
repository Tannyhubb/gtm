"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

const services = [
  {
    number: "01",
    title: "GTM Strategy",
    description:
      "End-to-end go-to-market blueprints that align product, marketing, and sales around a single, compelling narrative.",
  },
  {
    number: "02",
    title: "Product Positioning",
    description:
      "Find the white space in your market. We craft positioning that makes your product the obvious choice for your ideal buyer.",
  },
  {
    number: "03",
    title: "Demand Generation",
    description:
      "Multi-channel demand engines that fill your pipeline with qualified opportunities — not just leads on a spreadsheet.",
  },
  {
    number: "04",
    title: "Revenue Operations",
    description:
      "Align your tech stack, processes, and data to remove friction from the buyer journey and scale revenue predictably.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="services" ref={sectionRef} className="section-padding py-section">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-sm text-accent tracking-widest uppercase mb-4">What We Do</p>
          <h2 className="font-heading text-display text-fg max-w-[800px]">
            <SplitText>Strategy is the multiplier. Execution is the proof.</SplitText>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group border border-border p-8 md:p-12 hover:border-accent/40 transition-colors duration-500 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: i * 0.12,
              }}
            >
              <span className="text-sm text-accent font-body tracking-widest">
                {service.number}
              </span>
              <h3 className="font-heading text-heading text-fg mt-4 mb-4 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
              <motion.div
                className="mt-6 h-px bg-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: 0.3 + i * 0.1,
                }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
