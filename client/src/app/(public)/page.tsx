import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/pages/HeroSection";
import { StatsSection } from "@/components/pages/StatsSection";
import { TestimonialsCarousel } from "@/components/pages/TestimonialsCarousel";
import { ServiceCard } from "@/components/pages/ServiceCard";
import { ProjectCard } from "@/components/pages/CTASection";
import { HomeCTASection } from "@/components/pages/CTASection";
import { LogoCloud } from "@/components/shared/LogoCloud";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  getFeaturedProjects,
  getServices,
  getTestimonials,
} from "@/lib/data";
import { stats } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "TechSol Media — premium digital agency crafting bold brands, stunning websites, and growth-driven marketing experiences.",
};

export default async function HomePage() {
  const [services, projects, testimonials] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
    getTestimonials(),
  ]);

  const previewServices = services.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <HeroSection />

      <LogoCloud />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Services"
            title="Everything you need to"
            highlight="grow online"
            description="From brand strategy to full-stack development, we deliver end-to-end digital solutions."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewServices.map((service, i) => (
              <ServiceCard key={service._id} service={service} index={i} />
            ))}
          </div>
          <ScrollReveal className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Portfolio"
            title="Featured"
            highlight="work"
            description="A selection of projects that showcase our craft and the results we deliver."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
          <ScrollReveal className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio">
                View Full Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Testimonials"
            title="What our clients"
            highlight="say"
            description="Don't just take our word for it — hear from the brands we've helped transform."
          />
          <div className="mt-16">
            <TestimonialsCarousel testimonials={testimonials.slice(0, 5)} />
          </div>
        </div>
      </section>

      <StatsSection stats={stats} />

      <HomeCTASection />
    </>
  );
}
