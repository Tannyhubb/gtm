"use client";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // We no longer initialize Lenis here to allow the clean, premium CSS scroll snapping 
  // defined in globals.css to handle the scrolling experience.
  return <>{children}</>;
}
