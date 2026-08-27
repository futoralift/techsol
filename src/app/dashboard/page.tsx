"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Briefcase,
  FolderKanban,
  FileText,
  MessageSquareQuote,
  Mail,
  Newspaper,
} from "lucide-react";
import { analyticsApi } from "@/lib/api";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: async () => {
      const { data: res } = await analyticsApi.getOverview();
      return res.data;
    },
  });

  return (
    <>
      <DashboardHeader
        title="Dashboard"
        description="Overview of your TechSol Media platform"
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        ) : data ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Users"
              value={data.users.total}
              description={`${data.users.admins} admins · ${data.users.verified} verified`}
              icon={Users}
            />
            <StatCard
              title="Services"
              value={data.services.total}
              description={`${data.services.active} active`}
              icon={Briefcase}
            />
            <StatCard
              title="Projects"
              value={data.projects.total}
              description={`${data.projects.published} published · ${data.projects.featured} featured`}
              icon={FolderKanban}
            />
            <StatCard
              title="Blog Posts"
              value={data.blogs.total}
              description={`${data.blogs.published} published`}
              icon={FileText}
            />
            <StatCard
              title="Testimonials"
              value={data.testimonials.total}
              description={`${data.testimonials.published} published`}
              icon={MessageSquareQuote}
            />
            <StatCard
              title="Contacts"
              value={data.contacts.total}
              description={`${data.contacts.new} new · ${data.contacts.replied} replied`}
              icon={Mail}
            />
            <StatCard
              title="Newsletter"
              value={data.newsletter.total}
              description={`${data.newsletter.active} active subscribers`}
              icon={Newspaper}
            />
          </div>
        ) : null}
      </main>
    </>
  );
}
