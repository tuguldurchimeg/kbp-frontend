"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createGlossary } from "@/src/app/lib/actions/glossary.actions";
import { useParams } from "next/navigation";

export default function GlossaryCreateForm() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createGlossary({
        name,
        content,
        workspace_id: params.workspaceId as string,
      });

      toast.success("Glossary created successfully!");
      setName("");
      setContent("");
    } catch (error) {
      toast.error("Failed to create glossary.");
      console.error("Glossary creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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
          placeholder="Content"
          className="mt-1"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Glossary"}
      </Button>
    </form>
  );
}
