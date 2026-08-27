"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { blogsApi } from "@/lib/api";
import { formatDate, getErrorMessage, slugify } from "@/lib/helpers";
import type { Blog } from "@/types";
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
  excerpt: "",
  content: "",
  coverImage: "",
  tags: "",
  isPublished: false,
};

export default function BlogPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState<Blog | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data: res } = await blogsApi.getAll({ limit: 100 });
      return res.data.data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        excerpt: form.excerpt,
        content: form.content,
        coverImage: form.coverImage || undefined,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        isPublished: form.isPublished,
        ...(form.isPublished && !editing?.publishedAt
          ? { publishedAt: new Date().toISOString() }
          : {}),
      };
      if (editing) {
        return blogsApi.update(editing._id, payload);
      }
      return blogsApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success(editing ? "Blog post updated" : "Blog post created");
      closeDialog();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => blogsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog post deleted");
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

  const openEdit = (blog: Blog) => {
    setEditing(blog);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      coverImage: blog.coverImage ?? "",
      tags: blog.tags.join(", "),
      isPublished: blog.isPublished,
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
        title="Blog"
        description="Manage blog posts and articles"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-end">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add Post
          </Button>
        </div>

        <DataTable
          isLoading={isLoading}
          data={data ?? []}
          keyExtractor={(item) => item._id}
          emptyMessage="No blog posts yet."
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
              key: "tags",
              header: "Tags",
              cell: (item) => (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ),
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
        title={editing ? "Edit Blog Post" : "Create Blog Post"}
        onSubmit={(e) => {
          e.preventDefault();
          saveMutation.mutate();
        }}
        isSubmitting={saveMutation.isPending}
        submitLabel={editing ? "Update" : "Create"}
        maxWidth="max-w-3xl"
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
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) =>
                setForm((f) => ({ ...f, excerpt: e.target.value }))
              }
              rows={2}
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
              rows={8}
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              value={form.coverImage}
              onChange={(e) =>
                setForm((f) => ({ ...f, coverImage: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
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
        title="Delete blog post"
        description={`Are you sure you want to delete "${deleting?.title}"?`}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
      />
    </>
  );
}
