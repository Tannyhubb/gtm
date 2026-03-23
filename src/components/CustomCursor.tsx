"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Fast tracking for the core dot
  const cursorX = useSpring(0, { stiffness: 800, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 800, damping: 40 });
  
  // Floating anti-gravity lagging ring
  const cursorXDelayed = useSpring(0, { stiffness: 100, damping: 25, mass: 0.5 });
  const cursorYDelayed = useSpring(0, { stiffness: 100, damping: 25, mass: 0.5 });

  useEffect(() => {
    // We bind event listeners globally with { passive: true } for max performance
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorXDelayed.set(e.clientX);
      cursorYDelayed.set(e.clientY);
    };

    // Lightweight event delegation instead of deep DOM traversal on every pixel
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Simple check for interactables
      const isInteractable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null;
      
      setIsHovered(isInteractable);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, cursorXDelayed, cursorYDelayed]);

  return (
    <>
      {/* The Core Antigravity Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full mix-blend-difference bg-accent"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovered ? 0 : 1, // Fades out into the ring on hover
        }}
      />
      
      {/* The Magnetic Orbital Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full mix-blend-difference flex items-center justify-center border transition-all duration-300 ease-out"
        style={{
          x: cursorXDelayed,
          y: cursorYDelayed,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 60 : 32,
          height: isHovered ? 60 : 32,
          backgroundColor: isHovered ? "rgba(232, 160, 69, 0.2)" : "transparent",
          borderColor: isHovered ? "rgba(232, 160, 69, 0)" : "rgba(245, 244, 240, 0.4)",
          boxShadow: isHovered ? "0 0 20px rgba(232, 160, 69, 0.5)" : "none",
        }}
      />
    </>
  );
}
