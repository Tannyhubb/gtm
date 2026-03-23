"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Zero-lag immediate motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // We bind event listeners globally with { passive: true } for max performance
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
  }, [cursorX, cursorY]);

  return (
    <>
      {/* The Sleek Dynamic Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference bg-white flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 80 : 20,
          height: isHovered ? 80 : 20,
        }}
      >
        {isHovered && (
          <span className="text-black text-[10px] uppercase font-bold tracking-widest leading-none mix-blend-normal opacity-80">
            Click
          </span>
        )}
      </motion.div>
    </>
  );
}
