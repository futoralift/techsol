"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { mediaApi } from "@/lib/api";
import { formatDate, getErrorMessage } from "@/lib/helpers";
import type { Media } from "@/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function MediaPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Media | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: async () => {
      const { data: res } = await mediaApi.getAll({ limit: 100 });
      return res.data.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return mediaApi.upload(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast.success("File uploaded successfully");
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: (error) => toast.error(getErrorMessage(error, "Upload failed")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => mediaApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast.success("Media deleted");
      setDeleteOpen(false);
      setDeleting(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const isImage = (mimetype: string) => mimetype.startsWith("image/");

  return (
    <>
      <DashboardHeader
        title="Media"
        description="Upload and manage media files via Cloudinary"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 rounded-xl border border-dashed border-primary/30 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Upload media</p>
            <p className="text-sm text-muted-foreground">
              Images and files are stored on Cloudinary
            </p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,video/*,application/pdf"
              onChange={handleFileChange}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadMutation.isPending}
            >
              <Upload className="h-4 w-4" />
              {uploadMutation.isPending ? "Uploading..." : "Upload File"}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm"
              >
                <div className="relative aspect-square bg-muted/30">
                  {isImage(item.mimetype) ? (
                    <Image
                      src={item.url}
                      alt={item.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
                      {item.filename}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-end justify-center gap-2 bg-black/50 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => copyUrl(item.url)}
                    >
                      <Copy className="h-3 w-3" />
                      Copy URL
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setDeleting(item);
                        setDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1 p-3">
                  <p className="truncate text-sm font-medium">{item.filename}</p>
                  <p className="text-xs text-muted-foreground">
                    {(item.size / 1024).toFixed(1)} KB · {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border/60 bg-white p-8">
            <p className="text-sm text-muted-foreground">
              No media uploaded yet. Upload your first file above.
            </p>
          </div>
        )}
      </main>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete media"
        description={`Delete "${deleting?.filename}" from Cloudinary?`}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
      />
    </>
  );
}
