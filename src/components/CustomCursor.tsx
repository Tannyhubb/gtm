"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  
  const cursorXDelayed = useSpring(0, { stiffness: 150, damping: 20 });
  const cursorYDelayed = useSpring(0, { stiffness: 150, damping: 20 });
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorXDelayed.set(e.clientX);
      cursorYDelayed.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverTarget = target.closest("a, button, [role='button'], .hover-target, [data-cursor-text]");
      if (hoverTarget) {
        setIsHovered(true);
        const text = hoverTarget.getAttribute("data-cursor-text");
        setCursorText(text || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, cursorXDelayed, cursorYDelayed]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-fg mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-fg/30 flex items-center justify-center transition-colors duration-300 overflow-hidden"
        style={{
          x: cursorXDelayed,
          y: cursorYDelayed,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorText ? 100 : 40,
          height: cursorText ? 100 : 40,
          scale: isHovered && !cursorText ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(245, 244, 240, 0.1)" : "transparent",
          backdropFilter: isHovered ? "blur(4px)" : "none",
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] uppercase font-bold tracking-widest text-fg text-center px-2 leading-tight"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
