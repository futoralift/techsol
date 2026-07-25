"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionCardProps {
  x: number;
  y: number;
  rotate?: number;
  delay?: number;
  children: ReactNode;
}

export default function MotionCard({
  x,
  y,
  rotate = 0,
  delay = 0,
  children,
}: MotionCardProps) {
  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: "50%",
        top: "50%",
        x,
        y,
        rotate,
      }}
      animate={{
        y: [y, y - 12, y],
        rotate: [rotate, rotate + 2, rotate],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div
        className="
          bg-white/95
          backdrop-blur-xl
          border
          border-white
          rounded-[26px]
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          p-5
          flex
          items-center
          justify-center
        "
      >
        {children}
      </div>
    </motion.div>
  );
}