"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

export function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let sparkles: Sparkle[] = [];

    // Resize canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Faint orange color variations (RGB strings)
    const faintOrangePalette = [
      "255, 170, 100", // Soft Peach / Faint Orange
      "255, 140, 66",  // Warm Soft Amber
      "255, 190, 130", // Light Creamy Orange
      "255, 210, 160", // Faint Golden Tint
    ];

    // Spawn star sparkles as the cursor moves
    const handleMouseMove = (e: MouseEvent) => {
      const count = 3; // Particles generated per move

      for (let i = 0; i < count; i++) {
        const color = faintOrangePalette[Math.floor(Math.random() * faintOrangePalette.length)];
        const size = Math.random() * 9 + 5; // Star size (5px to 14px)
        const maxAlpha = Math.random() * 0.45 + 0.25; // Keep opacity faint (25% - 70%)

        sparkles.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          size,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.2, // Very light drift
          alpha: maxAlpha,
          maxAlpha,
          decay: Math.random() * 0.015 + 0.008, // Fades out gently
          color,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Sharp 4-Point Star drawing function
    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Faint ambient glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${color}, ${alpha * 0.6})`;

      ctx.fillStyle = `rgba(${color}, ${alpha})`;

      // Precise 4-point star shape
      const rOuter = size;
      const rInner = size * 0.15; // Thin waist for a sharp star flare

      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const radius = i % 2 === 0 ? rOuter : rInner;
        const angle = (i * Math.PI) / 4;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Bright center core for the sparkle dot
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
        } else {
          drawStar(
            ctx,
            s.x,
            s.y,
            s.size,
            s.rotation,
            s.color,
            s.alpha
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
    />
  );
}