"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWorkspaces, createWorkspace } from "@/services/workspace.services";
import WorkspaceCard from "@/components/WorkspaceCard";
import { ROUTE } from "@/constants/route.constants";
import { Input } from "@/components/ui/input";
import SiteLayout from "@/components/layouts/SiteLayout";
import { Button } from "@/components/ui/button";
import { WorkspaceItem } from "@/types/workspace";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function WorkspaceListPage() {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    getWorkspaces().then(setWorkspaces);
  }, []);

  const handleSubmit = async () => {
    if (!form.name.trim()) return;

    const newWorkspace = await createWorkspace({
      name: form.name,
      description: form.description,
    });
    setWorkspaces((prev) => [newWorkspace, ...prev]);
    setForm({ name: "", description: "" });
    setOpen(false);
  };

  const filtered = workspaces.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SiteLayout>
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search workspaces"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md w-full"
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>+ Create</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Workspace</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Workspace name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <Input
                  placeholder="Description (optional)"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmit}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {filtered.map((workspace) => (
          <Link
            key={workspace.id}
            href={ROUTE.WORKSPACES.WORKSPACE(workspace.id)}
          >
            <WorkspaceCard item={workspace} />
          </Link>
        ))}
      </div>
    </SiteLayout>
  );
}
