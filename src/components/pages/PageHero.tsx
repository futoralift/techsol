import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}

export function PageHero({
  badge,
  title,
  highlight,
  description,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/50 py-20 lg:py-28",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {badge && (
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            {badge}
          </span>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}{" "}
          {highlight && <span className="gradient-text">{highlight}</span>}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
