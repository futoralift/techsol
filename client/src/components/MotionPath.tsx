"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionPathProps {
  radiusX: number;
  radiusY: number;
  duration?: number;
  delay?: number;
  startAngle?: number;
  children: ReactNode;
}

export default function MotionPath({
  radiusX,
  radiusY,
  duration = 25,
  delay = 0,
  startAngle = 0,
  children,
}: MotionPathProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: radiusX * 2,
        height: radiusY * 2,
        marginLeft: -radiusX,
        marginTop: -radiusY,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: `
            rotate(${startAngle}deg)
            translateX(${radiusX}px)
          `,
        }}
      >
        <motion.div
          animate={{
            rotate: -360,
            y: [0, -10, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            rotate: {
              duration,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}