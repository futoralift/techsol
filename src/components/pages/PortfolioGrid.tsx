"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={active === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(cat)}
            className={cn(active === cat && "shadow-md")}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ScrollReveal key={project._id} delay={i * 0.05}>
            <Link
              href={`/portfolio/${project.slug}`}
              className="group glass-card block overflow-hidden rounded-2xl transition-all hover:shadow-xl hover:glow-primary"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/10 to-muted flex items-center justify-center">
                <span className="text-5xl font-bold text-primary/30">
                  {project.title.charAt(0)}
                </span>
                <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/10">
                  <ArrowUpRight className="h-8 w-8 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {project.category}
                </Badge>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
