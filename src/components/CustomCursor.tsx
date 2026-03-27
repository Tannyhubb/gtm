"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring config for smooth movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.2 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Simple check for interactables
      const isInteractable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
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
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference bg-white flex items-center justify-center"
        animate={{
          width: isHovered ? 80 : 20,
          height: isHovered ? 80 : 20,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {isHovered && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className="text-black text-[10px] uppercase font-bold tracking-widest leading-none mix-blend-normal"
          >
            Click
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
