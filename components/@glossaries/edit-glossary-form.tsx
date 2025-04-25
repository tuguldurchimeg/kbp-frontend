"use client";

import { GlossaryItem } from "@/types/document";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "../ui/label";

export default function EditGlossaryForm({
  glossaryItem,
}: {
  glossaryItem: GlossaryItem;
}) {
  const [name, setName] = useState(glossaryItem.attributes.name);
  const [content, setContent] = useState(glossaryItem.attributes.content);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    // Your API logic here
    console.log("Updating:", glossaryItem.id, { name, content });
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
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content"
          className="mt-1"
        />
      </div>

      {/* Button aligned to end */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}
