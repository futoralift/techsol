import type { Metadata } from "next";
import { Star } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { CTASection } from "@/components/pages/CTASection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what our clients say about working with TechSol Media on their digital projects.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero
        badge="Testimonials"
        title="Client"
        highlight="stories"
        description="Real feedback from real clients who trusted us to transform their digital presence."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => {
              const initials = testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <ScrollReveal key={testimonial._id} delay={i * 0.06}>
                  <div className="glass-card flex h-full flex-col rounded-2xl p-6 transition-all hover:shadow-xl">
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        )
                      )}
                    </div>
                    <p className="flex-1 text-muted-foreground leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-6">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
