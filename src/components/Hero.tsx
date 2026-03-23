"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";
import { MouseEvent, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse interactive glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundGlow = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(232, 160, 69, 0.08), transparent 80%)`;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center section-padding pt-32 pb-20 overflow-hidden group"
    >
      {/* Interactive Background Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-50 group-hover:opacity-100"
        style={{ background: backgroundGlow }}
      />
      
      {/* Parallax Background Grid */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"
        style={{ y: yBg }}
      />

      <motion.div 
        className="container-wide relative z-10"
        style={{ y: yText, opacity: opacityText }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-sm text-muted tracking-widest uppercase mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
        >
          Growth Engineering Agency
        </motion.p>

        {/* Main Headline */}
        <h1 className="font-heading text-display-xl text-fg max-w-[1100px] mb-8 leading-[1.05]">
          <SplitText delay={0.6}>We build revenue engines for ambitious founders.</SplitText>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted max-w-[600px] mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1.2 }}
        >
          Stop guessing. We engineer outbound, optimize conversions, and aggressively scale your user base from 0 to 1.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1.5 }}
        >
          <MagneticButton
            as="a"
            href="https://calendly.com/tanmaybhardwaj4444/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-bg text-sm font-medium px-8 py-4 tracking-wide uppercase hover:bg-fg transition-colors duration-300 hover-target shadow-[0_0_30px_rgba(232,160,69,0.2)] hover:shadow-[0_0_40px_rgba(245,244,240,0.3)]"
          >
            Book a Call
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#pricing"
            className="inline-flex items-center text-sm text-muted hover:text-fg px-8 py-4 border border-border tracking-wide uppercase transition-all duration-300 hover-target hover:border-fg/30 hover:bg-fg/5 backdrop-blur-md"
          >
            Get a GTM Audit
          </MagneticButton>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          className="mt-20 divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1.8 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Stats Row */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        >
          {[
            { value: "0-1", label: "Scaling Phase" },
            { value: "14", label: "Day Sprint" },
            { value: "10x", label: "Traction Goal" },
            { value: "100%", label: "Operator Led" },
          ].map((stat) => (
            <motion.div 
              key={stat.label}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="font-heading text-heading text-accent drop-shadow-[0_0_15px_rgba(232,160,69,0.3)]">{stat.value}</p>
              <p className="text-sm text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
