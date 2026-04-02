"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteors, setMeteors] = useState<any[]>([]);

  useEffect(() => {
    // Generate meteor properties after mount to prevent hydration issues
    const generateMeteors = new Array(number).fill(true).map(() => ({
      top: -5,
      left: Math.floor(Math.random() * (400) - 400) + "px",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }));
    setMeteors(generateMeteors);
  }, [number]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor-effect rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
          style={{
            top: el.top,
            left: Math.floor(Math.random() * 100) + "vw",
            animationDelay: el.animationDelay,
            animationDuration: el.animationDuration,
          }}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
};
