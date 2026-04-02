"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface HeroOverlayProps {
  progress: MotionValue<number>;
}

export default function HeroOverlay({ progress }: HeroOverlayProps) {
  const titleOpacity = useTransform(progress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.1, 0.2, 0.3], [50, 0, 0, -50]);

  const subtitleOpacity = useTransform(progress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const subtitleY = useTransform(progress, [0.2, 0.3, 0.4, 0.5], [40, 0, 0, -40]);

  const finalOpacity = useTransform(progress, [0.45, 0.55, 0.8, 1], [0, 1, 1, 0]);
  const finalY = useTransform(progress, [0.45, 0.55, 0.8, 1], [40, 0, 0, -40]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 sm:p-12 z-10">
      
      {/* Block 1: Initial Reveal */}
      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="absolute flex flex-col items-center text-center"
      >
        <span className="uppercase tracking-[0.3em] text-xs sm:text-sm font-medium text-white/50 mb-4 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          Senior Customer Success Manager
        </span>
        <TextGenerateEffect 
          words="Hasan Ali Shaikh" 
          progress={progress} 
          startPoint={0.05}
          className="text-4xl sm:text-7xl md:text-8xl tracking-tight text-white mb-6"
        />
        <p className="text-white/60 text-lg sm:text-xl font-light max-w-2xl">
          Deploying technology where it matters most. Expert in healthcare adoption and scaling platforms from Rs 1 Cr to Rs 8 Cr.
        </p>
      </motion.div>

      {/* Block 2: Continued story */}
      <motion.div 
        style={{ opacity: subtitleOpacity, y: subtitleY }}
        className="absolute flex flex-col items-center text-center max-w-3xl px-4"
      >
        <TextGenerateEffect 
          words="1,800+ Devices. 20 Hospitals." 
          progress={progress}
          startPoint={0.25}
          className="text-3xl sm:text-5xl tracking-tight text-white mb-6"
        />
        <p className="text-white/60 text-lg sm:text-xl font-light">
          Executed India's largest contactless patient monitoring deployment, aligning complex government and enterprise stakeholders.
        </p>
      </motion.div>

      {/* Block 3: Conclusion of the sequence */}
      <motion.div 
        style={{ opacity: finalOpacity, y: finalY }}
        className="absolute flex flex-col items-center text-center max-w-2xl px-4"
      >
        <TextGenerateEffect 
          words="Strategic Growth." 
          progress={progress}
          startPoint={0.45}
          className="text-3xl sm:text-5xl tracking-tight text-white mb-6"
        />
        <p className="text-white/60 text-lg sm:text-xl font-light">
          Maintaining above-benchmark retention and generating multi-crore ARR through consultative value delivery.
        </p>
        <div className="mt-8 flex justify-center">
           <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </motion.div>

    </div>
  );
}
