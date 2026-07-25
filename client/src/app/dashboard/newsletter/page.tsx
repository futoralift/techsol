"use client";

import { useQuery } from "@tanstack/react-query";
import { newsletterApi } from "@/lib/api";
import { formatDate } from "@/lib/helpers";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";

export default function NewsletterPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["newsletter"],
    queryFn: async () => {
      const { data: res } = await newsletterApi.getAll({ limit: 100 });
      return res.data.data;
    },
  });

  return (
    <>
      <DashboardHeader
        title="Newsletter"
        description="View newsletter subscribers"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <DataTable
          isLoading={isLoading}
          data={data ?? []}
          keyExtractor={(item) => item._id}
          emptyMessage="No subscribers yet."
          columns={[
            {
              key: "email",
              header: "Email",
              cell: (item) => (
                <span className="font-medium">{item.email}</span>
              ),
            },
            {
              key: "status",
              header: "Status",
              cell: (item) => (
                <Badge variant={item.isActive ? "default" : "secondary"}>
                  {item.isActive ? "Active" : "Unsubscribed"}
                </Badge>
              ),
            },
            {
              key: "subscribedAt",
              header: "Subscribed",
              cell: (item) => formatDate(item.subscribedAt),
            },
            {
              key: "createdAt",
              header: "Added",
              cell: (item) => formatDate(item.createdAt),
            },
          ]}
        />
      </main>
    </>
  );
}
