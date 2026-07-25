"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LogoCloudProps {
  logos?: { name: string; initial: string }[];
  className?: string;
}

const defaultLogos = [
  { name: "Acme Corp", initial: "A" },
  { name: "Nova Labs", initial: "N" },
  { name: "Pixel Co", initial: "P" },
  { name: "Orbit", initial: "O" },
  { name: "Vertex", initial: "V" },
  { name: "Helix", initial: "H" },
];

export function LogoCloud({ logos = defaultLogos, className }: LogoCloudProps) {
  return (
    <div className={cn("w-full overflow-hidden py-8", className)}>
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Trusted by innovative brands
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center gap-3 rounded-2xl border border-border/50 bg-card/50 px-6 py-3 backdrop-blur-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-sm font-bold text-muted-foreground">
                {logo.initial}
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
