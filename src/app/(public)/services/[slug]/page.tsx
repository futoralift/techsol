import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { CTASection } from "@/components/pages/CTASection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/lib/data";
import { getServiceIcon } from "@/lib/icons";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = getServiceIcon(service.icon);

  return (
    <>
      <PageHero
        badge="Service"
        title={service.title}
        description={service.description}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>

          <div className="grid gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div className="glass-card rounded-3xl p-8 lg:p-12">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">What&apos;s Included</h2>
                <ul className="mt-6 space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  Why choose our{" "}
                  <span className="gradient-text">{service.title}</span>?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description} Our team brings years of expertise and a
                  proven track record of delivering exceptional results for
                  clients across industries.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We take a collaborative, data-driven approach — working
                  closely with you at every stage to ensure the final deliverable
                  exceeds expectations and drives real business impact.
                </p>
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
