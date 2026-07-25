import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "TechSol Media terms and conditions for using our website and services.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using the TechSol Media website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
  },
  {
    title: "Services",
    content:
      "TechSol Media provides digital agency services including but not limited to web design, development, branding, and digital marketing. Specific deliverables, timelines, and pricing are outlined in individual project agreements.",
  },
  {
    title: "Intellectual Property",
    content:
      "Upon full payment, clients receive ownership of final deliverables as specified in their project agreement. TechSol Media retains the right to showcase completed work in our portfolio unless otherwise agreed in writing.",
  },
  {
    title: "Payment Terms",
    content:
      "Payment terms are specified in individual project proposals. Typically, a deposit is required to commence work, with remaining balance due upon project completion. Late payments may incur additional fees.",
  },
  {
    title: "Limitation of Liability",
    content:
      "TechSol Media shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question.",
  },
  {
    title: "Confidentiality",
    content:
      "Both parties agree to keep confidential any proprietary information shared during the course of a project. This obligation survives termination of the business relationship.",
  },
  {
    title: "Termination",
    content:
      "Either party may terminate a project agreement with written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date.",
  },
  {
    title: "Governing Law",
    content:
      "These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Mumbai, Maharashtra.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        title="Terms &"
        highlight="Conditions"
        description="Last updated: January 1, 2026"
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="mb-12 text-muted-foreground leading-relaxed">
              Please read these Terms and Conditions carefully before using
              TechSol Media&apos;s website or engaging our services.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <ScrollReveal key={section.title} delay={i * 0.05}>
                <div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 glass-card rounded-2xl p-6">
            <p className="text-sm text-muted-foreground">
              Questions about these terms? Contact us at{" "}
              <a
                href="mailto:legal@techsolmedia.com"
                className="text-primary hover:underline"
              >
                legal@techsolmedia.com
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
