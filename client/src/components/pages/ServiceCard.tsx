import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getServiceIcon } from "@/lib/icons";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);

  return (
    <ScrollReveal delay={index * 0.08}>
      <Link
        href={`/services/${service.slug}`}
        className="group glass-card flex h-full flex-col rounded-2xl p-6 transition-all hover:shadow-xl hover:glow-primary"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
          {service.description}
        </p>
        <ul className="mt-4 space-y-2">
          {service.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </ScrollReveal>
  );
}
