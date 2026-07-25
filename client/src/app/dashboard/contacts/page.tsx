"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contactApi } from "@/lib/api";
import { formatDate, getErrorMessage } from "@/lib/helpers";
import type { Contact, ContactStatus } from "@/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusVariant: Record<ContactStatus, "default" | "secondary" | "outline"> = {
  new: "default",
  read: "secondary",
  replied: "outline",
};

export default function ContactsPage() {
  const queryClient = useQueryClient();
  const [viewing, setViewing] = useState<Contact | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Contact | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data: res } = await contactApi.getAll({ limit: 100 });
      return res.data.data;
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      contactApi.updateStatus(id, status),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success(`Marked as ${status}`);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted");
      setDeleteOpen(false);
      setDeleting(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const openContact = (contact: Contact) => {
    setViewing(contact);
    if (contact.status === "new") {
      statusMutation.mutate({ id: contact._id, status: "read" });
    }
  };

  return (
    <>
      <DashboardHeader
        title="Contacts"
        description="View and manage contact form submissions"
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <DataTable
          isLoading={isLoading}
          data={data ?? []}
          keyExtractor={(item) => item._id}
          emptyMessage="No contact submissions yet."
          columns={[
            {
              key: "name",
              header: "From",
              cell: (item) => (
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.email}</p>
                </div>
              ),
            },
            {
              key: "subject",
              header: "Subject",
              cell: (item) => item.subject,
            },
            {
              key: "status",
              header: "Status",
              cell: (item) => (
                <Badge variant={statusVariant[item.status]} className="capitalize">
                  {item.status}
                </Badge>
              ),
            },
            {
              key: "date",
              header: "Received",
              cell: (item) => formatDate(item.createdAt),
            },
            {
              key: "actions",
              header: "Actions",
              className: "text-right",
              cell: (item) => (
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openContact(item)}>
                    <Eye className="h-4 w-4" />
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

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewing?.subject}</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4">
              <div className="grid gap-2 text-sm">
                <p>
                  <span className="font-medium">From:</span> {viewing.name} (
                  {viewing.email})
                </p>
                {viewing.phone && (
                  <p>
                    <span className="font-medium">Phone:</span> {viewing.phone}
                  </p>
                )}
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(viewing.createdAt)}
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4 text-sm">
                {viewing.message}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Select
                  value={viewing.status}
                  onValueChange={(value: ContactStatus) => {
                    statusMutation.mutate({ id: viewing._id, status: value });
                    setViewing({ ...viewing, status: value });
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" asChild>
                  <a href={`mailto:${viewing.email}?subject=Re: ${viewing.subject}`}>
                    <Mail className="h-4 w-4" />
                    Reply via Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete contact"
        description={`Delete submission from "${deleting?.name}"?`}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
      />
    </>
  );
}
