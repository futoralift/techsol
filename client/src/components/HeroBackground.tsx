"use client";

import {
  Paintbrush,
  PenTool,
  Layout,
  Code,
} from "lucide-react";

import SvgArcs from "./SvgArcs";
import MotionCard from "./MotionCard";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* SVG Background */}
      <SvgArcs />

      {/* Left Top */}
      <MotionCard
        x={-520}
        y={-250}
        rotate={-8}
        delay={0}
      >
        <Paintbrush
          className="w-7 h-7 text-neutral-400"
          strokeWidth={1.5}
        />
      </MotionCard>

      {/* Right Top */}
      <MotionCard
        x={520}
        y={-240}
        rotate={10}
        delay={1}
      >
        <PenTool
          className="w-7 h-7 text-neutral-400"
          strokeWidth={1.5}
        />
      </MotionCard>

      {/* Left Bottom */}
      <MotionCard
        x={-340}
        y={250}
        rotate={8}
        delay={2}
      >
        <Layout
          className="w-7 h-7 text-neutral-400"
          strokeWidth={1.5}
        />
      </MotionCard>

      {/* Right Bottom */}
      <MotionCard
        x={340}
        y={250}
        rotate={-10}
        delay={3}
      >
        <Code
          className="w-7 h-7 text-neutral-400"
          strokeWidth={1.5}
        />
      </MotionCard>

    </div>
  );
}