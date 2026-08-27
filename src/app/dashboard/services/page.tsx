"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { servicesApi } from "@/lib/api";
import { getErrorMessage, slugify } from "@/lib/helpers";
import type { Service } from "@/types";
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
  title: "",
  slug: "",
  description: "",
  icon: "",
  features: "",
  image: "",
  isActive: true,
  order: 0,
};

export default function ServicesPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data: res } = await servicesApi.getAll({ limit: 100 });
      return res.data.data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        description: form.description,
        icon: form.icon,
        features: form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        image: form.image || undefined,
        isActive: form.isActive,
        order: Number(form.order) || 0,
      };
      if (editing) {
        return servicesApi.update(editing._id, payload);
      }
      return servicesApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success(editing ? "Service updated" : "Service created");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => servicesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted");
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

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
      features: service.features.join(", "),
      image: service.image ?? "",
      isActive: service.isActive,
      order: service.order,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate();
  };

  return (
    <>
      <DashboardHeader
        title="Services"
        description="Manage your agency services"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-end">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>

        <DataTable
          isLoading={isLoading}
          data={data ?? []}
          keyExtractor={(item) => item._id}
          emptyMessage="No services yet. Create your first service."
          columns={[
            {
              key: "title",
              header: "Title",
              cell: (item) => (
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.slug}</p>
                </div>
              ),
            },
            {
              key: "icon",
              header: "Icon",
              cell: (item) => item.icon,
            },
            {
              key: "status",
              header: "Status",
              cell: (item) => (
                <Badge variant={item.isActive ? "default" : "secondary"}>
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              ),
            },
            {
              key: "order",
              header: "Order",
              cell: (item) => item.order,
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
        title={editing ? "Edit Service" : "Create Service"}
        onSubmit={handleSubmit}
        isSubmitting={saveMutation.isPending}
        submitLabel={editing ? "Update" : "Create"}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  title: e.target.value,
                  slug: editing ? f.slug : slugify(e.target.value),
                }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              value={form.icon}
              onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
              placeholder="e.g. Globe"
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={3}
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input
              id="features"
              value={form.features}
              onChange={(e) =>
                setForm((f) => ({ ...f, features: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input
              id="order"
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm((f) => ({ ...f, order: Number(e.target.value) }))
              }
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <Switch
              id="isActive"
              checked={form.isActive}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, isActive: checked }))
              }
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
        </div>
      </ResourceFormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete service"
        description={`Are you sure you want to delete "${deleting?.title}"?`}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
      />
    </>
  );
}
