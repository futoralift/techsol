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
    // Disable on touch-only devices to save battery and GPU cycles
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let sparkles: Sparkle[] = [];
    let isRunning = false;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const faintOrangePalette = [
      "255, 170, 100",
      "255, 140, 66",
      "255, 190, 130",
      "255, 210, 160",
    ];

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

      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${color}, ${alpha * 0.5})`;
      ctx.fillStyle = `rgba(${color}, ${alpha})`;

      const rOuter = size;
      const rInner = size * 0.15;

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

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

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
          drawStar(ctx, s.x, s.y, s.size, s.rotation, s.color, s.alpha);
        }
      }

      if (sparkles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const count = 3;
      for (let i = 0; i < count; i++) {
        const color = faintOrangePalette[Math.floor(Math.random() * faintOrangePalette.length)];
        const size = Math.random() * 8 + 4;
        const maxAlpha = Math.random() * 0.45 + 0.25;

        sparkles.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          size,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.2,
          alpha: maxAlpha,
          maxAlpha,
          decay: Math.random() * 0.018 + 0.01,
          color,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }

      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full hidden md:block"
    />
  );
}