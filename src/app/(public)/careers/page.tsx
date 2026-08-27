import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Rocket, Users, Zap } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { CTASection } from "@/components/pages/CTASection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the TechSol Media team. Explore open positions and learn about our culture.",
};

const culturePoints = [
  {
    icon: Rocket,
    title: "Growth Mindset",
    description:
      "Continuous learning with budgets for courses, conferences, and certifications.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work with talented people who challenge and support each other every day.",
  },
  {
    icon: Zap,
    title: "Flexible Work",
    description:
      "Remote-first with flexible hours. We care about output, not clock-watching.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description:
      "Generous PTO, mental health days, and a team that genuinely respects your time.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        badge="Careers"
        title="Build the future"
        highlight="with us"
        description="Join a team of passionate creatives and technologists shaping the digital landscape."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Culture"
            title="Why work at"
            highlight="TechSol?"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {culturePoints.map((point, i) => (
              <ScrollReveal key={point.title} delay={i * 0.1}>
                <div className="glass-card h-full rounded-2xl p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <point.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Open Positions"
            title="Current"
            highlight="openings"
            description="Don't see the right role? Send your resume to careers@techsolmedia.com — we're always looking for great talent."
          />
          <div className="mt-16 space-y-4">
            {mockJobs.map((job, i) => (
              <ScrollReveal key={job.slug} delay={i * 0.08}>
                <div className="glass-card flex flex-col gap-4 rounded-2xl p-6 transition-all hover:shadow-xl sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.department}</Badge>
                      <Badge variant="outline">{job.location}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </div>
                  <Button variant="gradient" asChild>
                    <Link href="/contact">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to make an"
        highlight="impact?"
        description="We'd love to hear from you. Apply today or reach out to learn more about life at TechSol Media."
        primaryLabel="Apply Now"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
