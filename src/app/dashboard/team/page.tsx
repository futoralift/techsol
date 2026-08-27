"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Shield, UserMinus } from "lucide-react";
import { toast } from "sonner";
import { usersApi } from "@/lib/api";
import { formatDate, getErrorMessage } from "@/lib/helpers";
import type { User } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function TeamPage() {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users", "admins"],
    queryFn: async () => {
      const { data: res } = await usersApi.getAll({ limit: 100, role: "admin" });
      return res.data.data;
    },
  });

  const demoteMutation = useMutation({
    mutationFn: (id: string) => usersApi.update(id, { role: "client" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Team member removed from admin role");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <>
      <DashboardHeader
        title="Team"
        description="Admin team members with dashboard access"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="rounded-xl border border-border/60 bg-white p-4 text-sm text-muted-foreground">
          Team members are users with the <Badge className="mx-1">admin</Badge>{" "}
          role. Promote users to admin from the Users page.
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((member: User) => (
              <Card
                key={member._id}
                className="border-border/60 bg-white shadow-sm"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{member.name}</p>
                      <p className="truncate text-sm text-muted-foreground">
                        {member.email}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge>
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </Badge>
                        {member.isVerified && (
                          <Badge variant="outline">Verified</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Joined {formatDate(member.createdAt)}
                  </p>
                  {member._id !== currentUser?._id && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-destructive hover:text-destructive"
                      onClick={() => demoteMutation.mutate(member._id)}
                      disabled={demoteMutation.isPending}
                    >
                      <UserMinus className="h-4 w-4" />
                      Remove Admin Access
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border/60 bg-white p-8">
            <p className="text-sm text-muted-foreground">
              No team members found. Promote a user to admin from the Users page.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
