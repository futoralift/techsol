"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { usersApi } from "@/lib/api";
import { formatDate, getErrorMessage } from "@/lib/helpers";
import type { User, UserRole } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog";
import { ResourceFormDialog } from "@/components/dashboard/ResourceFormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", role: "client" as UserRole });

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: res } = await usersApi.getAll({ limit: 100 });
      return res.data.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      usersApi.update(editing!._id, { name: form.name, role: form.role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted");
      setDeleteOpen(false);
      setDeleting(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const openEdit = (user: User) => {
    setEditing(user);
    setForm({ name: user.name, role: user.role });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
  };

  return (
    <>
      <DashboardHeader
        title="Users"
        description="Manage user accounts and roles"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <DataTable
          isLoading={isLoading}
          data={data ?? []}
          keyExtractor={(item) => item._id}
          emptyMessage="No users found."
          columns={[
            {
              key: "name",
              header: "User",
              cell: (item) => (
                <div>
                  <p className="font-medium">
                    {item.name}
                    {item._id === currentUser?._id && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (you)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.email}</p>
                </div>
              ),
            },
            {
              key: "role",
              header: "Role",
              cell: (item) => (
                <Badge variant={item.role === "admin" ? "default" : "secondary"}>
                  {item.role}
                </Badge>
              ),
            },
            {
              key: "verified",
              header: "Verified",
              cell: (item) => (
                <Badge variant={item.isVerified ? "default" : "outline"}>
                  {item.isVerified ? "Yes" : "No"}
                </Badge>
              ),
            },
            {
              key: "date",
              header: "Joined",
              cell: (item) => formatDate(item.createdAt),
            },
            {
              key: "actions",
              header: "Actions",
              className: "text-right",
              cell: (item) => (
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    disabled={item._id === currentUser?._id}
                    onClick={() => {
                      setDeleting(item);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </main>

      <ResourceFormDialog
        open={dialogOpen}
        onOpenChange={(open) => !open && closeDialog()}
        title="Edit User"
        onSubmit={(e) => {
          e.preventDefault();
          updateMutation.mutate();
        }}
        isSubmitting={updateMutation.isPending}
        submitLabel="Update"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(value: UserRole) =>
                setForm((f) => ({ ...f, role: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="client">Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {editing && (
            <p className="text-sm text-muted-foreground">
              Email: {editing.email}
            </p>
          )}
        </div>
      </ResourceFormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete user"
        description={`Are you sure you want to delete "${deleting?.name}"?`}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
      />
    </>
  );
}
