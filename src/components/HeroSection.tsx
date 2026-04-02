"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import HeroOverlay from "./HeroOverlay";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Since sequence contains 120 frames (frame_000 to frame_119)
  const FRAME_COUNT = 120;

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-black">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* The canvas responsible for the background frames */}
        <ScrollyCanvas progress={scrollYProgress} frameCount={FRAME_COUNT} />
        
        {/* Overlay holding the animated text blocks */}
        <HeroOverlay progress={scrollYProgress} />
        
        {/* Subtle shadow overlay at the bottom to blend with next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}
