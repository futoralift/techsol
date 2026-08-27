import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";

interface CTASectionProps {
  title?: string;
  highlight?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CTASection({
  title = "Ready to transform",
  highlight = "your brand?",
  description = "Let's discuss how we can help you achieve your digital goals. Get in touch for a free consultation.",
  primaryHref = "/contact",
  primaryLabel = "Get Started",
  secondaryHref = "/portfolio",
  secondaryLabel = "View Portfolio",
}: CTASectionProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary to-secondary/90 px-8 py-16 text-center text-secondary-foreground sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                {title}{" "}
                <span className="gradient-text">{highlight}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-secondary-foreground/70">
                {description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button variant="gradient" size="lg" asChild>
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                  asChild
                >
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <Link
        href={`/portfolio/${project.slug}`}
        className="group glass-card block overflow-hidden rounded-2xl transition-all hover:shadow-xl hover:glow-primary"
      >
        <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
          <span className="text-6xl font-bold text-primary/20">
            {project.title.charAt(0)}
          </span>
        </div>
        <div className="p-6">
          <Badge variant="glass" className="mb-3">
            {project.category}
          </Badge>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function HomeCTASection() {
  return <CTASection />;
}
