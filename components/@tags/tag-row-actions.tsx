"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tag, MoreVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { TagItem } from "@/types/document";
import TagEditForm from "./tag-edit-form";

export default function RowActions({ item }: { item: TagItem }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVerticalIcon className="h-4 w-4" />
            <span className="sr-only">Open row menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Controlled Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Edit Tag
            </DialogTitle>
          </DialogHeader>
          <TagEditForm tagItem={item} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
