"use client";

import { TagItem } from "@/types/document";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "../ui/label";

export default function TagEditForm({
  tagItem,
  onClose,
}: {
  tagItem: TagItem;
  onClose: () => void;
}) {
  const [name, setName] = useState(tagItem.attributes.name);
  const [content, setContent] = useState(tagItem.attributes.description);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Example API call
      await fetch(`/api/tags/${tagItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });

      onClose(); // Close dialog on success
    } catch (err) {
      console.error("Failed to update tag:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="description"
          className="mt-1"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}
