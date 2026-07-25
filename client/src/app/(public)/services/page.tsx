import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { ServiceCard } from "@/components/pages/ServiceCard";
import { CTASection } from "@/components/pages/CTASection";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore TechSol Media's full range of digital services — branding, web development, marketing, and more.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        badge="Services"
        title="Solutions that"
        highlight="scale"
        description="End-to-end digital services designed to elevate your brand and accelerate growth."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service._id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need a custom"
        highlight="solution?"
        description="Every project is unique. Let's discuss your specific needs and craft a tailored approach."
      />
    </>
  );
}
