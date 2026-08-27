"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { projectsApi } from "@/lib/api";
import { formatDate, getErrorMessage, slugify } from "@/lib/helpers";
import type { Project } from "@/types";
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
  category: "",
  client: "",
  technologies: "",
  images: "",
  featuredImage: "",
  liveUrl: "",
  isFeatured: false,
  isPublished: false,
};

export default function PortfolioPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data: res } = await projectsApi.getAll({ limit: 100 });
      return res.data.data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        description: form.description,
        category: form.category,
        client: form.client || undefined,
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        images: form.images
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        featuredImage: form.featuredImage || undefined,
        liveUrl: form.liveUrl || undefined,
        isFeatured: form.isFeatured,
        isPublished: form.isPublished,
      };
      if (editing) {
        return projectsApi.update(editing._id, payload);
      }
      return projectsApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(editing ? "Project updated" : "Project created");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
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

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      category: project.category,
      client: project.client ?? "",
      technologies: project.technologies.join(", "),
      images: project.images.join(", "),
      featuredImage: project.featuredImage ?? "",
      liveUrl: project.liveUrl ?? "",
      isFeatured: project.isFeatured,
      isPublished: project.isPublished,
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
        title="Portfolio"
        description="Manage portfolio projects"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-end">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        <DataTable
          isLoading={isLoading}
          data={data ?? []}
          keyExtractor={(item) => item._id}
          emptyMessage="No projects yet."
          columns={[
            {
              key: "title",
              header: "Project",
              cell: (item) => (
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
              ),
            },
            {
              key: "client",
              header: "Client",
              cell: (item) => item.client ?? "—",
            },
            {
              key: "status",
              header: "Status",
              cell: (item) => (
                <div className="flex flex-wrap gap-1">
                  {item.isPublished && <Badge>Published</Badge>}
                  {item.isFeatured && <Badge variant="secondary">Featured</Badge>}
                  {!item.isPublished && !item.isFeatured && (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </div>
              ),
            },
            {
              key: "date",
              header: "Created",
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
        title={editing ? "Edit Project" : "Create Project"}
        onSubmit={(e) => {
          e.preventDefault();
          saveMutation.mutate();
        }}
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
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
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
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              value={form.client}
              onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              value={form.liveUrl}
              onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              value={form.technologies}
              onChange={(e) =>
                setForm((f) => ({ ...f, technologies: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="images">Image URLs (comma-separated)</Label>
            <Input
              id="images"
              value={form.images}
              onChange={(e) => setForm((f) => ({ ...f, images: e.target.value }))}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="featuredImage">Featured Image URL</Label>
            <Input
              id="featuredImage"
              value={form.featuredImage}
              onChange={(e) =>
                setForm((f) => ({ ...f, featuredImage: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="isPublished"
              checked={form.isPublished}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, isPublished: checked }))
              }
            />
            <Label htmlFor="isPublished">Published</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="isFeatured"
              checked={form.isFeatured}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, isFeatured: checked }))
              }
            />
            <Label htmlFor="isFeatured">Featured</Label>
          </div>
        </div>
      </ResourceFormDialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete project"
        description={`Are you sure you want to delete "${deleting?.title}"?`}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
      />
    </>
  );
}
