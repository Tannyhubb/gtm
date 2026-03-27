"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

const testimonials = [
  {
    quote: "Our product was solid, but the growth system they engineered completely transformed how we capture and retain users. Pure execution, no fluff.",
    author: "Nirupam Sharma",
    company: "Colado",
  },
  {
    quote: "We needed a go-to-market strategy that actually connected with parents. The positioning and launch strategy they built was flawless.",
    author: "Vaasu",
    company: "HearForMe",
  },
  {
    quote: "The onboarding experience and churn-reduction system they designed fundamentally shifted our revenue metrics. High-leverage work.",
    author: "Anamika",
    company: "Synora",
  },
  {
    quote: "They didn't just market a game; they built an entire engaged community of early adopters before we even launched. Incredible ROI.",
    author: "Harshit Khemani",
    company: "Smash & Clash",
  },
  {
    quote: "Scaling a college community into a nationwide tech hub is notoriously hard. The viral loops and ambassador frameworks they engineered for us took us past 10,000 active members faster than we thought possible.",
    author: "Head of Community",
    company: "Turing Community",
  },
  {
    quote: "Launching a local F&B brand in Delhi NCR is brutal. Their hyper-targeted influencer activations and social blast strategy meant we were fully booked from day one. They think like operators, not just marketers.",
    author: "Owner",
    company: "Fun Friend Chicken",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="proof" ref={ref} className="section-padding py-section bg-bg">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <p className="text-sm text-accent tracking-widest uppercase mb-4">The Proof</p>
          <h2 className="font-heading text-display text-fg max-w-[800px]">
            <SplitText>Don&apos;t just take my word for it</SplitText>
          </h2>
        </div>

        {/* Masonry or Grid Layout for Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.company}
              className="p-8 md:p-12 border border-border bg-bg hover:border-accent/30 transition-colors duration-500 relative flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: i * 0.15,
              }}
            >
              {/* Quote Mark */}
              <div className="absolute top-8 left-8 text-6xl text-accent/10 font-heading leading-none pointer-events-none select-none">
                &quot;
              </div>
              
              <p className="text-lg md:text-xl leading-relaxed text-muted relative z-10 mb-8 pt-6">
                &quot;{t.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-border">
                <div className="w-10 h-10 bg-bg border border-border flex items-center justify-center shrink-0">
                  <span className="font-heading text-lg text-accent">{t.company.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-fg font-medium">{t.author}</p>
                  <p className="text-sm text-muted">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
