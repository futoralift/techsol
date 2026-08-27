"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FloatingCard } from "@/components/shared/FloatingCard";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-24 lg:pt-16 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <svg
          className="absolute bottom-0 left-0 w-full text-primary/10"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="absolute top-20 right-0 h-64 w-64 text-primary/20"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="glass" className="mb-6 gap-1.5 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Award-winning digital agency
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              We craft{" "}
              <span className="gradient-text">digital experiences</span> that
              drive growth
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              Strategy, design, development, and marketing — unified under one
              roof to transform ambitious brands into market leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button variant="gradient" size="lg" asChild>
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </motion.div>
          </div>

          <div className="relative hidden lg:block">
            <FloatingCard
              className="absolute -left-4 top-0 z-10 w-48"
              delay={0.2}
            >
              <p className="text-3xl font-bold gradient-text">150+</p>
              <p className="text-sm text-muted-foreground">Projects delivered</p>
            </FloatingCard>

            <FloatingCard
              className="absolute right-0 top-8 z-20 w-52"
              delay={0.4}
            >
              <p className="text-3xl font-bold gradient-text">98%</p>
              <p className="text-sm text-muted-foreground">Client satisfaction</p>
            </FloatingCard>

            <FloatingCard
              className="mx-auto mt-24 w-72"
              delay={0.1}
              float={false}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Premium Quality</p>
                    <p className="text-xs text-muted-foreground">
                      Apple-inspired design
                    </p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-[#ffb366]"
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  92% faster delivery than industry average
                </p>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute -right-4 bottom-0 z-10 w-48"
              delay={0.6}
            >
              <p className="text-3xl font-bold gradient-text">8+</p>
              <p className="text-sm text-muted-foreground">Years of excellence</p>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
