import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { PortfolioGrid } from "@/components/pages/PortfolioGrid";
import { CTASection } from "@/components/pages/CTASection";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore TechSol Media's portfolio of web design, branding, mobile apps, and digital marketing projects.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Work we're"
        highlight="proud of"
        description="A curated collection of projects that showcase our craft, creativity, and commitment to results."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PortfolioGrid projects={projects} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
