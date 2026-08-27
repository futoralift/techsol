import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { CTASection } from "@/components/pages/CTASection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectBySlug } from "@/lib/data";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <PageHero badge={project.category} title={project.title} />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-muted flex items-center justify-center">
                  <span className="text-8xl font-bold text-primary/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal className="mt-12">
                <h2 className="text-2xl font-bold">About the Project</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div className="glass-card rounded-2xl p-6 lg:sticky lg:top-24">
                <h3 className="font-semibold">Project Details</h3>
                <dl className="mt-6 space-y-4">
                  {project.client && (
                    <div>
                      <dt className="text-sm text-muted-foreground">Client</dt>
                      <dd className="font-medium">{project.client}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-muted-foreground">Category</dt>
                    <dd className="font-medium">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      Technologies
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
                {project.liveUrl && (
                  <Button variant="gradient" className="mt-6 w-full" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Live Site
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Have a project"
        highlight="in mind?"
        description="Let's create something amazing together. Reach out to discuss your next project."
      />
    </>
  );
}
