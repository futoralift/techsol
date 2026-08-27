"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { testimonialsApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/helpers";
import type { Testimonial } from "@/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog";
import { ResourceFormDialog } from "@/components/dashboard/ResourceFormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const emptyForm = {
  name: "",
  role: "",
  company: "",
  content: "",
  avatar: "",
  rating: 5,
  isPublished: true,
};

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data: res } = await testimonialsApi.getAll({ limit: 100 });
      return res.data.data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name,
        role: form.role,
        company: form.company,
        content: form.content,
        avatar: form.avatar || undefined,
        rating: Number(form.rating) || 5,
        isPublished: form.isPublished,
      };
      if (editing) {
        return testimonialsApi.update(editing._id, payload);
      }
      return testimonialsApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success(editing ? "Testimonial updated" : "Testimonial created");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => testimonialsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted");
      setDeleteOpen(false);
      setDeleting(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setForm({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      avatar: testimonial.avatar ?? "",
      rating: testimonial.rating,
      isPublished: testimonial.isPublished,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  return (
    <>
      <DashboardHeader
        title="Testimonials"
        description="Manage client testimonials"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-end">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </div>

        <DataTable
          isLoading={isLoading}
          data={data ?? []}
          keyExtractor={(item) => item._id}
          emptyMessage="No testimonials yet."
          columns={[
            {
              key: "name",
              header: "Client",
              cell: (item) => (
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.role} at {item.company}
                  </p>
                </div>
              ),
            },
            {
              key: "content",
              header: "Content",
              cell: (item) => (
                <p className="max-w-xs truncate text-muted-foreground">
                  {item.content}
                </p>
              ),
            },
            {
              key: "rating",
              header: "Rating",
              cell: (item) => `${item.rating}/5`,
            },
            {
              key: "status",
              header: "Status",
              cell: (item) => (
                <Badge variant={item.isPublished ? "default" : "secondary"}>
                  {item.isPublished ? "Published" : "Draft"}
                </Badge>
              ),
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
        title={editing ? "Edit Testimonial" : "Create Testimonial"}
        onSubmit={(e) => {
          e.preventDefault();
          saveMutation.mutate();
        }}
        isSubmitting={saveMutation.isPending}
        submitLabel={editing ? "Update" : "Create"}
      >
        <div className="grid gap-4 sm:grid-cols-2">
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
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={form.company}
              onChange={(e) =>
                setForm((f) => ({ ...f, company: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
              }
              rows={4}
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              value={form.avatar}
              onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={(e) =>
                setForm((f) => ({ ...f, rating: Number(e.target.value) }))
              }
              required
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <Switch
              id="isPublished"
              checked={form.isPublished}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, isPublished: checked }))
              }
            />
            <Label htmlFor="isPublished">Published</Label>
          </div>
        </div>
      </ResourceFormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete testimonial"
        description={`Are you sure you want to delete the testimonial from "${deleting?.name}"?`}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
      />
    </>
  );
}
