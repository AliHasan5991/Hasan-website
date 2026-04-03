"use client";

import { useEffect, useRef, useCallback } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  progress: MotionValue<number>;
  frameCount: number;
}

export default function ScrollyCanvas({ progress, frameCount }: ScrollyCanvasProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const imagesRef   = useRef<HTMLImageElement[]>([]);
  const frameRef    = useRef<number>(0);
  const loadedRef   = useRef<number>(0);
  const rafRef      = useRef<number | null>(null);

  // Draw a single image onto canvas with "cover" sizing
  const draw = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cR = canvas.width / canvas.height;
    const iR = img.naturalWidth / img.naturalHeight;
    let w = canvas.width, h = canvas.height, x = 0, y = 0;
    if (cR > iR) { h = w / iR; y = (canvas.height - h) / 2; }
    else         { w = h * iR; x = (canvas.width  - w) / 2; }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, w, h);
    ctx.fillStyle = "rgba(10,10,10,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Size canvas to viewport
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use visualViewport on iOS to avoid the URL-bar height bug
    const vv = window.visualViewport;
    canvas.width  = vv ? vv.width  : window.innerWidth;
    canvas.height = vv ? vv.height : window.innerHeight;
    const cur = imagesRef.current[frameRef.current];
    if (cur?.complete) draw(cur);
  }, [draw]);

  // Preload — draw frame 0 as soon as it's ready, load the rest in parallel
  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = imgs;

    const tryDraw = (i: number) => {
      if (i === 0) {
        resize();          // set canvas size first
        draw(imgs[0]);     // paint immediately
      }
      loadedRef.current++;
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const idx = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${idx}_delay-0.066s.png`;
      imgs[i] = img;
      if (img.complete) {
        tryDraw(i);
      } else {
        img.onload = () => tryDraw(i);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.visualViewport?.addEventListener("resize", resize, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameCount, draw, resize]);

  // Map scroll progress → frame
  useMotionValueEvent(progress, "change", (latest) => {
    const idx = Math.min(frameCount - 1, Math.floor(latest * frameCount));
    frameRef.current = idx;
    const img = imagesRef.current[idx];
    if (!img?.complete) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(img));
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
