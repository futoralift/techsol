"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  float?: boolean;
}

export function FloatingCard({
  children,
  className,
  delay = 0,
  float = true,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      animate={float ? { y: [0, -8, 0] } : undefined}
      {...(float && {
        transition: {
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.5,
          },
        },
      })}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card p-6 transition-shadow hover:shadow-xl hover:glow-primary",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
