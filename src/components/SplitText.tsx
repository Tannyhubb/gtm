"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  threshold?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

export default function SplitText({
  children,
  className = "",
  delay = 0,
  threshold = 0.3,
  as: Tag = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const words = children.split(" ");

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: delay,
            },
          },
        }}
        style={{ display: "inline" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
