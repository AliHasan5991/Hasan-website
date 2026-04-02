"use client";
import { useEffect } from "react";
import { motion, useAnimation, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  progress,
  startPoint = 0.05
}: {
  words: string;
  className?: string;
  progress?: MotionValue<number>;
  startPoint?: number;
}) => {
  const controls = useAnimation();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!progress) {
      controls.start("visible");
      return;
    }
    
    const unsubscribe = progress.on("change", (latest) => {
      if (latest > startPoint && latest < startPoint + 0.2) {
        controls.start("visible");
      } else if (latest < startPoint || latest > startPoint + 0.3) {
        controls.start("hidden");
      }
    });
    return () => unsubscribe();
  }, [progress, controls, startPoint]);

  return (
    <div className={cn("font-bold", className)} aria-label={words}>
      {/* Screen-reader-only full-text fallback */}
      <span className="sr-only">{words}</span>

      {/* Animated visual spans, hidden from screen readers */}
      <div className="flex flex-wrap justify-center gap-x-[0.25em]" aria-hidden="true">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              custom={idx}
              variants={{
                hidden: { opacity: 0, filter: "blur(8px)", y: 5 },
                visible: (i) => ({
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  transition: { delay: i * 0.05, duration: 0.3 }
                })
              }}
              initial="hidden"
              animate={controls}
              className="inline-block"
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};
