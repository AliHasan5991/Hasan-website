"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  progress: MotionValue<number>;
  frameCount: number;
}

export default function ScrollyCanvas({ progress, frameCount }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Pad to 3 digits e.g., 000, 001, ..., 119
      const idxStr = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${idxStr}_delay-0.066s.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
           setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, [frameCount]);

  // Handle Resize & Drawing
  const drawImage = (img: HTMLImageElement | undefined) => {
    if (!img) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // "Cover" sizing logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let renderWidth = canvas.width;
    let renderHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Optional: add a subtle dark overlay to the canvas to make text readable
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    
    // Draw semi-transparent overlay
    ctx.fillStyle = "rgba(10, 10, 10, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawImage(images[currentFrameIndex]);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener("resize", handleResize);
  }, [images, currentFrameIndex]);

  // Subscribe to Framer Motion progress
  useMotionValueEvent(progress, "change", (latest) => {
    if (images.length === 0) return;
    
    // Map progress (0 to 1) to frame index
    const index = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    
    setCurrentFrameIndex(index);
    requestAnimationFrame(() => drawImage(images[index]));
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  );
}
